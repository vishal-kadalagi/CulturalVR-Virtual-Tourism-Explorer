import React from 'react';
import { useParams } from 'react-router-dom';

function VrViewer() {
  const { filename } = useParams();
  const imageURL = `http://localhost:5000/uploads/${filename}`; // Use the local network IP address for mobile access

  // Handle VR mode entry with error handling
  const handleEnterVR = () => {
    const scene = document.querySelector('#scene');
    if (scene && scene.enterVR) {
      try {
        scene.enterVR();
      } catch (error) {
        console.error('Error entering VR mode:', error);
        alert('VR mode is not supported on this device/browser.');
      }
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', margin: 0 }}>
      {/* VR Mode Button */}
      <button
        id="enterVRBtn"
        onClick={handleEnterVR}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '10px 20px',
          backgroundColor: '#2c3e50',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: 'pointer',
          zIndex: 999,
        }}
      >
        🎮 Enter VR Mode
      </button>

      {/* VR Scene */}
      <a-scene 
        id="scene"
        vr-mode-ui="enabled: true"  // WebXR for VR mode
        embedded
        renderer="antialias: true; colorManagement: true"  // Ensure smooth rendering and color management
        xrweb="controller: true" // Enable WebXR controller support
        cursor="rayOrigin: mouse" // Enable cursor tracking with mouse (useful on desktop)
        device-orientation-permission-ui="enabled: true"  // Ensure permission for device orientation
      >
        <a-assets>
          <img
            id="vrImage"
            src={imageURL}
            alt="VR scene"
            crossOrigin="anonymous"
          />
        </a-assets>

        {/* VR Sky - panoramic image */}
        <a-sky src="#vrImage" rotation="0 -130 0"></a-sky>

        {/* Text in the VR Scene */}
        <a-text
          font="kelsonsans"
          value="VR Viewer"
          width="6"
          position="-2.5 0.25 -1.5"
          rotation="0 15 0"
        ></a-text>

        {/* Optional: Add controllers for interaction in VR */}
        <a-entity 
          id="controller"
          laser-controls="rayOrigin: controller"
          line="color: red; opacity: 0.5"
          position="0 1 -1"
        ></a-entity>

      </a-scene>
    </div>
  );
}

export default VrViewer;
