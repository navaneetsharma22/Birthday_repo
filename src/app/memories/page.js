'use client';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Link from 'next/link';
import FloatingParticles from '@/components/FloatingParticles';
import AudioPlayer from '@/components/AudioPlayer';
import MemoryModal from '@/components/MemoryModal';

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------
// ADD YOUR IMAGES AND VIDEOS HERE!
// ---------------------------------------------------------
const MEMORIES = [
  { 
    type: 'image', 
    src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop', 
    title: 'That Beautiful Day',
    description: 'A quiet moment that turned into a memory I will cherish forever. The lighting was just perfect.',
    date: 'Summer 2024'
  },
  { 
    type: 'image', 
    src: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=800&auto=format&fit=crop', 
    title: 'Unexpected Adventures',
    description: 'We had no plan, nowhere to be, and somehow it was the best afternoon ever.',
    date: 'Autumn 2025'
  },
  { 
    type: 'image', 
    src: 'https://images.unsplash.com/photo-1518599904199-0ca897819ddb?q=80&w=800&auto=format&fit=crop', 
    title: 'Just Us',
    description: 'One of those rare times where everything felt perfectly aligned and peaceful.',
    date: 'Winter 2025'
  },
  { 
    type: 'image', 
    src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop', 
    title: 'A Core Memory',
    description: 'I still smile every time I think about how much we laughed this day.',
    date: 'Spring 2026'
  }
];

export default function MemoriesPage() {
  const container = useRef(null);
  const [activeMemory, setActiveMemory] = useState(null);

  useGSAP(() => {
    // Header fade up
    gsap.from('.gsap-header > *', {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 1.2,
      ease: 'power3.out',
    });

    // Elegant uniform fade-up stagger for the cards
    gsap.from('.gallery-card', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.gallery-grid',
        start: 'top 85%',
      }
    });
  }, { scope: container });

  return (
    <main
      ref={container}
      className="relative min-h-screen text-white overflow-x-hidden"
      style={{ 
        background: 'linear-gradient(to bottom, #050505 0%, #0d0d0d 40%, #000000 100%)' 
      }}
    >
      <FloatingParticles />
      <AudioPlayer />
      <MemoryModal memory={activeMemory} onClose={() => setActiveMemory(null)} />

      {/* Luxury glowing backdrop */}
      <div 
        className="fixed left-1/2 top-1/4 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[800px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(216, 180, 160, 0.04) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      <header className="gsap-header relative z-10 text-center" style={{ padding: '160px 8% 40px' }}>
        <p className="font-script text-[#d8b4a0] text-3xl md:text-4xl mb-4 opacity-90">
          A few beautiful moments to celebrate your special day.
        </p>
        <h1
          className="font-serif font-semibold leading-[0.9] tracking-[-2px] text-white/95 drop-shadow-lg"
          style={{ fontSize: 'clamp(56px, 10vw, 120px)' }}
        >
          Memory Lane
        </h1>
      </header>

      {/* Premium Memory Gallery Grid */}
      <section 
        className="relative z-10 mx-auto"
        style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: '80px 40px' 
        }}
      >
        <div className="gallery-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] justify-items-center justify-center">
          {MEMORIES.length === 0 ? (
            <div className="col-span-full w-full py-20 text-center text-white/40 border border-dashed border-white/20 rounded-[32px] backdrop-blur-sm bg-white/5">
              <p className="font-serif text-xl">Please add your images to the MEMORIES array at the top of the code!</p>
            </div>
          ) : (
            MEMORIES.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveMemory(item)}
                className="gallery-card relative cursor-pointer group rounded-[24px] bg-white/3 border border-white/8 backdrop-blur-md transition-all duration-500 hover:scale-[1.04] hover:bg-white/8 hover:border-[#d8b4a0]/40 hover:shadow-[0_30px_60px_rgba(216,180,160,0.15)] w-full max-w-[320px] h-[420px] overflow-hidden"
              >
                <div className="relative w-full h-full overflow-hidden bg-black">
                  {item.type === 'video' ? (
                    <video 
                      muted 
                      loop 
                      playsInline 
                      className="w-full h-full object-cover object-center opacity-85 group-hover:opacity-100 transition-all duration-700 ease-out"
                    >
                      <source src={item.src} type="video/mp4" />
                    </video>
                  ) : (
                    <img 
                      src={item.src} 
                      alt={item.title || `Memory ${idx}`} 
                      className="w-full h-full object-cover object-center opacity-85 group-hover:opacity-100 transition-all duration-700 ease-out" 
                    />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Next Chapter Button */}
      <div className="w-full flex justify-center pb-32 relative z-20">
        <Link
          href="/final"
          className="group flex items-center gap-4 px-10 py-5 bg-white/5 border border-white/15 rounded-full backdrop-blur-xl transition-all duration-500 hover:bg-white/10 hover:border-[#d8b4a0]/40 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
        >
          <span className="font-serif text-[18px] tracking-wide text-white/90">Next Chapter</span>
          <span className="group-hover:translate-x-2 transition-transform duration-300 text-[#d8b4a0]">→</span>
        </Link>
      </div>
    </main>
  );
}
