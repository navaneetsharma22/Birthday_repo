'use client';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Cake from '@/components/Cake';
import Toast from '@/components/Toast';
import FloatingHearts from '@/components/FloatingHearts';
import FloatingParticles from '@/components/FloatingParticles';

export default function CakePage() {
  const container = useRef(null);
  const router = useRouter();
  const [isCut, setIsCut] = useState(false);
  const [hasStartedCutting, setHasStartedCutting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [countdown, setCountdown] = useState(25);

  useEffect(() => {
    if (!hasStartedCutting && !isCut) {
      const timer = setTimeout(() => {
        setShowToast(true);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setShowToast(false);
    }
  }, [hasStartedCutting, isCut]);

  useEffect(() => {
    if (!isCut) return;
    setShowToast(false);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          router.push('/letter');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isCut, router]);

  useGSAP(() => {
    // Animate cake wrapper on initial load
    gsap.fromTo('.gsap-cake-wrapper', 
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2
      }
    );
  }, { scope: container });

  return (
    <main
      ref={container}
      className="cake-page-main relative min-h-screen grid place-items-center text-center overflow-hidden"
      style={{ 
        color: '#fff', 
        background: 'radial-gradient(circle at 50% 30%, #0d0d0d 0%, #020202 70%, #000000 100%)' 
      }}
    >
      <FloatingParticles />
      <FloatingHearts count={35} />
      <style>{`
        .cake-page-main {
          padding: 140px 8% 60px;
        }
        @media (max-width: 768px) {
          .cake-page-main {
            padding: 110px 5% 50px;
          }
        }
        @media (max-width: 640px) {
          .cake-page-main {
            padding: 95px 4% 40px;
          }
        }
      `}</style>
      <Toast message="Hey Gorgeous Please cut the cake" isVisible={showToast} onClose={() => setShowToast(false)} />
      
      {/* Subtle warm glow behind the cake */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(216, 180, 160, 0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <section className="relative z-10 w-full flex flex-col items-center justify-center text-center overflow-hidden">
        <style>{`
          .cake-subtitle {
            font-size: 30px;
          }
          .cake-heading {
            font-size: clamp(36px, 9vw, 128px);
            max-width: 900px;
            margin-bottom: 24px;
          }
          @media (max-width: 768px) {
            .cake-subtitle { font-size: 24px; }
            .cake-heading { margin-bottom: 16px; letter-spacing: -2px !important; }
          }
          @media (max-width: 640px) {
            .cake-subtitle { font-size: 20px; }
            .cake-heading { 
              font-size: clamp(28px, 8vw, 52px) !important; 
              margin-bottom: 12px; 
              letter-spacing: -1px !important;
              padding: 0 4px;
            }
          }
          @media (max-width: 380px) {
            .cake-heading { font-size: clamp(24px, 7vw, 36px) !important; }
          }
        `}</style>

        <p 
          className={`font-script cake-subtitle text-white/70 transition-all duration-[1200ms] ${isCut ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'}`}
        >
          May your dreams bloom beautifully.
        </p>
        <h1
          className={`font-serif font-semibold leading-[0.92] tracking-[-3px] mt-2 text-white/90 cake-heading transition-all duration-[1200ms] delay-[200ms] ${isCut ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'}`}
        >
          Happy Birthday Komal
        </h1>

        {/* The Cake stays proudly visible and celebrated after cutting */}
        <div className="gsap-cake-wrapper flex flex-col items-center transition-transform duration-700">
          <Cake 
            onCutStart={() => setHasStartedCutting(true)} 
            onCutComplete={() => setIsCut(true)} 
            flavor="vanilla" 
          />
        </div>

        {/* User Agency CTA Button after Cake is Cut */}
        {isCut && (
          <div className="mt-8 flex flex-col items-center gap-3 animate-fadeIn z-20">
            <button
              onClick={() => router.push('/letter')}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-serif text-lg tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, rgba(216, 180, 160, 0.35), rgba(62, 50, 50, 0.75))',
                border: '1px solid rgba(216, 180, 160, 0.5)',
                boxShadow: '0 12px 36px rgba(216, 180, 160, 0.3)',
                backdropFilter: 'blur(16px)',
                color: '#fff',
              }}
            >
              <span>Read Your Special Letter</span>
              <span className="text-xl group-hover:translate-x-1.5 transition-transform duration-300">💌</span>
            </button>
            <p className="text-xs text-white/60 font-sans tracking-wide">
              Continuing in {countdown}s &bull; Click to read now
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
