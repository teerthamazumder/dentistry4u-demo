import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  { name: 'Rahim K.',     location: 'New to Canada — Dartmouth', service: 'CDCP Coverage',      rating: 5, text: 'Moving to Canada from Bangladesh, I was nervous about everything — including finding a dentist. The team at Dentistry4U made me feel completely at home. They explained my CDCP coverage and now I never stress about dental costs.' },
  { name: 'Christine M.', location: 'Dartmouth, NS',             service: 'Sedation Dentistry', rating: 5, text: "I'd been avoiding the dentist for years because of anxiety. The sedation option was a game-changer. I'm finally keeping up with my dental health and my teeth have never felt better!" },
  { name: 'David L.',     location: 'Family of 4 — Dartmouth',  service: 'Emergency Care',     rating: 5, text: 'Same-day emergency appointment when I cracked a tooth. They were so kind and professional. The Mon–Thu evening hours are perfect for my work schedule. This is our family dentist for life.' },
  { name: 'Sofia P.',     location: 'Dartmouth, NS',             service: 'Direct Billing',     rating: 5, text: 'Direct billing made everything so easy. I didn\'t have to worry about money at all — they handled everything with my insurance. The staff communication is excellent.' },
  { name: 'Marcus T.',    location: 'Cole Harbour, NS',          service: 'Referral Reward',    rating: 5, text: 'I referred my three coworkers and got a $50 credit — and they all love it too! Very modern, professional, and the whole team genuinely cares about your comfort.' },
  { name: 'Priya K.',     location: 'Eastern Passage, NS',       service: 'New Patient',        rating: 5, text: 'As someone new to Canada, I was unsure about the dental system here. Dentistry4U made everything easy — from explaining my options to handling the paperwork. So grateful for their patience.' },
]

const CARD_STYLE: React.CSSProperties = {
  background: 'rgba(248,244,234,0.90)',
  border: '1px solid rgba(8,21,74,0.10)',
  boxShadow: '0 18px 45px rgba(8,21,74,0.08)',
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} size={13} style={{ color: '#D9A23A', fill: '#D9A23A' }} />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="relative py-28 px-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, #EDD49A 0%, #E7E1D6 48%, #BEC6E0 100%)' }}>
      <div className="absolute inset-0 dot-grid opacity-[0.030] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(248,247,242,0.60) 0%, transparent 65%)' }} />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="section-eyebrow justify-center mb-5"
          >
            Patient Stories
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl mb-5"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#08154A' }}
          >
            Words from Our Community
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2"
          >
            <Stars n={5} />
            <span className="text-[13px] font-medium" style={{ color: '#5A6A8A' }}>5.0 · Google Reviews · Dartmouth, NS</span>
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5, boxShadow: '0 28px 70px rgba(8,21,74,0.14)' }}
              style={CARD_STYLE}
              className="rounded-3xl p-7 relative overflow-hidden group transition-all duration-300 cursor-default"
            >
              {/* Decorative quote */}
              <Quote
                size={64}
                className="absolute -top-2 -right-2 transition-colors"
                strokeWidth={1}
                style={{ color: 'rgba(8,21,74,0.07)' }}
              />

              <div className="flex items-start justify-between mb-4">
                <div>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm mb-2"
                    style={{ background: 'linear-gradient(135deg, #223B86, #08154A)' }}
                  >
                    {t.name[0]}
                  </div>
                  <div className="font-semibold text-[14px]" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: '#08154A' }}>{t.name}</div>
                  <div className="text-[11px]" style={{ color: '#5A6A8A' }}>{t.location}</div>
                </div>
                <span
                  className="text-[10px] font-bold px-3 py-1.5 rounded-full shrink-0 ml-3"
                  style={{ background: '#F8F7F2', color: '#223B86', border: '1px solid rgba(34,59,134,0.18)' }}
                >
                  {t.service}
                </span>
              </div>

              <Stars n={t.rating} />

              <p className="text-[13px] leading-relaxed mt-4" style={{ color: '#5A6A8A' }}>
                "{t.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
