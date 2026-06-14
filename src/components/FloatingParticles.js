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
        opacity: 'random(0.1, 0.4)',
        scale: 'random(0.4, 1.2)'
      });

      // Float upwards slowly
      gsap.to(p, {
        y: `-=random(300, 600)`,
        x: `+=random(-80, 80)`,
        opacity: 0,
        duration: 'random(12, 25)',
        ease: 'none',
        repeat: -1,
        delay: 'random(0, 5)'
      });
    });
  }, []);

  // Create an array of 40 particles (mix of dots, stars, and hearts)
  const particles = Array.from({ length: 40 }).map((_, i) => {
    const type = i % 4 === 0 ? '🤍' : i % 4 === 1 ? '✨' : '•';
    return (
      <div 
        key={i} 
        className="particle absolute text-[#d8b4a0] pointer-events-none" 
        style={{ 
          fontSize: type === '•' ? '24px' : '12px', 
          textShadow: '0 0 10px rgba(216,180,160,0.4)',
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
