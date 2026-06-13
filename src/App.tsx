import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import CDCPSection from './components/CDCPSection'
import NewToCanada from './components/NewToCanada'
import Insurance from './components/Insurance'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import StaffLoginModal from './components/StaffLoginModal'

function App() {
  const [staffModalOpen, setStaffModalOpen] = useState(false)

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#FDFAF6]">
      <Navbar onStaffLogin={() => setStaffModalOpen(true)} />

      <main>
        <Hero />
        <Services />
        <CDCPSection />
        <NewToCanada />
        <Insurance />
        <Testimonials />
        <Footer onStaffLogin={() => setStaffModalOpen(true)} />
      </main>

      <StaffLoginModal isOpen={staffModalOpen} onClose={() => setStaffModalOpen(false)} />
    </div>
  )
}

export default App
