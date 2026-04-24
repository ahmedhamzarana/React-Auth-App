import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';

function Fetch() {
    const [users, setUsers] = useState([]);
    const [alertMessage, setAlertMessage] = useState("");
    const fetchUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/users/all`);
            setUsers(response.data);
        } catch (err) {
            console.error('Error fetching users:', err);
        }
    };

    const deleteUsers = async (userId) => {

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

    const navigate = useNavigate();
    return (
        <div className="container mt-5">
            {/* Success Alert */}
            {alertMessage && (
                <div className="alert alert-success alert-dismissible fade show shadow-sm" role="alert">
                    {alertMessage}
                    <button type="button" className="btn-close" onClick={() => setAlertMessage("")}></button>
                </div>
            )}

            <div className="row align-items-center mb-4">
                <div className="col">
                    <h2 className="fw-bold text-secondary">User Management</h2>
                    <p className="text-muted small">Manage your application users and their roles.</p>
                </div>
                <div className="col-auto">
                    <Link className="btn btn-primary shadow-sm" to="/create">
                        <i className="bi bi-plus-lg me-2"></i>Create New User
                    </Link>
                </div>
            </div>

            <div className="card shadow-sm border-0" style={{ borderRadius: '12px' }}>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr className="text-muted small text-uppercase">
                                    <th className="ps-4" scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Status</th>
                                    <th className="text-end pe-4" scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u) => (
                                    <tr key={u._id}>
                                        <td className="ps-4">
                                            <div className="fw-bold text-dark">{u.name}</div>
                                        </td>
                                        <td className="text-muted small">{u.email}</td>
                                        <td>
                                            <span className="badge rounded-pill bg-info text-dark">{u.role}</span>
                                        </td>
                                        <td>
                                            <span className="badge bg-success-subtle text-success border border-success-subtle">
                                                {u.status}
                                            </span>
                                        </td>
                                        <td className="text-end pe-4">
                                            <div className="btn-group">
                                                <button
                                                    onClick={() => {
                                                        navigate(`/edit/${u._id}`);
                                                    }}
                                                    className="btn btn-outline-primary btn-sm px-3"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => deleteUsers(u._id)}
                                                    className="btn btn-outline-danger btn-sm px-3"
                                                >
                                                    Delete
                                                </button>
                                            </div>
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

export default Fetch;