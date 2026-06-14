'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------
// ADD YOUR IMAGES AND VIDEOS HERE!
// Simply put the paths to your files inside this array.
// Example:
// { type: 'image', src: '/assets/your-photo.jpg' },
// { type: 'video', src: '/assets/your-video.mp4' },
// ---------------------------------------------------------
const MEMORIES = [
  
];

export default function MemoriesPage() {
  const container = useRef(null);

  useGSAP(() => {
    // Header fade up
    gsap.from('.gsap-header > *', {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power2.out',
    });

    // Polaroids scroll animation
    gsap.from('.pixel-card', {
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.masonry-grid',
        start: 'top 85%',
      }
    });
  }, { scope: container });

  return (
    <main
      ref={container}
      className="relative min-h-screen text-white overflow-x-hidden"
      style={{ 
        background: 'radial-gradient(circle at 50% 30%, #0d0d0d 0%, #020202 70%, #000000 100%)' 
      }}
    >

      
      {/* Subtle warm glow behind the title */}
      <div 
        className="absolute left-1/2 top-[200px] -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(216, 180, 160, 0.05) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <header className="gsap-header relative z-10 text-center" style={{ padding: '150px 8% 55px' }}>
        <p className="font-script text-[#d8b4a0] text-3xl">our little scrapbook</p>
        <h1
          className="font-serif font-semibold leading-[0.86] tracking-[-3px] mt-2 text-white/95"
          style={{ fontSize: 'clamp(52px, 9vw, 128px)' }}
        >
          Memory Lane
        </h1>
        <p className="max-w-[680px] mx-auto mt-4 text-base leading-relaxed text-white/70">
          Some days become photos, some photos become forever.
        </p>
      </header>

      {/* Masonry Grid */}
      <section
        className="masonry-grid relative z-10"
        style={{ padding: '0 8% 64px', columns: '3 320px', columnGap: '32px' }}
      >
        {MEMORIES.length === 0 ? (
          <div className="break-inside-avoid w-full py-10 text-center text-white/30 border border-dashed border-white/20 rounded-[24px]">
            <p>Please add your images to the MEMORIES array at the top of the code!</p>
          </div>
        ) : (
          MEMORIES.map((item, idx) => (
            <div 
              key={idx} 
              className="pixel-card break-inside-avoid mb-8 overflow-hidden rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)] transition-all duration-500"
            >
              {item.type === 'video' ? (
                <video autoPlay muted loop playsInline className="w-full block object-cover">
                  <source src={item.src} type="video/mp4" />
                </video>
              ) : (
                <img src={item.src} alt={`Memory ${idx}`} className="w-full block object-cover" />
              )}
            </div>
          ))
        )}
      </section>

      <div className="w-full flex justify-center pb-20 relative z-20">
        <Link
          href="/final"
          className="group flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full backdrop-blur-xl hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-300 font-serif text-[18px] text-white/90"
        >
          Next Chapter
          <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
        </Link>
      </div>
    </main>
  );
}
