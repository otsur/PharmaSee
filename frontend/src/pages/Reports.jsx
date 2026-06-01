const reports = [
  {
    id: 1,
    testName: 'Complete Blood Count (CBC)',
    date: 'May 22, 2026',
    pharmacy: 'Pharmacy A',
    status: 'Ready',
  },
  {
    id: 2,
    testName: 'Lipid Profile',
    date: 'May 18, 2026',
    pharmacy: 'Pharmacy A',
    status: 'Ready',
  },
  {
    id: 3,
    testName: 'Thyroid Panel',
    date: 'May 24, 2026',
    pharmacy: 'Pharmacy B',
    status: 'Pending',
  },
  {
    id: 4,
    testName: 'Vitamin D',
    date: 'May 12, 2026',
    pharmacy: 'Pharmacy C',
    status: 'Ready',
  },
];

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const Reports = () => {
  const handleDownload = (report) => {
    alert(`Downloading ${report.testName} report...`);
  };

  const handleView = (report) => {
    alert(`Viewing ${report.testName} report...`);
  };

  return (
    <div className="page">
      <h2 className="page-title">My Reports</h2>
      <p className="page-subtitle">All your test reports in one place.</p>

      {reports.map((report) => (
        <div key={report.id} className="report-row">
          <div className="report-info">
            <strong>{report.testName}</strong>
            <span style={{ fontSize: '0.9rem', color: 'var(--color-text-soft)' }}>
              {report.date} · {report.pharmacy}
            </span>
          </div>
          <span
            className={`status-badge ${
              report.status === 'Ready' ? 'status-ready' : 'status-pending'
            }`}
          >
            {report.status === 'Ready' ? 'Report Ready' : 'Pending'}
          </span>
          <div className="report-actions">
            <button
              className="btn btn-outline"
              onClick={() => handleDownload(report)}
            >
              Download
            </button>
            <button
              className="btn btn-solid"
              onClick={() => handleView(report)}
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <EyeIcon /> View Report
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reports;