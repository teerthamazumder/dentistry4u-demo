import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { User, Heart, Smile, Shield, CheckCircle2, ChevronLeft } from 'lucide-react'
import { GlowButton } from './ui/GlowButton'

const STEPS = [
  { label: 'Personal Info',   icon: User },
  { label: 'Medical History', icon: Heart },
  { label: 'Dental Concerns', icon: Smile },
  { label: 'Insurance',       icon: Shield },
  { label: 'Review & Submit', icon: CheckCircle2 },
]

function StepBar({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-between mb-10 relative">
      <div className="absolute top-4 left-0 right-0 h-0.5 -z-10" style={{ background: 'rgba(8,21,74,0.10)' }} />
      <motion.div
        className="absolute top-4 left-0 h-0.5 -z-10"
        style={{ background: 'linear-gradient(to right, #223B86, #D9A23A)' }}
        animate={{ width: `${(current / (STEPS.length - 1)) * 100}%` }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      />
      {STEPS.map((s, i) => {
        const Icon = s.icon
        const done = i < current
        const active = i === current
        return (
          <div key={s.label} className="flex flex-col items-center gap-2 z-10">
            <motion.div
              animate={{
                backgroundColor: done || active ? '#223B86' : 'rgba(248,247,242,0.90)',
                borderColor: done || active ? '#223B86' : 'rgba(8,21,74,0.15)',
              }}
              transition={{ duration: 0.25 }}
              className="w-9 h-9 rounded-full border-2 flex items-center justify-center shadow-card-sm"
            >
              <Icon size={15} className={done || active ? 'text-white' : ''} style={done || active ? {} : { color: '#5A6A8A' }} />
            </motion.div>
            <span
              className="text-[10px] font-semibold hidden sm:block whitespace-nowrap"
              style={{ color: active ? '#223B86' : done ? 'rgba(34,59,134,0.65)' : 'rgba(8,21,74,0.35)' }}
            >
              {s.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

const labelClass = 'block text-[11px] font-bold uppercase tracking-wider mb-2'
const labelStyle = { color: 'rgba(8,21,74,0.60)' }

const glassCard: React.CSSProperties = {
  background: 'rgba(255,252,245,0.68)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(47,125,92,0.18)',
  boxShadow: '0 24px 80px rgba(16,43,106,0.12), 0 0 80px rgba(255,220,150,0.12), inset 0 1px 0 rgba(255,255,255,0.42)',
}

const sectionBg: React.CSSProperties = {
  background: 'linear-gradient(145deg, #E7E1D6 0%, #EDD49A 48%, #E7E1D6 100%)',
}

function Step1() {
  return (
    <div>
      <h3 className="text-lg font-bold mb-6" style={{ color: '#08154A' }}>Personal Information</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {['First Name', 'Last Name'].map(l => (
          <div key={l}><label className={labelClass} style={labelStyle}>{l} *</label><input type="text" className="input-premium" /></div>
        ))}
        <div><label className={labelClass} style={labelStyle}>Date of Birth *</label><input type="date" className="input-premium" /></div>
        <div><label className={labelClass} style={labelStyle}>Phone *</label><input type="tel" placeholder="902-555-0100" className="input-premium" /></div>
        <div className="sm:col-span-2"><label className={labelClass} style={labelStyle}>Email *</label><input type="email" placeholder="you@email.com" className="input-premium" /></div>
        <div className="sm:col-span-2"><label className={labelClass} style={labelStyle}>Home Address</label><input type="text" placeholder="Street, City, Province, Postal Code" className="input-premium" /></div>
      </div>
    </div>
  )
}

function Step2() {
  const conditions = ['Diabetes', 'Heart Disease', 'Blood Thinners', 'Asthma', 'Allergies', 'Pregnancy', 'High Blood Pressure', 'Thyroid Condition']
  return (
    <div>
      <h3 className="text-lg font-bold mb-6" style={{ color: '#08154A' }}>Medical History</h3>
      <div className="space-y-5">
        <div>
          <label className={labelClass} style={labelStyle}>Do any of the following apply to you?</label>
          <div className="grid grid-cols-2 gap-2.5 mt-2">
            {conditions.map(c => (
              <label key={c} className="flex items-center gap-2.5 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded" style={{ accentColor: '#223B86' }} />
                <span className="text-[13px] transition-colors group-hover:text-[#08154A]" style={{ color: '#5A6A8A' }}>{c}</span>
              </label>
            ))}
          </div>
        </div>
        <div><label className={labelClass} style={labelStyle}>Current Medications</label><textarea rows={2} placeholder="List any medications..." className="input-premium resize-none" /></div>
        <div><label className={labelClass} style={labelStyle}>Known Allergies</label><input type="text" placeholder="e.g. Latex, Penicillin, Novocaine" className="input-premium" /></div>
      </div>
    </div>
  )
}

function Step3() {
  return (
    <div>
      <h3 className="text-lg font-bold mb-6" style={{ color: '#08154A' }}>Dental Concerns</h3>
      <div className="space-y-4">
        <div>
          <label className={labelClass} style={labelStyle}>Main Reason for Visit *</label>
          <select className="input-premium">
            <option value="">Select...</option>
            {['Routine Checkup / Cleaning', 'Tooth Pain or Sensitivity', 'Broken or Chipped Tooth', 'Cosmetic Concerns', 'Missing Teeth', 'Gum Issues', 'Emergency', 'Other'].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass} style={labelStyle}>Date of Last Dental Visit</label>
          <select className="input-premium">
            <option value="">Select...</option>
            {['Within the last 6 months', '6–12 months ago', '1–2 years ago', 'More than 2 years ago', 'Never'].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass} style={labelStyle}>Dental Anxiety Level</label>
          <div className="flex flex-wrap gap-3 mt-2">
            {['None', 'Mild', 'Moderate', 'Severe'].map(v => (
              <label key={v} className="flex items-center gap-2 cursor-pointer text-[13px]" style={{ color: '#5A6A8A' }}>
                <input type="radio" name="anxiety" value={v} style={{ accentColor: '#223B86' }} />
                {v}
              </label>
            ))}
          </div>
        </div>
        <div><label className={labelClass} style={labelStyle}>Additional Concerns</label><textarea rows={3} placeholder="Describe any pain, sensitivity, or questions..." className="input-premium resize-none" /></div>
      </div>
    </div>
  )
}

function Step4() {
  return (
    <div>
      <h3 className="text-lg font-bold mb-6" style={{ color: '#08154A' }}>Insurance &amp; Consent</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label className={labelClass} style={labelStyle}>Insurance Provider</label>
          <select className="input-premium">
            <option value="">None / Unknown</option>
            {['CDCP (Canadian Dental Care Plan)', 'Sun Life', 'Manulife', 'Blue Cross', 'Canada Life', 'Green Shield', 'Desjardins', 'Other'].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div><label className={labelClass} style={labelStyle}>Policy / Member Number</label><input type="text" placeholder="Optional" className="input-premium" /></div>
      </div>
      <div className="rounded-2xl p-5 space-y-3" style={{ background: 'rgba(8,21,74,0.03)', border: '1px solid rgba(8,21,74,0.08)' }}>
        {[
          'I consent to examination and treatment at Dentistry4U as discussed and recommended by my dentist.',
          'I authorize the release of dental information to my insurance provider for direct billing purposes.',
          'I would like to receive appointment reminders and clinic updates by email or SMS. (optional)',
        ].map((text, i) => (
          <label key={i} className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" required={i < 2} className="w-4 h-4 mt-0.5 shrink-0" style={{ accentColor: '#223B86' }} />
            <span className="text-[12px] leading-relaxed" style={{ color: '#5A6A8A' }}>{text}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

function Step5() {
  return (
    <div className="text-center py-6">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(34,59,134,0.10)' }}>
        <CheckCircle2 size={36} style={{ color: '#223B86' }} />
      </div>
      <h3 className="text-xl font-bold mb-3" style={{ color: '#08154A' }}>Ready to Submit</h3>
      <p className="text-[14px] max-w-sm mx-auto leading-relaxed" style={{ color: '#5A6A8A' }}>
        Please review your information. When you click Submit, our team will receive your intake form and reach out to confirm your appointment.
      </p>
    </div>
  )
}

const stepComponents = [Step1, Step2, Step3, Step4, Step5]

export default function PatientIntake() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  const StepComponent = stepComponents[step]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < STEPS.length - 1) setStep(s => s + 1)
    else setDone(true)
  }

  return (
    <section id="intake" className="relative py-28 px-6 overflow-hidden" style={sectionBg}>
      <div className="absolute inset-0 dot-grid opacity-[0.030] pointer-events-none" />

      {/* Warm operatory light beam — soft amber cone from top-right */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-80px',
          right: '-80px',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(ellipse at top right, rgba(255,232,170,0.22) 0%, rgba(255,220,150,0.10) 32%, transparent 65%)',
          filter: 'blur(70px)',
          zIndex: 0,
        }}
      />

      {/* Dental operatory light — line-art SVG, desktop only */}
      <div
        className="absolute pointer-events-none select-none hidden lg:block"
        style={{ top: '24px', right: '24px', opacity: 0.09, zIndex: 0 }}
      >
        <svg width="200" height="220" viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="78" y="0" width="44" height="12" rx="5" stroke="#2F7D5C" strokeWidth="4" />
          <line x1="100" y1="12" x2="100" y2="54" stroke="#2F7D5C" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="100" cy="58" r="7" stroke="#2F7D5C" strokeWidth="3.5" />
          <path d="M96 65 Q89 84 84 100" stroke="#2F7D5C" strokeWidth="4.5" strokeLinecap="round" />
          <ellipse cx="70" cy="132" rx="56" ry="26" stroke="#2F7D5C" strokeWidth="5" transform="rotate(-12 70 132)" />
          <ellipse cx="70" cy="132" rx="39" ry="18" stroke="#2F7D5C" strokeWidth="3.5" transform="rotate(-12 70 132)" />
          <ellipse cx="70" cy="132" rx="21" ry="10" stroke="#2F7D5C" strokeWidth="3" transform="rotate(-12 70 132)" />
          <circle cx="69" cy="131" r="5" stroke="#2F7D5C" strokeWidth="3" />
          <line x1="15" y1="129" x2="2" y2="128" stroke="#2F7D5C" strokeWidth="4" strokeLinecap="round" />
          <line x1="125" y1="135" x2="138" y2="136" stroke="#2F7D5C" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>

      {/* Tooth outline — bottom-left decorative accent, desktop only */}
      <div
        className="absolute pointer-events-none select-none hidden lg:block"
        style={{ bottom: '32px', left: '28px', opacity: 0.10, zIndex: 0 }}
      >
        <svg width="160" height="240" viewBox="0 0 140 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 95 C20 45 35 15 50 10 C57 7 64 14 70 18 C76 14 83 7 90 10 C105 15 120 45 120 95 C120 118 110 132 95 138 L70 143 L45 138 C30 132 20 118 20 95 Z"
            stroke="#2F7D5C" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
          />
          <path d="M46 138 C43 164 41 190 44 210" stroke="#2F7D5C" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M94 138 C97 164 99 190 96 210" stroke="#2F7D5C" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
      </div>

      <div ref={ref} className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="section-eyebrow justify-center mb-5"
          >
            New Patient
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl font-extrabold"
            style={{ color: '#08154A' }}
          >
            Patient Intake Form
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mt-2 text-[14px]"
            style={{ color: '#5A6A8A' }}
          >
            Takes about 3–5 minutes. Private and secure.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="rounded-3xl p-8"
          style={glassCard}
        >
          {done ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(34,59,134,0.10)' }}>
                <CheckCircle2 size={36} style={{ color: '#223B86' }} />
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: '#08154A' }}>Thank You!</h3>
              <p className="text-[14px] mb-4" style={{ color: '#5A6A8A' }}>Your intake form has been submitted. We'll reach out to confirm your visit.</p>
              <p className="text-[13px]" style={{ color: '#5A6A8A' }}>
                Questions?{' '}
                <a href="tel:9024354848" className="font-bold hover:underline" style={{ color: '#223B86' }}>902-435-4848</a>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <StepBar current={step} />
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                >
                  <StepComponent />
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-between mt-8 gap-3">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={() => setStep(s => s - 1)}
                    className="flex items-center gap-2 text-[13px] font-semibold px-5 py-3 rounded-full transition-all duration-200"
                    style={{ color: '#5A6A8A', border: '1px solid rgba(8,21,74,0.15)', background: 'rgba(248,247,242,0.60)' }}
                  >
                    <ChevronLeft size={16} />Back
                  </button>
                ) : <div />}
                <GlowButton type="submit">
                  {step === STEPS.length - 1 ? 'Submit Form' : 'Continue →'}
                </GlowButton>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
