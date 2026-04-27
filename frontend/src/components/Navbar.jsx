import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // Active link highlight karne ke liye

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user') || "null")
  );

  useEffect(() => {
    const syncAuth = () => {
      setToken(localStorage.getItem('token'));
      setUser(JSON.parse(localStorage.getItem('user') || "null"));
    };
    window.addEventListener('storage', syncAuth);
    return () => window.removeEventListener('storage', syncAuth);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  // Helper function for active link styling
  const isActive = (path) => location.pathname === path ? "active fw-bold border-bottom border-primary" : "";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm py-3">
      <div className="container">
        
        {/* Brand Logo with Icon */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '40px', height: '40px' }}>
            <span className="fw-bold">M</span>
          </div>
          <span className="fs-4 fw-bold tracking-tight text-dark">My<span className="text-primary">App</span></span>
        </Link>

        {/* Toggler for Mobile */}
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            
            <li className="nav-item px-2">
              <Link className={`nav-link ${isActive('/')}`} to="/">Home</Link>
            </li>

            {!token ? (
              <>
                <li className="nav-item px-2">
                  <Link className={`nav-link ${isActive('/login')}`} to="/login">Login</Link>
                </li>
                <li className="nav-item ms-lg-3">
                  <Link className="btn btn-primary rounded-pill px-4 shadow-sm" to="/register">
                    Get Started
                  </Link>
                </li>
              </>
            ) : (
              <>
                {/* User Profile Info */}
                <li className="nav-item px-3 border-end d-none d-lg-block">
                  <div className="d-flex align-items-center">
                    <div className="avatar-sm me-2 bg-light rounded-circle p-1 border">
                       <img src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`} 
                            alt="profile" className="rounded-circle" width="30" />
                    </div>
                    <span className="text-muted small">Welcome, <b className="text-dark">{user?.name?.split(' ')[0] || 'User'}</b></span>
                  </div>
                </li>

                <li className="nav-item ms-lg-3">
                  <button onClick={handleLogout} className="btn btn-outline-danger btn-sm rounded-pill px-3 mt-3 mt-lg-0">
                    <i className="bi bi-box-arrow-right me-1"></i> Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;