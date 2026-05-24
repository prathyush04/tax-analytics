import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--surface-2)', border: '1px solid var(--border)',
      borderRadius: '8px', padding: '10px 14px',
    }}>
      <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '6px' }}>{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.fill, fontWeight: 600, fontSize: '13px' }}>
          {p.dataKey.charAt(0).toUpperCase() + p.dataKey.slice(1)}: {p.value}
        </p>
      ))}
    </div>
  );
};

function StatusChart({ data }) {
  return (
    <div style={containerStyle}>
      <p style={titleStyle}>Status by City</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={10} barGap={2} margin={{ bottom: 24 }}>
          <XAxis dataKey="tenant" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} interval={0} angle={-35} textAnchor="end" />
          <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.06)' }} />
          <Legend wrapperStyle={{ fontSize: '12px', color: 'var(--text-muted)', paddingTop: '12px' }} />
          <Bar dataKey="approved" fill="var(--green)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="rejected" fill="var(--red)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="pending" fill="var(--amber)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const containerStyle = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)',
  padding: '20px',
};

const titleStyle = {
  fontSize: '13px',
  fontWeight: 600,
  color: 'var(--text)',
  marginBottom: '20px',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
};

export default StatusChart;
