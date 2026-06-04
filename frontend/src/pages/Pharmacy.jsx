import { useState } from 'react';

const pharmacies = [
  { id: 1, name: 'Pharmacy A', location: 'Downtown, 2.4 km', hours: '8 AM - 10 PM', status: 'Open' },
  { id: 2, name: 'Pharmacy B', location: 'Uptown, 5.1 km', hours: '24 Hours', status: 'Open' },
  { id: 3, name: 'Pharmacy C', location: 'Midtown, 1.8 km', hours: '9 AM - 9 PM', status: 'Closed' },
  { id: 4, name: 'Pharmacy D', location: 'Lakeside, 3.6 km', hours: '10 AM - 8 PM', status: 'Open' },
  { id: 5, name: 'Pharmacy E', location: 'Hillpark, 7.2 km', hours: '24 Hours', status: 'Closed' },
  { id: 6, name: 'Pharmacy F', location: 'River Rd, 4.0 km', hours: '8 AM - 11 PM', status: 'Open' },
];

const BuildingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="9" y1="6" x2="9" y2="6.01" />
    <line x1="15" y1="6" x2="15" y2="6.01" />
    <line x1="9" y1="10" x2="9" y2="10.01" />
    <line x1="15" y1="10" x2="15" y2="10.01" />
    <line x1="9" y1="14" x2="9" y2="14.01" />
    <line x1="15" y1="14" x2="15" y2="14.01" />
    <path d="M9 18v2h6v-2" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const Pharmacy = () => {
  const [query, setQuery] = useState('');

  const filtered = pharmacies.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="page">
      <h2 className="page-title">Pharmacies near you</h2>
      <p className="page-subtitle">Tap a pharmacy to view doctors and available lab tests.</p>

      {/* Search Bar — standalone div, NOT inside .card */}
      <div
        className="search-bar"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '10px 16px',
          margin: '0 0 28px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <span style={{ color: 'var(--color-text-muted)', flexShrink: 0, display: 'flex' }}>
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder="Search by name or location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            border: 'none',
            outline: 'none',
            background: 'transparent',
            width: '100%',
            fontSize: '0.95rem',
            color: 'var(--color-text)',
            fontFamily: 'var(--font-family)',
            WebkitUserSelect: 'text',
            userSelect: 'text',
            pointerEvents: 'all',
            cursor: 'text',
          }}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            style={{
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-muted)',
              padding: 0,
              fontSize: '1rem',
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginTop: '40px' }}>
          No pharmacies found for "{query}"
        </p>
      ) : (
        <div className="grid-3col">
          {filtered.map((pharm) => (
            <div
              key={pharm.id}
              className="card pharmacy-card"
              onClick={() => alert(`Selected ${pharm.name}`)}
            >
              <div className="icon-circle">
                <BuildingIcon />
              </div>
              <span className={`status-badge ${pharm.status === 'Open' ? 'status-open' : 'status-closed'}`}>
                {pharm.status}
              </span>
              <h3 style={{ margin: '12px 0 4px' }}>{pharm.name}</h3>
              <p style={{ color: 'var(--color-text-soft)', margin: 0 }}>{pharm.location}</p>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{pharm.hours}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pharmacy;