import { motion } from 'framer-motion'
import { Calendar, ChevronRight, ShieldCheck, Clock, CreditCard, Star } from 'lucide-react'
import { GlowButton } from './ui/GlowButton'

const trustBadges = [
  { icon: ShieldCheck, label: 'CDCP Accepted',    sub: 'Federal coverage' },
  { icon: CreditCard,  label: 'Direct Billing',   sub: 'No upfront cost' },
  { icon: Clock,       label: 'Eve & Weekend',    sub: 'Flexible hours' },
  { icon: Star,        label: '5★ Google Rating', sub: 'Trusted by families' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Left-side dark gradient so text stays readable against the animated bg */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent pointer-events-none z-[1]" />

      {/* Two-column grid — left: content, right: open for animated background */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">

          {/* ── Left column: all text content ── */}
          <div className="flex flex-col items-start text-left">

            {/* Eyebrow badge */}
            <motion.div
              custom={0} variants={fadeUp} initial="hidden" animate="show"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-7"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0" />
              Dartmouth, Nova Scotia's Trusted Dental Home
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={1} variants={fadeUp} initial="hidden" animate="show"
              className="text-[46px] sm:text-[58px] lg:text-[66px] xl:text-[74px] font-extrabold text-white leading-[1.03] tracking-tight mb-6"
            >
              Premium Dental Care<br />
              for{' '}
              <span className="text-gradient">Confident</span>
              <br />
              <span className="text-gradient">Smiles</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              custom={2} variants={fadeUp} initial="hidden" animate="show"
              className="text-[16px] text-sky-200/75 leading-relaxed max-w-[460px] mb-10"
            >
              Modern dentistry, advanced technology, and gentle care for your whole
              family in Dartmouth, Nova Scotia. Evening and weekend appointments available.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              custom={3} variants={fadeUp} initial="hidden" animate="show"
              className="flex flex-wrap gap-4 mb-12"
            >
              <GlowButton href="#booking">
                <Calendar size={17} />
                Book Appointment
              </GlowButton>
              <GlowButton href="#services" variant="secondary">
                View Services
                <ChevronRight size={17} />
              </GlowButton>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              custom={4} variants={fadeUp} initial="hidden" animate="show"
              className="grid grid-cols-2 gap-3 w-full max-w-[400px]"
            >
              {trustBadges.map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="glass-dark rounded-2xl flex items-center gap-3 px-4 py-3 border border-white/10"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary-500/20 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-[12px] font-bold text-white leading-tight">{label}</div>
                    <div className="text-[10px] text-sky-300/65 leading-tight mt-0.5">{sub}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right column: intentionally empty — animated background shows through ── */}
          <div className="hidden lg:block" aria-hidden="true" />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ opacity: [1, 0.25, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none z-20"
      >
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/35">Scroll</span>
        <div className="w-0.5 h-7 bg-gradient-to-b from-white/40 to-transparent rounded-full" />
      </motion.div>
    </section>
  )
}
