import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [alertMessage, setAlertMessage] = useState('');
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

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
      .post('http://localhost:5000/users/register', formData)
      .then((response) => {
        console.log('User created successfully:', response.data);
        navigate('/');
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
        <div className="col-md-6">

          <div className="card shadow border-0" style={{ borderRadius: '15px' }}>
            <div className="card-body p-4">

              <h3 className="fw-bold mb-4">Register</h3>

              {alertMessage && (
                <div className="alert alert-danger">
                  {alertMessage}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                {/* Name */}
                <div className="mb-3">
                  <label className="form-label small fw-bold">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    className={`form-control bg-light border-0 ${errors.name ? 'is-invalid' : ''}`}
                    placeholder="e.g. Ali Ahmed"
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.name}</div>
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label small fw-bold">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    className={`form-control bg-light border-0 ${errors.email ? 'is-invalid' : ''}`}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.email}</div>
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label small fw-bold">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    className={`form-control bg-light border-0 ${errors.password ? 'is-invalid' : ''}`}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.password}</div>
                </div>

                {/* Confirm Password */}
                <div className="mb-3">
                  <label className="form-label small fw-bold">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    className={`form-control bg-light border-0 ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.confirmPassword}</div>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Register
                </button>

              </form>

              <div className="text-center mt-3">
                <span className="text-muted small">Already have an account? </span>
                <Link to="/login" className="text-decoration-none fw-bold">
                  Login
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;