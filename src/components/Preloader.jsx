import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
  const [phase, setPhase] = useState('intro'); // 'intro' | 'exit' | 'done'

  useEffect(() => {
    // Hold the full intro for 3s, then trigger exit wipe
    const t1 = setTimeout(() => setPhase('exit'), 3000);
    // Unmount after exit animation completes
    const t2 = setTimeout(() => setPhase('done'), 4400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="preloader"
          className="fixed inset-0 w-full h-screen z-[100000] overflow-hidden flex items-center justify-center"
          style={{ background: '#00050f' }}
          animate={phase === 'exit' ? { y: '-100%' } : { y: 0 }}
          transition={
            phase === 'exit'
              ? { duration: 1.3, ease: [0.76, 0, 0.24, 1] }
              : {}
          }
        >
          {/* ── Animated grid lines ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(26,111,255,0.06) 1px, transparent 1px),
                linear-gradient(90deg, rgba(26,111,255,0.06) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
            }}
          />

          {/* ── Corner scan lines ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0.2, 0.5, 0.15] }}
            transition={{ duration: 2.5, times: [0, 0.2, 0.5, 0.7, 1] }}
            style={{
              background:
                'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(26,111,255,0.03) 3px, rgba(26,111,255,0.03) 4px)',
            }}
          />

          {/* ── Radial glow center ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0.3, 0.8, 0.4] }}
            transition={{ duration: 3, ease: 'easeInOut' }}
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(26,111,255,0.18) 0%, transparent 70%)',
            }}
          />

          {/* ── Corner brackets top-left ── */}
          <motion.div
            className="absolute top-8 left-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <svg width="40" height="40" fill="none">
              <path d="M0 20 L0 0 L20 0" stroke="#1a6fff" strokeWidth="2" opacity="0.6" />
            </svg>
          </motion.div>

          {/* ── Corner brackets top-right ── */}
          <motion.div
            className="absolute top-8 right-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <svg width="40" height="40" fill="none">
              <path d="M40 20 L40 0 L20 0" stroke="#1a6fff" strokeWidth="2" opacity="0.6" />
            </svg>
          </motion.div>

          {/* ── Corner brackets bottom-left ── */}
          <motion.div
            className="absolute bottom-8 left-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <svg width="40" height="40" fill="none">
              <path d="M0 20 L0 40 L20 40" stroke="#1a6fff" strokeWidth="2" opacity="0.6" />
            </svg>
          </motion.div>

          {/* ── Corner brackets bottom-right ── */}
          <motion.div
            className="absolute bottom-8 right-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <svg width="40" height="40" fill="none">
              <path d="M40 20 L40 40 L20 40" stroke="#1a6fff" strokeWidth="2" opacity="0.6" />
            </svg>
          </motion.div>

          {/* ── Horizontal scan beam ── */}
          <motion.div
            className="absolute left-0 right-0 h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(77,148,255,0.6), transparent)' }}
            initial={{ top: '10%', opacity: 0 }}
            animate={{ top: ['10%', '90%'], opacity: [0, 0.8, 0.8, 0] }}
            transition={{ delay: 0.6, duration: 1.8, ease: 'easeInOut' }}
          />

          {/* ── MAIN CONTENT CENTER ── */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">

            {/* Tagline above */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-[10px] md:text-xs font-black tracking-[0.35em] uppercase mb-6 md:mb-8"
              style={{ color: 'rgba(77,148,255,0.6)' }}
            >
              Portfolio · 2025
            </motion.p>

            {/* Big NAME — letter-by-letter stagger */}
            <div className="overflow-hidden mb-2">
              <motion.div
                className="flex items-end gap-0"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.7 } },
                }}
              >
                {'Kevin'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { y: '110%', opacity: 0 },
                      visible: { y: 0, opacity: 1 },
                    }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="font-black leading-none"
                    style={{
                      fontSize: 'clamp(4.5rem, 18vw, 12rem)',
                      color: '#ffffff',
                      letterSpacing: '-0.03em',
                      display: 'inline-block',
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
                {/* The neon dot */}
                <motion.span
                  variants={{
                    hidden: { y: '110%', opacity: 0 },
                    visible: { y: 0, opacity: 1 },
                  }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="font-black leading-none neon-text"
                  style={{
                    fontSize: 'clamp(4.5rem, 18vw, 12rem)',
                    color: '#1a6fff',
                    letterSpacing: '-0.03em',
                    display: 'inline-block',
                  }}
                >
                  .
                </motion.span>
              </motion.div>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.7, ease: 'easeOut' }}
              className="text-sm md:text-lg font-medium tracking-widest uppercase"
              style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.25em' }}
            >
              Developer &amp; Innovator
            </motion.p>

            {/* Neon underline that draws in */}
            <div className="mt-6 md:mt-8 overflow-hidden h-px w-48 md:w-80 relative">
              <motion.div
                className="absolute left-0 top-0 h-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ delay: 1.7, duration: 0.9, ease: 'easeOut' }}
                style={{
                  background:
                    'linear-gradient(90deg, transparent, #1a6fff, #4d94ff, transparent)',
                  boxShadow: '0 0 8px rgba(26,111,255,0.8)',
                }}
              />
            </div>

            {/* Loading dots */}
            <motion.div
              className="flex gap-2 mt-8 md:mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.4 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1 h-1 rounded-full"
                  style={{ background: '#1a6fff' }}
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* ── Bottom metadata strip ── */}
          <motion.div
            className="absolute bottom-8 left-0 right-0 px-8 md:px-14 flex justify-between items-end pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <p
              className="text-[9px] md:text-[11px] font-mono tracking-widest"
              style={{ color: 'rgba(26,111,255,0.35)' }}
            >
              PONDICHERRY, INDIA
            </p>
            <p
              className="text-[9px] md:text-[11px] font-mono tracking-widest"
              style={{ color: 'rgba(26,111,255,0.35)' }}
            >
              REACT · AR · AI
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
