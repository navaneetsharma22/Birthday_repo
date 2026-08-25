'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function FloatingHearts({ count = 120 }) {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) return;

    const hearts = container.current.querySelectorAll('.floating-heart');

    hearts.forEach((h) => {
      // Random starting positions across the screen
      gsap.set(h, {
        x: `random(0, ${window.innerWidth})`,
        y: `random(0, ${window.innerHeight + 200})`,
        opacity: 'random(0.2, 0.8)',
        scale: 'random(0.4, 1.3)',
        rotation: 'random(-45, 45)',
      });

      // Float upwards gently with soft horizontal sway
      gsap.to(h, {
        y: `-=${window.innerHeight + 350}`,
        x: `+=random(-120, 120)`,
        rotation: `+=random(-60, 60)`,
        opacity: 0,
        duration: 'random(8, 20)',
        ease: 'none',
        repeat: -1,
        delay: 'random(0, 8)',
      });
    });

    // Global click burst of floating hearts
    const handleGlobalClick = (e) => {
      if (!container.current) return;
      const burstCount = 10;
      const heartSymbols = ['❤️', '💖', '💗', '💕', '✨', '🩷', '💓'];

      for (let i = 0; i < burstCount; i++) {
        const heartEl = document.createElement('div');
        const symbol = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heartEl.innerHTML = symbol;
        heartEl.className = 'absolute pointer-events-none select-none z-50';
        heartEl.style.left = `${e.clientX}px`;
        heartEl.style.top = `${e.clientY}px`;
        const size = Math.random() * 16 + 12;
        heartEl.style.fontSize = `${size}px`;
        heartEl.style.textShadow = '0 0 12px rgba(244,114,182,0.6)';
        container.current.appendChild(heartEl);

        const angle = (Math.random() * Math.PI) - (Math.PI / 2); // angle upwards
        const dist = Math.random() * 120 + 60;
        const tx = Math.cos(angle) * dist + (Math.random() * 60 - 30);
        const ty = -Math.abs(Math.sin(angle) * dist) - (Math.random() * 80 + 40);

        gsap.to(heartEl, {
          x: tx,
          y: ty,
          scale: Math.random() * 0.8 + 0.8,
          rotation: Math.random() * 90 - 45,
          opacity: 0,
          duration: Math.random() * 1.2 + 1.2,
          ease: 'power2.out',
          onComplete: () => heartEl.remove(),
        });
      }
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [count]);

  // Array of varied small heart icons / symbols / SVGs
  const heartTypes = [
    '❤️', '💖', '💗', '💓', '💕', '💞', '💘', '🤍', '🩷', '✨', '🌸', '🎀',
    'svg-rose', 'svg-champagne', 'svg-pink', 'svg-light', 'svg-red', 'svg-crimson', 'svg-magenta'
  ];

  const hearts = Array.from({ length: count }).map((_, i) => {
    const typeIndex = i % heartTypes.length;
    const type = heartTypes[typeIndex];
    const isSvg = type.startsWith('svg');

    // Distinct sizes for depth variation: 10px to 26px
    const sizes = [10, 12, 14, 16, 18, 20, 22, 24, 26];
    const size = sizes[i % sizes.length];

    if (isSvg) {
      let fillColor = '#d8b4a0'; // champagne
      if (type === 'svg-rose') fillColor = '#f472b6'; // rose pink
      if (type === 'svg-pink') fillColor = '#fda4af'; // soft pink
      if (type === 'svg-light') fillColor = '#ffffff'; // white glow
      if (type === 'svg-red') fillColor = '#ef4444'; // rich red
      if (type === 'svg-crimson') fillColor = '#e11d48'; // crimson
      if (type === 'svg-magenta') fillColor = '#ec4899'; // magenta

      return (
        <div
          key={i}
          className="floating-heart absolute pointer-events-none"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            filter: `drop-shadow(0 0 8px ${fillColor}99)`,
            willChange: 'transform, opacity',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill={fillColor}
            className="w-full h-full opacity-85"
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
          textShadow: '0 0 12px rgba(244,114,182,0.5), 0 0 22px rgba(216,180,160,0.4)',
          willChange: 'transform, opacity',
        }}
      >
        {type}
      </div>
    );
  });

  return (
    <div ref={container} className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {hearts}
    </div>
  );
}

