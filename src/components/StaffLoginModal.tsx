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
            className="fixed inset-0 z-[60] backdrop-blur-md"
            style={{ background: 'rgba(8,21,74,0.60)' }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="rounded-[28px] shadow-2xl w-full max-w-[420px] overflow-hidden pointer-events-auto"
              style={{ background: '#F8F7F2', border: '1px solid rgba(8,21,74,0.10)' }}
            >
              {/* Navy header */}
              <div
                className="relative px-8 py-7"
                style={{ background: 'linear-gradient(135deg, #223B86, #08154A)' }}
              >
                <div className="absolute inset-0 dot-grid opacity-[0.06]" />
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)' }}>
                      <Lock size={22} className="text-white" />
                    </div>
                    <h2 className="text-xl text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Staff Portal</h2>
                    <p className="text-[13px] mt-1" style={{ color: 'rgba(255,255,255,0.65)' }}>Dentistry4U Team Access</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="transition-colors mt-1 p-1 rounded-lg hover:bg-white/10"
                    style={{ color: 'rgba(255,255,255,0.50)' }}
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="px-8 py-7">
                {/* Warning */}
                <div className="flex items-start gap-3 rounded-2xl px-4 py-3.5 mb-6" style={{ background: 'rgba(217,162,58,0.08)', border: '1px solid rgba(217,162,58,0.25)' }}>
                  <ShieldCheck size={16} className="shrink-0 mt-0.5" style={{ color: '#A9530B' }} />
                  <p className="text-[12px] leading-relaxed" style={{ color: '#A9530B' }}>
                    Staff portal requires authorized clinic credentials. Contact your system administrator for access.
                  </p>
                </div>

                <form onSubmit={e => e.preventDefault()} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(8,21,74,0.60)' }}>
                      Staff Email
                    </label>
                    <input
                      type="email"
                      placeholder="staff@dentistry4u.ca"
                      className="input-premium"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(8,21,74,0.60)' }}>
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
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors p-1"
                        style={{ color: '#5A6A8A' }}
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

                <p className="text-center text-[12px] mt-5" style={{ color: '#5A6A8A' }}>
                  Trouble signing in?{' '}
                  <a href="mailto:admin@dentistry4u.ca" className="font-bold hover:underline" style={{ color: '#223B86' }}>
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
