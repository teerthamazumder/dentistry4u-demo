// NOTE: UI placeholder only. Real authentication required before production.
// Do not store or display real patient data without a secure backend.

import { AnimatePresence, motion } from 'framer-motion'
import { X, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react'
import { GlowButton } from './ui/GlowButton'
import { useState } from 'react'

interface StaffLoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function StaffLoginModal({ isOpen, onClose }: StaffLoginModalProps) {
  const [showPw, setShowPw] = useState(false)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-deep-navy/70 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white rounded-[28px] shadow-2xl w-full max-w-[420px] overflow-hidden pointer-events-auto">
              {/* Header gradient */}
              <div
                className="relative px-8 py-7"
                style={{
                  background: 'linear-gradient(135deg, rgba(32,72,155,0.88), rgba(8,32,74,0.95))',
                  borderBottom: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                <div className="absolute inset-0 dot-grid opacity-[0.06]" />
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-primary-500/25 flex items-center justify-center mb-4 border border-primary-400/30">
                      <Lock size={22} className="text-accent" />
                    </div>
                    <h2 className="text-xl font-extrabold text-white">Staff Portal</h2>
                    <p className="text-sky-300/70 text-[13px] mt-1">Dentistry4U Team Access</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-white/40 hover:text-white transition-colors mt-1 p-1 rounded-lg hover:bg-white/10"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="px-8 py-7">
                {/* Warning */}
                <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3.5 mb-6">
                  <ShieldCheck size={16} className="text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-[12px] text-amber-700 leading-relaxed">
                    Staff portal requires authorized clinic credentials. Contact your system administrator for access.
                  </p>
                </div>

                <form onSubmit={e => e.preventDefault()} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-deep-navy uppercase tracking-wider mb-2">
                      Staff Email
                    </label>
                    <input
                      type="email"
                      placeholder="staff@dentistry4u.ca"
                      className="input-premium"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-deep-navy uppercase tracking-wider mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPw ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="input-premium pr-11"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw(v => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-brand-text transition-colors p-1"
                        aria-label={showPw ? 'Hide password' : 'Show password'}
                      >
                        {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <GlowButton type="submit" fullWidth size="md" className="mt-2">
                    Sign In to Portal
                  </GlowButton>
                </form>

                <p className="text-center text-[12px] text-muted mt-5">
                  Trouble signing in?{' '}
                  <a href="mailto:admin@dentistry4u.ca" className="text-primary-600 font-bold hover:underline">
                    admin@dentistry4u.ca
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
