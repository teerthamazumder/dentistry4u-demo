import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Calendar } from 'lucide-react'
import { GlowButton } from './ui/GlowButton'

interface NavbarProps {
  onStaffLogin: () => void
}

const links = [
  { label: 'Services',     href: '#services' },
  { label: 'Coverage',     href: '#cdcp' },
  { label: 'New Patients', href: '#new-to-canada' },
  { label: 'Intake',       href: '#intake' },
  { label: 'Book',         href: '#booking' },
  { label: 'Contact',      href: '#contact' },
]

export default function Navbar({ onStaffLogin }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-dark shadow-card py-3 border-b border-white/10'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group" aria-label="Dentistry4U home">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-btn group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                <path d="M12 3C9.8 3 8 4.8 7 7C6 4.8 4.2 3 2.5 5C1 7 2 9.5 3.5 11.5C4.5 13 5.5 14.8 6 17C6.5 19 6.5 21 7.5 22C8.5 23 9.5 22.5 10 21C10.5 19.5 11 18 12 18C13 18 13.5 19.5 14 21C14.5 22.5 15.5 23 16.5 22C17.5 21 17.5 19 18 17C18.5 14.8 19.5 13 20.5 11.5C22 9.5 23 7 21.5 5C19.8 3 18 4.8 17 7C16 4.8 14.2 3 12 3Z" />
              </svg>
            </div>
            <div>
              <div className="text-[17px] font-extrabold text-white leading-none">Dentistry4U</div>
              <div className="text-[10px] text-white/50 font-medium leading-none mt-0.5">Dartmouth, Nova Scotia</div>
            </div>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-6">
            {links.map(l => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-[13px] font-semibold text-white/65 hover:text-accent transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={onStaffLogin}
                className="text-[11px] font-semibold text-white/55 border border-white/15 px-4 py-2 rounded-full hover:border-accent hover:text-accent transition-all"
              >
                Staff Login
              </button>
            </li>
            <li>
              <GlowButton href="#booking" size="sm">
                <Calendar size={14} />
                Book Now
              </GlowButton>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-white/80 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[64px] left-0 right-0 z-40 glass-dark shadow-elevated border-b border-white/10"
          >
            <ul className="flex flex-col py-3">
              {links.map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="block px-6 py-3 text-[14px] font-semibold text-white/70 hover:bg-white/5 hover:text-accent transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="px-6 pt-3 pb-2" onClick={() => setMenuOpen(false)}>
                <GlowButton href="#booking" fullWidth>
                  <Calendar size={16} />
                  Book Appointment
                </GlowButton>
              </li>
              <li className="px-6 pb-3">
                <button
                  onClick={() => { setMenuOpen(false); onStaffLogin() }}
                  className="w-full text-[12px] font-semibold text-white/50 border border-white/15 px-4 py-2 rounded-full mt-2 hover:border-accent hover:text-accent transition-all"
                >
                  Staff Login
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
