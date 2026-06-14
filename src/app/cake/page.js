'use client';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useAutoNavigate } from '@/hooks/useAutoNavigate';
import Cake from '@/components/Cake';

export default function CakePage() {
  useAutoNavigate('/letter');
  const container = useRef(null);
  const router = useRouter();
  const [isCut, setIsCut] = useState(false);
  const [flavor, setFlavor] = useState('vanilla');
  
  const FLAVORS = [
    { id: 'vanilla', label: 'Vanilla Dream', color: '#e8cfc1' },
    { id: 'chocolate', label: 'Dark Chocolate', color: '#5c3c2d' },
    { id: 'redVelvet', label: 'Red Velvet', color: '#962839' }
  ];

  useEffect(() => {
    if (isCut) {
      // After cake is cut and text is revealed, wait 3.5 seconds then seamlessly redirect to final page
      const timer = setTimeout(() => {
        router.push('/final');
      }, 3500);
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
      className="relative min-h-screen grid place-items-center text-center overflow-hidden"
      style={{ 
        padding: '150px 8% 70px',
        color: '#fff', 
        background: 'radial-gradient(circle at 50% 30%, #0d0d0d 0%, #020202 70%, #000000 100%)' 
      }}
    >

      
      {/* Subtle warm glow behind the cake */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(216, 180, 160, 0.05) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <section className="relative z-10 w-full flex flex-col items-center justify-center text-center">
        <p 
          className={`font-script text-3xl text-white/70 transition-all duration-[1500ms] ${isCut ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'}`}
        >
          You mean the world to me
        </p>
        <h1
          className={`font-serif font-semibold leading-[0.92] tracking-[-3px] mt-2 mb-16 text-white/90 transition-all duration-[1500ms] delay-[250ms] ${isCut ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'}`}
          style={{ fontSize: 'clamp(52px, 9vw, 128px)', maxWidth: '900px' }}
        >
          Happy Birthday Komal
        </h1>

        <div className={`gsap-cake-wrapper flex flex-col items-center transition-opacity duration-1000 ${isCut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="flex flex-wrap justify-center gap-5 mt-6 mb-16">
            {FLAVORS.map(f => {
              const isSelected = flavor === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFlavor(f.id)}
                  className={`group relative flex items-center gap-3 px-6 py-3.5 rounded-full font-serif text-[15px] tracking-wider transition-all duration-500 outline-none bg-transparent ${
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
                    className={`w-3 h-3 rounded-full shadow-inner transition-all duration-500 ${isSelected ? 'scale-125' : 'group-hover:scale-110'}`}
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
          <Cake onCutComplete={() => setIsCut(true)} flavor={flavor} />
        </div>
      </section>
    </main>
  );
}
