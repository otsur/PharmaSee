const labTests = [
  {
    id: 1,
    name: 'Complete Blood Count',
    description: 'Measures red/white blood cells, platelets.',
    pharmaciesAvailable: 4,
  },
  {
    id: 2,
    name: 'Lipid Profile',
    description: 'Cholesterol & triglycerides panel.',
    pharmaciesAvailable: 3,
  },
  {
    id: 3,
    name: 'Vitamin D',
    description: '25-hydroxy vitamin D test.',
    pharmaciesAvailable: 5,
  },
  {
    id: 4,
    name: 'Thyroid Panel',
    description: 'TSH, T3, T4 hormone levels.',
    pharmaciesAvailable: 4,
  },
  {
    id: 5,
    name: 'Blood Sugar',
    description: 'Fasting & postprandial glucose.',
    pharmaciesAvailable: 6,
  },
  {
    id: 6,
    name: 'Liver Function',
    description: 'ALT, AST, bilirubin, albumin.',
    pharmaciesAvailable: 3,
  },
];

const FlaskIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 2v7.31a4.25 4.25 0 0 0 1.07 2.84L14 16h-4l2.93-3.85A4.25 4.25 0 0 0 14 9.31V2" />
    <path d="M9 2h6" />
    <path d="M5 22h14a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2z" />
  </svg>
);

const LabTests = () => {
  return (
    <div className="page">
      <h2 className="page-title">Lab Tests</h2>
      <p className="page-subtitle">Pick a test to see where it's available.</p>

      <div className="grid-3col">
        {labTests.map((test) => (
          <div key={test.id} className="card test-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <FlaskIcon />
              <h3 style={{ margin: 0 }}>{test.name}</h3>
            </div>
            <p style={{ color: 'var(--color-text-soft)' }}>{test.description}</p>
            <p style={{ color: 'var(--color-primary)', fontWeight: 600, marginTop: 8 }}>
              Available at {test.pharmaciesAvailable} pharmacies
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabTests;