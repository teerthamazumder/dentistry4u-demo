import { motion } from 'framer-motion'
import { Calendar, ChevronRight, ShieldCheck, Clock, CreditCard, Star, Heart } from 'lucide-react'
import { MeshGradient } from '@paper-design/shaders-react'
import { GlowButton } from './ui/GlowButton'
import { CountUpStat } from './ui/CountUpStat'

const trustBadges = [
  { icon: ShieldCheck, label: 'CDCP Accepted',    sub: 'Federal coverage',    green: true  },
  { icon: CreditCard,  label: 'Direct Billing',   sub: 'No upfront cost',     green: false },
  { icon: Clock,       label: 'Extended Hours', sub: 'Mon–Thu 9 AM–7 PM • Sat–Sun 9 AM–5 PM', green: true  },
  { icon: Star,        label: '5★ Google Rating', sub: 'Trusted by families', green: false },
]

const stats = [
  { target: 12, suffix: '+', label: 'Years Serving' },
  { target: 5,  suffix: '★', label: 'Google Rating' },
  { target: 98, suffix: '%', label: 'Satisfaction'  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.1 + i * 0.09, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20" style={{ isolation: 'isolate' }}>
      {/* Animated mesh gradient — dark anchors give the animation visible motion */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={['#08154A', '#3D7F5E', '#D9A23A', '#BEC6E0', '#F5EFE4']}
        speed={0.22}
        distortion={0.85}
        swirl={0.18}
        maxPixelCount={160000}
      />

      {/* Cream veil — makes text crisp while gradient shows through */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(248, 243, 234, 0.52)' }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left column ── */}
          <div className="flex flex-col items-start text-left">

            {/* Eyebrow badge — green accent */}
            <motion.div
              custom={0} variants={fadeUp} initial="hidden" animate="show"
              className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-7"
              style={{
                background: 'rgba(221,234,223,0.90)',
                border: '1px solid rgba(61,127,94,0.25)',
                color: '#3D7F5E',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse" style={{ background: '#3D7F5E' }} />
              Dartmouth, Nova Scotia's Trusted Dental Home
            </motion.div>

            {/* Headline — Cormorant Garamond */}
            <motion.h1
              custom={1} variants={fadeUp} initial="hidden" animate="show"
              className="text-[52px] sm:text-[64px] lg:text-[72px] leading-[1.06] tracking-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, color: '#08154A' }}
            >
              Your Smile,<br />
              Our{' '}
              <em className="not-italic" style={{ color: '#3D7F5E' }}>Greatest</em>
              <br />
              Care.
            </motion.h1>

            {/* Subtext — Inter */}
            <motion.p
              custom={2} variants={fadeUp} initial="hidden" animate="show"
              className="text-[15px] leading-[1.75] max-w-[460px] mb-10"
              style={{ color: '#5A6A8A', fontWeight: 400 }}
            >
              Comprehensive dental care in a warm, welcoming environment. From routine cleanings to complex restorations — we're here for every smile in Dartmouth, Nova Scotia.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              custom={3} variants={fadeUp} initial="hidden" animate="show"
              className="flex flex-wrap gap-4 mb-12"
            >
              <GlowButton href="#booking">
                <Calendar size={16} />
                Book Appointment
              </GlowButton>
              <GlowButton href="#intake" variant="secondary">
                New Patient Form
                <ChevronRight size={16} />
              </GlowButton>
            </motion.div>

            {/* Trust badges — alternating green / navy accent */}
            <motion.div
              custom={4} variants={fadeUp} initial="hidden" animate="show"
              className="grid grid-cols-2 gap-3 w-full max-w-[420px]"
            >
              {trustBadges.map(({ icon: Icon, label, sub, green: isGreen }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(245,239,228,0.58), rgba(221,234,223,0.46), rgba(255,255,255,0.30))',
                    backdropFilter: 'blur(18px)',
                    WebkitBackdropFilter: 'blur(18px)',
                    border: isGreen
                      ? '1px solid rgba(47,125,92,0.22)'
                      : '1px solid rgba(8,21,74,0.12)',
                    boxShadow: '0 18px 50px rgba(16,43,106,0.10), inset 0 1px 0 rgba(255,255,255,0.45)',
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: isGreen ? 'rgba(221,234,223,0.72)' : 'rgba(16,43,106,0.08)' }}
                  >
                    <Icon size={15} style={{ color: isGreen ? '#3D7F5E' : '#223B86' }} />
                  </div>
                  <div>
                    <div className="text-[12px] font-semibold leading-tight" style={{ color: '#08154A' }}>{label}</div>
                    <div className="text-[10px] mt-0.5" style={{ color: '#5A6A8A' }}>{sub}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right column: visual cards ── */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex flex-col gap-4"
          >
            {/* Main stat card */}
            <div
              className="rounded-3xl p-8"
              style={{
                background: 'linear-gradient(135deg, rgba(245,239,228,0.58), rgba(221,234,223,0.46), rgba(255,255,255,0.30))',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                border: '1px solid rgba(47,125,92,0.22)',
                borderTop: '3px solid rgba(61,127,94,0.65)',
                boxShadow: '0 18px 50px rgba(16,43,106,0.10), inset 0 1px 0 rgba(255,255,255,0.45)',
              }}
            >
              {/* Header row */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(221,234,223,0.72)' }}
                >
                  <Heart size={18} style={{ color: '#3D7F5E' }} />
                </div>
                <div>
                  <h4
                    className="leading-snug"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '1.05rem', color: '#08154A' }}
                  >
                    Trusted by Dartmouth Families
                  </h4>
                  <p className="text-[12px] mt-0.5" style={{ color: '#5A6A8A' }}>
                    Open Mon–Thu 9 AM–7 PM · Sat–Sun 9 AM–5 PM · Closed Fri · Same-day available
                  </p>
                </div>
              </div>

              {/* Green separator */}
              <div
                className="mb-5 h-px"
                style={{ background: 'linear-gradient(to right, rgba(61,127,94,0.30), transparent)' }}
              />

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {stats.map(s => (
                  <div
                    key={s.label}
                    className="text-center py-3 rounded-2xl"
                    style={{
                      background: 'rgba(221,234,223,0.52)',
                      border: '1px solid rgba(47,125,92,0.20)',
                    }}
                  >
                    <CountUpStat
                      target={s.target}
                      suffix={s.suffix}
                      duration={2600}
                      delay={700}
                      className="text-2xl font-bold"
                      style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#3D7F5E' }}
                    />
                    <div className="text-[11px] mt-0.5" style={{ color: '#5A6A8A' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini cards row */}
            <div className="grid grid-cols-2 gap-4">

              {/* Direct Billing — green accent */}
              <div
                className="rounded-2xl p-5 flex items-center gap-3"
                style={{
                  background: 'linear-gradient(135deg, rgba(245,239,228,0.58), rgba(221,234,223,0.46), rgba(255,255,255,0.30))',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  border: '1px solid rgba(47,125,92,0.22)',
                  boxShadow: '0 18px 50px rgba(16,43,106,0.10), inset 0 1px 0 rgba(255,255,255,0.45)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(221,234,223,0.72)' }}
                >
                  <CreditCard size={17} style={{ color: '#3D7F5E' }} />
                </div>
                <div>
                  <div className="text-[13px] font-semibold leading-tight" style={{ color: '#08154A' }}>Direct Billing</div>
                  <div className="text-[11px]" style={{ color: '#5A6A8A' }}>Available</div>
                </div>
              </div>

              {/* CDCP — navy gradient */}
              <div
                className="rounded-2xl p-5 flex items-center gap-3"
                style={{
                  background: 'linear-gradient(135deg, rgba(34,59,134,0.72), rgba(8,21,74,0.65))',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  boxShadow: '0 18px 50px rgba(8,21,74,0.22), inset 0 1px 0 rgba(255,255,255,0.15)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(255,255,255,0.15)' }}
                >
                  <ShieldCheck size={17} className="text-white" />
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-white leading-tight">CDCP</div>
                  <div className="text-[11px] text-white/65">Accepted</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ opacity: [1, 0.25, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none z-20"
      >
        <span
          className="text-[10px] font-semibold uppercase tracking-widest"
          style={{ color: 'rgba(8,21,74,0.35)' }}
        >
          Scroll
        </span>
        <div
          className="w-0.5 h-7 rounded-full"
          style={{ background: 'linear-gradient(to bottom, rgba(61,127,94,0.45), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
