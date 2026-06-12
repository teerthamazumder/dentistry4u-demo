import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const insurers = [
  { name: 'Sun Life',      abbr: 'SL', iconBg: 'bg-amber-500/20',   iconColor: 'text-amber-400' },
  { name: 'Manulife',      abbr: 'MF', iconBg: 'bg-rose-500/20',    iconColor: 'text-rose-400' },
  { name: 'Blue Cross',    abbr: 'BC', iconBg: 'bg-sky-500/20',     iconColor: 'text-sky-400' },
  { name: 'Canada Life',   abbr: 'CL', iconBg: 'bg-emerald-500/20', iconColor: 'text-emerald-400' },
  { name: 'Green Shield',  abbr: 'GS', iconBg: 'bg-teal-500/20',    iconColor: 'text-teal-400' },
  { name: 'Desjardins',    abbr: 'DJ', iconBg: 'bg-indigo-500/20',  iconColor: 'text-indigo-400' },
  { name: 'CDCP (Federal)',abbr: 'CA', iconBg: 'bg-primary-500/20', iconColor: 'text-accent' },
]

export default function Insurance() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-primary-600/5 blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-5xl mx-auto relative z-10">
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
            className="text-4xl md:text-5xl font-extrabold text-white mb-5"
          >
            We Accept <span className="text-gradient">Your Insurance</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-panel-muted max-w-md mx-auto text-[15px]"
          >
            We direct bill most major Canadian insurance providers. If you don't see yours listed, call us — we'll do our best to work with your plan.
          </motion.p>
        </div>

        {/* Insurance cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {insurers.map((ins, i) => (
            <motion.div
              key={ins.name}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.25 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5, scale: 1.03, boxShadow: '0 8px 28px rgba(214,134,49,0.12)' }}
              className="glass-dark glass-card rounded-2xl p-5 text-center border border-white/10 hover:border-white/26 transition-all duration-300 cursor-default"
            >
              <div className={`w-12 h-12 rounded-2xl ${ins.iconBg} flex items-center justify-center mx-auto mb-3 font-extrabold text-sm ${ins.iconColor}`}>
                {ins.abbr}
              </div>
              <div className="text-[12px] font-bold text-white leading-tight">{ins.name}</div>
              <CheckCircle2 size={12} className="text-[#D68631] mx-auto mt-1.5 opacity-80" />
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="glass-dark rounded-2xl px-8 py-5 text-center border border-[#D68631]/20"
        >
          <p className="text-[13px] text-panel-muted leading-relaxed">
            Coverage depends on your plan. Our team can help verify your benefits before treatment.{' '}
            <a href="tel:9024354848" className="text-[#D68631] font-bold hover:underline">
              Call 902-435-4848
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
