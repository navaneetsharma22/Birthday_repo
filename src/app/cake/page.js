'use client';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Cake from '@/components/Cake';
import Toast from '@/components/Toast';

export default function CakePage() {
  const container = useRef(null);
  const router = useRouter();
  const [isCut, setIsCut] = useState(false);
  const [hasStartedCutting, setHasStartedCutting] = useState(false);
  const [showToast, setShowToast] = useState(false);

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
    if (isCut) {
      setShowToast(false);
      // After cake is cut and text is revealed, wait 15 seconds then seamlessly redirect to letter page
      const timer = setTimeout(() => {
        router.push('/letter');
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [isCut, router]);

  useGSAP(() => {
    // Animate only the cake wrapper on initial load
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
      <style>{`
        .cake-page-main {
          padding: 150px 8% 70px;
        }
        @media (max-width: 768px) {
          .cake-page-main {
            padding: 120px 5% 50px;
          }
        }
        @media (max-width: 640px) {
          .cake-page-main {
            padding: 100px 4% 40px;
          }
        }
      `}</style>
      <Toast message="Hey Gorgeous Please cut the cake" isVisible={showToast} onClose={() => setShowToast(false)} />
      {/* Subtle warm glow behind the cake */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(216, 180, 160, 0.05) 0%, transparent 70%)',
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
            margin-bottom: 64px;
          }
          @media (max-width: 768px) {
            .cake-subtitle { font-size: 24px; }
            .cake-heading { margin-bottom: 32px; letter-spacing: -2px !important; }
          }
          @media (max-width: 640px) {
            .cake-subtitle { font-size: 20px; }
            .cake-heading { 
              font-size: clamp(28px, 8vw, 52px) !important; 
              margin-bottom: 16px; 
              letter-spacing: -1px !important;
              padding: 0 4px;
            }
          }
          @media (max-width: 380px) {
            .cake-heading { font-size: clamp(24px, 7vw, 36px) !important; }
          }
        `}</style>

        <p 
          className={`font-script cake-subtitle text-white/70 transition-all duration-[1500ms] ${isCut ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'}`}
        >
          May your dreams bloom beautifully.
        </p>
        <h1
          className={`font-serif font-semibold leading-[0.92] tracking-[-3px] mt-2 text-white/90 cake-heading transition-all duration-[1500ms] delay-[250ms] ${isCut ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'}`}
        >
          Happy Birthday Komal
        </h1>

        <div className={`gsap-cake-wrapper flex flex-col items-center transition-opacity duration-1000 ${isCut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <Cake onCutStart={() => setHasStartedCutting(true)} onCutComplete={() => setIsCut(true)} flavor="vanilla" />
        </div>
      </section>
    </main>
  );
}
