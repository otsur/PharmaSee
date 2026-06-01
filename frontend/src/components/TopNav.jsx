import { NavLink, useLocation } from 'react-router-dom';

const TopNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    { path: '/home', label: 'Home' },
    { path: '/pharmacy', label: 'Pharmacy' },
    { path: '/lab-tests', label: 'Lab Tests' },
    { path: '/reports', label: 'Reports' },
  ];

  return (
    <nav className="topnav">
      <div className="topnav-tabs">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={`topnav-tab ${currentPath === tab.path ? 'active' : ''}`}
          >
            {tab.label}
          </NavLink>
        ))}
      </div>
      <div className="topnav-version">v1.0 · Glass UI</div>
    </nav>
  );
};

export default TopNav;