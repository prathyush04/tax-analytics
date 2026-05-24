const cards = [
  { key: 'total_properties', label: 'Total Properties', icon: '🏠', color: 'var(--accent)' },
  { key: 'approved', label: 'Approved', icon: '✓', color: 'var(--green)' },
  { key: 'rejected', label: 'Rejected', icon: '✕', color: 'var(--red)' },
  { key: 'total_collection', label: 'Total Collection', icon: '₹', color: 'var(--amber)', prefix: '₹ ' },
];

function KPICards({ kpis }) {
  if (!kpis) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {cards.map((c) => (
          <div key={c.key} style={skeletonStyle} />
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
      {cards.map((c) => (
        <div key={c.key} style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {c.label}
            </span>
            <span style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: `color-mix(in srgb, ${c.color} 15%, transparent)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '14px', color: c.color,
            }}>
              {c.icon}
            </span>
          </div>
          <div style={{ fontSize: '26px', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            {c.prefix || ''}{Number(kpis[c.key]).toLocaleString('en-IN')}
          </div>
        </div>
      ))}
    </div>
  );
}

const cardStyle = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)',
  padding: '20px',
  transition: 'border-color 0.2s',
};

const skeletonStyle = {
  ...cardStyle,
  height: '100px',
  background: 'var(--surface-2)',
  animation: 'pulse 1.5s ease-in-out infinite',
};

export default KPICards;
