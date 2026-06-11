import { useEffect, useRef } from 'react'
import { useScroll } from 'framer-motion'

export default function AnimatedPageBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.pause()

    const unsubscribe = scrollYProgress.on('change', (progress) => {
      if (!video.duration) return
      try {
        video.currentTime = progress * video.duration
      } catch {
        // ignore seek errors before metadata loads
      }
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <video
        ref={videoRef}
        src="/animated-scroll.mp4"
        muted
        playsInline
        preload="auto"
        style={{ willChange: 'transform' }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Primary dark overlay */}
      <div className="absolute inset-0 bg-slate-950/65" />

      {/* Cyan/navy tonal overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#071A2E]/55 via-transparent to-[#051422]/45" />

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-primary-700/8 blur-[160px] pointer-events-none" />

      {/* Top vignette */}
      <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-slate-950/55 to-transparent pointer-events-none" />

      {/* Bottom vignette */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-slate-950/75 to-transparent pointer-events-none" />
    </div>
  )
}
