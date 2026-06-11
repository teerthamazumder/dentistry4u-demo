import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  { name: 'Sarah M.', location: 'Dartmouth, NS', service: 'Sedation Dentistry', rating: 5, text: 'I\'ve been going to Dentistry4U for over five years. The team is always warm, professional, and thorough. They helped me finally feel comfortable at the dentist. Highly recommend to anyone nervous about dental visits.' },
  { name: 'James T.', location: 'Cole Harbour, NS', service: 'CDCP Coverage', rating: 5, text: 'They helped me navigate the CDCP and got my whole family covered. The billing process was completely seamless and the staff was incredibly helpful. We\'ve found our dental home here in Dartmouth.' },
  { name: 'Priya K.', location: 'Eastern Passage, NS', service: 'New Patient', rating: 5, text: 'As someone new to Canada, I was unsure about the dental system here. Dentistry4U made everything easy — from explaining my options to handling the paperwork. So grateful for their patience.' },
  { name: 'Robert L.', location: 'Dartmouth, NS', service: 'Emergency Care', rating: 5, text: 'Had a dental emergency on a Saturday morning and they got me in same day. The root canal was actually painless — modern techniques have come a long way. Amazing team.' },
  { name: 'Maria D.', location: 'Dartmouth, NS', service: 'Family Dentistry', rating: 5, text: 'My daughter had her first cleaning here at age 4 and the hygienist was so patient and gentle. She actually looks forward to dentist visits now! The office has such a calming, premium feel.' },
  { name: 'Ahmed R.', location: 'Lake Loon, NS', service: 'Cosmetic Dentistry', rating: 5, text: 'The cosmetic work I had done exceeded my expectations. My smile looks completely natural. The team takes the time to explain every step and the results speak for themselves.' },
]

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="relative py-28 px-6 overflow-hidden">
      {/* Glow accent — animated background shows through */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary-700/10 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-[0.04] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2.5 bg-white/8 border border-white/12 text-white/60 text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
          >
            Patient Stories
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-5"
          >
            What Our Patients Say
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2"
          >
            <Stars n={5} />
            <span className="text-sky-300/80 text-[13px] font-semibold">5.0 · Google Reviews · Dartmouth, NS</span>
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
              whileHover={{ y: -5 }}
              className="glass-dark rounded-3xl p-7 border border-white/10 hover:border-primary-500/30 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Decorative quote */}
              <Quote
                size={64}
                className="absolute -top-2 -right-2 text-white/4 group-hover:text-white/7 transition-colors"
                strokeWidth={1}
              />

              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-accent flex items-center justify-center text-white font-extrabold text-sm mb-2">
                    {t.name[0]}
                  </div>
                  <div className="font-bold text-white text-[14px]">{t.name}</div>
                  <div className="text-sky-300/60 text-[11px]">{t.location}</div>
                </div>
                <span className="text-[10px] font-bold bg-white/8 border border-white/12 text-sky-300 px-3 py-1.5 rounded-full shrink-0 ml-3">
                  {t.service}
                </span>
              </div>

              <Stars n={t.rating} />

              <p className="text-sky-100/70 text-[13px] leading-relaxed mt-4">
                "{t.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
