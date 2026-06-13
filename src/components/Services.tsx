import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView, type PanInfo } from 'framer-motion'
import {
  Search, Wrench, Sparkles, Moon, Stethoscope,
  Smile, Bone, AlignLeft, AlertCircle,
  Grid3X3, Layers, LayoutList, ChevronLeft, ChevronRight, ArrowRight,
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
  { icon: Search,      title: 'Preventative Care',        description: 'Regular checkups, professional cleanings, X-rays, fluoride treatments, and sealants to keep your teeth healthy and prevent problems before they start.',    tags: ['Cleanings', 'X-Rays', 'Fluoride'],          iconBg: 'bg-[#D9A23A]/15', iconColor: 'text-[#A9530B]' },
  { icon: Wrench,      title: 'Restorative Dentistry',    description: 'Fillings, crowns, bridges, and dental implants to restore damaged or missing teeth, bringing back both function and a natural appearance.',                   tags: ['Fillings', 'Crowns', 'Implants'],            iconBg: 'bg-[#223B86]/12', iconColor: 'text-[#223B86]' },
  { icon: Sparkles,    title: 'Cosmetic Dentistry',       description: "Teeth whitening, veneers, bonding, and smile makeovers to help you achieve the confident, radiant smile you've always wanted.",                              tags: ['Whitening', 'Veneers', 'Bonding'],           iconBg: 'bg-[#D9A23A]/15', iconColor: 'text-[#D9A23A]' },
  { icon: Moon,        title: 'Sedation Dentistry',       description: 'Safe and comfortable sedation options for patients with dental anxiety so you can receive the care you need in a calm, stress-free environment.',             tags: ['Nitrous Oxide', 'Oral Sedation'],            iconBg: 'bg-[#08154A]/8',  iconColor: 'text-[#223B86]' },
  { icon: Stethoscope, title: 'Endodontics',              description: 'Painless root canal therapy to save infected or damaged teeth. Modern techniques make this procedure far more comfortable than most people expect.',          tags: ['Root Canal', 'Pulpotomy'],                   iconBg: 'bg-[#223B86]/12', iconColor: 'text-[#223B86]' },
  { icon: Smile,       title: 'Dentures & Extractions',   description: 'Full and partial dentures crafted for comfort and natural appearance. Same-day emergency extractions available when you need prompt relief.',                 tags: ['Full Dentures', 'Partials', 'Extractions'],  iconBg: 'bg-[#A9530B]/12', iconColor: 'text-[#A9530B]' },
  { icon: Bone,        title: 'Periodontics',             description: 'Deep cleaning, scaling, and gum disease treatment to protect the foundation of your smile and support your overall systemic health.',                         tags: ['Deep Cleaning', 'Scaling'],                  iconBg: 'bg-[#D9A23A]/15', iconColor: 'text-[#A9530B]' },
  { icon: AlignLeft,   title: 'Orthodontics & Referrals', description: 'Assessment and referrals for orthodontic treatment including traditional braces and clear aligners. We coordinate your complete care journey.',              tags: ['Braces', 'Aligners', 'Referrals'],           iconBg: 'bg-[#223B86]/12', iconColor: 'text-[#223B86]' },
  { icon: AlertCircle, title: 'Emergency Dental Care',    description: "Sudden toothache or broken tooth? Same-day emergency appointments available Mon–Thu (until 7 PM) and Sat–Sun to get you out of pain fast.",             tags: ['Same-Day', 'Mon–Thu Eves', 'Sat & Sun'],     iconBg: 'bg-[#A9530B]/12', iconColor: 'text-[#A9530B]' },
]

/* ── Shared glass card style ── */
const CARD_STYLE: React.CSSProperties = {
  background: 'rgba(255, 252, 245, 0.58)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  border: '1px solid rgba(255, 255, 255, 0.42)',
  boxShadow: '0 20px 60px rgba(26, 43, 91, 0.10), inset 0 1px 0 rgba(255,255,255,0.60)',
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

const layoutIcons: Record<LayoutMode, React.ElementType> = {
  stack: Layers,
  grid: Grid3X3,
  list: LayoutList,
}

/* ── Reusable tag chip ── */
function Tag({ label }: { label: string }) {
  return (
    <span
      className="text-[10.5px] font-semibold px-2.5 py-[3px] rounded-full"
      style={{ background: 'rgba(34,59,134,0.08)', color: '#223B86', border: '1px solid rgba(34,59,134,0.16)' }}
    >
      {label}
    </span>
  )
}

export default function Services() {
  const titleRef = useRef<HTMLDivElement>(null)
  const inView = useInView(titleRef, { once: true })
  const [layout, setLayout] = useState<LayoutMode>('stack')
  const [activeIndex, setActiveIndex] = useState(0)

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info
    const swipe = Math.abs(offset.x) * velocity.x
    if (offset.x < -SWIPE_THRESHOLD || swipe < -1000) {
      setActiveIndex(prev => (prev + 1) % services.length)
    } else if (offset.x > SWIPE_THRESHOLD || swipe > 1000) {
      setActiveIndex(prev => (prev - 1 + services.length) % services.length)
    }
  }

  const getStackOrder = () => {
    const result: (Service & { stackPosition: number })[] = []
    for (let i = 0; i < services.length; i++) {
      const idx = (activeIndex + i) % services.length
      result.push({ ...services[idx], stackPosition: i })
    }
    return result.reverse()
  }

  const stackCards = getStackOrder().filter(c => c.stackPosition < 4)

  return (
    <section
      id="services"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #E7E1D6 0%, #EDD49A 48%, #E7E1D6 100%)' }}
    >
      <div className="absolute inset-0 dot-grid opacity-[0.040] pointer-events-none" />
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(248,247,242,0.55) 0%, transparent 65%)' }}
      />

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
              className="text-4xl xl:text-5xl leading-tight mb-5"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#08154A' }}
            >
              Complete Care<br />
              <span className="text-gradient">Under One Roof</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-[14px] leading-relaxed mb-8"
              style={{ color: '#5A6A8A' }}
            >
              From your first checkup to complex smile transformations, our experienced team provides the full spectrum of dental care with a gentle touch.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-[12px] font-medium"
              style={{ color: 'rgba(8,21,74,0.40)' }}
            >
              {services.length} services available
            </motion.div>
          </div>

          {/* ── Right: interactive card showcase ── */}
          <div className="flex-1 min-w-0">

            {/* Top bar: counter + layout toggle */}
            <div className="flex items-center justify-between mb-7">
              <div className="text-[13px] font-medium tabular-nums" style={{ color: 'rgba(8,21,74,0.45)' }}>
                {layout === 'stack'
                  ? `${activeIndex + 1} / ${services.length}`
                  : `All ${services.length} services`}
              </div>

              <div
                className="flex items-center gap-1 rounded-xl p-1.5"
                style={{ border: '1px solid rgba(8,21,74,0.10)', background: 'rgba(255,252,245,0.72)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
              >
                {(Object.keys(layoutIcons) as LayoutMode[]).map(mode => {
                  const Icon = layoutIcons[mode]
                  const isActive = layout === mode
                  return (
                    <button
                      key={mode}
                      onClick={() => setLayout(mode)}
                      className="rounded-lg p-2 transition-all duration-200"
                      style={
                        isActive
                          ? { background: '#223B86', color: '#fff' }
                          : { color: '#5A6A8A', background: 'transparent' }
                      }
                      aria-label={`Switch to ${mode} layout`}
                    >
                      <Icon size={15} />
                    </button>
                  )
                })}
              </div>
            </div>

            {/* ── Card views ── */}
            <AnimatePresence mode="wait" initial={false}>

              {/* Stack view */}
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
                        onDragEnd={handleDragEnd}
                        whileDrag={{ scale: 1.02 }}
                        style={{ position: 'absolute', ...CARD_STYLE }}
                        className={`left-0 right-0 rounded-3xl p-6 h-[272px] overflow-hidden ${
                          isTop ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none select-none'
                        }`}
                      >
                        <div className="flex items-start gap-4 h-full">
                          <div className={`w-11 h-11 rounded-2xl ${card.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                            <Icon size={20} className={card.iconColor} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3
                              className="text-[16px] leading-snug mb-2"
                              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: '#08154A' }}
                            >
                              {card.title}
                            </h3>
                            <p className="text-[13px] leading-relaxed line-clamp-3 mb-3" style={{ color: '#5A6A8A' }}>
                              {card.description}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {card.tags.map(tag => <Tag key={tag} label={tag} />)}
                            </div>
                          </div>
                        </div>
                        {isTop && (
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none">
                            <span className="text-[10px] font-medium tracking-wide" style={{ color: 'rgba(8,21,74,0.30)' }}>
                              Swipe to browse
                            </span>
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </motion.div>
              )}

              {/* Grid view */}
              {layout === 'grid' && (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
                >
                  {services.map((card, i) => {
                    const Icon = card.icon
                    return (
                      <motion.div
                        key={`grid-${card.title}`}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.045, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ y: -3 }}
                        style={CARD_STYLE}
                        className="rounded-2xl p-5 flex flex-col gap-3 group cursor-default"
                      >
                        {/* Icon */}
                        <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                          <Icon size={18} className={card.iconColor} />
                        </div>

                        {/* Title */}
                        <h3
                          className="leading-snug group-hover:text-[#223B86] transition-colors duration-200"
                          style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '0.93rem', color: '#08154A' }}
                        >
                          {card.title}
                        </h3>

                        {/* Description */}
                        <p className="text-[12px] leading-relaxed line-clamp-3 flex-1" style={{ color: '#5A6A8A' }}>
                          {card.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {card.tags.map(tag => <Tag key={tag} label={tag} />)}
                        </div>

                        {/* Learn more */}
                        <div className="flex items-center gap-1 pt-0.5">
                          <span
                            className="text-[11px] font-semibold group-hover:text-[#223B86] transition-colors duration-200"
                            style={{ color: 'rgba(8,21,74,0.38)' }}
                          >
                            Explore service
                          </span>
                          <ArrowRight
                            size={11}
                            className="group-hover:translate-x-0.5 group-hover:text-[#223B86] transition-all duration-200"
                            style={{ color: 'rgba(8,21,74,0.38)' }}
                          />
                        </div>
                      </motion.div>
                    )
                  })}
                </motion.div>
              )}

              {/* List view */}
              {layout === 'list' && (
                <motion.div
                  key="list"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-2.5"
                >
                  {services.map((card, i) => {
                    const Icon = card.icon
                    return (
                      <motion.div
                        key={`list-${card.title}`}
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ x: 4 }}
                        style={CARD_STYLE}
                        className="rounded-2xl px-5 py-4 flex items-center gap-4 group cursor-default"
                      >
                        <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                          <Icon size={18} className={card.iconColor} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-0.5">
                            <h3
                              className="leading-tight group-hover:text-[#223B86] transition-colors duration-200"
                              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#08154A' }}
                            >
                              {card.title}
                            </h3>
                            <div className="flex gap-1 flex-wrap">
                              {card.tags.slice(0, 2).map(tag => <Tag key={tag} label={tag} />)}
                            </div>
                          </div>
                          <p className="text-[12px] leading-snug line-clamp-1" style={{ color: '#5A6A8A' }}>
                            {card.description}
                          </p>
                        </div>
                        <ChevronRight size={14} className="shrink-0 group-hover:text-[#223B86] transition-colors duration-200" style={{ color: 'rgba(8,21,74,0.25)' }} />
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
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{ border: '1px solid rgba(8,21,74,0.15)', background: 'rgba(255,252,245,0.80)', color: '#5A6A8A' }}
                  aria-label="Previous service"
                >
                  <ChevronLeft size={14} />
                </button>

                <div className="flex items-center gap-1.5">
                  {services.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: index === activeIndex ? 20 : 6,
                        height: 6,
                        background: index === activeIndex ? '#223B86' : 'rgba(8,21,74,0.20)',
                      }}
                      aria-label={`Go to service ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setActiveIndex(prev => (prev + 1) % services.length)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{ border: '1px solid rgba(8,21,74,0.15)', background: 'rgba(255,252,245,0.80)', color: '#5A6A8A' }}
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
