import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, Phone, ExternalLink, TrendingUp } from 'lucide-react'
import { GlowButton } from './ui/GlowButton'

const tiers = [
  { income: 'Family Income Under $70,000', note: 'No co-payment required', coverage: '100%', bar: 100 },
  { income: '$70,000 – $79,999',           note: '40% co-payment applies',  coverage: '60%',  bar: 60  },
  { income: '$80,000 – $89,999',           note: '60% co-payment applies',  coverage: '40%',  bar: 40  },
]

const benefits = [
  { title: 'We Direct Bill CDCP',       desc: 'No upfront payment required. We bill Sun Life directly on your behalf.' },
  { title: 'Covers Most Common Services', desc: 'Cleanings, X-rays, fillings, extractions, root canals, and more.' },
  { title: 'Application Support',        desc: 'Not sure if you qualify? Call us — our team will walk you through it.' },
  { title: 'Flexible Payment Plans',     desc: 'For any balance not covered, we offer manageable payment arrangements.' },
]

const sectionBg = {
  background: 'linear-gradient(135deg, #08154A 0%, #223B86 65%, #1B2F6B 100%)',
}

export default function CDCPSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="cdcp" className="relative py-28 px-6 overflow-hidden" style={sectionBg}>
      <div className="absolute inset-0 dot-grid opacity-[0.06] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(217,162,58,0.08) 0%, transparent 65%)' }} />
      <div className="absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 60%)' }} />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── Left ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white/90 text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-7"
            >
              <TrendingUp size={12} className="text-[#D9A23A]" />
              Federal Dental Coverage
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl text-white leading-tight mb-5"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
            >
              You May Qualify for the{' '}
              <em className="not-italic" style={{ color: '#D9A23A' }}>Canadian Dental Care Plan</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-panel-body text-[15px] leading-relaxed mb-10"
            >
              The federal CDCP provides subsidized dental coverage for eligible Canadians without private insurance who earn under $90,000/year. We accept CDCP and can help you navigate your coverage.
            </motion.p>

            {/* Coverage tier bars */}
            <div className="space-y-4 mb-10">
              {tiers.map((tier, i) => (
                <motion.div
                  key={tier.income}
                  initial={{ opacity: 0, x: -24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 4 }}
                  className="glass-dark glass-card rounded-2xl p-5 cursor-default"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-white/90 text-sm font-semibold">{tier.income}</div>
                      <div className="text-white/50 text-[11px] mt-0.5">{tier.note}</div>
                    </div>
                    <div className="text-2xl font-bold ml-4 shrink-0" style={{ fontFamily: "'Playfair Display', serif", color: '#D9A23A' }}>{tier.coverage}</div>
                  </div>
                  <div className="h-1.5 bg-white/15 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${tier.bar}%` } : {}}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #D9A23A, #F0D9A0)' }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              <GlowButton
                href="https://www.canada.ca/en/services/benefits/dental/dental-care-plan.html"
                target="_blank"
                rel="noopener noreferrer"
                variant="light"
              >
                Check Your Eligibility
                <ExternalLink size={15} />
              </GlowButton>
              <GlowButton href="tel:9024354848" variant="outline-light">
                <Phone size={15} />
                902-435-4848
              </GlowButton>
            </motion.div>
          </div>

          {/* ── Right: benefits card ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="glass-dark glass-card rounded-3xl p-8"
          >
            <h3 className="text-2xl text-white mb-7" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>We Make It Easy</h3>

            <div className="space-y-5">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.09 }}
                  className="flex gap-4 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-white/22 transition-colors">
                    <CheckCircle2 size={16} style={{ color: '#D9A23A' }} />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-[13px] mb-1">{b.title}</div>
                    <div className="text-panel-muted text-[12px] leading-relaxed">{b.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Phone CTA */}
            <div className="mt-8 bg-white/10 border border-white/18 rounded-2xl px-5 py-4">
              <div className="flex items-center gap-2 text-white/65 text-[11px] font-semibold mb-2">
                <Phone size={11} />
                Call to check your coverage
              </div>
              <a href="tel:9024354848" className="text-white text-2xl font-bold hover:opacity-80 transition-opacity" style={{ fontFamily: "'Playfair Display', serif" }}>
                902-435-4848
              </a>
              <div className="text-white/40 text-[11px] mt-1">Mon–Thu 9 AM–7 PM • Sat–Sun 9 AM–5 PM • Closed Fri</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
