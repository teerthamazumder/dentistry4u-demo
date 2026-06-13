import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CreditCard, Flag, DollarSign, Heart, FileText, MapPin } from 'lucide-react'
import { GlowButton } from './ui/GlowButton'

const features = [
  { icon: CreditCard, title: 'Direct Billing',            desc: 'We bill most major providers directly — no upfront cost, no reimbursement hassle.',       iconBg: 'bg-[#223B86]/10', iconColor: 'text-[#223B86]' },
  { icon: Flag,       title: 'CDCP Accepted',             desc: 'You may qualify for federal dental coverage under $90K/year. We\'ll help you apply.',      iconBg: 'bg-[#D9A23A]/15', iconColor: 'text-[#A9530B]' },
  { icon: DollarSign, title: 'Transparent Pricing',       desc: 'Clear estimates before treatment. Flexible payment options for all budgets.',              iconBg: 'bg-[#223B86]/10', iconColor: 'text-[#223B86]' },
  { icon: Heart,      title: 'Warm, Welcoming Clinic',    desc: 'No dental history? No problem. We start fresh and take care of you from day one.',         iconBg: 'bg-[#A9530B]/10', iconColor: 'text-[#A9530B]' },
  { icon: FileText,   title: 'We Handle Paperwork',       desc: 'Our team guides you through insurance forms, CDCP applications, and billing.',             iconBg: 'bg-[#223B86]/10', iconColor: 'text-[#223B86]' },
  { icon: MapPin,     title: 'Easy to Find in Dartmouth', desc: 'Accessible parking, transit nearby. Open Mon–Thu 9 AM–7 PM and Sat–Sun 9 AM–5 PM. Closed Friday.',       iconBg: 'bg-[#D9A23A]/15', iconColor: 'text-[#A9530B]' },
]

const sectionBg = {
  background: 'linear-gradient(135deg, #EDD49A 0%, #E7E1D6 55%, #CFD5E8 100%)',
}

export default function NewToCanada() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="new-to-canada" className="relative py-28 px-6 overflow-hidden" style={sectionBg}>
      <div className="absolute inset-0 dot-grid opacity-[0.035] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[380px] h-[380px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(217,162,58,0.10) 0%, transparent 65%)' }} />

      {/* Decorative stethoscope — thin line-art, very low opacity, desktop only */}
      <div
        className="absolute pointer-events-none select-none hidden lg:block"
        style={{ right: '2%', top: '50%', transform: 'translateY(-50%) rotate(12deg)', opacity: 0.08, zIndex: 0 }}
      >
        <svg
          width="360" height="460"
          viewBox="0 0 300 380"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left ear tip */}
          <ellipse cx="82" cy="26" rx="10" ry="13"
            stroke="#2F7D5C" strokeWidth="5" />
          {/* Left tube — curves inward and down to Y-junction */}
          <path d="M82 39 C82 58 80 72 88 88 C96 103 115 116 140 120"
            stroke="#2F7D5C" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Right ear tip */}
          <ellipse cx="218" cy="26" rx="10" ry="13"
            stroke="#2F7D5C" strokeWidth="5" />
          {/* Right tube — mirrors left, converges at Y-junction */}
          <path d="M218 39 C218 58 220 72 212 88 C204 103 185 116 160 120"
            stroke="#2F7D5C" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Y-junction: left and right sides converge to a single point */}
          <path d="M140 120 Q150 128 150 138"
            stroke="#2F7D5C" strokeWidth="5" strokeLinecap="round" />
          <path d="M160 120 Q150 128 150 138"
            stroke="#2F7D5C" strokeWidth="5" strokeLinecap="round" />
          {/* Main flexible tube — gentle S-curve down to chest piece */}
          <path d="M150 138 C150 170 158 198 165 222 C172 248 178 268 180 298"
            stroke="#2F7D5C" strokeWidth="5" strokeLinecap="round" />
          {/* Chest piece — outer circle (diaphragm face) */}
          <circle cx="180" cy="330" r="32"
            stroke="#2F7D5C" strokeWidth="5" />
          {/* Chest piece — inner ring (diaphragm membrane) */}
          <circle cx="180" cy="330" r="13"
            stroke="#2F7D5C" strokeWidth="4" />
        </svg>
      </div>

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="section-eyebrow mb-5"
            >
              Welcome to Dartmouth
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#08154A' }}
            >
              New to Canada?<br />
              <span className="text-gradient">We've Got You.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-[15px] leading-relaxed mb-8 max-w-md"
              style={{ color: '#5A6A8A' }}
            >
              Starting fresh in a new country can be exciting and sometimes overwhelming. Navigating dental care doesn't have to be. We warmly welcome newcomers and make the process simple, comfortable, and affordable.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <GlowButton href="#contact">Get in Touch</GlowButton>
            </motion.div>
          </div>

          {/* ── Right: feature grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 32 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4, boxShadow: '0 24px 60px rgba(8,21,74,0.12)' }}
                  className="rounded-2xl p-5 transition-all duration-300"
                  style={{
                    background: 'rgba(255,252,245,0.58)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(47,125,92,0.18)',
                    boxShadow: '0 18px 45px rgba(8,21,74,0.08), inset 0 1px 0 rgba(255,255,255,0.50)',
                  }}
                >
                  <div className={`w-10 h-10 rounded-xl ${f.iconBg} flex items-center justify-center mb-3`}>
                    <Icon size={18} className={f.iconColor} />
                  </div>
                  <h4 className="font-semibold mb-1.5" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#08154A' }}>{f.title}</h4>
                  <p className="text-[12px] leading-relaxed" style={{ color: '#5A6A8A' }}>{f.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
