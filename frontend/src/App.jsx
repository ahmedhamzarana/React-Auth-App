import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Fetch from './Fetch'
import Create from './Create'
import Edit from './Edit'
import Login from './Auth/Login'
import Register from './Auth/Register'

function App() {
  return (
       <Routes>
        <Route path="/" element={<Fetch />} />
        <Route path="/create" element={<Create />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit/>} />
      </Routes>
  )
}

export default App