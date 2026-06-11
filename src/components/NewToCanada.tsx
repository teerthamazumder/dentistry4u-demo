import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CreditCard, Flag, DollarSign, Heart, FileText, MapPin } from 'lucide-react'
import { GlowButton } from './ui/GlowButton'

const features = [
  { icon: CreditCard, title: 'Direct Billing',           desc: 'We bill most major providers directly — no upfront cost, no reimbursement hassle.',            iconBg: 'bg-cyan-500/20',    iconColor: 'text-cyan-400' },
  { icon: Flag,       title: 'CDCP Accepted',            desc: 'You may qualify for federal dental coverage under $90K/year. We\'ll help you apply.',           iconBg: 'bg-sky-500/20',     iconColor: 'text-sky-400' },
  { icon: DollarSign, title: 'Transparent Pricing',      desc: 'Clear estimates before treatment. Flexible payment options for all budgets.',                   iconBg: 'bg-blue-500/20',    iconColor: 'text-blue-400' },
  { icon: Heart,      title: 'Warm, Welcoming Clinic',   desc: 'No dental history? No problem. We start fresh and take care of you from day one.',              iconBg: 'bg-rose-500/20',    iconColor: 'text-rose-400' },
  { icon: FileText,   title: 'We Handle Paperwork',      desc: 'Our team guides you through insurance forms, CDCP applications, and billing.',                  iconBg: 'bg-indigo-500/20',  iconColor: 'text-indigo-400' },
  { icon: MapPin,     title: 'Easy to Find in Dartmouth',desc: 'Accessible parking, transit nearby, open evenings and weekends.',                               iconBg: 'bg-emerald-500/20', iconColor: 'text-emerald-400' },
]

export default function NewToCanada() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="new-to-canada" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-[0.04] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-primary-700/8 blur-3xl pointer-events-none" />

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
              className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6"
            >
              New to Canada?<br />
              <span className="text-gradient">We've Got You.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-sky-300/70 text-[15px] leading-relaxed mb-8 max-w-md"
            >
              Starting fresh in a new country can be exciting and sometimes overwhelming. Navigating dental care doesn't have to be. We warmly welcome newcomers and make the process simple, comfortable, and affordable.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <GlowButton href="#booking">Book Your First Visit</GlowButton>
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
                  whileHover={{ y: -4 }}
                  className="glass-dark rounded-2xl p-5 border border-white/10 hover:border-primary-500/30 transition-all duration-300"
                >
                  <div className={`w-10 h-10 rounded-xl ${f.iconBg} flex items-center justify-center mb-3`}>
                    <Icon size={18} className={f.iconColor} />
                  </div>
                  <h4 className="text-[13px] font-bold text-white mb-1.5">{f.title}</h4>
                  <p className="text-[12px] text-sky-300/65 leading-relaxed">{f.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
