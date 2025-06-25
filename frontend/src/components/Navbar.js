import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../imgs/logo.png'

function Navbar() {
  return (
    <nav>
      <p><Link to="/"><img class="logo" src={logo}/></Link></p>
      <div>
      <p><Link className="nav-link" to="/user-login">User Login</Link></p>
      <p><Link className="nav-link" to="/register">Register</Link></p>
      <p><Link className="nav-link" to="/admin-login">Admin Login</Link></p>
      </div>
    </nav>
  );
}

export default Navbar;
