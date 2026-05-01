import React, { useState } from 'react';

function UserDashboard() {
  const [items, setItems] = useState([
    { id: 1, title: "Design Landing Page", status: "In Progress", date: "24 April" },
    { id: 2, title: "Fix Navbar Bug", status: "Completed", date: "22 April" },
    { id: 3, title: "Update Profile Bio", status: "Pending", date: "20 April" },
  ]);

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        
        <div className="row mb-5">
          <div className="col-lg-8">
            <h2 className="fw-bold">Hello, Zeeshan! 👋</h2>
            <p className="text-muted">Welcome back! Here is what's happening with your account today.</p>
          </div>
          <div className="col-lg-4 text-lg-end">
            <button className="btn btn-dark rounded-pill px-4 shadow-sm">
              + Create New Task
            </button>
          </div>
        </div>

        <div className="row g-4">
          {/* User Profile Card (Read) */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm text-center p-4 h-100">
              <div className="position-relative d-inline-block mx-auto mb-3">
                <img 
                  src="https://ui-avatars.com/api/?name=Zeeshan+Khan&background=0D6EFD&color=fff" 
                  className="rounded-circle shadow-sm" 
                  width="100" 
                  alt="profile" 
                />
                <button className="btn btn-primary btn-sm position-absolute bottom-0 end-0 rounded-circle border-white" style={{width: '32px', height: '32px'}}>
                  <small>📷</small>
                </button>
              </div>
              <h5 className="fw-bold mb-1">Zeeshan Khan</h5>
              <p className="text-muted small">Full Stack Developer</p>
              <hr className="my-3 opacity-25" />
              <button className="btn btn-outline-primary btn-sm rounded-pill w-100">Edit Profile</button>
            </div>
          </div>

          <div className="col-md-8">
            <div className="card border-0 shadow-sm overflow-hidden">
              <div className="card-header bg-white py-3 border-0">
                <h6 className="mb-0 fw-bold">My Personal Tasks</h6>
              </div>
              <div className="list-group list-group-flush">
                {items.map((item) => (
                  <div key={item.id} className="list-group-item list-group-item-action border-0 py-3 px-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <div className={`p-2 rounded-3 me-3 ${item.status === 'Completed' ? 'bg-success-subtle text-success' : 'bg-primary-subtle text-primary'}`}>
                          {item.status === 'Completed' ? '✓' : '📝'}
                        </div>
                        <div>
                          <h6 className="mb-0 fw-bold">{item.title}</h6>
                          <small className="text-muted">{item.date}</small>
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        <button className="btn btn-light btn-sm rounded-pill">Edit</button>
                        <button className="btn btn-outline-danger btn-sm rounded-pill">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="card-footer bg-white border-0 text-center py-3">
                <a href="#" className="text-decoration-none small fw-bold">View All Activity</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default UserDashboard;