'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function FloatingHearts({ count = 65 }) {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) return;

    const hearts = container.current.querySelectorAll('.floating-heart');

    hearts.forEach((h) => {
      // Random starting positions across the screen
      gsap.set(h, {
        x: `random(0, ${window.innerWidth})`,
        y: `random(0, ${window.innerHeight + 150})`,
        opacity: 'random(0.15, 0.65)',
        scale: 'random(0.5, 1.2)',
        rotation: 'random(-30, 30)',
      });

      // Float upwards gently with soft horizontal sway
      gsap.to(h, {
        y: `-=${window.innerHeight + 300}`,
        x: `+=random(-90, 90)`,
        rotation: `+=random(-40, 40)`,
        opacity: 0,
        duration: 'random(9, 19)',
        ease: 'none',
        repeat: -1,
        delay: 'random(0, 7)',
      });
    });
  }, [count]);

  // Array of varied small heart icons / symbols / SVGs
  const heartTypes = [
    '🤍', '🩷', '💖', '💗', '💕', '✨', '🌸',
    'svg-rose', 'svg-champagne', 'svg-pink', 'svg-light'
  ];

  const hearts = Array.from({ length: count }).map((_, i) => {
    const typeIndex = i % heartTypes.length;
    const type = heartTypes[typeIndex];
    const isSvg = type.startsWith('svg');

    // Distinct sizes for depth variation: 10px to 22px
    const sizes = [10, 12, 14, 16, 18, 20, 22];
    const size = sizes[i % sizes.length];

    if (isSvg) {
      let fillColor = '#d8b4a0'; // champagne
      if (type === 'svg-rose') fillColor = '#f472b6'; // rose pink
      if (type === 'svg-pink') fillColor = '#fda4af'; // soft pink
      if (type === 'svg-light') fillColor = '#ffffff'; // white glow

      return (
        <div
          key={i}
          className="floating-heart absolute pointer-events-none"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            filter: `drop-shadow(0 0 6px ${fillColor}80)`,
            willChange: 'transform, opacity',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill={fillColor}
            className="w-full h-full opacity-80"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      );
    }

    return (
      <div
        key={i}
        className="floating-heart absolute pointer-events-none select-none"
        style={{
          fontSize: `${size}px`,
          textShadow: '0 0 10px rgba(244,114,182,0.4), 0 0 18px rgba(216,180,160,0.3)',
          willChange: 'transform, opacity',
        }}
      >
        {type}
      </div>
    );
  });

  return (
    <div ref={container} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts}
    </div>
  );
}
