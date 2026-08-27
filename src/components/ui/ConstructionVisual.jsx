import { motion } from "framer-motion";

/**
 * Animated construction-themed SVG — stacked building blocks rising,
 * a slowly swinging crane arm, and a pulsing blueprint grid.
 * Pure SVG + CSS/Framer Motion, no external assets.
 */
export default function ConstructionVisual() {
  return (
    <svg
      viewBox="0 0 320 320"
      className="construction-visual"
      role="img"
      aria-label="Animated illustration of a building under construction"
    >
      <defs>
                <linearGradient id="cv-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e6e8ec" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
      </defs>

      {/* blueprint grid dots */}
      <g className="cv-grid">
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 6 }).map((__, col) => (
            <circle
              key={`${row}-${col}`}
              cx={40 + col * 48}
              cy={40 + row * 48}
              r="1.6"
              fill="#3d3f7a"
              className="cv-dot"
              style={{ animationDelay: `${(row + col) * 0.12}s` }}
            />
          ))
        )}
      </g>

      {/* building blocks rising */}
      <motion.rect
        x="120" y="190" width="40" height="80"
        rx="3" fill="none" stroke="url(#cv-gradient)" strokeWidth="2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 0.9, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      />
      <motion.rect
        x="150" y="150" width="40" height="120"
        rx="3" fill="none" stroke="url(#cv-gradient)" strokeWidth="2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 0.9, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.25 }}
      />
      <motion.rect
        x="180" y="110" width="40" height="160"
        rx="3" fill="none" stroke="url(#cv-gradient)" strokeWidth="2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 0.9, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      />

      {/* window details on the tallest block */}
            {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x="188" y={130 + i * 30} width="10" height="14"
          fill="#ffffff" opacity="0.35" rx="1.5"
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={`b-${i}`}
          x="202" y={130 + i * 30} width="10" height="14"
          fill="#ffffff" opacity="0.2" rx="1.5"
        />
      ))}


      {/* crane mast + swinging arm */}
      <line x1="90" y1="270" x2="90" y2="90" stroke="url(#cv-gradient)" strokeWidth="3" strokeLinecap="round" />
      <g className="cv-crane-arm" style={{ transformOrigin: "90px 90px" }}>
        <line x1="90" y1="90" x2="230" y2="90" stroke="url(#cv-gradient)" strokeWidth="3" strokeLinecap="round" />
        <line x1="90" y1="90" x2="55" y2="90" stroke="url(#cv-gradient)" strokeWidth="3" strokeLinecap="round" />
                <line x1="150" y1="90" x2="150" y2="125" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
        <circle cx="150" cy="128" r="3" fill="#ffffff" />
      </g>
      <circle cx="90" cy="270" r="5" fill="url(#cv-gradient)" />

      {/* ground line */}
      <line x1="40" y1="270" x2="280" y2="270" stroke="#3d3f7a" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}