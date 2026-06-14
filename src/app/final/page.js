'use client';
import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function FinalPage() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.from('.gsap-final > *', {
      y: 40,
      opacity: 0,
      stagger: 0.2,
      duration: 1.2,
      ease: 'power3.out'
    });

    // Premium breathing glow for the button
    gsap.to('.replay-btn', {
      boxShadow: '0 12px 40px rgba(255,255,255,0.14)',
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });
  }, { scope: container });

  return (
    <main
      ref={container}
      className="relative min-h-screen grid place-items-center text-center overflow-hidden text-white"
      style={{ 
        padding: '150px 8% 70px',
        color: '#fff', 
        background: 'radial-gradient(circle at 50% 30%, #0d0d0d 0%, #020202 70%, #000000 100%)' 
      }}
    >

      
      {/* Subtle warm glow behind the text */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(216, 180, 160, 0.05) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="gsap-final relative z-10 w-full flex flex-col items-center justify-center">
        <p className="font-script text-3xl text-white/60 mb-6">forever chapter</p>
        <h1
          className="font-serif font-semibold leading-[0.95] tracking-[-2px] max-w-[900px] text-white/90"
          style={{ fontSize: 'clamp(52px, 9vw, 128px)', paddingBottom: '0.3em' }}
        >
          You&apos;ll always be my favorite chapter.
        </h1>
        <div className="mt-16">
          <Link
            href="/"
            className="replay-btn group inline-flex items-center justify-center relative z-[8] text-[15px] font-serif tracking-widest uppercase cursor-pointer rounded-full transition-all duration-700 overflow-hidden hover:-translate-y-1 hover:scale-[1.02]"
            style={{ 
              padding: '20px 48px',
              color: 'rgba(255,255,255,0.9)',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.02)',
            }}
          >
            {/* Hover Sweep */}
            <div className="absolute inset-0 -translate-x-[150%] skew-x-[-25deg] w-[150%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[150%]" />
            <span className="relative z-10">Replay Story</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
