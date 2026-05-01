import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [alertMessage, setAlertMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    setErrors((prev) => ({
      ...prev,
      [name]: ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors({});
    setAlertMessage('');

    axios
      .post('http://localhost:5000/api/auth/login', formData)
 .then((res) => {
        const { token, user } = res.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('role', user?.role || 'user');

        window.dispatchEvent(new Event("storage"));

        navigate(user?.role === 'admin' ? '/admin' : '/', { replace: true });
      })
      .catch((error) => {
        const backendErrors = error.response?.data?.errors;

        if (backendErrors) {
          setErrors(backendErrors);
        } else {
          setAlertMessage('Something went wrong. Please try again later.');
        }
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">

          <div className="mb-3">
            <Link to="/" className="text-decoration-none text-muted small fw-bold">
              <i className="bi bi-arrow-left me-1"></i> Back to Home
            </Link>
          </div>

          <div className="card border-0 shadow-lg" style={{ borderRadius: '16px' }}>
            <div className="card-body p-5">

              <div className="text-center mb-4">
                <h3 className="fw-bold">Login</h3>
                <p className="text-muted small">
                  Enter your email and password to continue.
                </p>
              </div>

              <form onSubmit={handleSubmit}>

                {alertMessage && (
                  <div className="alert alert-danger">
                    {alertMessage}
                  </div>
                )}

                {/* EMAIL */}
                <div className="mb-3">
                  <label className="form-label fw-semibold small">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    className={`form-control bg-light border-0 py-2 ${errors.email ? 'is-invalid' : ''
                      }`}
                    placeholder="name@example.com"
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.email}</div>
                </div>

                {/* PASSWORD */}
                <div className="mb-3">
                  <label className="form-label fw-semibold small">Password</label>

                  <div className="position-relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      className={`form-control bg-light border-0 py-2 pe-5 ${errors.password ? 'is-invalid' : ''
                        }`}
                      placeholder="Enter your password"
                      onChange={handleChange}
                    />

                    {/* Eye Toggle */}
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="position-absolute top-50 end-0 translate-middle-y me-3"
                      style={{ cursor: 'pointer' }}
                    >
                      <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </span>

                    <div className="invalid-feedback">{errors.password}</div>
                  </div>
                </div>

                {/* SUBMIT */}
                <div className="d-grid mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg fw-bold"
                  >
                    Login
                  </button>
                </div>

              </form>
            </div>
          </div>

          <p className="text-center text-muted mt-4 small">
            Don’t have an account?{' '}
            <Link to="/register" className="text-primary">
              Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;