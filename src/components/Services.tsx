import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView, type PanInfo } from 'framer-motion'
import {
  Search, Wrench, Sparkles, Moon, Stethoscope,
  Smile, Bone, AlignLeft, AlertCircle,
  Grid3X3, Layers, LayoutList, ChevronLeft, ChevronRight
} from 'lucide-react'

type LayoutMode = 'stack' | 'grid' | 'list'

const SWIPE_THRESHOLD = 50

interface Service {
  icon: React.ElementType
  title: string
  description: string
  tags: string[]
  iconBg: string
  iconColor: string
}

const services: Service[] = [
  {
    icon: Search,
    title: 'Preventative Care',
    description: 'Regular checkups, professional cleanings, X-rays, fluoride treatments, and sealants to keep your teeth healthy and prevent problems before they start.',
    tags: ['Cleanings', 'X-Rays', 'Fluoride'],
    iconBg: 'bg-cyan-500/20',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Wrench,
    title: 'Restorative Dentistry',
    description: 'Fillings, crowns, bridges, and dental implants to restore damaged or missing teeth, bringing back both function and a natural appearance.',
    tags: ['Fillings', 'Crowns', 'Implants'],
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
  },
  {
    icon: Sparkles,
    title: 'Cosmetic Dentistry',
    description: 'Teeth whitening, veneers, bonding, and smile makeovers to help you achieve the confident, radiant smile you\'ve always wanted.',
    tags: ['Whitening', 'Veneers', 'Bonding'],
    iconBg: 'bg-violet-500/20',
    iconColor: 'text-violet-400',
  },
  {
    icon: Moon,
    title: 'Sedation Dentistry',
    description: 'Safe and comfortable sedation options for patients with dental anxiety so you can receive the care you need in a calm, stress-free environment.',
    tags: ['Nitrous Oxide', 'Oral Sedation'],
    iconBg: 'bg-slate-500/20',
    iconColor: 'text-slate-300',
  },
  {
    icon: Stethoscope,
    title: 'Endodontics',
    description: 'Painless root canal therapy to save infected or damaged teeth. Modern techniques make this procedure far more comfortable than people expect.',
    tags: ['Root Canal', 'Pulpotomy'],
    iconBg: 'bg-teal-500/20',
    iconColor: 'text-teal-400',
  },
  {
    icon: Smile,
    title: 'Dentures & Extractions',
    description: 'Full and partial dentures crafted for comfort and natural appearance. Same-day emergency extractions available when you need prompt relief.',
    tags: ['Full Dentures', 'Partials', 'Extractions'],
    iconBg: 'bg-sky-500/20',
    iconColor: 'text-sky-400',
  },
  {
    icon: Bone,
    title: 'Periodontics',
    description: 'Deep cleaning, scaling, and gum disease treatment to protect the foundation of your smile and your overall systemic health.',
    tags: ['Deep Cleaning', 'Scaling'],
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-400',
  },
  {
    icon: AlignLeft,
    title: 'Orthodontics & Referrals',
    description: 'Assessment and referrals for orthodontic treatment including traditional braces and clear aligners. We coordinate your complete care journey.',
    tags: ['Braces', 'Aligners', 'Referrals'],
    iconBg: 'bg-indigo-500/20',
    iconColor: 'text-indigo-400',
  },
  {
    icon: AlertCircle,
    title: 'Emergency Dental Care',
    description: 'Sudden toothache? Broken tooth? Same-day emergency appointments with evening and weekend hours to get you out of pain fast.',
    tags: ['Same-Day', 'Evenings', 'Weekends'],
    iconBg: 'bg-rose-500/20',
    iconColor: 'text-rose-400',
  },
]

const CARD_GLASS: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(32, 72, 155, 0.68), rgba(8, 32, 74, 0.74))',
  backdropFilter: 'blur(16px) saturate(140%)',
  WebkitBackdropFilter: 'blur(16px) saturate(140%)',
  border: '1px solid rgba(255, 255, 255, 0.13)',
  boxShadow: '0 14px 40px rgba(0, 0, 0, 0.22)',
}

const CARD_GLASS_LIGHT: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(28, 62, 138, 0.58), rgba(8, 24, 60, 0.66))',
  backdropFilter: 'blur(14px) saturate(130%)',
  WebkitBackdropFilter: 'blur(14px) saturate(130%)',
  border: '1px solid rgba(255, 255, 255, 0.10)',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.18)',
}

function getStackStyles(pos: number) {
  return {
    top: pos * 11,
    left: 0,
    right: 0,
    zIndex: 5 - pos,
    rotate: pos * 1.6,
    opacity: Math.max(0, 1 - pos * 0.19),
    scale: 1 - pos * 0.018,
  }
}

const layoutIcons = {
  stack: Layers,
  grid: Grid3X3,
  list: LayoutList,
} as const

export default function Services() {
  const titleRef = useRef<HTMLDivElement>(null)
  const inView = useInView(titleRef, { once: true })
  const [layout, setLayout] = useState<LayoutMode>('stack')
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info
    const swipe = Math.abs(offset.x) * velocity.x
    if (offset.x < -SWIPE_THRESHOLD || swipe < -1000) {
      setActiveIndex(prev => (prev + 1) % services.length)
    } else if (offset.x > SWIPE_THRESHOLD || swipe > 1000) {
      setActiveIndex(prev => (prev - 1 + services.length) % services.length)
    }
    setIsDragging(false)
  }

  // Build ordered stack: active card = stackPosition 0 (top), then following cards
  const getStackOrder = () => {
    const result: (Service & { stackPosition: number })[] = []
    for (let i = 0; i < services.length; i++) {
      const idx = (activeIndex + i) % services.length
      result.push({ ...services[idx], stackPosition: i })
    }
    // Reverse so top card (pos 0) renders last = highest in DOM
    return result.reverse()
  }

  const stackCards = getStackOrder().filter(c => c.stackPosition < 4)

  return (
    <section id="services" className="relative py-28 px-6 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-primary-600/4 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full bg-cyan-500/3 blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

          {/* ── Left: sticky title block ── */}
          <div ref={titleRef} className="lg:w-[300px] xl:w-[340px] shrink-0 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="section-eyebrow mb-5"
            >
              What We Offer
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-5"
            >
              Complete Care<br />
              <span className="text-gradient">Under One Roof</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-panel-muted text-[14px] leading-relaxed mb-8"
            >
              From your first checkup to complex smile transformations, our experienced team provides the full spectrum of dental care with a gentle touch.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-[12px] text-sky-400/45 font-medium"
            >
              {services.length} services available
            </motion.div>
          </div>

          {/* ── Right: interactive card showcase ── */}
          <div className="flex-1 min-w-0">

            {/* Top bar: counter + layout toggle */}
            <div className="flex items-center justify-between mb-7">
              <div className="text-[13px] text-sky-300/45 font-medium tabular-nums">
                {layout === 'stack'
                  ? `${activeIndex + 1} / ${services.length}`
                  : `All ${services.length} services`}
              </div>

              <div className="flex items-center gap-1 rounded-xl border border-white/10 p-1.5" style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)' }}>
                {(Object.keys(layoutIcons) as LayoutMode[]).map(mode => {
                  const Icon = layoutIcons[mode]
                  return (
                    <button
                      key={mode}
                      onClick={() => setLayout(mode)}
                      className={`rounded-lg p-2 transition-all duration-200 ${
                        layout === mode
                          ? 'bg-[#D68631]/70 text-white shadow-glow-gold-sm'
                          : 'text-white/38 hover:text-[#D68631]/80 hover:bg-white/8'
                      }`}
                      aria-label={`Switch to ${mode} layout`}
                    >
                      <Icon size={15} />
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Card views */}
            <AnimatePresence mode="wait">

              {/* ── STACK VIEW ── */}
              {layout === 'stack' && (
                <motion.div
                  key="stack"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative h-[320px]"
                >
                  {stackCards.map(card => {
                    const styles = getStackStyles(card.stackPosition)
                    const isTop = card.stackPosition === 0
                    const Icon = card.icon

                    return (
                      <motion.div
                        key={`stack-${card.title}`}
                        animate={styles}
                        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                        drag={isTop ? 'x' : false}
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.55}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={handleDragEnd}
                        whileDrag={{ scale: 1.02 }}
                        style={{
                          position: 'absolute',
                          ...CARD_GLASS,
                        }}
                        className={`left-0 right-0 rounded-3xl p-6 h-[272px] overflow-hidden ${
                          isTop ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none select-none'
                        }`}
                        onClick={() => {
                          if (isDragging || !isTop) return
                        }}
                      >
                        <div className="flex items-start gap-4 h-full">
                          <div className={`w-11 h-11 rounded-2xl ${card.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                            <Icon size={20} className={card.iconColor} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-[16px] font-bold text-white mb-2 leading-snug">{card.title}</h3>
                            <p className="text-[13px] text-panel-muted leading-relaxed line-clamp-3 mb-3">{card.description}</p>
                            <div className="flex flex-wrap gap-1.5">
                              {card.tags.map(tag => (
                                <span
                                  key={tag}
                                  className="text-[11px] font-semibold bg-white/8 text-sky-300/75 border border-white/10 px-2.5 py-1 rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {isTop && (
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none">
                            <span className="text-[10px] text-white/22 font-medium tracking-wide">Swipe to browse</span>
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </motion.div>
              )}

              {/* ── GRID VIEW ── */}
              {layout === 'grid' && (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                >
                  {services.map((card, i) => {
                    const Icon = card.icon
                    return (
                      <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ y: -3, boxShadow: '0 22px 52px rgba(0,0,0,0.32)' }}
                        style={CARD_GLASS}
                        className="rounded-2xl p-5 group cursor-default transition-colors duration-200 hover:border-white/28"
                      >
                        <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform duration-200`}>
                          <Icon size={18} className={card.iconColor} />
                        </div>
                        <h3 className="text-[13px] font-bold text-white mb-1.5 leading-snug group-hover:text-[#D68631] transition-colors duration-200">{card.title}</h3>
                        <p className="text-[12px] text-panel-muted leading-relaxed line-clamp-2">{card.description}</p>
                      </motion.div>
                    )
                  })}
                </motion.div>
              )}

              {/* ── LIST VIEW ── */}
              {layout === 'list' && (
                <motion.div
                  key="list"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28 }}
                  className="flex flex-col gap-2.5"
                >
                  {services.map((card, i) => {
                    const Icon = card.icon
                    return (
                      <motion.div
                        key={card.title}
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ x: 4, boxShadow: '0 14px 40px rgba(0,0,0,0.28)' }}
                        style={CARD_GLASS_LIGHT}
                        className="rounded-2xl px-5 py-4 flex items-center gap-4 group cursor-default transition-colors duration-200 hover:border-white/24"
                      >
                        <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                          <Icon size={18} className={card.iconColor} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-0.5">
                            <h3 className="text-[13px] font-bold text-white leading-tight group-hover:text-[#D68631] transition-colors duration-200">{card.title}</h3>
                            <div className="flex gap-1 flex-wrap">
                              {card.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="text-[10px] font-semibold bg-white/6 text-sky-300/65 border border-white/8 px-2 py-0.5 rounded-full">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-[12px] text-panel-muted leading-snug line-clamp-1">{card.description}</p>
                        </div>
                        <ChevronRight size={14} className="text-white/22 shrink-0 group-hover:text-[#D68631]/55 transition-colors duration-200" />
                      </motion.div>
                    )
                  })}
                </motion.div>
              )}

            </AnimatePresence>

            {/* Navigation dots + arrows (stack mode only) */}
            {layout === 'stack' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-3 mt-8"
              >
                <button
                  onClick={() => setActiveIndex(prev => (prev - 1 + services.length) % services.length)}
                  className="w-8 h-8 rounded-full border border-white/14 bg-white/5 flex items-center justify-center text-white/45 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-200"
                  aria-label="Previous service"
                >
                  <ChevronLeft size={14} />
                </button>

                <div className="flex items-center gap-1.5">
                  {services.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`rounded-full transition-all duration-300 ${
                        index === activeIndex
                          ? 'w-5 h-1.5 bg-[#D68631]'
                          : 'w-1.5 h-1.5 bg-white/22 hover:bg-[#D68631]/50'
                      }`}
                      aria-label={`Go to service ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setActiveIndex(prev => (prev + 1) % services.length)}
                  className="w-8 h-8 rounded-full border border-white/14 bg-white/5 flex items-center justify-center text-white/45 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-200"
                  aria-label="Next service"
                >
                  <ChevronRight size={14} />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
