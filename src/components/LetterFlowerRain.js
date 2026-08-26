'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function LetterFlowerRain({ isActive = true }) {
  const container = useRef(null);

  useEffect(() => {
    if (!isActive || !container.current) return;

    const petals = container.current.querySelectorAll('.flower-petal');
    const tweens = [];

    petals.forEach((p) => {
      // Random initial position across the width of the letter card, starting above top
      const parentWidth = container.current.offsetWidth || 500;
      const parentHeight = container.current.offsetHeight || 700;

      gsap.set(p, {
        x: Math.random() * parentWidth,
        y: -40 - Math.random() * 150,
        opacity: Math.random() * 0.7 + 0.3,
        scale: Math.random() * 0.6 + 0.5,
        rotation: Math.random() * 360,
      });

      // Smooth falling petal animation
      const tw = gsap.to(p, {
        y: parentHeight + 50,
        x: `+=random(-60, 60)`,
        rotation: `+=random(-180, 180)`,
        opacity: 0,
        duration: Math.random() * 6 + 5,
        ease: 'sine.inOut',
        repeat: -1,
        delay: Math.random() * 5,
      });

      tweens.push(tw);
    });

    return () => {
      tweens.forEach((t) => t && t.kill());
    };
  }, [isActive]);

  if (!isActive) return null;

  // Flower symbols for gentle rain
  const flowerTypes = ['🌸', '🌹', '🌷', '🌺', '🌼', '✨', '🌸', '🍃', '🌸', '🌹', '🌷', '🌸', '✨', '🌸'];
  const count = 25; // Light particle count for silky performance

  const flowers = Array.from({ length: count }).map((_, i) => {
    const symbol = flowerTypes[i % flowerTypes.length];
    const size = [14, 16, 18, 20, 22][i % 5];

    return (
      <div
        key={i}
        className="flower-petal absolute pointer-events-none select-none"
        style={{
          fontSize: `${size}px`,
          filter: 'drop-shadow(0 2px 6px rgba(244,114,182,0.4))',
          willChange: 'transform, opacity',
          transform: 'translateZ(0)',
        }}
      >
        {symbol}
      </div>
    );
  });

  return (
    <div
      ref={container}
      className="absolute inset-0 pointer-events-none overflow-hidden z-[2] rounded-[34px]"
    >
      {flowers}
    </div>
  );
}
