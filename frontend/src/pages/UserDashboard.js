import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const [places, setPlaces] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Set up a constant for the base URL (adjust the IP for mobile access)
  const BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/places`);
        setPlaces(res.data);
      } catch (err) {
        console.error('Error fetching places:', err);
        setError('Failed to load places');
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  // Memoizing filtered places to avoid unnecessary re-renders
  const filteredPlaces = useMemo(
    () => places.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())),
    [places, search]
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2 className="ud">User Dashboard</h2>

      {/* Search Input */}
      <input
        className="search"
        placeholder="Search by keyword"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: '10px',
          marginBottom: '20px',
          width: '100%',
          maxWidth: '400px',
          border: '1px solid #ccc',
          borderRadius: '5px',
        }}
      />

      {/* Displaying places */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {filteredPlaces.length === 0 ? (
          <div>No places found</div>
        ) : (
          filteredPlaces.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/place/${p.id}`)}
              style={{
                border: '1px solid #ccc',
                padding: '15px',
                borderRadius: '10px',
                cursor: 'pointer',
                width: '250px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <h3>{p.name}</h3>
              <p style={{ fontSize: '0.9em' }}>{p.description.slice(0, 50)}...</p>
              {p.media[0] && (
                p.media[0].type === 'video' ? (
                  <video
                    src={`${BASE_URL}/uploads/${p.media[0].filename}`}
                    style={{ width: '100%' }}
                    muted
                    autoPlay
                    loop
                  />
                ) : (
                  <img
                    src={`${BASE_URL}/uploads/${p.media[0].filename}`}
                    alt="preview"
                    style={{ width: '100%' }}
                  />
                )
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
