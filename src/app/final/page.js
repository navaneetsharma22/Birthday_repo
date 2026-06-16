'use client';
import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import FloatingParticles from '@/components/FloatingParticles';

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
      className="final-page-main relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden text-white"
      style={{ 
        background: 'radial-gradient(circle at 50% 30%, #0d0d0d 0%, #020202 70%, #000000 100%)' 
      }}
    >
      <style>{`
        .final-page-main {
          padding: 120px 8% 40px;
        }
        @media (max-width: 768px) {
          .final-page-main {
            padding: 110px 6% 30px;
          }
          .final-page-main .replay-btn {
            padding: 16px 36px !important;
            font-size: 14px !important;
          }
        }
        @media (max-width: 640px) {
          .final-page-main {
            padding: 100px 5% 24px;
          }
          .final-page-main p.font-sans {
            font-size: 17px !important;
          }
          .final-page-main .replay-btn {
            padding: 14px 28px !important;
          }
        }
      `}</style>
      <FloatingParticles />

      {/* Subtle warm glow behind the text */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(216, 180, 160, 0.05) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="gsap-final relative z-10 w-full flex flex-col items-center justify-center my-auto">
        <p 
          className="font-script text-3xl text-white/60"
          style={{ marginBottom: '20px' }}
        >
          a beautiful journey
        </p>
        
        <h1
          className="font-serif font-semibold text-white/90"
          style={{ 
            fontSize: 'clamp(36px, 5.4vw, 75px)', 
            lineHeight: '0.95',
            letterSpacing: '-1px',
            paddingBottom: '0.1em',
            marginBottom: '40px'
          }}
        >
          May your next chapter
          <br />
          be your most beautiful
          <br />
          one yet.
        </h1>

        <p 
          className="mx-auto font-sans text-white/70 text-center"
          style={{ 
            fontSize: '22px',
            lineHeight: '1.8',
            maxWidth: '500px',
            marginBottom: '40px'
          }}
        >
          May life always surprise you
          <br />
          with beautiful moments,
          <br />
          kind hearts,
          <br />
          and endless reasons to smile. 🌸
        </p>

        <div style={{ marginTop: '20px' }}>
          <Link
            href="/"
            className="replay-btn group inline-flex items-center justify-center relative z-[8] text-[15px] font-serif tracking-widest uppercase cursor-pointer rounded-full transition-all duration-[400ms] overflow-hidden hover:scale-[1.04]"
            style={{ 
              padding: '20px 48px',
              color: 'rgba(255,255,255,0.9)',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.02)',
            }}
          >
            {/* Hover Sweep */}
            <div className="absolute inset-0 -translate-x-[150%] skew-x-[-25deg] w-[150%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[150%]" />
            <span className="relative z-10 flex items-center gap-2">
              ✨ Replay Memories
              <span className="group-hover:translate-x-1.5 transition-transform duration-300 text-[#d8b4a0]">→</span>
            </span>
          </Link>
        </div>
      </div>

      <footer 
        className="relative z-10 text-center text-white/50 tracking-wide"
        style={{ 
          fontSize: '16px',
          marginTop: '35px',
          opacity: 0.5
        }}
      >
        Thank you for being
        <br />
        part of this beautiful story.
      </footer>
    </main>
  );
}
