import { motion } from 'framer-motion'
import { Calendar, ChevronRight, ShieldCheck, Clock, CreditCard, Star } from 'lucide-react'
import { GlowButton } from './ui/GlowButton'

const trustBadges = [
  { icon: ShieldCheck, label: 'CDCP Accepted',    sub: 'Federal coverage',    gold: true  },
  { icon: CreditCard,  label: 'Direct Billing',   sub: 'No upfront cost',     gold: false },
  { icon: Clock,       label: 'Eve & Weekend',    sub: 'Flexible hours',      gold: false },
  { icon: Star,        label: '5★ Google Rating', sub: 'Trusted by families', gold: true  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

const glassPanel: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(32, 72, 155, 0.74), rgba(8, 32, 74, 0.82))',
  border: '1px solid rgba(255, 255, 255, 0.14)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.32)',
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Softened dark overlay — glass panel handles text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/25 to-transparent pointer-events-none z-[1]" />

      {/* Subtle ambient blue glow behind glass panel */}
      <div
        className="absolute top-1/2 -translate-y-1/2 left-[-40px] w-[600px] h-[600px] pointer-events-none z-[2]"
        style={{ background: 'radial-gradient(circle, rgba(30, 80, 180, 0.18), transparent 62%)' }}
      />

      {/* Two-column grid — left: glass panel, right: open for animated background */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">

          {/* ── Left column: glass panel ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start text-left rounded-3xl px-8 py-10 lg:px-10 lg:py-12"
            style={glassPanel}
          >

            {/* Eyebrow badge */}
            <motion.div
              custom={0} variants={fadeUp} initial="hidden" animate="show"
              className="inline-flex items-center gap-2 bg-white/8 border border-white/16 text-white/80 text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-7"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse shrink-0" />
              Dartmouth, Nova Scotia's Trusted Dental Home
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={1} variants={fadeUp} initial="hidden" animate="show"
              className="text-[42px] sm:text-[54px] lg:text-[60px] xl:text-[68px] font-extrabold text-white leading-[1.04] tracking-tight mb-6"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.50)' }}
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
              className="text-[16px] leading-relaxed max-w-[460px] mb-10"
              style={{ color: 'rgba(230, 240, 255, 0.86)' }}
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
              className="grid grid-cols-2 gap-3 w-full max-w-[420px]"
            >
              {trustBadges.map(({ icon: Icon, label, sub, gold }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors"
                  style={{
                    background: 'rgba(12, 28, 70, 0.58)',
                    border: gold ? '1px solid rgba(214,134,49,0.28)' : '1px solid rgba(255,255,255,0.13)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: gold ? 'rgba(214,134,49,0.18)' : 'rgba(40,90,200,0.28)' }}
                  >
                    <Icon size={16} style={{ color: gold ? '#D68631' : '#00d4ff' }} />
                  </div>
                  <div>
                    <div className="text-[12px] font-bold text-white leading-tight">{label}</div>
                    <div className="text-[10px] leading-tight mt-0.5 text-panel-muted">{sub}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

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
