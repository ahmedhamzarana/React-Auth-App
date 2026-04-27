import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    status: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/get/${id}`)

      .then(res => setFormData(res.data))
      .catch(err => console.error(err));
  }, [id]);

const handleSubmit = (e) => {
  e.preventDefault();

  axios
    .put(`http://localhost:5000/api/users/update/${id}`, formData)
    .then(() => {
      setAlertMessage("User edited successfully!");

      // alert hide after 3 sec
      setTimeout(() => {
        setAlertMessage("");
        navigate('/admin'); // navigate AFTER alert starts clearing
      }, 3000);
    })
    .catch(err => console.error(err));
};

  return (
    <div className="container mt-5">
       {alertMessage && (
                <div className="alert alert-success alert-dismissible fade show shadow-sm" role="alert">
                    {alertMessage}
                    <button type="button" className="btn-close" onClick={() => setAlertMessage("")}></button>
                </div>
            )}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow border-0" style={{ borderRadius: '15px' }}>
            <div className="card-body p-4">
              <h3 className="fw-bold mb-4">Edit User</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Full Name</label>
                  <input 
                    type="text" 
                    className="form-control bg-light border-0" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Email</label>
                  <input 
                    type="email" 
                    className="form-control bg-light border-0" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="row">
                  {/* Role Selection */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold small">Role</label>
                    <select 
                    value={formData.role}
                      name="role" 
                      className="form-select bg-light border-0 py-2" 
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    >
                        <option value="select role" selected disabled>Select</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>

                  {/* Status Selection */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold small">Status</label>
                    <select 
                      name="status" 
                      value={formData.status}
                      className="form-select bg-light border-0 py-2" 
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                    >
                        <option value="select status" selected disabled>Select Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                {/* Add Role/Status dropdowns here similar to your Create UI */}
                <div className="d-flex gap-2 mt-4">
                  <button type="submit" className="btn btn-primary flex-grow-1">Save Changes</button>
                  <Link to="/" className="btn btn-light border">Cancel</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUser;