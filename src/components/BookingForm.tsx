import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Calendar, CheckCircle2, Phone, Clock, MapPin, CreditCard } from 'lucide-react'
import { GlowButton } from './ui/GlowButton'

const serviceOptions = [
  'Preventative Care / Cleaning',
  'Restorative (Fillings, Crowns)',
  'Cosmetic Dentistry',
  'Sedation Dentistry',
  'Root Canal / Endodontics',
  'Dentures / Extractions',
  'Gum Care / Periodontics',
  'Orthodontics / Aligners',
  'Emergency Dental Care',
  'New Patient Exam',
]

const insuranceOptions = [
  'CDCP (Canadian Dental Care Plan)',
  'Sun Life',
  'Manulife',
  'Blue Cross',
  'Canada Life',
  'Green Shield',
  'Desjardins',
  'No Insurance',
  'Other',
]

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM',
]

const clinicInfo = [
  { icon: Phone,      label: '902-435-4848',            sub: 'Call or text' },
  { icon: Clock,      label: 'Mon–Thu: 9 AM – 7 PM',    sub: 'Fri: Closed • Sat–Sun: 9 AM–5 PM' },
  { icon: MapPin,     label: 'Dartmouth, Nova Scotia',   sub: 'Accessible parking available' },
  { icon: CreditCard, label: 'Direct Billing Available', sub: 'CDCP, Sun Life, Manulife & more' },
]

const labelClass = 'block text-[11px] font-bold uppercase tracking-wider mb-2'
const labelStyle = { color: 'rgba(8,21,74,0.60)' }

const glassCard: React.CSSProperties = {
  background: 'rgba(248,244,234,0.88)',
  backdropFilter: 'blur(20px) saturate(180%)',
  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid rgba(8,21,74,0.10)',
  boxShadow: '0 18px 45px rgba(8,21,74,0.08), inset 0 1px 0 rgba(255,255,255,0.90)',
}

const sectionBg: React.CSSProperties = {
  background: 'linear-gradient(135deg, #EDD49A 0%, #E7E1D6 42%, #C8CFEA 100%)',
}

export default function BookingForm() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [submitted, setSubmitted] = useState(false)
  const [reminders, setReminders] = useState<string[]>([])

  const toggleReminder = (r: string) =>
    setReminders(p => p.includes(r) ? p.filter(x => x !== r) : [...p, r])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="booking" className="relative py-28 px-6 overflow-hidden" style={sectionBg}>
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(34,59,134,0.06)' }} />
      <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(217,162,58,0.08)' }} />
      <div className="absolute inset-0 dot-grid opacity-[0.030] pointer-events-none" />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="section-eyebrow justify-center mb-5"
          >
            <Calendar size={12} />
            Book an Appointment
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl font-extrabold mb-4"
            style={{ color: '#08154A' }}
          >
            Schedule Your Visit
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-[15px]"
            style={{ color: '#5A6A8A' }}
          >
            Same-day appointments often available. Open Mon–Thu 9 AM–7 PM · Sat–Sun 9 AM–5 PM · Closed Friday.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 items-start">
          {/* ── Left info column ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="space-y-4"
          >
            <div className="rounded-3xl p-6" style={glassCard}>
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-btn"
                style={{ background: 'linear-gradient(135deg, #223B86, #08154A)' }}
              >
                <Calendar size={20} className="text-white" />
              </div>
              <h3 className="text-lg font-bold mb-1" style={{ color: '#08154A' }}>Book an Appointment</h3>
              <p className="text-[13px] leading-relaxed" style={{ color: '#5A6A8A' }}>
                Fill out the form and we'll confirm your appointment within 1 business day.
              </p>
            </div>

            {clinicInfo.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="rounded-2xl px-5 py-4 flex items-start gap-4" style={glassCard}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'rgba(34,59,134,0.10)' }}>
                    <Icon size={16} style={{ color: '#223B86' }} />
                  </div>
                  <div>
                    <div className="text-[13px] font-bold" style={{ color: '#08154A' }}>{item.label}</div>
                    <div className="text-[11px] mt-0.5" style={{ color: '#5A6A8A' }}>{item.sub}</div>
                  </div>
                </div>
              )
            })}
          </motion.div>

          {/* ── Right form ── */}
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-3xl p-14 text-center"
                style={glassCard}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(34,59,134,0.10)' }}>
                  <CheckCircle2 size={36} style={{ color: '#223B86' }} />
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#08154A' }}>Request Received!</h3>
                <p className="text-[14px] mb-6 max-w-sm mx-auto leading-relaxed" style={{ color: '#5A6A8A' }}>
                  We'll confirm your appointment within 1 business day. A team member will call or email you shortly.
                </p>
                <p className="text-[13px]" style={{ color: '#5A6A8A' }}>
                  Questions? Call us:{' '}
                  <a href="tel:9024354848" className="font-bold hover:underline" style={{ color: '#223B86' }}>902-435-4848</a>
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
                onSubmit={handleSubmit}
                className="rounded-3xl p-8 space-y-5"
                style={glassCard}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass} style={labelStyle}>First Name *</label>
                    <input required type="text" placeholder="Jane" className="input-premium" />
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>Last Name *</label>
                    <input required type="text" placeholder="Smith" className="input-premium" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass} style={labelStyle}>Phone *</label>
                    <input required type="tel" placeholder="902-555-0100" className="input-premium" />
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>Email *</label>
                    <input required type="email" placeholder="jane@email.com" className="input-premium" />
                  </div>
                </div>

                <div>
                  <label className={labelClass} style={labelStyle}>Patient Type *</label>
                  <select required className="input-premium">
                    <option value="">Select...</option>
                    <option>New Patient</option>
                    <option>Returning Patient</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass} style={labelStyle}>Service Needed *</label>
                    <select required className="input-premium">
                      <option value="">Select service...</option>
                      {serviceOptions.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>Insurance / Coverage</label>
                    <select className="input-premium">
                      <option value="">Select...</option>
                      {insuranceOptions.map(i => <option key={i}>{i}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass} style={labelStyle}>Preferred Date</label>
                    <input type="date" className="input-premium" />
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>Preferred Time</label>
                    <select className="input-premium">
                      <option value="">Any time</option>
                      {timeSlots.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass} style={labelStyle}>Additional Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Any concerns, allergies, or information we should know..."
                    className="input-premium resize-none"
                  />
                </div>

                {/* Reminder toggles */}
                <div>
                  <label className={labelClass} style={labelStyle}>Appointment Reminders</label>
                  <div className="flex flex-wrap gap-2">
                    {['SMS', 'Email', 'Phone Call'].map(r => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => toggleReminder(r)}
                        className="text-[12px] font-semibold px-4 py-2 rounded-full border transition-all duration-200"
                        style={reminders.includes(r)
                          ? { background: '#223B86', color: '#fff', borderColor: '#223B86', boxShadow: '0 4px 20px rgba(34,59,134,0.35)' }
                          : { background: 'rgba(248,247,242,0.60)', color: '#5A6A8A', borderColor: 'rgba(8,21,74,0.15)' }
                        }
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <GlowButton type="submit" fullWidth size="lg">
                  Request Appointment
                </GlowButton>

                <p className="text-center text-[12px] pt-1" style={{ color: '#5A6A8A' }}>
                  Prefer to call?{' '}
                  <a href="tel:9024354848" className="font-bold hover:underline" style={{ color: '#223B86' }}>902-435-4848</a>
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
