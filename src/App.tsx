import { useState } from 'react'
import AnimatedPageBackground from './components/AnimatedPageBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import CDCPSection from './components/CDCPSection'
import NewToCanada from './components/NewToCanada'
import BookingForm from './components/BookingForm'
import PatientIntake from './components/PatientIntake'
import Insurance from './components/Insurance'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import StaffLoginModal from './components/StaffLoginModal'

function App() {
  const [staffModalOpen, setStaffModalOpen] = useState(false)

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950">
      {/* Fixed cinematic background — sits behind everything */}
      <AnimatedPageBackground />

      <Navbar onStaffLogin={() => setStaffModalOpen(true)} />

      {/* All page sections float above the animated background */}
      <main className="relative z-10">
        <Hero />
        <Services />
        <CDCPSection />
        <NewToCanada />
        <BookingForm />
        <PatientIntake />
        <Insurance />
        <Testimonials />
        <Footer onStaffLogin={() => setStaffModalOpen(true)} />
      </main>

      <StaffLoginModal isOpen={staffModalOpen} onClose={() => setStaffModalOpen(false)} />
    </div>
  )
}

export default App
