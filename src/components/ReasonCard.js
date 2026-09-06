'use client';
import { useState } from 'react';

const GRADIENTS = [
  'linear-gradient(135deg, rgba(46, 24, 30, 0.95), rgba(90, 36, 50, 0.85), rgba(22, 14, 18, 0.95))',
  'linear-gradient(135deg, rgba(38, 26, 48, 0.95), rgba(76, 42, 92, 0.85), rgba(20, 15, 28, 0.95))',
  'linear-gradient(135deg, rgba(52, 34, 22, 0.95), rgba(98, 62, 38, 0.85), rgba(28, 18, 14, 0.95))',
  'linear-gradient(135deg, rgba(22, 38, 42, 0.95), rgba(38, 72, 80, 0.85), rgba(14, 22, 25, 0.95))',
  'linear-gradient(135deg, rgba(48, 24, 36, 0.95), rgba(100, 42, 66, 0.85), rgba(24, 14, 18, 0.95))',
  'linear-gradient(135deg, rgba(36, 32, 22, 0.95), rgba(82, 70, 38, 0.85), rgba(20, 18, 14, 0.95))',
  'linear-gradient(135deg, rgba(32, 25, 42, 0.95), rgba(68, 48, 92, 0.85), rgba(16, 14, 24, 0.95))',
  'linear-gradient(135deg, rgba(42, 22, 22, 0.95), rgba(92, 40, 40, 0.85), rgba(24, 13, 13, 0.95))',
];

const ICONS = ['✨', '🌸', '💫', '💖', '🕊️', '🌙', '🌷', '✦'];

export default function ReasonCard({ number, reason }) {
  const [flipped, setFlipped] = useState(false);
  const themeIndex = (number - 1) % GRADIENTS.length;
  const gradient = GRADIENTS[themeIndex];
  const icon = ICONS[themeIndex];

  return (
    <article
      className={`reason-card group select-none ${flipped ? 'is-flipped' : ''}`}
      tabIndex={0}
      onClick={() => setFlipped(!flipped)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setFlipped(!flipped);
        }
      }}
      role="button"
      aria-label={`Reason ${number}: click to flip`}
    >
      <style>{`
        .reason-card.is-flipped .reason-inner {
          transform: rotateY(180deg);
        }
      `}</style>
      <div className="reason-inner">
        {/* Front */}
        <div
          className="reason-front transition-all duration-300 group-hover:border-white/20"
          style={{
            background: 'rgba(22, 22, 26, 0.7)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <span className="text-2xl mb-2 opacity-80">{icon}</span>
            <h3 className="font-serif text-5xl sm:text-6xl text-white/90 font-medium tracking-tight">
              {number}
            </h3>
            <p className="text-xs uppercase tracking-widest text-[#d8b4a0] mt-3 font-sans opacity-80 group-hover:opacity-100 transition-opacity">
              Tap to read
            </p>
          </div>
        </div>

        {/* Back */}
        <div
          className="reason-back relative overflow-hidden flex flex-col justify-between"
          style={{
            background: gradient,
            border: '1px solid rgba(216, 180, 160, 0.25)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), inset 0 0 30px rgba(255, 255, 255, 0.04)',
            placeItems: 'center',
            padding: '28px 24px',
          }}
        >
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between w-full text-xs text-[#d8b4a0]/80 tracking-widest uppercase font-serif">
            <span>#{number}</span>
            <span>{icon}</span>
          </div>

          <p className="text-base sm:text-lg font-serif italic text-white/95 leading-relaxed my-auto text-center px-2">
            "{reason}"
          </p>

          <div className="text-[11px] uppercase tracking-wider text-white/40">
            Tap to flip back
          </div>
        </div>
      </div>
    </article>
  );
}
