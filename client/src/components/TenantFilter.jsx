const cities = [
  "All", "Delhi", "Mumbai", "Pune", "Bengaluru",
  "Chennai", "Hyderabad", "Ahmedabad", "Kolkata", "Jaipur", "Lucknow"
];

function TenantFilter({ selectedTenant, setSelectedTenant }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
      <span style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: 500 }}>City</span>
      <select
        value={selectedTenant}
        onChange={(e) => setSelectedTenant(e.target.value)}
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          color: 'var(--text)',
          padding: '7px 32px 7px 12px',
          fontSize: '13px',
          cursor: 'pointer',
          outline: 'none',
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238892a4' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 10px center',
          minWidth: '140px',
        }}
      >
        {cities.map((city) => (
          <option key={city} value={city} style={{ background: 'var(--surface)' }}>
            {city === 'All' ? 'All Cities' : city}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TenantFilter;
