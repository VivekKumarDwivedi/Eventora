import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import EventDetail from './pages/EventDetail.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import UserDashboard from './pages/UserDashBoard.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import PaymentSuccess from './pages/PaymentSuccess.jsx'
import PaymentFailed from './pages/PaymentFailed.jsx'

function App() {

  return (
     <BrowserRouter>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/events/:id" element={<EventDetail/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard" element={<UserDashboard/>} />
          <Route path="/admin" element={<AdminDashboard/>} />
          <Route path="/payment-success" element={<PaymentSuccess/>} />
          <Route path="/payment-failed" element={<PaymentFailed/>} />
          <Route path="*" element={<h1 className="text-3x1 font-bold text-center mt-20">404 - Page Not Found  😢</h1>} />
        </Routes>
      </div>
      
     </BrowserRouter>
  )
}

export default App
