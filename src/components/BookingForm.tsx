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
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM',
]

const clinicInfo = [
  { icon: Phone,      label: '902-435-4848',          sub: 'Call or text' },
  { icon: Clock,      label: 'Mon–Thu: 8 AM – 6 PM',  sub: 'Fri: 8–5 PM • Sat: 9–3 PM' },
  { icon: MapPin,     label: 'Dartmouth, Nova Scotia', sub: 'Accessible parking available' },
  { icon: CreditCard, label: 'Direct Billing Available', sub: 'CDCP, Sun Life, Manulife & more' },
]

const labelClass = 'block text-[11px] font-bold text-sky-200/80 uppercase tracking-wider mb-2'

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
    <section id="booking" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-primary-600/6 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-cyan-600/5 blur-3xl pointer-events-none" />

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
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
          >
            Schedule Your Visit
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-sky-300/65 text-[15px]"
          >
            Same-day appointments often available. Evening &amp; weekend hours.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 items-start">
          {/* ── Left info column ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="space-y-4"
          >
            <div className="glass-dark rounded-3xl p-6 border border-white/10 border-gradient">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mb-4 shadow-btn">
                <Calendar size={20} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Book an Appointment</h3>
              <p className="text-[13px] text-sky-300/65 leading-relaxed">
                Fill out the form and we'll confirm your appointment within 1 business day.
              </p>
            </div>

            {clinicInfo.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="glass-dark rounded-2xl px-5 py-4 flex items-start gap-4 border border-white/10">
                  <div className="w-9 h-9 rounded-xl bg-primary-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={16} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-white">{item.label}</div>
                    <div className="text-[11px] text-sky-300/60 mt-0.5">{item.sub}</div>
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
                className="glass-dark rounded-3xl p-14 text-center border border-white/10 border-gradient"
              >
                <div className="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 size={36} className="text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Request Received!</h3>
                <p className="text-sky-300/70 text-[14px] mb-6 max-w-sm mx-auto leading-relaxed">
                  We'll confirm your appointment within 1 business day. A team member will call or email you shortly.
                </p>
                <p className="text-[13px] text-sky-300/60">
                  Questions? Call us:{' '}
                  <a href="tel:9024354848" className="text-accent font-bold hover:underline">902-435-4848</a>
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
                onSubmit={handleSubmit}
                className="glass-dark rounded-3xl p-8 border border-white/10 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>First Name *</label>
                    <input required type="text" placeholder="Jane" className="input-dark" />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name *</label>
                    <input required type="text" placeholder="Smith" className="input-dark" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Phone *</label>
                    <input required type="tel" placeholder="902-555-0100" className="input-dark" />
                  </div>
                  <div>
                    <label className={labelClass}>Email *</label>
                    <input required type="email" placeholder="jane@email.com" className="input-dark" />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Patient Type *</label>
                  <select required className="input-dark">
                    <option value="">Select...</option>
                    <option>New Patient</option>
                    <option>Returning Patient</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Service Needed *</label>
                    <select required className="input-dark">
                      <option value="">Select service...</option>
                      {serviceOptions.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Insurance / Coverage</label>
                    <select className="input-dark">
                      <option value="">Select...</option>
                      {insuranceOptions.map(i => <option key={i}>{i}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Preferred Date</label>
                    <input type="date" className="input-dark" />
                  </div>
                  <div>
                    <label className={labelClass}>Preferred Time</label>
                    <select className="input-dark">
                      <option value="">Any time</option>
                      {timeSlots.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Additional Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Any concerns, allergies, or information we should know..."
                    className="input-dark resize-none"
                  />
                </div>

                {/* Reminder toggles */}
                <div>
                  <label className={labelClass}>Appointment Reminders</label>
                  <div className="flex flex-wrap gap-2">
                    {['SMS', 'Email', 'Phone Call'].map(r => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => toggleReminder(r)}
                        className={`text-[12px] font-semibold px-4 py-2 rounded-full border transition-all duration-200 ${
                          reminders.includes(r)
                            ? 'bg-primary-600 text-white border-primary-600 shadow-btn'
                            : 'border-white/15 text-sky-300/70 hover:border-accent hover:text-accent'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <GlowButton type="submit" fullWidth size="lg">
                  Request Appointment
                </GlowButton>

                <p className="text-center text-[12px] text-sky-300/55 pt-1">
                  Prefer to call?{' '}
                  <a href="tel:9024354848" className="text-accent font-bold hover:underline">902-435-4848</a>
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
