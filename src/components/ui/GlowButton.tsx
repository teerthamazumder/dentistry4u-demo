import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'light' | 'outline-light'
type Size    = 'sm' | 'md' | 'lg'

interface GlowButtonProps {
  children?: ReactNode
  href?: string
  target?: string
  rel?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  className?: string
}

const sizes: Record<Size, string> = {
  sm: 'px-5  py-2.5 text-[13px]',
  md: 'px-6  py-3.5 text-[14px]',
  lg: 'px-7  py-4   text-[15px]',
}

const variants: Record<Variant, { base: string; shadow: string; hoverShadow: string }> = {
  primary: {
    base: 'bg-gradient-to-r from-[#223B86] to-[#08154A] text-white border border-[#08154A]/20',
    shadow: '0 4px 20px rgba(34,59,134,0.35)',
    hoverShadow: '0 10px 36px rgba(34,59,134,0.55)',
  },
  secondary: {
    base: 'bg-[#F8F7F2] text-[#08154A] border border-[rgba(8,21,74,0.18)] hover:border-[#223B86] hover:text-[#223B86]',
    shadow: '0 2px 12px rgba(8,21,74,0.08)',
    hoverShadow: '0 6px 22px rgba(34,59,134,0.18)',
  },
  light: {
    base: 'bg-white text-[#08154A] font-bold border-0',
    shadow: '0 4px 20px rgba(0,0,0,0.18)',
    hoverShadow: '0 8px 32px rgba(0,0,0,0.26)',
  },
  'outline-light': {
    base: 'bg-transparent text-white/80 border border-white/30 hover:border-white/65 hover:text-white',
    shadow: '0 2px 10px rgba(0,0,0,0.10)',
    hoverShadow: '0 6px 22px rgba(0,0,0,0.20)',
  },
}

/* Two shared glow layers — mirroring the button.txt multi-layer conic approach */
function GlowLayers() {
  return (
    <>
      {/* Outer ring: broad blur, navy→sky→gold sweep */}
      <div className="glow-layer-1" aria-hidden="true"><span /></div>
      {/* Inner ring: tighter blur, sky→gold sweep */}
      <div className="glow-layer-2" aria-hidden="true"><span /></div>
    </>
  )
}

export function GlowButton({
  children,
  href,
  target,
  rel,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
}: GlowButtonProps) {
  const v = variants[variant]
  const wrapClass = `glow-btn-wrap ${variant} ${fullWidth ? 'flex w-full' : 'inline-flex'}`

  const inner = (
    <motion.span
      whileHover={{ y: -1.5, boxShadow: v.hoverShadow }}
      whileTap={{ y: 0, boxShadow: v.shadow }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      style={{ boxShadow: v.shadow, display: fullWidth ? 'flex' : 'inline-flex' }}
      className={`relative z-0 items-center justify-center gap-2 font-semibold rounded-full
        transition-colors duration-200 select-none
        ${sizes[size]} ${v.base} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </motion.span>
  )

  if (href) {
    return (
      <div className={wrapClass}>
        <GlowLayers />
        <a
          href={href}
          target={target}
          rel={rel}
          className={fullWidth ? 'block w-full' : 'inline-block'}
        >
          {inner}
        </a>
      </div>
    )
  }

  return (
    <div className={wrapClass}>
      <GlowLayers />
      <button
        type={type}
        onClick={onClick}
        className={`bg-transparent border-none p-0 m-0 cursor-pointer ${fullWidth ? 'block w-full' : 'inline-block'}`}
      >
        {inner}
      </button>
    </div>
  )
}
