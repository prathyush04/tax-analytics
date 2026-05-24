function Navbar() {
  return (
    <nav style={{
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      padding: '0 32px',
      height: '56px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '28px',
          height: '28px',
          background: 'var(--accent)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
        }}>
          ⬡
        </div>
        <span style={{ fontWeight: 700, fontSize: '15px', letterSpacing: '-0.01em' }}>
          TaxAnalytics
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'var(--green)',
          boxShadow: '0 0 6px var(--green)',
        }} />
        <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Live</span>
      </div>
    </nav>
  );
}

export default Navbar;
