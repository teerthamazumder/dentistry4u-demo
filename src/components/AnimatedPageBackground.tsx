import { motion } from 'framer-motion'

const blobs = [
  {
    style: { top: '-180px', left: '-180px', width: '720px', height: '720px' },
    background: 'rgba(237,212,154,0.32)',
    animate: { x: [0, 55, 20, 0], y: [0, 35, -20, 0] },
    duration: 22,
  },
  {
    style: { top: '-120px', right: '-200px', width: '640px', height: '640px' },
    background: 'rgba(34,59,134,0.14)',
    animate: { x: [0, -45, 10, 0], y: [0, 50, 20, 0] },
    duration: 28,
  },
  {
    style: { bottom: '-200px', left: '30%', width: '700px', height: '520px' },
    background: 'rgba(217,162,58,0.14)',
    animate: { x: [0, -30, 40, 0], y: [0, -40, 15, 0] },
    duration: 34,
  },
  {
    style: { top: '40%', left: '-100px', width: '480px', height: '480px' },
    background: 'rgba(47,125,92,0.10)',
    animate: { x: [0, 40, -10, 0], y: [0, -30, 20, 0] },
    duration: 26,
  },
]

export default function AnimatedPageBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(145deg, #F5EFE4 0%, #EDE8D8 55%, #E8E2D4 100%)' }}
      />

      {/* Animated ambient blobs */}
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            ...blob.style,
            background: blob.background,
            filter: 'blur(120px)',
          }}
          animate={blob.animate}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatType: 'mirror',
          }}
        />
      ))}
    </div>
  )
}
