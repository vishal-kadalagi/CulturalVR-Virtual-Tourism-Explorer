import React from 'react';
import mimg1 from '../imgs/vr-glasses-gaming.jpg';  // Make sure this path is correct

function Home() {
  return (
    <div className="home">
      <h1>Welcome to VR Player</h1>
      <p>Login or Register to continue</p>
      <img src={mimg1} alt="VR Glasses Gaming" /> {/* Rendering the image */}
    </div>
  );
}

export default Home;
