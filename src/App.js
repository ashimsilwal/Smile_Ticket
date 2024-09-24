import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/HeroSection/Hero';
import Programs from './Components/Programs/Programs';
import Title from './Components/Title/Title';
import About from './Components/About/About';
import Testimonials from './Components/Testimonials/Testimonials';
import Contact from './Components/contact/Contact';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
// import Sidebar from './Components/AdminDashboard/Sidebar';
// import Header from './Components/AdminDashboard/Header';
import DashboardContent from './Components/AdminDashboard/DashboardContent/DashboardContent';
import AttendanceRecords from './Components/AdminDashboard/AttendanceRecords/AttendanceRecords';
import LiveAttendance from './Components/AdminDashboard/LiveAttendance/LiveAttendance';
import AttendanceDetails from './Components/AdminDashboard/AttendanceDetails/AttendanceDetails';
import TeacherDashboard from './Components/TeacherDashboard/TeacherDashboard';
// import TeacherSidebar from './Components/TeacherDashboard/TeacherSidebar';
import Scheduling from './Components/TeacherDashboard/Scheduling/Scheduling'; 
import Signup from './Components/sign-up/Signup';
import CustomerDashboardContent from './Components/TeacherDashboard/CustomerDashboardContent/CustomerDashboardContent';
import CustomerAttendanceRecords from './Components/TeacherDashboard/AttendanceRecords/CustomerAttendanceRecords';
import BuyTicket from './Components/TeacherDashboard/Ticket/buyticket';
import Ticket from './Components/AdminDashboard/Tickets/ticket';
import TicketDetails from './Components/AdminDashboard/Tickets/TicketDetails';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null); // 'admin' or 'teacher'

  const handleLogin = (type) => {
    setIsLoggedIn(true);
    setUserType(type);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <>
            <Navbar />
            <Hero />
            <div className='container'>
              <Title subTitle='OUR PACKAGES' title='What We Offer' />
              <Programs />
              <About />
              <Title subTitle='TESTIMONIALS' title='What Customers Says' />
              <Testimonials />
              <Title subTitle='CONTACT US' title='Get In Touch' />
              <Contact />
              <Footer />
            </div>
          </>
        } />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/sign-up" element={<Signup/>} />

        {/* Protected Routes based on user type */}
      
            <Route path="/customer" element={<AdminDashboard />}>
              <Route index element={<CustomerDashboardContent />} />
              <Route path="dashboard" element={<CustomerDashboardContent />} />
              <Route path="buyticket" element={<BuyTicket />} />
              <Route path="attendance" element={<CustomerAttendanceRecords />} />
              <Route path="live-attendance" element={<LiveAttendance />} />
              <Route
                path="attendance/:ticketNumber"
                element={<AttendanceDetails />}
              />
            </Route>
         
            <Route path="/admin" element={<TeacherDashboard />}> 
              <Route index element={<DashboardContent />} /> {/* Reuse MainDashboard */}
              <Route path="dashboard" element={<DashboardContent />} /> {/* Reuse MainDashboard */}
              <Route path="ticket" element={<Ticket />} />
              <Route path="ticket/:id" element={<TicketDetails />} />
              
            </Route>
         
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;