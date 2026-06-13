import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface CountUpStatProps {
  target: number
  suffix?: string
  duration?: number
  delay?: number
  className?: string
  style?: React.CSSProperties
}

export function CountUpStat({
  target,
  suffix = '',
  duration = 2400,
  delay = 0,
  className,
  style,
}: CountUpStatProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let intervalId: ReturnType<typeof setInterval>
    const timeoutId = setTimeout(() => {
      const startTime = Date.now()
      intervalId = setInterval(() => {
        const progress = Math.min((Date.now() - startTime) / duration, 1)
        // ease-out cubic — fast start, smooth deceleration into final value
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(eased * target))
        if (progress >= 1) clearInterval(intervalId)
      }, 50)
    }, delay)
    return () => {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [inView, target, duration, delay])

  return (
    <span ref={ref} className={className} style={style}>
      {count}{suffix}
    </span>
  )
}
