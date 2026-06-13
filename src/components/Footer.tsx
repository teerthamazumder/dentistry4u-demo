import { Phone, Mail, MapPin, Clock, ExternalLink, Calendar } from 'lucide-react'
import { GlowButton } from './ui/GlowButton'

interface FooterProps {
  onStaffLogin: () => void
}

const hours = [
  { day: 'Mon – Thu',  time: '9:00 AM – 7:00 PM' },
  { day: 'Friday',     time: 'Closed' },
  { day: 'Sat – Sun',  time: '9:00 AM – 5:00 PM' },
]

const quickLinks = [
  { label: 'Services',         href: '#services' },
  { label: 'CDCP Coverage',    href: '#cdcp' },
  { label: 'New Patients',     href: '#new-to-canada' },
  { label: 'Patient Intake',   href: '#intake' },
  { label: 'Book Appointment', href: '#booking' },
  { label: 'Contact',          href: '#contact' },
]

export default function Footer({ onStaffLogin }: FooterProps) {
  return (
    <footer id="contact" className="relative overflow-hidden" style={{ background: '#08154A' }}>
      <div className="absolute top-0 right-0 w-[400px] h-[300px] rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(34,59,134,0.25)' }} />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-[80px] pointer-events-none" style={{ background: 'rgba(217,162,58,0.06)' }} />
      <div className="absolute inset-0 dot-grid opacity-[0.04] pointer-events-none" />

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{ background: 'linear-gradient(to right, transparent, rgba(217,162,58,0.35), transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-btn shrink-0" style={{ background: 'linear-gradient(135deg, #223B86, #08154A)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M12 3C9.8 3 8 4.8 7 7C6 4.8 4.2 3 2.5 5C1 7 2 9.5 3.5 11.5C4.5 13 5.5 14.8 6 17C6.5 19 6.5 21 7.5 22C8.5 23 9.5 22.5 10 21C10.5 19.5 11 18 12 18C13 18 13.5 19.5 14 21C14.5 22.5 15.5 23 16.5 22C17.5 21 17.5 19 18 17C18.5 14.8 19.5 13 20.5 11.5C22 9.5 23 7 21.5 5C19.8 3 18 4.8 17 7C16 4.8 14.2 3 12 3Z" />
                </svg>
              </div>
              <div>
                <div className="text-lg text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}>Dentistry4U</div>
                <div className="text-[11px] font-medium" style={{ color: 'rgba(217,162,58,0.70)' }}>Dartmouth, Nova Scotia</div>
              </div>
            </div>
            <p className="text-[13px] leading-relaxed mb-5 text-panel-muted">
              Your trusted dental home in Dartmouth, Nova Scotia. Welcoming new patients, newcomers to Canada, and families of all backgrounds.
            </p>

            {/* Emergency box */}
            <div className="rounded-xl p-4 mb-5" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
              <div className="text-[11px] mb-1" style={{ color: 'rgba(255,255,255,0.50)' }}>Emergency / Same-Day</div>
              <a href="tel:9024354848" className="text-white text-xl font-bold hover:opacity-80 transition-opacity" style={{ fontFamily: "'Playfair Display', serif" }}>
                902-435-4848
              </a>
            </div>

            <GlowButton href="#booking" size="sm">
              <Calendar size={14} />
              Book Appointment
            </GlowButton>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest mb-5" style={{ color: 'rgba(255,255,255,0.40)', fontFamily: "'DM Sans', sans-serif" }}>Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:9024354848" className="flex items-start gap-3 group">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors" style={{ background: 'rgba(217,162,58,0.15)' }}>
                    <Phone size={13} style={{ color: '#D9A23A' }} />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-panel-body group-hover:text-white transition-colors">902-435-4848</div>
                    <div className="text-[11px] text-panel-muted">Call or text</div>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:info@dentistry4u.life" className="flex items-start gap-3 group">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors" style={{ background: 'rgba(217,162,58,0.15)' }}>
                    <Mail size={13} style={{ color: '#D9A23A' }} />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-panel-body group-hover:text-white transition-colors">info@dentistry4u.life</div>
                    <div className="text-[11px] text-panel-muted">General enquiries</div>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'rgba(217,162,58,0.15)' }}>
                    <MapPin size={13} style={{ color: '#D9A23A' }} />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-panel-body">133 Baker Drive, Suite 106</div>
                    <div className="text-[11px] text-panel-muted">Dartmouth, Nova Scotia B3W 0M6</div>
                    <a
                      href="https://www.google.com/maps/search/133+Baker+Drive+Dartmouth+Nova+Scotia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] flex items-center gap-0.5 mt-0.5 transition-colors hover:opacity-80"
                      style={{ color: '#D9A23A' }}
                    >
                      Get Directions <ExternalLink size={9} />
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest mb-5" style={{ color: 'rgba(255,255,255,0.40)', fontFamily: "'DM Sans', sans-serif" }}>
              <span className="flex items-center gap-2"><Clock size={13} />Hours</span>
            </h4>
            <ul className="space-y-2.5">
              {hours.map(h => (
                <li key={h.day} className="flex justify-between items-start gap-3">
                  <span className="text-[12px] text-panel-muted leading-tight">{h.day}</span>
                  <span className={`text-[12px] whitespace-nowrap font-medium leading-tight ${h.time === 'Closed' ? 'text-white/25' : 'text-white/75'}`}>{h.time}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-[11px] rounded-xl px-3 py-2" style={{ color: 'rgba(255,255,255,0.30)', background: 'rgba(255,255,255,0.04)' }}>
              Hours may vary on holidays. Call ahead to confirm.
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest mb-5" style={{ color: 'rgba(255,255,255,0.40)', fontFamily: "'DM Sans', sans-serif" }}>Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(l => (
                <li key={l.href}>
                  <a href={l.href} className="text-[13px] text-panel-muted hover:text-white transition-colors font-medium">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-6" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.10), transparent)' }} />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="text-[11px] text-center sm:text-left" style={{ color: 'rgba(255,255,255,0.25)' }}>
            © {new Date().getFullYear()} Dentistry4U. All rights reserved. 133 Baker Drive Suite 106, Dartmouth NS.
          </span>
          <div className="flex items-center gap-4">
            <a href="#" className="text-[11px] transition-colors hover:opacity-60" style={{ color: 'rgba(255,255,255,0.25)' }}>Privacy Policy</a>
            <button
              onClick={onStaffLogin}
              className="text-[11px] transition-colors hover:opacity-60"
              style={{ color: 'rgba(255,255,255,0.25)' }}
            >
              Staff Login
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
