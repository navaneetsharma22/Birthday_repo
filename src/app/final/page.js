'use client';
import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import FloatingParticles from '@/components/FloatingParticles';
import FloatingHearts from '@/components/FloatingHearts';

export default function FinalPage() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.gsap-final > *', 
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1.2,
        ease: 'power3.out'
      }
    );

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
      <FloatingHearts count={130} />

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
              ✨ Replay Beginning
              <span className="group-hover:translate-x-1.5 transition-transform duration-300 text-[#d8b4a0]">→</span>
            </span>
          </Link>
        </div>

        {/* Bonus Keepsake Discoveries */}
        <div className="mt-14 w-full max-w-[880px] px-4">
          <div className="text-center mb-6">
            <p className="font-script text-[#d8b4a0] text-2xl sm:text-3xl mb-1">
              unopened treasures
            </p>
            <h2 className="font-serif text-white/90 text-lg sm:text-xl font-medium tracking-wide">
              Special Keepsakes For You
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {/* The Vault */}
            <Link
              href="/vault"
              className="group relative overflow-hidden p-6 sm:p-7 rounded-[28px] transition-all duration-500 hover:-translate-y-2.5 flex flex-col items-center text-center"
              style={{
                background: 'linear-gradient(160deg, rgba(32, 24, 28, 0.75) 0%, rgba(18, 14, 18, 0.9) 100%)',
                border: '1px solid rgba(216, 180, 160, 0.18)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                boxShadow: '0 20px 45px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
              }}
            >
              {/* Card Ambient Glow on Hover */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-36 h-36 bg-[#d8b4a0]/15 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Emblem Icon */}
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300 group-hover:scale-110 shadow-lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(216, 180, 160, 0.25)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                }}
              >
                💌
              </div>

              <h3 className="font-serif text-white text-lg font-medium tracking-wide group-hover:text-[#d8b4a0] transition-colors">
                The Vault
              </h3>
              <p className="text-xs text-white/65 font-sans leading-relaxed mt-2 line-clamp-2">
                Open-when letters waiting for the right moment.
              </p>

              <div className="mt-5 pt-3.5 border-t border-white/[0.08] w-full flex items-center justify-center gap-1.5 text-[11px] font-sans font-medium uppercase tracking-wider text-[#d8b4a0]/80 group-hover:text-[#d8b4a0]">
                <span>Open Letters</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </Link>

            {/* Our Spots */}
            <Link
              href="/map"
              className="group relative overflow-hidden p-6 sm:p-7 rounded-[28px] transition-all duration-500 hover:-translate-y-2.5 flex flex-col items-center text-center"
              style={{
                background: 'linear-gradient(160deg, rgba(22, 28, 34, 0.75) 0%, rgba(14, 18, 22, 0.9) 100%)',
                border: '1px solid rgba(180, 205, 216, 0.18)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                boxShadow: '0 20px 45px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
              }}
            >
              {/* Card Ambient Glow on Hover */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-36 h-36 bg-[#8bb4c8]/15 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Emblem Icon */}
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300 group-hover:scale-110 shadow-lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(180, 205, 216, 0.25)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                }}
              >
                🗺️
              </div>

              <h3 className="font-serif text-white text-lg font-medium tracking-wide group-hover:text-[#a8d0e6] transition-colors">
                Our Spots
              </h3>
              <p className="text-xs text-white/65 font-sans leading-relaxed mt-2 line-clamp-2">
                Interactive memory map of all our special places.
              </p>

              <div className="mt-5 pt-3.5 border-t border-white/[0.08] w-full flex items-center justify-center gap-1.5 text-[11px] font-sans font-medium uppercase tracking-wider text-[#a8d0e6]/80 group-hover:text-[#a8d0e6]">
                <span>Explore Map</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </Link>

            {/* 100 Reasons */}
            <Link
              href="/reasons"
              className="group relative overflow-hidden p-6 sm:p-7 rounded-[28px] transition-all duration-500 hover:-translate-y-2.5 flex flex-col items-center text-center"
              style={{
                background: 'linear-gradient(160deg, rgba(34, 22, 26, 0.75) 0%, rgba(20, 13, 16, 0.9) 100%)',
                border: '1px solid rgba(216, 160, 180, 0.18)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                boxShadow: '0 20px 45px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
              }}
            >
              {/* Card Ambient Glow on Hover */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-36 h-36 bg-[#e8a0b8]/15 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Emblem Icon */}
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300 group-hover:scale-110 shadow-lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(216, 160, 180, 0.25)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                }}
              >
                💖
              </div>

              <h3 className="font-serif text-white text-lg font-medium tracking-wide group-hover:text-[#e8a0b8] transition-colors">
                100 Reasons
              </h3>
              <p className="text-xs text-white/65 font-sans leading-relaxed mt-2 line-clamp-2">
                100 tiny love notes and reasons why you are loved.
              </p>

              <div className="mt-5 pt-3.5 border-t border-white/[0.08] w-full flex items-center justify-center gap-1.5 text-[11px] font-sans font-medium uppercase tracking-wider text-[#e8a0b8]/80 group-hover:text-[#e8a0b8]">
                <span>Read Notes</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </Link>
          </div>
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
