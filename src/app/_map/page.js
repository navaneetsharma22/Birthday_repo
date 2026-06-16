'use client';
import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const SPOTS = [
  {
    id: 1,
    title: "Where it all began",
    desc: "The very first time our eyes met. I still remember what you were wearing.",
    x: 30, // percentage left
    y: 40, // percentage top
    image: "/assets/ak.jpeg",
  },
  {
    id: 2,
    title: "Our favorite coffee shop",
    desc: "Countless hours spent talking about everything and nothing. The best dates ever.",
    x: 65,
    y: 25,
    image: "/assets/ak.jpeg",
  },
  {
    id: 3,
    title: "That one late night drive",
    desc: "Windows down, singing at the top of our lungs. Pure magic.",
    x: 50,
    y: 70,
    image: "/assets/ak.jpeg",
  },
  {
    id: 4,
    title: "Our first real trip",
    desc: "Getting lost together was the best part of the adventure.",
    x: 80,
    y: 60,
    image: "/assets/ak.jpeg",
  }
];

export default function MapPage() {
  const container = useRef(null);
  const [activeSpot, setActiveSpot] = useState(null);

  useGSAP(() => {
    gsap.from('.gsap-header > *', {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power2.out',
    });

    // Drop the pins in one by one
    gsap.from('.gsap-pin', {
      y: -50,
      opacity: 0,
      scale: 0.5,
      duration: 1,
      stagger: 0.2,
      ease: 'bounce.out',
      delay: 0.5
    });
    
    // Continuous subtle floating for the pins
    gsap.to('.gsap-pin-glow', {
      scale: 1.4,
      opacity: 0,
      duration: 1.5,
      repeat: -1,
      ease: 'power2.out',
      stagger: 0.3
    });

    // Draw the journey line
    gsap.to('#journey-line', {
      strokeDashoffset: 0,
      duration: 3,
      ease: 'power2.inOut',
      delay: 1
    });

  }, { scope: container });

  function openSpot(spot) {
    setActiveSpot(spot);
    // Tiny pop animation on the pin
    gsap.fromTo(`#pin-${spot.id}`, 
      { scale: 0.8 },
      { scale: 1, duration: 0.4, ease: 'back.out(2)' }
    );
  }

  return (
    <main
      ref={container}
      className="relative min-h-screen text-white overflow-hidden"
      style={{ 
        background: 'radial-gradient(circle at 50% 40%, #1a1a1a 0%, #050505 80%, #000000 100%)' 
      }}
    >
      {/* Premium Noise Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Handcrafted SVG Journey Line */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40">
        <svg width="1000" height="550" viewBox="0 0 1000 550" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-[1000px] max-h-[550px]">
          <path 
            id="journey-line"
            d="M 300 220 Q 450 100 650 137 T 500 385 T 800 330" 
            stroke="#d8b4a0" 
            strokeWidth="2" 
            strokeDasharray="8 8" 
            strokeLinecap="round"
            style={{ strokeDashoffset: 1000, strokeDasharray: "1000" }}
          />
        </svg>
      </div>

      <header className="map-header gsap-header relative z-10 text-center">
        <style>{`
          .map-header {
            padding: 130px 8% 20px;
          }
          @media (max-width: 768px) {
            .map-header {
              padding: 110px 6% 16px;
            }
          }
          @media (max-width: 640px) {
            .map-header {
              padding: 100px 5% 12px;
            }
            .map-header h1 {
              letter-spacing: -1px !important;
            }
          }
        `}</style>
        <p className="font-script text-[#d8b4a0] text-2xl sm:text-3xl">our favorite places</p>
        <h1
          className="font-serif font-semibold leading-[0.86] tracking-[-3px] mt-2 text-white/95"
          style={{ fontSize: 'clamp(52px, 9vw, 128px)' }}
        >
          Our Spots
        </h1>
        <p className="mt-4 mb-6 text-base text-white/70 max-w-[500px] mx-auto leading-relaxed">
          Every place we've been holds a little piece of our story. Tap the glowing pins to unlock the memory.
        </p>
      </header>

      {/* Map Area */}
      <section className="relative z-10 w-[92%] sm:w-[90%] max-w-[1000px] h-[350px] sm:h-[450px] md:h-[550px] mx-auto mt-4 rounded-[24px] sm:rounded-[40px] border border-white/10 overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)]" style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(12px)' }}>
        
        {/* Subtle topographical glow */}
        <div className="absolute top-[30%] left-[40%] w-[400px] h-[400px] bg-[#d8b4a0] opacity-[0.03] rounded-full blur-[80px] pointer-events-none" />

        {/* Map Pins */}
        {SPOTS.map(spot => (
          <div 
            key={spot.id}
            id={`pin-${spot.id}`}
            className="gsap-pin absolute group cursor-pointer"
            style={{ left: `${spot.x}%`, top: `${spot.y}%`, transform: 'translate(-50%, -50%)' }}
            onClick={() => openSpot(spot)}
          >
            {/* Pulsing glow ring */}
            <div className="gsap-pin-glow absolute inset-0 w-8 h-8 -ml-4 -mt-4 rounded-full border-[1.5px] border-[#d8b4a0] opacity-60" />
            
            {/* The pin itself */}
            <div className="relative w-3 h-3 -ml-1.5 -mt-1.5 bg-[#d8b4a0] rounded-full shadow-[0_0_20px_#d8b4a0] group-hover:scale-150 transition-transform duration-300" />
            
            {/* Location Label (shows on hover) */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-sm font-medium">
              {spot.title}
            </div>
          </div>
        ))}
      </section>

      {/* Polaroid Modal */}
      {activeSpot && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md transition-all duration-300">
          <div 
            className="relative p-[14px] sm:p-[18px] pb-[24px] sm:pb-[32px] bg-[rgba(30,30,30,0.85)] border border-white/15 backdrop-blur-[32px] rounded-[20px] sm:rounded-[24px] shadow-[0_40px_100px_rgba(0,0,0,0.8)] rotate-[-1.5deg] w-[90%] max-w-[400px]"
          >
            <button 
              onClick={() => setActiveSpot(null)}
              className="absolute -top-4 -right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black border border-white/20 text-white hover:scale-110 transition-transform z-10 shadow-xl"
            >
              ✕
            </button>
            <div
              className="w-full aspect-[4/3] rounded-[14px] bg-cover bg-center border border-white/5"
              style={{ backgroundImage: `url('${activeSpot.image}')` }}
            />
            <p className="mt-5 font-script text-[28px] text-[#d8b4a0] text-center">{activeSpot.title}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-white/80 text-center px-4 font-serif">
              {activeSpot.desc}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
