import React from 'react'

function Login() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
            <div className="card shadow border-0" style={{ borderRadius: '15px' }}>
                <div className="card-body p-4">
                    <h3 className="fw-bold mb-4">Login</h3>
                    <form>
                        <div className="mb-3">
                            <label className="form-label small fw-bold">Email</label>
                            <input
                                type="email"
                                className="form-control bg-light border-0"
                                placeholder=""
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label small fw-bold">Password</label>
                            <input
                                type="password"
                                className="form-control bg-light border-0"
                                placeholder=""
                        />
                        </div>
                        <button className="btn btn-primary w-100">Login</button>
                    </form>
                </div>
                </div>
            </div>
            <div className="text-center mt-3">
                <span className="text-muted small">Don't have an account? </span>
                <a href="/register" className="text-decoration-none fw-bold">Register</a>
                </div>

                </div>
                </div>
  )
}

export default Login