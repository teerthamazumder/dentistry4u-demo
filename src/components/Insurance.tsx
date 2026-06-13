import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, Sun, Heart, PlusCircle, Leaf, ShieldCheck, Gem, Landmark, Phone } from 'lucide-react'

type Insurer = {
  name: string
  tag: string
  billing: string
  Icon: React.ElementType
  accentColor: string
  iconBg: string
  iconColor: string
}

const insurers: Insurer[] = [
  {
    name: 'Sun Life',
    tag: 'Group & Individual Benefits',
    billing: 'Direct billing available',
    Icon: Sun,
    accentColor: '#D9873A',
    iconBg: 'rgba(217,162,58,0.14)',
    iconColor: '#A9530B',
  },
  {
    name: 'Manulife',
    tag: 'Group Health Benefits',
    billing: 'Direct billing available',
    Icon: Heart,
    accentColor: '#223B86',
    iconBg: 'rgba(34,59,134,0.10)',
    iconColor: '#223B86',
  },
  {
    name: 'Blue Cross',
    tag: 'Health & Dental Coverage',
    billing: 'Direct billing available',
    Icon: PlusCircle,
    accentColor: '#1D7DB5',
    iconBg: 'rgba(29,125,181,0.12)',
    iconColor: '#1D7DB5',
  },
  {
    name: 'Canada Life',
    tag: 'Group Benefits',
    billing: 'Coverage varies by plan',
    Icon: Leaf,
    accentColor: '#2A7A5E',
    iconBg: 'rgba(42,122,94,0.12)',
    iconColor: '#2A7A5E',
  },
  {
    name: 'Green Shield',
    tag: 'Health Benefits',
    billing: 'Direct billing available',
    Icon: ShieldCheck,
    accentColor: '#2F7D5C',
    iconBg: 'rgba(47,125,92,0.12)',
    iconColor: '#2F7D5C',
  },
  {
    name: 'Desjardins',
    tag: 'Group & Individual Plans',
    billing: 'Coverage varies by plan',
    Icon: Gem,
    accentColor: '#7A2A3A',
    iconBg: 'rgba(122,42,58,0.10)',
    iconColor: '#7A2A3A',
  },
]

const cdcpBullets = [
  'You may qualify if your household income is under $90,000/yr',
  'Covers preventive, restorative & emergency dental care',
  'We handle paperwork and bill the government directly on your behalf',
]

const CARD_STYLE: React.CSSProperties = {
  background: 'rgba(255,252,245,0.65)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(8,21,74,0.09)',
  boxShadow: '0 18px 50px rgba(8,21,74,0.08), inset 0 1px 0 rgba(255,255,255,0.55)',
}

export default function Insurance() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="relative py-28 px-6 overflow-hidden" style={{ background: 'linear-gradient(160deg, #E7E1D6 0%, #F0D49A 100%)' }}>
      <div className="absolute inset-0 dot-grid opacity-[0.030] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[320px] h-[320px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(217,162,58,0.08) 0%, transparent 65%)' }} />

      <div ref={ref} className="max-w-5xl mx-auto relative z-10">

        {/* Heading */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="section-eyebrow justify-center mb-5"
          >
            Direct Billing
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl mb-5"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#08154A' }}
          >
            We Accept <span className="text-gradient">Your Insurance</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="max-w-md mx-auto text-[15px]"
            style={{ color: '#5A6A8A' }}
          >
            We direct bill most major Canadian insurance providers. If you don't see yours listed, call us — we'll do our best to work with your plan.
          </motion.p>
        </div>

        {/* 6 private provider cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
          {insurers.map((ins, i) => {
            const Icon = ins.Icon
            return (
              <motion.div
                key={ins.name}
                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.25 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, boxShadow: '0 28px 70px rgba(8,21,74,0.14)' }}
                className="rounded-2xl overflow-hidden transition-all duration-300 cursor-default"
                style={{
                  ...CARD_STYLE,
                  borderTop: `3px solid ${ins.accentColor}`,
                }}
              >
                <div className="p-5 flex flex-col gap-3 h-full">
                  {/* Icon badge */}
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: ins.iconBg }}
                  >
                    <Icon size={20} style={{ color: ins.iconColor }} />
                  </div>

                  {/* Provider name + type */}
                  <div>
                    <div className="text-[14px] font-bold leading-tight" style={{ color: '#08154A' }}>
                      {ins.name}
                    </div>
                    <div className="text-[11px] mt-0.5 leading-relaxed" style={{ color: '#5A6A8A' }}>
                      {ins.tag}
                    </div>
                  </div>

                  {/* Billing status */}
                  <div className="flex items-center gap-1.5 mt-auto pt-1" style={{ borderTop: '1px solid rgba(8,21,74,0.06)' }}>
                    <CheckCircle2 size={11} style={{ color: '#3D7F5E', flexShrink: 0 }} />
                    <span className="text-[10.5px] font-medium" style={{ color: '#3D7F5E' }}>
                      {ins.billing}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CDCP — featured full-width navy card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.66, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl overflow-hidden mb-4"
          style={{
            background: 'linear-gradient(135deg, rgba(34,59,134,0.90), rgba(8,21,74,0.84))',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(255,255,255,0.13)',
            boxShadow: '0 28px 70px rgba(8,21,74,0.22), inset 0 1px 0 rgba(255,255,255,0.11)',
          }}
        >
          <div className="p-7 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">

            {/* Left — identity */}
            <div>
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-4 text-[10px] font-bold uppercase tracking-widest"
                style={{ background: 'rgba(255,255,255,0.11)', color: 'rgba(255,255,255,0.75)' }}
              >
                <Landmark size={10} />
                Federal Program
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(255,255,255,0.11)' }}
                >
                  <Landmark size={22} className="text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-[18px] leading-tight">CDCP</div>
                  <div className="text-[11px]" style={{ color: 'rgba(255,255,255,0.60)' }}>
                    Canadian Dental Care Plan
                  </div>
                </div>
              </div>
            </div>

            {/* Right — bullets */}
            <div className="space-y-2.5">
              {cdcpBullets.map((bullet, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={13}
                    className="mt-0.5 shrink-0"
                    style={{ color: 'rgba(147,210,180,0.88)' }}
                  />
                  <span className="text-[12px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                    {bullet}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.80 }}
          className="rounded-2xl px-8 py-5 text-center"
          style={CARD_STYLE}
        >
          <p className="text-[13px] leading-relaxed" style={{ color: '#5A6A8A' }}>
            Coverage depends on your plan. Our team can help verify your benefits before treatment.{' '}
            <a
              href="tel:9024354848"
              className="font-bold hover:underline inline-flex items-center gap-1.5 align-middle"
              style={{ color: '#223B86' }}
            >
              <Phone size={12} />
              Call 902-435-4848
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
