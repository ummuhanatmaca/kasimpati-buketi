import { motion, AnimatePresence } from 'framer-motion';

interface OpeningScreenProps {
  onOpen: () => void;
  visible: boolean;
}

export default function OpeningScreen({ onOpen, visible }: OpeningScreenProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center select-none px-6"
          style={{
            background:
              'radial-gradient(circle at 50% 40%, #ffffff 0%, #fdf5f8 40%, #fbebf2 75%, #f4e8f8 100%)',
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Subtle Dreamy Ambient Bokeh Lights */}
          <motion.div
            className="absolute w-[450px] h-[450px] rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(244, 114, 182, 0.12) 0%, rgba(192, 132, 252, 0.06) 50%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            animate={{
              scale: [1, 1.12, 1],
              opacity: [0.6, 0.85, 0.6],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Minimal Floating Shimmer Particles */}
          {Array.from({ length: 12 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 2.5 + (i % 3),
                height: 2.5 + (i % 3),
                background: ['#f472b6', '#c084fc', '#fbcfe8', '#fde047'][i % 4],
                left: `${12 + ((i * 17) % 76)}%`,
                top: `${14 + ((i * 23) % 72)}%`,
                opacity: 0.25,
              }}
              animate={{
                y: [0, -16, 0],
                opacity: [0.15, 0.45, 0.15],
              }}
              transition={{
                duration: 4.5 + (i % 4),
                repeat: Infinity,
                delay: i * 0.4,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Minimalist Editorial Presentation Card */}
          <motion.div
            className="relative z-10 text-center max-w-lg mx-auto flex flex-col items-center"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Minimal Eyebrow Tag */}
            <motion.span
              className="text-xs uppercase tracking-[0.35em] text-rose-400/90 font-sans font-light mb-4 block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Senin İçin
            </motion.span>

            {/* Poetic & Elegant Heading */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-light text-stone-800 tracking-wide leading-tight mb-4"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: 'italic',
                fontWeight: 300,
                color: '#3d252c',
                textShadow: '0 2px 20px rgba(244, 114, 182, 0.15)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.9 }}
            >
              Küçük bir sürprizim var...
            </motion.h1>

            {/* Delicate Floral Accent Line */}
            <motion.div
              className="flex items-center justify-center gap-2 mb-16 sm:mb-20 text-rose-300/80"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-rose-200" />
              <span className="text-sm">🌸</span>
              <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-rose-200" />
            </motion.div>

            {/* ── Geniş Kutu & Zarif Küçük Tipografi ── */}
            <motion.button
              onClick={onOpen}
              className="group relative px-14 sm:px-16 py-4 sm:py-5 min-w-[250px] sm:min-w-[280px] rounded-full cursor-pointer transition-all duration-500 overflow-hidden flex items-center justify-center gap-4 border"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                background: 'rgba(255, 255, 255, 0.88)',
                color: '#4a2831',
                borderColor: 'rgba(244, 114, 182, 0.35)',
                boxShadow:
                  '0 12px 36px rgba(244, 114, 182, 0.14), 0 2px 6px rgba(0, 0, 0, 0.03), inset 0 1px 1px rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(16px)',
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.7 }}
              whileHover={{
                scale: 1.03,
                background: 'rgba(255, 255, 255, 0.98)',
                borderColor: 'rgba(244, 114, 182, 0.65)',
                color: '#2a141b',
                boxShadow:
                  '0 16px 44px rgba(244, 114, 182, 0.26), 0 4px 10px rgba(0, 0, 0, 0.04)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Subtle Silk Shimmer Effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)',
                }}
                animate={{ x: [-240, 240] }}
                transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.6 }}
              />

              {/* Küçük, zarif, aralıklı metin (geniş kutu içinde ferahça nefes alıyor) */}
              <span className="relative z-10 font-light text-xs sm:text-[13px] tracking-[0.28em] uppercase">
                Çiçeklerini Aç
              </span>

              {/* Minimalist interactive arrow icon */}
              <motion.span
                className="relative z-10 text-rose-400 transition-transform duration-300 group-hover:translate-x-1.5"
                style={{ fontSize: '14px' }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>

          {/* Minimalist Subtle Footer */}
          <div className="absolute bottom-8 text-[11px] uppercase tracking-[0.3em] text-rose-300/60 font-sans font-light pointer-events-none">
            Dijital Çiçek Buketi
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
