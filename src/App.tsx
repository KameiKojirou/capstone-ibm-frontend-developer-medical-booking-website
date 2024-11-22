import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home }from './pages/Home'
import { About } from './pages/About'
import { NavBar } from './components/NavBar'
import { Login } from './pages/Login'
import { Logout } from './pages/Logout'
import { Register } from './pages/Register'
import { ToastContainer } from './components/ToastContainer'
import { Toasts } from './components/Toasts'
import { Services } from './pages/Services'
import { Consultation } from './pages/services/Consultation'
import { Appointment } from './pages/services/Appointment'
import { SelfCheckup } from './pages/services/SelfCheckup'
import { Guidance } from './pages/services/Guidance'
import { Blog } from './pages/Blog'
import { Reviews } from './pages/Reviews'
import { ToastTest } from './pages/ToastTest'
import { YourProfile } from './pages/account/YourProfile'
import { YourReports } from './pages/account/YourReports'
import { AppointmentNotificationsContainer } from './components/AppointmentNotificationsContainer'
import { AppointmentNotifications } from './components/AppointmentNotifactions'

function App() {

  return (
    <>
      <BrowserRouter basename='/capstone-ibm-frontend-developer-medical-booking-website'>
        <NavBar />
        <div className="flex flex-col gap-2 justify-center text-center">
          <main className="flex flex-col gap-2 w-full max-w-7xl mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/register" element={<Register />} />
              <Route path="/services" element={<Services />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/toasttest" element={<ToastTest />} />
              <Route path="/services/consultation" element={<Consultation />} />
              <Route path="/services/appointment" element={<Appointment />} />
              <Route path="/services/selfcheckup" element={<SelfCheckup />} />
              <Route path="/services/guidance" element={<Guidance />} />
              <Route path="/profile" element={<YourProfile />} />
              <Route path="/reports" element={<YourReports />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <AppointmentNotificationsContainer>
            <AppointmentNotifications />
          </AppointmentNotificationsContainer>
          <ToastContainer>
            <Toasts />
          </ToastContainer>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
