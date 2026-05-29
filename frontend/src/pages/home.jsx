import { useState } from 'react';

const Home = () => {
  const [medicine, setMedicine] = useState('');

  const handlePostMedicine = () => {
    if (medicine.trim()) {
      alert(`Searching for "${medicine}"...`);
      setMedicine('');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`Uploaded prescription: ${file.name}`);
    }
  };

  return (
    <div className="page">
      <div className="card hero-card">
        <h1 className="hero-title">
          In a busy world, we waste precious time searching for medicines and pharmacies.
        </h1>
        <p className="hero-subtext">
          PharmaSee brings everything to you — instantly.
        </p>
      </div>

      <div className="action-cards">
        <div className="card">
          <h3>Post Medicine Name</h3>
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter medicine name..."
              className="input-field"
              value={medicine}
              onChange={(e) => setMedicine(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handlePostMedicine}>
              Send
            </button>
          </div>
        </div>

        <div className="card">
          <h3>Post Prescription Photo</h3>
          <div className="input-group" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <label className="file-upload-label">
              Choose image
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
            </label>
            <button className="btn btn-primary" style={{ marginTop: 12 }}>Post</button>
          </div>
        </div>
      </div>

      <footer className="footer">© 2026 PharmaSee — bringing care closer.</footer>
    </div>
  );
};

export default Home;