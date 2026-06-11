import { Phone, Mail, MapPin, Clock, ExternalLink, Calendar } from 'lucide-react'
import { GlowButton } from './ui/GlowButton'

interface FooterProps {
  onStaffLogin: () => void
}

const hours = [
  { day: 'Monday – Thursday', time: '8:00 AM – 6:00 PM' },
  { day: 'Friday', time: '8:00 AM – 5:00 PM' },
  { day: 'Saturday', time: '9:00 AM – 3:00 PM' },
  { day: 'Sunday', time: 'Closed' },
]

const quickLinks = [
  { label: 'Services', href: '#services' },
  { label: 'CDCP Coverage', href: '#cdcp' },
  { label: 'New Patients', href: '#new-to-canada' },
  { label: 'Patient Intake', href: '#intake' },
  { label: 'Book Appointment', href: '#booking' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer({ onStaffLogin }: FooterProps) {
  return (
    <footer id="contact" className="relative overflow-hidden">
      {/* Dark overlay so footer feels grounded — animated background shows through subtly */}
      <div className="absolute inset-0 bg-slate-950/80" />
      <div className="absolute top-0 right-0 w-[500px] h-[300px] rounded-full bg-primary-700/8 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[200px] rounded-full bg-cyan-700/6 blur-[80px] pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-[0.04] pointer-events-none" />

      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-btn shrink-0">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M12 3C9.8 3 8 4.8 7 7C6 4.8 4.2 3 2.5 5C1 7 2 9.5 3.5 11.5C4.5 13 5.5 14.8 6 17C6.5 19 6.5 21 7.5 22C8.5 23 9.5 22.5 10 21C10.5 19.5 11 18 12 18C13 18 13.5 19.5 14 21C14.5 22.5 15.5 23 16.5 22C17.5 21 17.5 19 18 17C18.5 14.8 19.5 13 20.5 11.5C22 9.5 23 7 21.5 5C19.8 3 18 4.8 17 7C16 4.8 14.2 3 12 3Z" />
                </svg>
              </div>
              <div>
                <div className="text-lg font-extrabold text-white leading-tight">Dentistry4U</div>
                <div className="text-[11px] text-sky-400/70 font-medium">Dartmouth, Nova Scotia</div>
              </div>
            </div>
            <p className="text-sky-300/60 text-[13px] leading-relaxed mb-6">
              Premium dental care for every smile in Dartmouth. Family-friendly, CDCP accepted, and always welcoming.
            </p>
            <GlowButton href="#booking" size="sm">
              <Calendar size={14} />
              Book Appointment
            </GlowButton>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-bold text-white/50 uppercase tracking-widest mb-5">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:9024354848" className="flex items-start gap-3 group">
                  <div className="w-7 h-7 rounded-lg bg-primary-800/60 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary-700/60 transition-colors">
                    <Phone size={13} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-sky-200 group-hover:text-white transition-colors">902-435-4848</div>
                    <div className="text-[11px] text-sky-400/50">Call or text</div>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:info@dentistry4u.ca" className="flex items-start gap-3 group">
                  <div className="w-7 h-7 rounded-lg bg-primary-800/60 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary-700/60 transition-colors">
                    <Mail size={13} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-sky-200 group-hover:text-white transition-colors">info@dentistry4u.ca</div>
                    <div className="text-[11px] text-sky-400/50">General enquiries</div>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-primary-800/60 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={13} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-sky-200">Dartmouth, Nova Scotia</div>
                    <a
                      href="https://www.google.com/maps/search/Dentistry4U+Dartmouth+Nova+Scotia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-primary-400 hover:text-accent flex items-center gap-0.5 mt-0.5 transition-colors"
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
            <h4 className="text-[11px] font-bold text-white/50 uppercase tracking-widest mb-5">
              <span className="flex items-center gap-2"><Clock size={13} />Hours</span>
            </h4>
            <ul className="space-y-3">
              {hours.map(h => (
                <li key={h.day} className="flex justify-between items-start gap-3">
                  <span className="text-[12px] text-sky-300/55 leading-tight">{h.day}</span>
                  <span className={`text-[12px] whitespace-nowrap font-semibold leading-tight ${h.time === 'Closed' ? 'text-white/25' : 'text-sky-100/80'}`}>{h.time}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 bg-primary-900/40 border border-primary-700/30 rounded-xl px-4 py-3">
              <div className="text-[11px] text-sky-400/70 font-semibold">Emergency?</div>
              <a href="tel:9024354848" className="text-white font-bold text-[15px] hover:text-accent transition-colors">902-435-4848</a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-[11px] font-bold text-white/50 uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(l => (
                <li key={l.href}>
                  <a href={l.href} className="text-[13px] text-sky-300/60 hover:text-white transition-colors font-medium">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="text-[11px] text-white/30 text-center sm:text-left">
            © {new Date().getFullYear()} Dentistry4U. All rights reserved. Dartmouth, Nova Scotia, Canada.
          </span>
          <button
            onClick={onStaffLogin}
            className="text-[11px] text-white/25 hover:text-white/60 transition-colors"
          >
            Staff Login
          </button>
        </div>
      </div>
    </footer>
  )
}
