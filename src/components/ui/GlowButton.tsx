import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary'
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
    base: 'bg-gradient-to-r from-[#0891B2] to-[#06B6D4] text-white border border-cyan-400/35',
    shadow: '0 12px 32px rgba(6,182,212,0.28)',
    hoverShadow: '0 16px 44px rgba(6,182,212,0.45)',
  },
  secondary: {
    base: 'bg-white/5 text-white/85 border border-slate-400/30 hover:border-cyan-400/55 hover:text-cyan-300',
    shadow: 'none',
    hoverShadow: '0 8px 24px rgba(34,211,238,0.12)',
  },
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

  const inner = (
    <motion.span
      whileHover={{ y: -2, boxShadow: v.hoverShadow }}
      whileTap={{ y: 0, boxShadow: v.shadow }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      style={{ boxShadow: v.shadow, display: fullWidth ? 'flex' : 'inline-flex' }}
      className={`items-center justify-center gap-2 font-semibold rounded-full transition-colors duration-200 select-none
        ${sizes[size]} ${v.base} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </motion.span>
  )

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={fullWidth ? 'block w-full' : 'inline-block'}
      >
        {inner}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-transparent border-none p-0 m-0 cursor-pointer ${fullWidth ? 'block w-full' : 'inline-block'}`}
    >
      {inner}
    </button>
  )
}
