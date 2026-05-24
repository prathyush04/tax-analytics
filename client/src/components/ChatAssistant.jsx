import { useState, useRef, useEffect } from "react";
import api from "../services/api";

function ChatAssistant() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { role: "user", text: message };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await api.post("/chat", { message });
      setMessages((prev) => [...prev, { role: "assistant", text: response.data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", text: "Failed to get response." }]);
    }

    setLoading(false);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={containerStyle}>
      <div style={{ marginBottom: '16px' }}>
        <p style={titleStyle}>AI Assistant</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Ask questions about your property tax data</p>
      </div>

      <div style={chatWindowStyle}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px', marginTop: '40px' }}>
            No messages yet. Ask something about your data.
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: '10px' }}>
            <div style={msg.role === 'user' ? userBubble : aiBubble}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px' }}>
            <div style={{ ...aiBubble, color: 'var(--text-muted)' }}>
              <span style={{ letterSpacing: '2px' }}>···</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
        <input
          type="text"
          placeholder="Ask about property analytics..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          style={inputStyle}
        />
        <button onClick={sendMessage} disabled={loading} style={buttonStyle}>
          Send
        </button>
      </div>
    </div>
  );
}

const containerStyle = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)',
  padding: '20px',
  marginTop: '20px',
};

const titleStyle = {
  fontSize: '13px',
  fontWeight: 600,
  color: 'var(--text)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
};

const chatWindowStyle = {
  height: '280px',
  overflowY: 'auto',
  background: 'var(--bg)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  padding: '14px',
};

const userBubble = {
  background: 'var(--accent)',
  color: '#fff',
  padding: '8px 14px',
  borderRadius: '16px 16px 4px 16px',
  fontSize: '13px',
  maxWidth: '70%',
  lineHeight: 1.5,
};

const aiBubble = {
  background: 'var(--surface-2)',
  color: 'var(--text)',
  padding: '8px 14px',
  borderRadius: '16px 16px 16px 4px',
  fontSize: '13px',
  maxWidth: '70%',
  lineHeight: 1.5,
  border: '1px solid var(--border)',
};

const inputStyle = {
  flex: 1,
  background: 'var(--bg)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  color: 'var(--text)',
  padding: '9px 14px',
  fontSize: '13px',
  outline: 'none',
};

const buttonStyle = {
  background: 'var(--accent)',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  padding: '9px 20px',
  fontSize: '13px',
  fontWeight: 600,
  cursor: 'pointer',
};

export default ChatAssistant;
