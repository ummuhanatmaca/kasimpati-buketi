import { motion } from 'framer-motion';
import { useState, useCallback, useMemo } from 'react';

export interface ChrysanthemumProps {
  color: string;
  centerColor: string;
  radius: number;
  delay: number;
  x: number;
  y: number;
  stemStartX?: number;
  stemStartY?: number;
  rotation?: number;
  id: number;
  onComplete?: () => void;
}

/* ── Color calculation helpers ─────────────────────────────────── */
function parseHex(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const n = parseInt(clean, 16);
  if (clean.length === 3) {
    return [
      ((n >> 8) & 0xf) * 17,
      ((n >> 4) & 0xf) * 17,
      (n & 0xf) * 17,
    ];
  }
  return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
}

function shade(hex: string, percent: number): string {
  const [r, g, b] = parseHex(hex);
  const factor = 1 + percent / 100;
  return `rgb(${Math.min(255, Math.max(0, Math.round(r * factor)))}, ${Math.min(
    255,
    Math.max(0, Math.round(g * factor))
  )}, ${Math.min(255, Math.max(0, Math.round(b * factor)))})`;
}

/**
 * Creates a slender, elegant chrysanthemum petal pointing vertically up (along -Y).
 * Origin (0,0) is at the flower center.
 */
function getPetalPath(len: number, w: number): string {
  const half = w / 2;
  return [
    'M 0 0',
    `C ${half * 0.4} ${-len * 0.2}, ${half} ${-len * 0.45}, ${half} ${-len * 0.7}`,
    `C ${half} ${-len * 0.88}, ${half * 0.5} ${-len * 0.98}, 0 ${-len}`,
    `C ${-half * 0.5} ${-len * 0.98}, ${-half} ${-len * 0.88}, ${-half} ${-len * 0.7}`,
    `C ${-half} ${-len * 0.45}, ${-half * 0.4} ${-len * 0.2}, 0 0`,
    'Z',
  ].join(' ');
}

export default function Chrysanthemum({
  color,
  centerColor,
  radius,
  delay,
  x,
  y,
  stemStartX = 0,
  stemStartY = 150,
  rotation = 0,
  id,
  onComplete,
}: ChrysanthemumProps) {
  const [sparkles, setSparkles] = useState<{ id: number; cx: number; cy: number }[]>([]);
  const [bloomed, setBloomed] = useState(false);

  /*
   * 5 concentric petal tiers (total ~74 petals per flower).
   * Outer petals are longest & slightly darker.
   * Inner petals are progressively shorter, brighter, and denser.
   */
  const layers = useMemo(() => [
    { count: 18, len: radius * 0.98, w: radius * 0.13, angleOff: 0,  shadePct: -12, opacity: 0.92 },
    { count: 16, len: radius * 0.84, w: radius * 0.135, angleOff: 11, shadePct: -4,  opacity: 0.96 },
    { count: 15, len: radius * 0.70, w: radius * 0.14, angleOff: 5,  shadePct: 6,   opacity: 1 },
    { count: 13, len: radius * 0.54, w: radius * 0.145, angleOff: 15, shadePct: 16,  opacity: 1 },
    { count: 11, len: radius * 0.38, w: radius * 0.15, angleOff: 8,  shadePct: 26,  opacity: 1 },
  ], [radius]);

  const handleClick = useCallback(() => {
    const pts = Array.from({ length: 8 }, (_, i) => {
      const a = (i * 45 * Math.PI) / 180;
      const d = radius * 0.7;
      return {
        id: Date.now() + i,
        cx: Math.cos(a) * d,
        cy: Math.sin(a) * d,
      };
    });
    setSparkles(pts);
    setTimeout(() => setSparkles([]), 800);
  }, [radius]);

  /*
   * Natural stem curving gracefully from the bouquet tie-point (stemStartX, stemStartY)
   * up to this flower's head (x, y).
   */
  const stemDx = stemStartX - x;
  const stemDy = stemStartY - y;
  // Control point creates a natural, gentle outward bow towards the bouquet edge
  const cpx = stemDx * 0.5 + (x > 0 ? 12 : -12);
  const cpy = stemDy * 0.55;
  const stemPath = `M ${stemDx} ${stemDy} Q ${cpx} ${cpy} 0 0`;

  // Small leafy green sprigs attached to stem
  const leafX = stemDx * 0.45;
  const leafY = stemDy * 0.45;

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* ── Stem Growing Upwards ──────────────────────────────── */}
      <motion.path
        d={stemPath}
        fill="none"
        stroke="#437732"
        strokeWidth={Math.max(3, radius * 0.065)}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      />
      <motion.path
        d={stemPath}
        fill="none"
        stroke="#6fad52"
        strokeWidth={Math.max(1.6, radius * 0.035)}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: delay + 0.05, duration: 0.45, ease: 'easeOut' }}
      />

      {/* Stem Leaf Sprig */}
      <motion.path
        d={`M ${leafX} ${leafY}
            C ${leafX + (x > 0 ? 18 : -18)} ${leafY - 6},
              ${leafX + (x > 0 ? 24 : -24)} ${leafY - 18},
              ${leafX + (x > 0 ? 20 : -20)} ${leafY - 26}
            C ${leafX + (x > 0 ? 12 : -12)} ${leafY - 18},
              ${leafX + (x > 0 ? 6 : -6)} ${leafY - 8},
              ${leafX} ${leafY}`}
        fill="#5c9c40"
        stroke="#396827"
        strokeWidth={0.4}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: delay + 0.25, duration: 0.3 }}
        style={{ transformOrigin: `${leafX}px ${leafY}px` }}
      />

      {/* ── Flower Head ───────────────────────────────────────── */}
      <motion.g
        style={{ cursor: 'pointer' }}
        whileHover={{ scale: 1.08 }}
        animate={
          bloomed
            ? {
                rotate: [rotation, rotation + 1.2, rotation - 1.2, rotation],
              }
            : { rotate: rotation }
        }
        transition={
          bloomed
            ? {
                rotate: {
                  repeat: Infinity,
                  duration: 4 + (id % 4) * 0.5,
                  ease: 'easeInOut',
                },
              }
            : {}
        }
        onClick={handleClick}
      >
        {/* Calyx green base sepals */}
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.35, duration: 0.25 }}
        >
          {Array.from({ length: 8 }, (_, i) => (
            <g key={`sepal-${i}`} transform={`rotate(${i * 45 + 10})`}>
              <path
                d={getPetalPath(radius * 0.25, radius * 0.09)}
                fill="#437732"
                stroke="#2d5220"
                strokeWidth={0.3}
              />
            </g>
          ))}
        </motion.g>

        {/* ── 5 Radial Petal Layers ───────────────────────────── */}
        {/*
         * CRITICAL FIX: The outer <g> has a static SVG `transform="rotate(angle)"`.
         * Framer Motion only animates the inner `<motion.path scale>`, so rotation
         * is NEVER overwritten or clobbered! Every petal radiates outward perfectly!
         */}
        {layers.map((layer, li) =>
          Array.from({ length: layer.count }, (_, pi) => {
            const angle = (360 / layer.count) * pi + layer.angleOff;
            const pDelay = delay + 0.4 + li * 0.07 + pi * 0.01;
            const petalFill = shade(color, layer.shadePct);
            const petalStroke = shade(color, layer.shadePct - 24);
            const isLast = li === layers.length - 1 && pi === layer.count - 1;

            return (
              <g key={`petal-outer-${li}-${pi}`} transform={`rotate(${angle})`}>
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: layer.opacity }}
                  transition={{
                    delay: pDelay,
                    duration: 0.32,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  onAnimationComplete={
                    isLast
                      ? () => {
                          setBloomed(true);
                          onComplete?.();
                        }
                      : undefined
                  }
                >
                  {/* Petal body */}
                  <path
                    d={getPetalPath(layer.len, layer.w)}
                    fill={petalFill}
                    stroke={petalStroke}
                    strokeWidth={0.35}
                  />
                  {/* Fine highlight spine down petal center */}
                  <line
                    x1={0}
                    y1={-layer.len * 0.15}
                    x2={0}
                    y2={-layer.len * 0.85}
                    stroke="#ffffff"
                    strokeWidth={0.5}
                    strokeLinecap="round"
                    opacity={0.35}
                  />
                </motion.g>
              </g>
            );
          })
        )}

        {/* ── Flower Center Eye (Çiçek Göbeği) ─────────────────── */}
        {/* Main round center disc */}
        <motion.circle
          cx={0}
          cy={0}
          r={radius * 0.16}
          fill={centerColor}
          stroke={shade(centerColor, -40)}
          strokeWidth={0.5}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.9, duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        />
        {/* Soft 3D dome highlight */}
        <motion.circle
          cx={-radius * 0.035}
          cy={-radius * 0.035}
          r={radius * 0.10}
          fill="#fffde7"
          opacity={0.65}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.95, duration: 0.25 }}
        />
        {/* Textured ring of golden floret dots */}
        {Array.from({ length: 10 }, (_, i) => {
          const a = (i * 36 * Math.PI) / 180;
          const rDot = radius * 0.095;
          return (
            <motion.circle
              key={`dot-${i}`}
              cx={Math.cos(a) * rDot}
              cy={Math.sin(a) * rDot}
              r={radius * 0.018}
              fill={shade(centerColor, -55)}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + 1.0 + i * 0.012, duration: 0.1 }}
            />
          );
        })}
        {/* Inner tight center seeds */}
        {Array.from({ length: 5 }, (_, i) => {
          const a = (i * 72 * Math.PI) / 180;
          const rDot = radius * 0.042;
          return (
            <motion.circle
              key={`inner-dot-${i}`}
              cx={Math.cos(a) * rDot}
              cy={Math.sin(a) * rDot}
              r={radius * 0.015}
              fill={shade(centerColor, -70)}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + 1.08 + i * 0.01, duration: 0.08 }}
            />
          );
        })}
      </motion.g>

      {/* ── Click Sparkles ────────────────────────────────────── */}
      {sparkles.map((s) => (
        <motion.circle
          key={s.id}
          cx={s.cx}
          cy={s.cy}
          r={3}
          fill="#fffde7"
          initial={{ opacity: 1, scale: 0 }}
          animate={{ opacity: 0, scale: 1.8 }}
          transition={{ duration: 0.6 }}
        />
      ))}
    </g>
  );
}
