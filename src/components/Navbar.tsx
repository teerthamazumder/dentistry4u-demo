import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, Calendar,
  Home, Stethoscope, Shield, UserPlus, Phone, Lock,
} from 'lucide-react'
import { GlowButton } from './ui/GlowButton'

interface NavbarProps {
  onStaffLogin: () => void
}

/* Desktop nav links */
const desktopLinks = [
  { label: 'Services',     href: '#services' },
  { label: 'Coverage',     href: '#cdcp' },
  { label: 'New Patients', href: '#new-to-canada' },
  { label: 'Intake',       href: '#intake' },
  { label: 'Book',         href: '#booking' },
  { label: 'Contact',      href: '#contact' },
]

/* Mobile pill nav — icons + short labels (from menu.txt floating-nav pattern) */
const mobileItems = [
  { label: 'Home',     href: '#',              Icon: Home },
  { label: 'Services', href: '#services',      Icon: Stethoscope },
  { label: 'Coverage', href: '#cdcp',          Icon: Shield },
  { label: 'Patients', href: '#new-to-canada', Icon: UserPlus },
  { label: 'Contact',  href: '#contact',       Icon: Phone },
]

/* Pill height estimates used to stack mobile elements */
const PILL_H   = 66   // px — floating pill nav
const BOOK_H   = 56   // px — Book Appointment button (size lg)
const GAP      = 12   // px — spacing between elements
const BOTTOM   = 16   // px — distance from viewport bottom

const BOOK_BOTTOM  = BOTTOM + PILL_H + GAP                   // ~94 px
const STAFF_BOTTOM = BOOK_BOTTOM + BOOK_H + GAP              // ~162 px

export default function Navbar({ onStaffLogin }: NavbarProps) {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  /* ── Desktop: sliding pill indicator (menu.txt technique) ── */
  const [indicator,    setIndicator]    = useState({ width: 0, left: 0, opacity: 0 })
  const [hoveredLink,  setHoveredLink]  = useState<string | null>(null)
  const navRef        = useRef<HTMLDivElement>(null)
  const deskRefs      = useRef<Record<string, HTMLAnchorElement | null>>({})

  /* ── Mobile: sliding pill indicator (same getBoundingClientRect technique) ── */
  const [activeMobile,      setActiveMobile]      = useState('#')
  const [mobileIndicator,   setMobileIndicator]   = useState({ width: 0, left: 0 })
  const mobilePillRef  = useRef<HTMLDivElement>(null)
  const mobileRefs     = useRef<Record<string, HTMLAnchorElement | null>>({})

  /* Scroll detection */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  /* Desktop indicator: recompute on resize while hovering */
  useEffect(() => {
    if (!hoveredLink) return
    const fn = () => updateDesktopIndicator(hoveredLink)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [hoveredLink])

  /* Mobile indicator: recompute after menu opens (DOM settles) and on resize */
  useEffect(() => {
    if (!menuOpen) return
    const timer = setTimeout(() => updateMobileIndicator(activeMobile), 60)
    const fn = () => updateMobileIndicator(activeMobile)
    window.addEventListener('resize', fn)
    return () => { clearTimeout(timer); window.removeEventListener('resize', fn) }
  }, [menuOpen, activeMobile])

  /* ── Indicator helpers ── */
  function updateDesktopIndicator(href: string) {
    const el        = deskRefs.current[href]
    const container = navRef.current
    if (!el || !container) return
    const eR = el.getBoundingClientRect()
    const cR = container.getBoundingClientRect()
    setIndicator({ width: eR.width + 10, left: eR.left - cR.left - 5, opacity: 1 })
    setHoveredLink(href)
  }

  function clearDesktopIndicator() {
    setHoveredLink(null)
    setIndicator(s => ({ ...s, opacity: 0 }))
  }

  function updateMobileIndicator(href: string) {
    const el        = mobileRefs.current[href]
    const container = mobilePillRef.current
    if (!el || !container) return
    const eR = el.getBoundingClientRect()
    const cR = container.getBoundingClientRect()
    setMobileIndicator({ width: eR.width, left: eR.left - cR.left })
  }

  return (
    <>
      {/* ══ Top sticky glass navbar ══ */}
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(245, 239, 228, 0.88)'
            : 'rgba(245, 239, 228, 0.42)',
          backdropFilter: 'blur(22px)',
          WebkitBackdropFilter: 'blur(22px)',
          borderBottom: scrolled
            ? '1px solid rgba(8,21,74,0.10)'
            : '1px solid rgba(255,255,255,0.22)',
          boxShadow: scrolled
            ? '0 12px 38px rgba(16,43,106,0.12)'
            : 'none',
          paddingTop:    scrolled ? '12px' : '20px',
          paddingBottom: scrolled ? '12px' : '20px',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group shrink-0" aria-label="Dentistry4U home">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-btn group-hover:scale-105 transition-transform duration-200"
              style={{ background: 'linear-gradient(135deg, #223B86, #08154A)' }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                <path d="M12 3C9.8 3 8 4.8 7 7C6 4.8 4.2 3 2.5 5C1 7 2 9.5 3.5 11.5C4.5 13 5.5 14.8 6 17C6.5 19 6.5 21 7.5 22C8.5 23 9.5 22.5 10 21C10.5 19.5 11 18 12 18C13 18 13.5 19.5 14 21C14.5 22.5 15.5 23 16.5 22C17.5 21 17.5 19 18 17C18.5 14.8 19.5 13 20.5 11.5C22 9.5 23 7 21.5 5C19.8 3 18 4.8 17 7C16 4.8 14.2 3 12 3Z" />
              </svg>
            </div>
            <div>
              <div
                className="text-[17px] font-bold leading-none"
                style={{ fontFamily: "'Playfair Display', serif", color: '#102B6A' }}
              >
                Dentistry4U
              </div>
              <div className="text-[10px] font-medium leading-none mt-0.5" style={{ color: '#5A6A8A' }}>
                Dartmouth, Nova Scotia
              </div>
            </div>
          </a>

          {/* ── Desktop nav — with spring sliding indicator (menu.txt) ── */}
          <div
            ref={navRef}
            className="hidden md:flex items-center gap-0.5 relative"
            onMouseLeave={clearDesktopIndicator}
          >
            {/* Sliding background pill — spring spring spring */}
            <motion.div
              animate={{ width: indicator.width, left: indicator.left, opacity: indicator.opacity }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="absolute top-1 bottom-1 rounded-full pointer-events-none"
              style={{ background: 'rgba(34,59,134,0.09)' }}
              aria-hidden="true"
            />

            {desktopLinks.map(link => (
              <a
                key={link.href}
                ref={el => { deskRefs.current[link.href] = el }}
                href={link.href}
                className="relative z-10 text-[13px] font-medium px-3 py-2 rounded-full select-none transition-colors duration-150"
                style={{ color: '#102B6A' }}
                onMouseEnter={() => updateDesktopIndicator(link.href)}
              >
                {link.label}
              </a>
            ))}

            {/* Staff login */}
            <button
              onClick={onStaffLogin}
              className="relative z-10 ml-2 text-[11px] font-semibold px-4 py-2 rounded-full border transition-all duration-200"
              style={{ color: '#5A6A8A', borderColor: 'rgba(8,21,74,0.15)' }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLButtonElement).style.borderColor = '#223B86'
                ;(e.currentTarget as HTMLButtonElement).style.color = '#223B86'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(8,21,74,0.15)'
                ;(e.currentTarget as HTMLButtonElement).style.color = '#5A6A8A'
              }}
            >
              Staff Login
            </button>

            <div className="relative z-10 ml-1">
              <GlowButton href="#booking" size="sm">
                <Calendar size={14} />
                Book Now
              </GlowButton>
            </div>
          </div>

          {/* Mobile hamburger — animated icon swap */}
          <button
            className="md:hidden p-2.5 rounded-xl transition-all duration-200"
            style={{
              color: menuOpen ? '#223B86' : 'rgba(8,21,74,0.65)',
              background: menuOpen ? 'rgba(34,59,134,0.09)' : 'transparent',
            }}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen
                ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate: 90,   opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="block"
                  >
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="m"
                    initial={{ rotate: 90,  opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate: -90,  opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="block"
                  >
                    <Menu size={22} />
                  </motion.span>
                )
              }
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* ══ Mobile: floating bottom pill nav (menu.txt pattern) ══ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Dim backdrop — tap to close */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: 'rgba(8,21,74,0.28)', backdropFilter: 'blur(5px)', WebkitBackdropFilter: 'blur(5px)' }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Staff login button — stacked above Book Appointment */}
            <motion.div
              key="staff"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 380, damping: 32, delay: 0.04 }}
              className="fixed left-4 right-4 z-50 md:hidden"
              style={{ bottom: STAFF_BOTTOM }}
            >
              <button
                onClick={() => { setMenuOpen(false); onStaffLogin() }}
                className="w-full flex items-center justify-center gap-2 text-[12px] font-semibold py-3 rounded-full border transition-all duration-200"
                style={{
                  color: '#5A6A8A',
                  borderColor: 'rgba(8,21,74,0.15)',
                  background: 'rgba(248,247,242,0.96)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 24px rgba(8,21,74,0.12)',
                }}
              >
                <Lock size={13} />
                Staff Login
              </button>
            </motion.div>

            {/* Book Appointment — strong CTA above the pill */}
            <motion.div
              key="book"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30, delay: 0.08 }}
              className="fixed left-4 right-4 z-50 md:hidden"
              style={{ bottom: BOOK_BOTTOM }}
              onClick={() => setMenuOpen(false)}
            >
              <GlowButton href="#booking" fullWidth size="lg">
                <Calendar size={18} />
                Book Appointment
              </GlowButton>
            </motion.div>

            {/* Floating pill nav — spring entry, sliding indicator inside (menu.txt) */}
            <motion.div
              key="pill"
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0,   opacity: 1 }}
              exit={{ y: 120,    opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="fixed left-4 right-4 z-50 md:hidden"
              style={{ bottom: BOTTOM }}
            >
              <div
                ref={mobilePillRef}
                role="navigation"
                aria-label="Mobile navigation"
                className="relative flex items-center justify-between px-1 py-1.5"
                style={{
                  background: 'rgba(248, 247, 242, 0.97)',
                  backdropFilter: 'blur(28px)',
                  WebkitBackdropFilter: 'blur(28px)',
                  border: '1px solid rgba(255,255,255,0.65)',
                  boxShadow: '0 24px 60px rgba(8,21,74,0.22), 0 4px 16px rgba(8,21,74,0.10)',
                  borderRadius: '9999px',
                }}
              >
                {mobileItems.map(item => {
                  const isActive = activeMobile === item.href
                  return (
                    <a
                      key={item.href}
                      ref={el => { mobileRefs.current[item.href] = el }}
                      href={item.href}
                      className="relative z-10 flex flex-col items-center justify-center flex-1 px-2 py-2 transition-colors duration-150 select-none"
                      style={{ color: isActive ? '#223B86' : '#5A6A8A' }}
                      onClick={() => { setActiveMobile(item.href); setMenuOpen(false) }}
                      onTouchStart={() => updateMobileIndicator(item.href)}
                    >
                      <item.Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
                      <span className="text-[9.5px] font-semibold mt-[3px] tracking-wide">{item.label}</span>
                    </a>
                  )
                })}

                {/* Sliding active indicator — same spring as menu.txt */}
                <motion.div
                  animate={mobileIndicator}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className="absolute top-1 bottom-1 rounded-full pointer-events-none"
                  style={{ background: 'rgba(34,59,134,0.10)' }}
                  aria-hidden="true"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
