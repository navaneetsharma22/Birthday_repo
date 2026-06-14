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
// I've added some beautiful placeholders to show you how the 
// new scrapbook polaroids and lightboxes look!
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

    // Polaroid parallax and fade
    const cards = gsap.utils.toArray('.polaroid-card');
    
    cards.forEach((card, i) => {
      // Different rotation and offset for that "scattered scrapbook" feel
      const rotation = i % 2 === 0 ? gsap.utils.random(-4, -1) : gsap.utils.random(1, 4);
      const yOffset = i % 2 !== 0 ? 40 : 0;
      
      gsap.set(card, { rotation: rotation, y: yOffset + 100, opacity: 0 });

      gsap.to(card, {
        y: yOffset,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        }
      });
      
      // Subtle floating parallax on scroll
      gsap.to(card, {
        y: yOffset - 50,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
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

      <header className="gsap-header relative z-10 text-center" style={{ padding: '160px 8% 80px' }}>
        <p className="font-script text-[#d8b4a0] text-3xl md:text-4xl mb-4 opacity-90">A collection of beautiful moments</p>
        <h1
          className="font-serif font-semibold leading-[0.9] tracking-[-2px] text-white/95 drop-shadow-lg"
          style={{ fontSize: 'clamp(56px, 10vw, 120px)' }}
        >
          Memory Lane
        </h1>
        <p className="max-w-[500px] mx-auto mt-8 font-sans text-[15px] leading-[1.8] text-white/60 tracking-wide">
          Every picture tells a story. Click on any of these moments to revisit the memories we've created together.
        </p>
      </header>

      {/* Scrapbook Grid */}
      <section className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-12 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
          {MEMORIES.length === 0 ? (
            <div className="col-span-full w-full py-20 text-center text-white/40 border border-dashed border-white/20 rounded-[32px] backdrop-blur-sm bg-white/5">
              <p className="font-serif text-xl">Please add your images to the MEMORIES array at the top of the code!</p>
            </div>
          ) : (
            MEMORIES.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveMemory(item)}
                className="polaroid-card relative cursor-pointer group break-inside-avoid"
              >
                {/* Polaroid Frame */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 pb-8 md:p-5 md:pb-12 rounded-[16px] shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_40px_80px_rgba(216,180,160,0.12)] hover:border-[#d8b4a0]/30 hover:bg-white/10">
                  
                  {/* Tape piece detail */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/10 backdrop-blur-md border border-white/5 rotate-[-2deg] shadow-sm z-20 mix-blend-screen" />

                  <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[8px] bg-black border border-white/5 shadow-inner">
                    {item.type === 'video' ? (
                      <video muted loop playsInline className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700">
                        <source src={item.src} type="video/mp4" />
                      </video>
                    ) : (
                      <img src={item.src} alt={item.title || `Memory ${idx}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                    )}
                  </div>
                  
                  {/* Short Title on Polaroid */}
                  <div className="mt-5 md:mt-6 text-center">
                    <p className="font-script text-[#d8b4a0] text-2xl md:text-3xl opacity-80 group-hover:opacity-100 transition-opacity">
                      {item.title}
                    </p>
                  </div>
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
