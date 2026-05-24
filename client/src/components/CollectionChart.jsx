import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--surface-2)', border: '1px solid var(--border)',
      borderRadius: '8px', padding: '10px 14px',
    }}>
      <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '4px' }}>{label}</p>
      <p style={{ color: 'var(--text)', fontWeight: 600 }}>₹ {Number(payload[0].value).toLocaleString('en-IN')}</p>
    </div>
  );
};

function CollectionChart({ data, selectedTenant }) {
  return (
    <div style={containerStyle}>
      <p style={titleStyle}>Collection by City</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={28} margin={{ bottom: 24 }}>
          <XAxis
            dataKey="tenant"
            tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            interval={0}
            angle={-35}
            textAnchor="end"
          />
          <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.06)' }} />
          <Bar dataKey="total_collection" radius={[6, 6, 0, 0]}>
            {data.map((entry, i) => {
              const isSelected = selectedTenant !== 'All' && entry.tenant === selectedTenant;
              const isAll = selectedTenant === 'All';
              return (
                <Cell
                  key={i}
                  fill={isSelected || isAll ? 'var(--accent)' : 'var(--surface-2)'}
                  stroke={isSelected || isAll ? 'var(--accent)' : 'var(--border)'}
                  strokeWidth={1}
                  opacity={isSelected || isAll ? 1 : 0.4}
                />
              );
            })}
          </Bar>
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

export default CollectionChart;
