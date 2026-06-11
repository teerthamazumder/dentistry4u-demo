import { motion } from 'framer-motion'

const particles = [
  { top: '8%',  left: '6%',  size: 8,  delay: 0,    duration: 4.2 },
  { top: '18%', left: '90%', size: 5,  delay: 0.8,  duration: 3.6 },
  { top: '72%', left: '4%',  size: 6,  delay: 1.4,  duration: 5.0 },
  { top: '82%', left: '88%', size: 9,  delay: 0.4,  duration: 4.6 },
  { top: '45%', left: '96%', size: 4,  delay: 2.0,  duration: 3.8 },
  { top: '55%', left: '2%',  size: 5,  delay: 1.0,  duration: 4.4 },
  { top: '92%', left: '50%', size: 7,  delay: 1.8,  duration: 5.2 },
  { top: '4%',  left: '55%', size: 4,  delay: 0.6,  duration: 3.4 },
]

export default function HeroAnimation() {
  return (
    <div className="relative w-full select-none">
      {/* ── Glow layers behind the card ── */}
      <div className="absolute inset-[-10%] rounded-[40px] bg-gradient-to-br from-primary-400/22 via-accent/12 to-primary-300/15 blur-3xl pointer-events-none" />
      <div className="absolute inset-[-18%] rounded-full border border-primary-200/25 animate-float-slow pointer-events-none" />
      <div className="absolute inset-[-26%] rounded-full border border-primary-100/15 animate-float pointer-events-none" />

      {/* ── Floating particle dots ── */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-accent pointer-events-none z-20"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -(p.size * 2 + 4), 0],
            opacity: [0.35, 0.85, 0.35],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* ── Premium glass card ── */}
      <div className="relative glass-premium rounded-[28px] overflow-hidden border border-white/75 shadow-elevated">
        {/* Inner top highlight */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none z-10" />

        {/* Animated WebP */}
        <img
          src="/dental-scroll-animation.webp"
          alt="Digital dental transformation animation"
          className="w-full h-auto object-contain block"
          fetchPriority="high"
          decoding="async"
        />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/30 to-transparent pointer-events-none z-10" />

        {/* Corner badge */}
        <div className="absolute bottom-4 right-4 glass rounded-full px-3 py-1.5 text-[10px] font-bold text-primary-700 border border-primary-100/60 z-20 whitespace-nowrap">
          Advanced Digital Dentistry
        </div>
      </div>

      {/* ── Floating stat chips (same as 3D version) ── */}
      <motion.div
        className="absolute -top-4 -right-4 glass-premium rounded-2xl px-4 py-3 shadow-elevated text-center min-w-[80px] z-30"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="text-xl font-extrabold text-gradient leading-none">12+</div>
        <div className="text-[10px] text-muted font-medium mt-0.5">Years Serving</div>
      </motion.div>

      <motion.div
        className="absolute -bottom-4 -left-4 glass-premium rounded-2xl px-4 py-3 shadow-elevated text-center min-w-[80px] z-30"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      >
        <div className="text-xl font-extrabold text-gradient leading-none">5★</div>
        <div className="text-[10px] text-muted font-medium mt-0.5">Google Rating</div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 -right-5 glass-premium rounded-2xl px-4 py-3 shadow-elevated text-center min-w-[80px] z-30"
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      >
        <div className="text-xl font-extrabold text-gradient leading-none">98%</div>
        <div className="text-[10px] text-muted font-medium mt-0.5">Satisfaction</div>
      </motion.div>
    </div>
  )
}
