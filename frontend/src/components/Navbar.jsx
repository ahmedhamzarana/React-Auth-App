import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

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

    return () => {
      window.removeEventListener('storage', syncAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">

        <Link className="navbar-brand" to="/">MyApp</Link>

        <ul className="navbar-nav ms-auto align-items-center">

          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>

          {!token ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <span className="nav-link fw-bold text-success">
                  👤 {user?.name || user?.email}
                </span>
              </li>

              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-danger ms-2">
                  Logout
                </button>
              </li>
            </>
          )}

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;