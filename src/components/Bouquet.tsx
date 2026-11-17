import { motion, AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import Chrysanthemum from './Chrysanthemum';

interface FloatingHeart {
  id: number;
  x: number;
  size: number;
}

interface BouquetProps {
  visible: boolean;
}

/* ── 13 Full, Lush, Multi-layered Florist Chrysanthemums ────────── */
const FLOWER_DATA = [
  // ── Back Layer (5 flowers forming the top graceful arch)
  { id: 0, color: '#c084fc', center: '#eab308', radius: 44, x: -75, y: -30, rot: -8 }, // Lila
  { id: 1, color: '#f472b6', center: '#facc15', radius: 46, x: -38, y: -62, rot: -3 }, // Canlı Pastel Pembe
  { id: 2, color: '#fffbeb', center: '#84cc16', radius: 48, x: 8,   y: -70, rot: 2 },  // Krem Beyaz (Zeytuni Göbek)
  { id: 3, color: '#fde047', center: '#ea580c', radius: 45, x: 52,  y: -55, rot: 6 },  // Açık Sarı
  { id: 4, color: '#fb923c', center: '#c2410c', radius: 44, x: 82,  y: -22, rot: 9 },  // Şeftali

  // ── Middle Layer (4 flowers giving body and fullness)
  { id: 5, color: '#f97316', center: '#9a3412', radius: 46, x: -72, y: 18,  rot: -10 }, // Canlı Turuncu
  { id: 6, color: '#a855f7', center: '#facc15', radius: 48, x: -28, y: -12, rot: -4 },  // Lavanta
  { id: 7, color: '#7e22ce', center: '#fef08a', radius: 48, x: 26,  y: -10, rot: 5 },   // Derin Mor
  { id: 8, color: '#fbcfe8', center: '#f59e0b', radius: 45, x: 72,  y: 22,  rot: 8 },   // Pudra Pembe

  // ── Front Layer (4 prominent foreground focal blooms)
  { id: 9,  color: '#fb7185', center: '#eab308', radius: 46, x: -44, y: 46, rot: -6 },  // Gül Pembesi
  { id: 10, color: '#e11d48', center: '#fde047', radius: 50, x: 2,   y: 30, rot: 0 },   // Fuşya (Başrol Çiçek)
  { id: 11, color: '#f59e0b', center: '#7c2d12', radius: 46, x: 48,  y: 48, rot: 7 },   // Sıcak Kehribar Sarı
  { id: 12, color: '#d946ef', center: '#fef08a', radius: 44, x: -8,  y: 72, rot: -2 },  // Canlı Eflatun
];

export default function Bouquet({ visible }: BouquetProps) {
  const [bloomCount, setBloomCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [animKey, setAnimKey] = useState(0);

  const allBloomed = bloomCount >= FLOWER_DATA.length;

  useEffect(() => {
    if (!allBloomed) return;
    const msgTimer = setTimeout(() => setShowMessage(true), 500);

    const heartInterval = setInterval(() => {
      setHearts((prev) => {
        if (prev.length > 18) return prev.slice(-12);
        return [
          ...prev,
          {
            id: Date.now() + Math.random(),
            x: 15 + Math.random() * 70,
            size: 14 + Math.random() * 12,
          },
        ];
      });
    }, 400);

    const stopHearts = setTimeout(() => clearInterval(heartInterval), 6000);
    return () => {
      clearTimeout(msgTimer);
      clearInterval(heartInterval);
      clearTimeout(stopHearts);
    };
  }, [allBloomed]);

  const handleFlowerComplete = useCallback(() => {
    setBloomCount((c) => c + 1);
  }, []);

  const handleReplay = useCallback(() => {
    setBloomCount(0);
    setShowMessage(false);
    setHearts([]);
    setAnimKey((k) => k + 1);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-4"
      style={{
        background: 'linear-gradient(180deg, #fdf8f4 0%, #fbebf2 50%, #f3e5f5 100%)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* ── Soft Ambient Glow & Shimmer Particles ─────────────── */}
      {Array.from({ length: 24 }, (_, i) => (
        <motion.div
          key={`ambient-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 3 + Math.random() * 4,
            height: 3 + Math.random() * 4,
            background: ['#f472b644', '#c084fc44', '#fde04744', '#fb923c44'][i % 4],
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -25 - Math.random() * 20, 0],
            opacity: [0, 0.7, 0],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Radial soft glow behind the bouquet */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          background:
            'radial-gradient(circle, rgba(244,114,182,0.22) 0%, rgba(192,132,252,0.12) 45%, transparent 70%)',
          filter: 'blur(50px)',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />

      {/* ── SVG Bouquet ─────────────────────────────────────── */}
      <motion.div
        className="relative z-10"
        animate={allBloomed ? { rotate: [0, 0.8, -0.8, 0], y: [0, -3, 0] } : {}}
        transition={allBloomed ? { duration: 5, repeat: Infinity, ease: 'easeInOut' } : {}}
      >
        <svg
          viewBox="-170 -120 340 400"
          className="w-[92vw] max-w-[480px] h-auto drop-shadow-sm"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* Satin Ribbon Gradient */}
            <linearGradient id="satinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="50%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>

            {/* Luxury Korean Floral Paper Gradients */}
            <linearGradient id="backPaperGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fdf2f8" />
              <stop offset="60%" stopColor="#fce7f3" />
              <stop offset="100%" stopColor="#fbcfe8" />
            </linearGradient>

            <linearGradient id="frontPaperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#fce7f3" />
            </linearGradient>

            {/* Soft Shadow */}
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#831843" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* ── Back Wrapping Paper (Fan/Collar behind the bouquet) */}
          <motion.g
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            filter="url(#softShadow)"
          >
            {/* Elegant scalloped / folded back florist collar */}
            <path
              d="M -135 50
                 C -140 -20, -100 -85, -45 -100
                 C 0 -110, 40 -105, 85 -80
                 C 135 -50, 140 10, 130 55
                 L 40 148
                 L -40 148
                 Z"
              fill="url(#backPaperGrad)"
              stroke="#f472b6"
              strokeWidth="0.8"
              opacity="0.95"
            />
            {/* Inner fold accents */}
            <path
              d="M -115 35 Q -65 -45 -25 -95"
              fill="none"
              stroke="#f472b6"
              strokeWidth="0.6"
              opacity="0.35"
            />
            <path
              d="M 115 35 Q 65 -40 25 -95"
              fill="none"
              stroke="#f472b6"
              strokeWidth="0.6"
              opacity="0.35"
            />
          </motion.g>

          {/* ── Trimmed Cut Stems (below ribbon, y: 148 to 195) ── */}
          <g>
            {[-22, -15, -8, -2, 4, 10, 16, 22].map((sx, idx) => (
              <path
                key={`stem-cut-${idx}`}
                d={`M ${sx * 0.45} 148 L ${sx * 1.05} ${186 + (idx % 3) * 4}`}
                stroke={idx % 2 === 0 ? '#3f6212' : '#4d7c0f'}
                strokeWidth={3}
                strokeLinecap="round"
              />
            ))}
          </g>

          {/* ── Front Wrapping Paper Cone (crossing neatly at waist) */}
          <motion.g
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            filter="url(#softShadow)"
          >
            {/* Left wrap flap */}
            <path
              d="M -75 75 C -85 105 -65 135 -35 152 L 0 152 L -10 95 Z"
              fill="url(#frontPaperGrad)"
              stroke="#f472b6"
              strokeWidth="0.6"
            />
            {/* Right wrap flap (overlapping) */}
            <path
              d="M 75 75 C 85 105 65 135 35 152 L -35 152 L 10 95 Z"
              fill="url(#frontPaperGrad)"
              stroke="#f472b6"
              strokeWidth="0.6"
            />
          </motion.g>

          {/* ── The 13 Full Blooming Chrysanthemums ────────────── */}
          {FLOWER_DATA.map((flower, i) => (
            <Chrysanthemum
              key={`${animKey}-${flower.id}`}
              id={flower.id}
              color={flower.color}
              centerColor={flower.center}
              radius={flower.radius}
              delay={i * 0.22}
              x={flower.x}
              y={flower.y}
              stemStartX={0}
              stemStartY={148}
              rotation={flower.rot}
              onComplete={handleFlowerComplete}
            />
          ))}

          {/* ── Silk Satin Ribbon & Bow (at y = 148) ──────────── */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            filter="url(#softShadow)"
          >
            {/* Satin ribbon waistband */}
            <path
              d="M -35 146 Q 0 142 35 146 Q 0 154 -35 146"
              fill="url(#satinGrad)"
              stroke="#db2777"
              strokeWidth="0.3"
            />

            {/* Left Bow Loop */}
            <path
              d="M 0 148
                 C -20 130, -45 136, -42 152
                 C -39 166, -18 162, 0 150"
              fill="url(#satinGrad)"
              stroke="#db2777"
              strokeWidth="0.4"
            />
            {/* Left loop inner shine */}
            <path
              d="M -4 148 C -18 138 -34 144 -30 152"
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.8"
              opacity="0.55"
            />

            {/* Right Bow Loop */}
            <path
              d="M 0 148
                 C 20 130, 45 136, 42 152
                 C 39 166, 18 162, 0 150"
              fill="url(#satinGrad)"
              stroke="#db2777"
              strokeWidth="0.4"
            />
            {/* Right loop inner shine */}
            <path
              d="M 4 148 C 18 138 34 144 30 152"
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.8"
              opacity="0.55"
            />

            {/* Center Bow Knot */}
            <ellipse cx={0} cy={149} rx={5.5} ry={4.5} fill="#c084fc" stroke="#9333ea" strokeWidth="0.4" />
            <circle cx={-1.5} cy={147.5} r={1.8} fill="#ffffff" opacity="0.6" />

            {/* Left Ribbon Streamer */}
            <path
              d="M -2 152
                 C -10 178, -24 202, -28 232
                 C -22 228, -15 218, -12 195
                 L -2 152"
              fill="url(#satinGrad)"
              stroke="#db2777"
              strokeWidth="0.3"
            />

            {/* Right Ribbon Streamer */}
            <path
              d="M 2 152
                 C 10 178, 24 202, 28 232
                 C 22 228, 15 218, 12 195
                 L 2 152"
              fill="url(#satinGrad)"
              stroke="#db2777"
              strokeWidth="0.3"
            />
          </motion.g>
        </svg>
      </motion.div>

      {/* ── Floating Hearts Celebration ──────────────────────── */}
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            className="absolute pointer-events-none z-20"
            style={{
              left: `${h.x}%`,
              bottom: '12%',
              fontSize: `${h.size}px`,
              color: ['#f472b6', '#c084fc', '#e11d48', '#a855f7', '#fb7185'][
                Math.floor(h.id) % 5
              ],
              textShadow: '0 2px 8px rgba(225,29,72,0.3)',
            }}
            initial={{ opacity: 0, y: 0, scale: 0.3 }}
            animate={{
              opacity: [0, 0.9, 0.7, 0],
              y: -200 - Math.random() * 120,
              scale: [0.3, 1.15, 0.85],
              x: (Math.random() - 0.5) * 50,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 + Math.random(), ease: 'easeOut' }}
          >
            ♥
          </motion.div>
        ))}
      </AnimatePresence>

      {/* ── Surprise Romantic Message & Replay Button ────────── */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="relative z-20 text-center mt-3 px-6 pb-4"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <motion.p
              className="text-2xl sm:text-3xl font-light mb-1.5"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: 'italic',
                color: '#3d252c',
                lineHeight: 1.4,
                letterSpacing: '0.02em',
                textShadow: '0 2px 20px rgba(244,114,182,0.18)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              Belki gerçek değiller ama her biri senin için açtı.
            </motion.p>
            <motion.span
              className="inline-block text-xl"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              ❤️
            </motion.span>

            <motion.div
              className="mt-8 sm:mt-10 mb-2 flex justify-center"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.button
                onClick={handleReplay}
                className="group relative px-14 sm:px-16 py-4 sm:py-5 min-w-[280px] sm:min-w-[330px] rounded-full cursor-pointer transition-all duration-500 overflow-hidden flex items-center justify-center gap-3.5 border"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  background: 'rgba(255, 255, 255, 0.88)',
                  color: '#4a2831',
                  borderColor: 'rgba(244, 114, 182, 0.35)',
                  boxShadow:
                    '0 12px 36px rgba(244, 114, 182, 0.14), 0 2px 6px rgba(0, 0, 0, 0.03), inset 0 1px 1px rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(16px)',
                }}
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
                  animate={{ x: [-260, 260] }}
                  transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.6 }}
                />

                <span className="relative z-10 font-light text-[11px] sm:text-xs tracking-[0.25em] uppercase">
                  Bir kez daha çiçek açtır
                </span>
                <span className="relative z-10 text-sm opacity-85 group-hover:rotate-12 transition-transform duration-300">
                  🌷
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
