import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { User, Heart, Smile, Shield, CheckCircle2, ChevronLeft } from 'lucide-react'
import { GlowButton } from './ui/GlowButton'

const STEPS = [
  { label: 'Personal Info',    icon: User },
  { label: 'Medical History',  icon: Heart },
  { label: 'Dental Concerns',  icon: Smile },
  { label: 'Insurance',        icon: Shield },
  { label: 'Review & Submit',  icon: CheckCircle2 },
]

function StepBar({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-between mb-10 relative">
      <div className="absolute top-4 left-0 right-0 h-0.5 bg-white/10 -z-10" />
      <motion.div
        className="absolute top-4 left-0 h-0.5 bg-gradient-to-r from-[#D68631] to-[#F0A84A] -z-10"
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
                backgroundColor: done || active ? '#D68631' : 'rgba(255,255,255,0.08)',
                borderColor: done || active ? '#D68631' : 'rgba(255,255,255,0.15)',
              }}
              transition={{ duration: 0.25 }}
              className="w-9 h-9 rounded-full border-2 flex items-center justify-center"
            >
              <Icon size={15} className={done || active ? 'text-white' : 'text-white/35'} />
            </motion.div>
            <span className={`text-[10px] font-semibold hidden sm:block whitespace-nowrap ${
              active ? 'text-[#D68631]' : done ? 'text-[#D68631]/70' : 'text-white/30'
            }`}>
              {s.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

const labelClass = 'block text-[11px] font-bold text-panel-body uppercase tracking-wider mb-2'

function Step1() {
  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-6">Personal Information</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {['First Name', 'Last Name'].map(l => (
          <div key={l}><label className={labelClass}>{l} *</label><input type="text" className="input-dark" /></div>
        ))}
        <div><label className={labelClass}>Date of Birth *</label><input type="date" className="input-dark" /></div>
        <div><label className={labelClass}>Phone *</label><input type="tel" placeholder="902-555-0100" className="input-dark" /></div>
        <div className="sm:col-span-2"><label className={labelClass}>Email *</label><input type="email" placeholder="you@email.com" className="input-dark" /></div>
        <div className="sm:col-span-2"><label className={labelClass}>Home Address</label><input type="text" placeholder="Street, City, Province, Postal Code" className="input-dark" /></div>
      </div>
    </div>
  )
}

function Step2() {
  const conditions = ['Diabetes', 'Heart Disease', 'Blood Thinners', 'Asthma', 'Allergies', 'Pregnancy', 'High Blood Pressure', 'Thyroid Condition']
  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-6">Medical History</h3>
      <div className="space-y-5">
        <div>
          <label className={labelClass}>Do any of the following apply to you?</label>
          <div className="grid grid-cols-2 gap-2.5 mt-2">
            {conditions.map(c => (
              <label key={c} className="flex items-center gap-2.5 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 accent-primary-400 rounded" />
                <span className="text-[13px] text-panel-muted group-hover:text-white transition-colors">{c}</span>
              </label>
            ))}
          </div>
        </div>
        <div><label className={labelClass}>Current Medications</label><textarea rows={2} placeholder="List any medications..." className="input-dark resize-none" /></div>
        <div><label className={labelClass}>Known Allergies</label><input type="text" placeholder="e.g. Latex, Penicillin, Novocaine" className="input-dark" /></div>
      </div>
    </div>
  )
}

function Step3() {
  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-6">Dental Concerns</h3>
      <div className="space-y-4">
        <div>
          <label className={labelClass}>Main Reason for Visit *</label>
          <select className="input-dark">
            <option value="">Select...</option>
            {['Routine Checkup / Cleaning', 'Tooth Pain or Sensitivity', 'Broken or Chipped Tooth', 'Cosmetic Concerns', 'Missing Teeth', 'Gum Issues', 'Emergency', 'Other'].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Date of Last Dental Visit</label>
          <select className="input-dark">
            <option value="">Select...</option>
            {['Within the last 6 months', '6–12 months ago', '1–2 years ago', 'More than 2 years ago', 'Never'].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Dental Anxiety Level</label>
          <div className="flex flex-wrap gap-3 mt-2">
            {['None', 'Mild', 'Moderate', 'Severe'].map(v => (
              <label key={v} className="flex items-center gap-2 cursor-pointer text-[13px] text-panel-muted">
                <input type="radio" name="anxiety" value={v} className="accent-primary-400" />
                {v}
              </label>
            ))}
          </div>
        </div>
        <div><label className={labelClass}>Additional Concerns</label><textarea rows={3} placeholder="Describe any pain, sensitivity, or questions..." className="input-dark resize-none" /></div>
      </div>
    </div>
  )
}

function Step4() {
  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-6">Insurance &amp; Consent</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label className={labelClass}>Insurance Provider</label>
          <select className="input-dark">
            <option value="">None / Unknown</option>
            {['CDCP (Canadian Dental Care Plan)', 'Sun Life', 'Manulife', 'Blue Cross', 'Canada Life', 'Green Shield', 'Desjardins', 'Other'].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div><label className={labelClass}>Policy / Member Number</label><input type="text" placeholder="Optional" className="input-dark" /></div>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
        {[
          'I consent to examination and treatment at Dentistry4U as discussed and recommended by my dentist.',
          'I authorize the release of dental information to my insurance provider for direct billing purposes.',
          'I would like to receive appointment reminders and clinic updates by email or SMS. (optional)',
        ].map((text, i) => (
          <label key={i} className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" required={i < 2} className="w-4 h-4 accent-primary-400 mt-0.5 shrink-0" />
            <span className="text-[12px] text-panel-muted leading-relaxed">{text}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

function Step5() {
  return (
    <div className="text-center py-6">
      <div className="w-16 h-16 rounded-full bg-[#D68631]/15 flex items-center justify-center mx-auto mb-5">
        <CheckCircle2 size={36} className="text-[#D68631]" />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">Ready to Submit</h3>
      <p className="text-panel-body text-[14px] max-w-sm mx-auto leading-relaxed">
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
    <section id="intake" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-[0.04] pointer-events-none" />

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
            className="text-4xl font-extrabold text-white"
          >
            Patient Intake Form
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-panel-muted mt-2 text-[14px]"
          >
            Takes about 3–5 minutes. Private and secure.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="glass-dark glass-card rounded-3xl p-8 border border-white/10"
        >
          {done ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#D68631]/15 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 size={36} className="text-[#D68631]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Thank You!</h3>
              <p className="text-panel-body text-[14px] mb-4">Your intake form has been submitted. We'll reach out to confirm your visit.</p>
              <p className="text-[13px] text-panel-muted">
                Questions?{' '}
                <a href="tel:9024354848" className="text-[#D68631] font-bold hover:underline">902-435-4848</a>
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
                    className="flex items-center gap-2 text-[13px] font-semibold text-sky-300/70 border border-white/15 px-5 py-3 rounded-full hover:border-[#D68631]/60 hover:text-[#D68631] transition-colors"
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
