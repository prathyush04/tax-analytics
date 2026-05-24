import { useEffect, useState } from "react";
import api from "./services/api";
import KPICards from "./components/KPICards";
import TenantFilter from "./components/TenantFilter";
import CollectionChart from "./components/CollectionChart";
import StatusChart from "./components/StatusChart";
import ChatAssistant from "./components/ChatAssistant";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [kpis, setKpis] = useState(null);
  const [selectedTenant, setSelectedTenant] = useState("All");
  const [collectionData, setCollectionData] = useState([]);
  const [statusData, setStatusData] = useState([]);

  useEffect(() => {
    const endpoint = selectedTenant === "All" ? "/kpis" : `/kpis?tenant=${selectedTenant}`;
    api.get(endpoint)
      .then((res) => setKpis(res.data))
      .catch((err) => console.error("Error fetching kpis:", err));
  }, [selectedTenant]);

  useEffect(() => {
    api.get("/collection-by-city")
      .then((res) => setCollectionData(res.data))
      .catch((err) => console.error("Error fetching collection data:", err));
  }, []);

  useEffect(() => {
    api.get("/status-by-city")
      .then((res) => setStatusData(res.data))
      .catch((err) => console.error("Error fetching status data:", err));
  }, []);

  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-main">
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '4px' }}>
            Property Tax Dashboard
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
            Real-time analytics across all municipalities
          </p>
        </div>

        <TenantFilter selectedTenant={selectedTenant} setSelectedTenant={setSelectedTenant} />
        <KPICards kpis={kpis} />

        <div className="charts-grid">
          <CollectionChart data={collectionData} selectedTenant={selectedTenant} />
          <StatusChart data={statusData} />
        </div>

        <ChatAssistant />
      </main>
    </div>
  );
}

export default App;
