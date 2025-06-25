import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PlaceDetails() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Update the base URL for your backend
  const BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/places/${id}`);
        setPlace(res.data);
      } catch (err) {
        console.error('Error loading place:', err);
        setError('Failed to load place details');
      } finally {
        setLoading(false);
      }
    };

    fetchPlaceDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const mediaElements = place.media && place.media.length > 0
    ? place.media.map(m => {
        if (m.type === 'video') {
          return (
            <video
              key={m.id}
              src={`${BASE_URL}/uploads/${m.filename}`}
              controls
              style={{ width: '100%', maxWidth: '800px', marginBottom: '20px' }}
            />
          );
        } else {
          return (
            <a
              key={m.id}
              href={`/vr-viewer/${m.filename}?title=${encodeURIComponent(place.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  width: '100%',
                  height: '300px',
                  backgroundImage: `url(${BASE_URL}/uploads/${m.filename})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '24px',
                  backgroundColor: 'black',
                  borderRadius: '8px'
                }}
              >
                Tap to View in VR
              </div>
            </a>
          );
        }
      })
    : <p>No media available</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{place.name}</h2>
      <p>{place.description}</p>
      {mediaElements}
    </div>
  );
}

export default PlaceDetails;
