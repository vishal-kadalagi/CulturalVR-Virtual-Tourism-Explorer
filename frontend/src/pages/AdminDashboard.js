import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [placeId, setPlaceId] = useState('');
  const [file, setFile] = useState(null);
  const [type, setType] = useState('video');
  const [places, setPlaces] = useState([]);

  // ✅ Correct IP for mobile to reach backend
  const BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/places`);
        setPlaces(res.data);
      } catch (error) {
        console.error('Error fetching places:', error);
        alert('Failed to load places');
      }
    };

    fetchPlaces();
  }, []);

  const addPlace = async () => {
    if (!name || !desc) {
      alert('Please fill out both the name and description');
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/places`, { name, description: desc });
      alert('Place added successfully');
      setName('');
      setDesc('');
    } catch (error) {
      console.error('Error adding place:', error);
      alert('Failed to add place');
    }
  };

  const uploadMedia = async () => {
    if (!file || !placeId) {
      alert('Please select a place and upload a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    formData.append('place_id', placeId);

    try {
      await axios.post(`${BASE_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Media uploaded successfully');
      setFile(null);
      setPlaceId('');
    } catch (error) {
      console.error('Error uploading media:', error);
      alert('Failed to upload media');
    }
  };

  return (
    <div className="ad">
      <h2>Admin Dashboard</h2>

      {/* Add Place Section */}
      <div className="addplace">
        <h3>Add Place</h3>
        <input
          placeholder="Place Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={addPlace}>Add Place</button>
      </div>
      <br />

      {/* Upload Media Section */}
      <div className="upload">
        <h3>Upload VR Media</h3>
        <select onChange={(e) => setPlaceId(e.target.value)} value={placeId}>
          <option value="">Select Place</option>
          {places.map((p) => (
            <option value={p.id} key={p.id}>{p.name}</option>
          ))}
        </select>
        <select onChange={(e) => setType(e.target.value)} value={type}>
          <option value="video">360 Video</option>
          <option value="photo">360 Photo</option>
        </select>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={uploadMedia}>Upload Media</button>
      </div>
    </div>
  );
}

export default AdminDashboard;
