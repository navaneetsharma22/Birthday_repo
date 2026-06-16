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
  const [flavor, setFlavor] = useState('vanilla');
  const [showToast, setShowToast] = useState(false);
  
  const FLAVORS = [
    { id: 'vanilla', label: 'Vanilla Dream', color: '#e8cfc1' },
    { id: 'chocolate', label: 'Dark Chocolate', color: '#5c3c2d' },
    { id: 'redVelvet', label: 'Red Velvet', color: '#962839' }
  ];

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
    gsap.from('.gsap-cake-wrapper', {
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.2
    });
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
          .flavor-wrap {
            gap: 20px;
            margin-top: 24px;
            margin-bottom: 64px;
          }
          .flavor-btn {
            padding: 12px 24px;
            font-size: 15px;
          }
          @media (max-width: 768px) {
            .cake-subtitle { font-size: 24px; }
            .cake-heading { margin-bottom: 32px; letter-spacing: -2px !important; }
            .flavor-wrap { gap: 12px; margin-bottom: 32px; margin-top: 16px; }
            .flavor-btn { padding: 10px 18px; font-size: 13px; gap: 8px !important; }
          }
          @media (max-width: 640px) {
            .cake-subtitle { font-size: 20px; }
            .cake-heading { 
              font-size: clamp(28px, 8vw, 52px) !important; 
              margin-bottom: 16px; 
              letter-spacing: -1px !important;
              padding: 0 4px;
            }
            .flavor-wrap { 
              gap: 8px; 
              margin-bottom: 16px; 
              margin-top: 8px;
              flex-direction: row;
              justify-content: center;
            }
            .flavor-btn { 
              padding: 8px 14px; 
              font-size: 12px; 
              gap: 6px !important;
            }
          }
          @media (max-width: 380px) {
            .cake-heading { font-size: clamp(24px, 7vw, 36px) !important; }
            .flavor-btn { padding: 6px 10px; font-size: 11px; }
          }
        `}</style>

        <p 
          className={`font-script cake-subtitle text-white/70 transition-all duration-[1500ms] ${isCut ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'}`}
        >
          You mean the world to me
        </p>
        <h1
          className={`font-serif font-semibold leading-[0.92] tracking-[-3px] mt-2 text-white/90 cake-heading transition-all duration-[1500ms] delay-[250ms] ${isCut ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'}`}
        >
          Happy Birthday Komal
        </h1>

        <div className={`gsap-cake-wrapper flex flex-col items-center transition-opacity duration-1000 ${isCut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="flavor-wrap flex flex-wrap justify-center">
            {FLAVORS.map(f => {
              const isSelected = flavor === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFlavor(f.id)}
                  className={`flavor-btn group relative flex items-center gap-3 rounded-full font-serif tracking-wider transition-all duration-500 outline-none bg-transparent ${
                    isSelected 
                      ? 'text-white' 
                      : 'text-white/40 hover:text-white/80'
                  }`}
                  style={{ 
                    transform: isSelected ? 'translateY(-4px)' : 'translateY(0)'
                  }}
                >
                  {/* Flavor Color Dot */}
                  <div 
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shadow-inner transition-all duration-500 ${isSelected ? 'scale-125' : 'group-hover:scale-110'}`}
                    style={{ 
                      background: f.color,
                      boxShadow: isSelected ? `0 0 10px ${f.color}` : `0 0 0px transparent`
                    }}
                  />
                  {f.label}
                </button>
              );
            })}
          </div>
          <Cake onCutStart={() => setHasStartedCutting(true)} onCutComplete={() => setIsCut(true)} flavor={flavor} />
        </div>
      </section>
    </main>
  );
}
