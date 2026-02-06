import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navStyle = {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid #374151',
    position: 'sticky',
    top: 0,
    zIndex: 40,
    padding: '0 1rem'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '64px'
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none'
  };

  const logoCircleStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '20px',
    color: 'white'
  };

  const navItemsStyle = {
    display: 'flex',
    gap: '24px',
    alignItems: 'center'
  };

  const navLinkStyle = {
    color: '#9ca3af',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'color 0.3s'
  };

  const donateButtonStyle = {
    background: '#ef4444',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    fontWeight: '500',
    cursor: 'pointer',
    fontSize: '14px'
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <Link to="/" style={logoStyle}>
          <div style={logoCircleStyle}>M</div>
          <div>
            <div style={{ fontWeight: 'bold', color: 'white' }}>Muscle Dynamics</div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Build Your Perfect Workout</div>
          </div>
        </Link>
        
        <div style={navItemsStyle}>
          <Link to="/" style={navLinkStyle}>Home</Link>
          <Link to="/workouts" style={navLinkStyle}>Workouts</Link>
          <Link to="/stats" style={navLinkStyle}>Statistics</Link>
          <button style={donateButtonStyle}>Donate</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;