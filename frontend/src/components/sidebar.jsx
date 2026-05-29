import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Mock logout
    navigate('/home');
  };

  // Simple inline SVGs for Lucide-style icons
  const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );

  const PharmacyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="9" y1="6" x2="9" y2="10" />
      <line x1="15" y1="6" x2="15" y2="10" />
      <line x1="9" y1="14" x2="9" y2="18" />
      <line x1="15" y1="14" x2="15" y2="18" />
    </svg>
  );

  const LabIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2v7.31a4.25 4.25 0 0 0 1.07 2.84L14 16h-4l2.93-3.85A4.25 4.25 0 0 0 14 9.31V2" />
      <path d="M9 2h6" />
      <path d="M5 22h14a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2z" />
    </svg>
  );

  const ReportsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">PharmaSee</div>
      <div className="sidebar-tagline">Care, simplified</div>

      <div className="user-info-box">
        <div className="user-info-label">Signed In</div>
        <div className="user-info-name">Dr. Ayesha Khan</div>
        <div className="user-info-email">ayesha@pharmasee.app</div>
      </div>

      <ul className="sidebar-nav">
        <li>
          <NavLink to="/home" className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}>
            <HomeIcon /> Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/pharmacy" className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}>
            <PharmacyIcon /> Pharmacy
          </NavLink>
        </li>
        <li>
          <NavLink to="/lab-tests" className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}>
            <LabIcon /> Lab Tests
          </NavLink>
        </li>
        <li>
          <NavLink to="/reports" className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}>
            <ReportsIcon /> Reports
          </NavLink>
        </li>
      </ul>

      <button className="sidebar-logout" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;