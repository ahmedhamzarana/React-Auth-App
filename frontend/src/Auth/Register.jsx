
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [alertMessage, setAlertMessage] = useState('');
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    status: 'active'
  });

  const navigate = useNavigate();

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
      .post('http://localhost:5000/api/auth/register', formData)
      .then((response) => {
        console.log('User created successfully:', response.data);
        navigate('/');
      })
     .catch((error) => {
  const backendErrors = error.response?.data?.errors;

  if (backendErrors) {
    setErrors(backendErrors);
  } else {
    setAlertMessage('Something went wrong Please try again later.');
  }
});
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="mb-3">
            <Link to="/" className="text-decoration-none text-muted small fw-bold">
              <i className="bi bi-arrow-left me-1"></i> Back to Users List
            </Link>
          </div>

          <div className="card border-0 shadow-lg" style={{ borderRadius: '16px' }}>
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <h3 className="fw-bold">Create New User</h3>
                <p className="text-muted small">
                  Fill in the information to register a new account.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {alertMessage && (
                  <div className="alert alert-danger">
                    {alertMessage}
                  </div>
                )}

                {/* Name Field */}
                <div className="mb-3">
                  <label className="form-label fw-semibold small">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    className={`form-control bg-light border-0 py-2 ${
                      errors.name ? 'is-invalid' : ''
                    }`}
                    placeholder="e.g. Ali Ahmed"
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.name}</div>
                </div>

                {/* Email Field */}
                <div className="mb-3">
                  <label className="form-label fw-semibold small">Email Address</label>
                  <input
                    name="email"
                    value={formData.email}
                    className={`form-control bg-light border-0 py-2 ${
                      errors.email ? 'is-invalid' : ''
                    }`}
                    placeholder="name@example.com"
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.email}</div>
                </div>

                {/* Password Field */}
                <div className="mb-3">
                  <label className="form-label fw-semibold small">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    className={`form-control bg-light border-0 py-2 ${
                      errors.password ? 'is-invalid' : ''
                    }`}
                    placeholder="Enter a strong password"
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.password}</div>
                </div>

                {/* Submit Button */}
                <div className="d-grid mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg shadow-sm fw-bold"
                    style={{ borderRadius: '10px' }}
                  >
                    Create User
                  </button>
                </div>
              </form>
            </div>
          </div>

          <p className="text-center text-muted mt-4 small">
            Need help? <span className="text-primary">Contact Support</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
