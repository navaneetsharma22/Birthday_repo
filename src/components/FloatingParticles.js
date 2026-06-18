'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function FloatingParticles() {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) return;
    
    const particles = container.current.querySelectorAll('.particle');
    
    particles.forEach((p) => {
      // Random starting positions across the screen
      gsap.set(p, {
        x: `random(0, ${window.innerWidth})`,
        y: `random(0, ${window.innerHeight + 200})`,
        opacity: 'random(0.2, 0.6)',
        scale: 'random(0.4, 1.2)'
      });

      // Float upwards a bit faster with more movement
      gsap.to(p, {
        y: `-=random(400, 800)`,
        x: `+=random(-100, 100)`,
        opacity: 0,
        duration: 'random(8, 18)',
        ease: 'none',
        repeat: -1,
        delay: 'random(0, 4)'
      });
    });
  }, []);

  // Create an array of 100 particles (mix of dots, stars, hearts, and small balloons)
  const particles = Array.from({ length: 100 }).map((_, i) => {
    const type = i % 5 === 0 ? '🤍' : i % 5 === 1 ? '✨' : i % 5 === 2 ? '🎈' : '•';
    const isBalloon = type === '🎈';
    return (
      <div 
        key={i} 
        className={`particle absolute pointer-events-none ${isBalloon ? 'opacity-90' : 'text-[#d8b4a0]'}`} 
        style={{ 
          fontSize: type === '•' ? '24px' : isBalloon ? '14px' : '16px', 
          textShadow: isBalloon ? 'none' : '0 0 10px rgba(216,180,160,0.4)',
          willChange: 'transform, opacity'
        }}
      >
        {type}
      </div>
    );
  });

  return (
    <div ref={container} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles}
    </div>
  );
}
