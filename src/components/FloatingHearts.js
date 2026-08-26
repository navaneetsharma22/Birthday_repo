'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

// Preset animation modes
export const HEART_MODES = [
  { id: 'gentle', label: '🌸 Gentle Drift', desc: 'Upward romantic sway' },
  { id: 'spiral', label: '🌀 Spiral Twirl', desc: 'Helical spinning float' },
  { id: 'cascade', label: '🌧️ Love Rain', desc: 'Falling cherry blossom shower' },
  { id: 'fountain', label: '⛲ Heart Fountain', desc: 'Upward bursting fountain' },
  { id: 'breathe', label: '💓 Pulse Shimmer', desc: 'Ambient breathing shimmer' },
  { id: 'magnetic', label: '🧲 Magnetic Flow', desc: 'Hearts attracted to cursor' },
];

export default function FloatingHearts({ count = 35, initialMode = 'gentle', showControls = false }) {
  const container = useRef(null);
  const [activeMode, setActiveMode] = useState(initialMode);
  const mousePos = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 500 });
  const animTweens = useRef([]);

  // Listen for mode changes triggered from Navbar
  useEffect(() => {
    const handleModeChange = (e) => {
      if (e.detail) setActiveMode(e.detail);
    };
    window.addEventListener('change-heart-mode', handleModeChange);
    return () => window.removeEventListener('change-heart-mode', handleModeChange);
  }, []);

  // Eye-catching, large-scale explosion of hearts flying out from inside the envelope center
  const triggerEnvelopeBurst = useCallback((customX, customY) => {
    if (!container.current) return;
    const heartSymbols = ['❤️', '💖', '💗', '💕', '✨', '🩷', '💓', '💞', '💘', '🤍', '🌸', '🎀', '💌', '🌹', '🦋', '💫', '💎'];
    const startX = customX ?? (typeof window !== 'undefined' ? window.innerWidth * 0.35 : 400);
    const startY = customY ?? (typeof window !== 'undefined' ? window.innerHeight * 0.5 : 400);

    const spawnWave = (count, baseDelay, minDistance, maxDistance, minSize, maxSize) => {
      for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        const symbol = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        el.innerHTML = symbol;
        el.className = 'fixed pointer-events-none select-none z-[9999]';
        el.style.left = `${startX + (Math.random() * 40 - 20)}px`;
        el.style.top = `${startY + (Math.random() * 20 - 10)}px`;
        const size = Math.random() * (maxSize - minSize) + minSize;
        el.style.fontSize = `${size}px`;
        el.style.filter = 'drop-shadow(0 0 12px rgba(244,114,182,0.85))';
        el.style.willChange = 'transform, opacity';
        el.style.transform = 'translateZ(0)';
        container.current.appendChild(el);

        const angle = (Math.random() * Math.PI * 0.95) - (Math.PI * 0.975); // Broad upward fan arc (-175deg to -5deg)
        const distance = Math.random() * (maxDistance - minDistance) + minDistance;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        gsap.fromTo(el,
          { scale: 0.1, opacity: 1, x: 0, y: 0, rotation: Math.random() * 60 - 30 },
          {
            x: tx,
            y: ty,
            scale: Math.random() * 0.8 + 0.8,
            rotation: Math.random() * 360 - 180,
            opacity: 0,
            duration: Math.random() * 1.8 + 1.6,
            ease: 'power2.out',
            delay: baseDelay + (i * 0.015),
            onComplete: () => el.remove(),
          }
        );
      }
    };

    // Wave 1: Immediate massive burst of 40 hearts
    spawnWave(40, 0, 160, 420, 22, 44);

    // Wave 2: Secondary wave of 25 hearts at 100ms
    setTimeout(() => spawnWave(25, 0, 120, 360, 18, 38), 100);

    // Wave 3: Final trailing wave of 20 hearts at 220ms for continuous eye-catching explosion
    setTimeout(() => spawnWave(20, 0, 90, 280, 16, 32), 220);
  }, []);

  // Expose envelope burst trigger globally
  useEffect(() => {
    window.triggerEnvelopeHearts = triggerEnvelopeBurst;
    const handleEnvelope = (e) => triggerEnvelopeBurst(e.detail?.x, e.detail?.y);

    window.addEventListener('trigger-envelope-hearts', handleEnvelope);
    return () => {
      window.removeEventListener('trigger-envelope-hearts', handleEnvelope);
      delete window.triggerEnvelopeHearts;
    };
  }, [triggerEnvelopeBurst]);

  // Track mouse position for magnetic mode
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Main animation effect based on activeMode
  useEffect(() => {
    if (!container.current) return;
    const hearts = container.current.querySelectorAll('.floating-heart');
    
    // Kill existing tweens
    animTweens.current.forEach(t => t && t.kill());
    animTweens.current = [];

    const width = window.innerWidth;
    const height = window.innerHeight;

    hearts.forEach((h, index) => {
      gsap.killTweensOf(h);

      if (activeMode === 'gentle') {
        // Classic upward gentle sway
        gsap.set(h, {
          x: Math.random() * width,
          y: Math.random() * (height + 200),
          opacity: Math.random() * 0.3 + 0.1,
          scale: Math.random() * 0.4 + 0.3,
          rotation: Math.random() * 90 - 45,
        });

        const tween = gsap.to(h, {
          y: `-=${height + 350}`,
          x: `+=random(-120, 120)`,
          rotation: `+=random(-60, 60)`,
          opacity: 0,
          duration: Math.random() * 12 + 8,
          ease: 'none',
          repeat: -1,
          delay: Math.random() * 8,
        });
        animTweens.current.push(tween);

      } else if (activeMode === 'spiral') {
        // Helical / Spiral upward twirl
        const startX = Math.random() * width;
        const radius = Math.random() * 80 + 40;
        const speed = Math.random() * 10 + 10;
        
        gsap.set(h, {
          x: startX,
          y: height + Math.random() * 300,
          opacity: Math.random() * 0.7 + 0.3,
          scale: Math.random() * 0.9 + 0.4,
          rotation: 0,
        });

        const tween = gsap.to(h, {
          y: -150,
          duration: speed,
          ease: 'none',
          repeat: -1,
          delay: Math.random() * speed,
          onUpdate: function () {
            const prog = this.progress();
            const angle = prog * Math.PI * 8;
            gsap.set(h, {
              x: startX + Math.sin(angle) * radius,
              rotation: angle * 25,
            });
          }
        });
        animTweens.current.push(tween);

      } else if (activeMode === 'cascade') {
        // Downward cherry blossom rainfall
        gsap.set(h, {
          x: Math.random() * width,
          y: -100 - Math.random() * 200,
          opacity: Math.random() * 0.7 + 0.3,
          scale: Math.random() * 0.9 + 0.4,
          rotation: Math.random() * 360,
        });

        const tween = gsap.to(h, {
          y: height + 150,
          x: `+=random(-150, 150)`,
          rotation: `+=random(-180, 180)`,
          opacity: 0,
          duration: Math.random() * 10 + 6,
          ease: 'sine.inOut',
          repeat: -1,
          delay: Math.random() * 6,
        });
        animTweens.current.push(tween);

      } else if (activeMode === 'fountain') {
        // Upward energetic fountain arc from bottom center
        const centerX = width / 2;
        const startY = height + 50;

        gsap.set(h, {
          x: centerX + (Math.random() * 60 - 30),
          y: startY,
          opacity: 0,
          scale: Math.random() * 0.8 + 0.5,
          rotation: Math.random() * 60 - 30,
        });

        const angle = (Math.random() * Math.PI * 0.6) - (Math.PI * 0.8); // upward arc
        const distance = Math.random() * (height * 0.8) + height * 0.3;
        const targetX = centerX + Math.cos(angle) * distance * 1.2;
        const targetY = startY + Math.sin(angle) * distance;

        const tween = gsap.to(h, {
          x: targetX,
          y: targetY,
          opacity: Math.random() * 0.8 + 0.2,
          rotation: Math.random() * 360 - 180,
          duration: Math.random() * 6 + 4,
          ease: 'power2.out',
          repeat: -1,
          repeatDelay: Math.random() * 3,
          delay: Math.random() * 4,
        });
        animTweens.current.push(tween);

      } else if (activeMode === 'breathe') {
        // Hovering ambient hearts with pulse scaling and shimmer glow
        gsap.set(h, {
          x: Math.random() * width,
          y: Math.random() * height,
          opacity: Math.random() * 0.6 + 0.2,
          scale: Math.random() * 0.6 + 0.4,
          rotation: Math.random() * 40 - 20,
        });

        const tween = gsap.to(h, {
          scale: '+=random(0.3, 0.7)',
          opacity: 'random(0.4, 0.95)',
          y: '+=random(-40, 40)',
          x: '+=random(-30, 30)',
          rotation: '+=random(-30, 30)',
          duration: Math.random() * 4 + 3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: Math.random() * 3,
        });
        animTweens.current.push(tween);

      } else if (activeMode === 'magnetic') {
        // Floating hearts attracted toward mouse cursor
        gsap.set(h, {
          x: Math.random() * width,
          y: Math.random() * height,
          opacity: Math.random() * 0.6 + 0.3,
          scale: Math.random() * 0.7 + 0.4,
        });

        const baseSpeed = Math.random() * 0.03 + 0.01;
        const baseOffset = { x: Math.random() * width, y: Math.random() * height };

        const tween = gsap.to(h, {
          duration: 0.05,
          repeat: -1,
          onUpdate: function () {
            const currentX = gsap.getProperty(h, 'x');
            const currentY = gsap.getProperty(h, 'y');
            const targetX = mousePos.current.x + (baseOffset.x - width / 2) * 0.5;
            const targetY = mousePos.current.y + (baseOffset.y - height / 2) * 0.5;
            
            const dx = targetX - currentX;
            const dy = targetY - currentY;

            gsap.set(h, {
              x: currentX + dx * baseSpeed,
              y: currentY + dy * baseSpeed,
              rotation: dx * 0.05,
            });
          }
        });
        animTweens.current.push(tween);
      }
    });

    // Global click burst
    const handleGlobalClick = (e) => {
      // Don't trigger burst if clicking on controls widget
      if (e.target.closest('.heart-controls-widget')) return;
      if (!container.current) return;
      
      const burstCount = 12;
      const heartSymbols = ['❤️', '💖', '💗', '💕', '✨', '🩷', '💓', '💞'];

      for (let i = 0; i < burstCount; i++) {
        const heartEl = document.createElement('div');
        const symbol = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heartEl.innerHTML = symbol;
        heartEl.className = 'fixed pointer-events-none select-none z-50';
        heartEl.style.left = `${e.clientX}px`;
        heartEl.style.top = `${e.clientY}px`;
        const size = Math.random() * 18 + 12;
        heartEl.style.fontSize = `${size}px`;
        heartEl.style.textShadow = '0 0 12px rgba(244,114,182,0.6)';
        container.current.appendChild(heartEl);

        const angle = (Math.random() * Math.PI * 2);
        const dist = Math.random() * 140 + 50;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;

        gsap.to(heartEl, {
          x: tx,
          y: ty,
          scale: Math.random() * 0.9 + 0.6,
          rotation: Math.random() * 180 - 90,
          opacity: 0,
          duration: Math.random() * 1.2 + 1,
          ease: 'power2.out',
          onComplete: () => heartEl.remove(),
        });
      }
    };

    window.addEventListener('click', handleGlobalClick);
    return () => {
      window.removeEventListener('click', handleGlobalClick);
      animTweens.current.forEach(t => t && t.kill());
    };
  }, [activeMode, count]);

  // SVG Heart Variant Renderer
  const renderSvgHeart = (type, size, color) => {
    switch (type) {
      case 'double':
        return (
          <svg viewBox="0 0 32 24" fill={color} className="w-full h-full">
            <path d="M9 18l-1.1-1C3.9 13.4 1.5 11.2 1.5 8.5C1.5 6.3 3.3 4.5 5.5 4.5c1.2 0 2.4.6 3.2 1.5c.8-.9 2-1.5 3.2-1.5c2.2 0 4 1.8 4 4c0 2.7-2.4 4.9-6.4 8.5L9 18z" opacity="0.9" />
            <path d="M22 22l-1.3-1.2C16 16.3 13 13.8 13 10.7c0-2.5 2-4.5 4.5-4.5c1.4 0 2.7.7 3.5 1.7c.8-1 2.1-1.7 3.5-1.7c2.5 0 4.5 2 4.5 4.5c0 3.1-3 5.6-7.7 10.1L22 22z" />
          </svg>
        );
      case 'sparkle':
        return (
          <svg viewBox="0 0 24 24" fill={color} className="w-full h-full">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            <path d="M12 6l.8 1.8L14.6 8.6l-1.8.8-.8 1.8-.8-1.8-1.8-.8 1.8-.8.8-1.8z" fill="#ffffff" opacity="0.9" />
          </svg>
        );
      case 'hollow':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" className="w-full h-full">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        );
      case 'crystal':
        return (
          <svg viewBox="0 0 24 24" fill={color} className="w-full h-full">
            <path d="M12 2L4 8l8 14 8-14-8-6z" opacity="0.85" />
            <path d="M12 2v20M4 8h16" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
          </svg>
        );
      case 'ribbon':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" className="w-full h-full">
            <path d="M12 21.35C7 16 2 12 2 7.5 2 4.5 4.5 2 7.5 2c2 0 3.8 1 4.5 2.5C12.7 3 14.5 2 16.5 2 19.5 2 22 4.5 22 7.5c0 4.5-5 8.5-10 13.85z" />
          </svg>
        );
      case 'winged':
        return (
          <svg viewBox="0 0 32 24" fill={color} className="w-full h-full">
            <path d="M2 10c3-4 7-3 9-1c-2 4-5 5-9 1z" fill="#ffffff" opacity="0.7" />
            <path d="M30 10c-3-4-7-3-9-1c2 4 5 5 9 1z" fill="#ffffff" opacity="0.7" />
            <path d="M16 20l-1.2-1.1C10.5 15 7.5 12.3 7.5 9c0-2.7 2.1-4.8 4.8-4.8c1.5 0 3 .7 3.7 1.8c.7-1.1 2.2-1.8 3.7-1.8c2.7 0 4.8 2.1 4.8 4.8c0 3.3-3 6-7.3 9.9L16 20z" />
          </svg>
        );
      case 'pixel':
        return (
          <svg viewBox="0 0 16 16" fill={color} className="w-full h-full">
            <path d="M2 4h4v2H2zM10 4h4v2h-4zM1 6h6v2H1zM9 6h6v2H9zM2 8h12v2H2zM4 10h8v2H4zM6 12h4v2H6zM7 14h2v2H7z" />
          </svg>
        );
      case 'classic':
      default:
        return (
          <svg viewBox="0 0 24 24" fill={color} className="w-full h-full opacity-90">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        );
    }
  };

  // Array of varied heart icons, SVGs, and symbols
  const heartTypes = [
    '❤️', '💖', '💗', '💓', '💕', '💞', '💘', '🤍', '🩷', '✨', '🌸', '🎀', '💌', '🌹', '🦋', '💫', '💎',
    'svg-classic-rose', 'svg-double-pink', 'svg-sparkle-gold', 'svg-hollow-light', 'svg-crystal-crimson',
    'svg-ribbon-magenta', 'svg-winged-blush', 'svg-pixel-red'
  ];

  const hearts = Array.from({ length: count }).map((_, i) => {
    const typeIndex = i % heartTypes.length;
    const type = heartTypes[typeIndex];
    const isSvg = type.startsWith('svg');

    const sizes = [12, 14, 16, 18, 20, 22, 24, 26, 28, 30];
    const size = sizes[i % sizes.length];

    if (isSvg) {
      let fillColor = '#d8b4a0'; // champagne
      let svgShape = 'classic';
      
      if (type.includes('classic')) { svgShape = 'classic'; fillColor = '#f472b6'; }
      if (type.includes('double')) { svgShape = 'double'; fillColor = '#fda4af'; }
      if (type.includes('sparkle')) { svgShape = 'sparkle'; fillColor = '#f59e0b'; }
      if (type.includes('hollow')) { svgShape = 'hollow'; fillColor = '#ffffff'; }
      if (type.includes('crystal')) { svgShape = 'crystal'; fillColor = '#e11d48'; }
      if (type.includes('ribbon')) { svgShape = 'ribbon'; fillColor = '#ec4899'; }
      if (type.includes('winged')) { svgShape = 'winged'; fillColor = '#f472b6'; }
      if (type.includes('pixel')) { svgShape = 'pixel'; fillColor = '#ef4444'; }

      return (
        <div
          key={i}
          className="floating-heart absolute pointer-events-none"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            filter: `drop-shadow(0 0 10px ${fillColor}b3)`,
            willChange: 'transform, opacity',
          }}
        >
          {renderSvgHeart(svgShape, size, fillColor)}
        </div>
      );
    }

    return (
      <div
        key={i}
        className="floating-heart absolute pointer-events-none select-none"
        style={{
          fontSize: `${size}px`,
          textShadow: '0 0 14px rgba(244,114,182,0.6), 0 0 24px rgba(216,180,160,0.5)',
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


