import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Admin() {
    const [users, setUsers] = useState([]);
    const [alertMessage, setAlertMessage] = useState("");
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/users/all`);
            setUsers(response.data);
        } catch (err) {
            console.error('Error fetching users:', err);
        }
    };

    const deleteUsers = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/users/delete/${userId}`);
            setAlertMessage("User deleted successfully!");
            setUsers(users.filter(u => u._id !== userId));
            setTimeout(() => setAlertMessage(""), 3000);
        } catch (err) {
            console.error('Error deleting user:', err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="bg-light min-vh-100 py-5">
            <div className="container">
                
                {/* Alert Notification */}
                {alertMessage && (
                    <div className="alert alert-success border-0 shadow-sm alert-dismissible fade show mb-4" role="alert">
                        <i className="bi bi-check-circle-fill me-2"></i> {alertMessage}
                        <button type="button" className="btn-close" onClick={() => setAlertMessage("")}></button>
                    </div>
                )}

                {/* Header Section */}
                <div className="row align-items-center mb-4">
                    <div className="col">
                        <h3 className="fw-bold text-dark mb-1">User Management</h3>
                        <p className="text-muted mb-0">Overview of all registered accounts and roles.</p>
                    </div>
                    <div className="col-auto">
                        <Link className="btn btn-primary rounded-pill px-4 shadow-sm" to="/register">
                            <span className="me-1">+</span> Create User
                        </Link>
                    </div>
                </div>

                {/* Stats Summary (Extra Aesthetic touch) */}
                <div className="row mb-4 g-3">
                    <div className="col-md-3">
                        <div className="card border-0 shadow-sm p-3">
                            <small className="text-muted fw-bold text-uppercase">Total Users</small>
                            <h4 className="fw-bold mb-0">{users.length}</h4>
                        </div>
                    </div>
                </div>

                {/* Table Card */}
                <div className="card border-0 shadow-sm border-radius-lg overflow-hidden" style={{ borderRadius: '15px' }}>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-white border-bottom">
                                <tr>
                                    <th className="ps-4 py-3 text-muted small fw-bold text-uppercase">User Info</th>
                                    <th className="py-3 text-muted small fw-bold text-uppercase">Role</th>
                                    <th className="py-3 text-muted small fw-bold text-uppercase">Status</th>
                                    <th className="py-3 text-muted small fw-bold text-uppercase text-end pe-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {users.map((u) => (
                                    <tr key={u._id}>
                                        <td className="ps-4 py-3">
                                            <div className="d-flex align-items-center">
                                                <div className="avatar me-3 bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '42px', height: '42px' }}>
                                                    {u.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="fw-bold text-dark mb-0">{u.name}</div>
                                                    <div className="text-muted small">{u.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge rounded-pill bg-light text-dark border px-3">
                                                {u.role}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge rounded-pill px-3 ${u.status === 'active' ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'}`}>
                                                ● {u.status || 'Active'}
                                            </span>
                                        </td>
                                        <td className="text-end pe-4">
                                            <button 
                                                onClick={() => navigate(`/edit/${u._id}`)}
                                                className="btn btn-sm btn-outline-primary border-0 me-2 rounded-circle"
                                                title="Edit"
                                            >
                                                ✏️
                                            </button>
                                            <button 
                                                onClick={() => deleteUsers(u._id)}
                                                className="btn btn-sm btn-outline-danger border-0 rounded-circle"
                                                title="Delete"
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;