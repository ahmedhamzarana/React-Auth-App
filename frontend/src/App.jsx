import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Edit from './Edit';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Navbar from './components/Navbar';
import ProtectedRoutes from './routes/ProtectedRoutes';
import Admin from './Admin';
import Index from './Index';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Index />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoutes>
              <Edit />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoutes role="admin">
              <Admin />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </>
  );
}

export default App;