'use client';
import { useRef, useState, useEffect } from 'react';
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
  // 1. HERO CARD — use the only landscape photo so it fills the wide slot perfectly
  { 
    type: 'image', 
    src: '/assets/memories/13.jpeg',   // 1280×720 landscape ✓
    title: 'Dreamy Days',
    description: 'Wishing upon stars and realizing my biggest wish is already right next to me.',
    date: 'Spring 2026',
    cardType: 'hero',
    objectPosition: 'center center'
  },

  // 2. THREE PORTRAIT CARDS
  { 
    type: 'image', 
    src: '/assets/memories/1.jpeg',    // 720×1280 portrait
    title: 'A Beautiful Start',
    description: 'Every sweet story has a beginning, and this was one of our absolute favorites.',
    date: 'Summer 2024',
    cardType: 'portrait',
    objectPosition: 'center 22%'       // face sits ~22% from top in this selfie
  },
  { 
    type: 'image', 
    src: '/assets/memories/3.jpg',     // 974×1280 — polaroid style
    title: 'Late Night Chats',
    description: 'When the world is asleep, our laughter is the only sound that matters.',
    date: 'Winter 2024',
    cardType: 'square',
    objectPosition: 'center 18%'
  },
  { 
    type: 'image', 
    src: '/assets/memories/3a.jpg',    // 720×1280 portrait
    title: 'Double the Joy',
    description: 'Because one smile is never enough when we are sharing a happy moment together.',
    date: 'Winter 2024',
    cardType: 'portrait',
    objectPosition: 'center 18%'
  },

  // 3. HORIZONTAL + SQUARE
  { 
    type: 'image', 
    src: '/assets/memories/2.jpeg',    // 899×1599 portrait → wide horizontal
    title: 'Chasing Sunsets',
    description: 'Watching the sky turn into paint while holding hands. A moment frozen in time.',
    date: 'Autumn 2024',
    cardType: 'horizontal',
    objectPosition: 'center 18%'
  },
  { 
    type: 'image', 
    src: '/assets/memories/4.jpg',     // 540×960 portrait
    title: 'Little Adventures',
    description: 'No maps, no destinations, just random walks and the best company.',
    date: 'Spring 2025',
    cardType: 'square',
    objectPosition: 'center 20%'
  },

  // 4. THREE PORTRAIT CARDS
  { 
    type: 'image', 
    src: '/assets/memories/5.jpg',     // 540×960 portrait
    title: 'Pure Comfort',
    description: 'Finding my safest place in your laughter and sweetest dreams in your eyes.',
    date: 'Spring 2025',
    cardType: 'portrait',
    objectPosition: 'center 15%'
  },
  { 
    type: 'image', 
    src: '/assets/memories/8.jpg',     // 720×1280 portrait
    title: 'Warm Hugs & Smiles',
    description: 'A gentle reminder of how beautiful life is when shared with someone so rare.',
    date: 'Autumn 2025',
    cardType: 'portrait',
    objectPosition: 'center 15%'
  },
  { 
    type: 'image', 
    src: '/assets/memories/10.jpeg',   // 720×1280 portrait
    title: 'Unplanned Happiness',
    description: 'The best memories are always the ones we never planned to make.',
    date: 'Winter 2025',
    cardType: 'portrait',
    objectPosition: 'center 18%'
  },

  // 5. SQUARE + HORIZONTAL
  { 
    type: 'image', 
    src: '/assets/memories/6.jpg',     // 540×960 portrait
    title: 'Sweetest Escapes',
    description: 'Leaving all the worries behind to create a tiny universe just for the two of us.',
    date: 'Summer 2025',
    cardType: 'square',
    objectPosition: 'center 20%'
  },
  { 
    type: 'image', 
    src: '/assets/memories/7.jpg',     // 540×960 portrait → wide horizontal
    title: 'Glow of Love',
    description: 'You have this beautiful way of making even the most ordinary days shine bright.',
    date: 'Summer 2025',
    cardType: 'horizontal',
    objectPosition: 'center 20%'
  },

  // 6. THREE PORTRAIT CARDS
  { 
    type: 'image', 
    src: '/assets/memories/11.jpeg',   // 899×1599 portrait
    title: 'Cozy Afternoons',
    description: 'Time slows down when you are around, and everything feels peaceful.',
    date: 'Winter 2025',
    cardType: 'portrait',
    objectPosition: 'center 15%'
  },
  { 
    type: 'image', 
    src: '/assets/memories/15.jpeg',   // 899×1599 portrait
    title: 'Our Forever Chapter',
    description: 'Every picture is a love letter to the times we share and the future we are building.',
    date: 'Summer 2026',
    cardType: 'portrait',
    objectPosition: 'center 15%'
  },
  { 
    type: 'image', 
    src: '/assets/memories/12.jpeg',   // 720×1280 portrait
    title: 'Infinite Laughter',
    description: 'My favorite sound in the whole world will always be your genuine giggle.',
    date: 'Spring 2026',
    cardType: 'square',
    objectPosition: 'center 20%'
  },

  // 7. HORIZONTAL + SQUARE
  { 
    type: 'image', 
    src: '/assets/memories/9.jpg',     // 540×960 portrait → wide horizontal
    title: 'Simply You',
    description: 'Capturing your elegance and beauty in a single, unforgettable frame.',
    date: 'Autumn 2025',
    cardType: 'horizontal',
    objectPosition: 'center 18%'
  },
  { 
    type: 'image', 
    src: '/assets/memories/14.jpeg',   // 901×1600 portrait
    title: 'A Core Memory',
    description: 'A day packed with so much joy that it will always stay engraved in my heart.',
    date: 'Summer 2026',
    cardType: 'square',
    objectPosition: 'center 18%'
  }
];

export default function MemoriesPage() {
  const container = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  // Refresh ScrollTrigger as images load to prevent height mismatch
  useEffect(() => {
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleLoad);

    // Dynamic refreshes for progressive image rendering
    const timers = [
      setTimeout(() => ScrollTrigger.refresh(), 400),
      setTimeout(() => ScrollTrigger.refresh(), 1000),
      setTimeout(() => ScrollTrigger.refresh(), 2000),
      setTimeout(() => ScrollTrigger.refresh(), 4000),
    ];

    return () => {
      window.removeEventListener('load', handleLoad);
      timers.forEach(clearTimeout);
    };
  }, []);

  useGSAP(() => {
    // Header fade up
    gsap.from('.gsap-header > *', {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 1.2,
      ease: 'power3.out',
    });

    // Elegant fade-up/scale/fade for each card individually as it scrolls into view
    const cards = gsap.utils.toArray('.gallery-card');
    cards.forEach((card) => {
      gsap.from(card, {
        y: 25,
        scale: 0.97,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 95%',
          toggleActions: 'play none none none',
        }
      });
    });
  }, { scope: container });

  const getBentoClasses = (item) => {
    switch (item.cardType) {
      case 'hero':
        return 'lg:col-span-3 md:col-span-2 col-span-1 h-[220px] md:h-[300px] lg:h-[320px] rounded-[24px]';
      case 'horizontal':
        return 'lg:col-span-2 md:col-span-2 col-span-1 h-[170px] md:h-[215px] lg:h-[260px] rounded-[20px]';
      case 'portrait':
        return 'lg:col-span-1 col-span-1 h-[320px] md:h-[400px] lg:h-[480px] rounded-[20px]';
      case 'square':
      default:
        return 'lg:col-span-1 col-span-1 h-[260px] md:h-[300px] lg:h-[340px] rounded-[20px]';
    }
  };

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
      <MemoryModal 
        memories={MEMORIES} 
        activeIndex={activeIndex} 
        setActiveIndex={setActiveIndex} 
        onClose={() => setActiveIndex(null)} 
      />

      {/* Luxury glowing backdrop */}
      <div 
        className="fixed left-1/2 top-1/4 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[800px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(216, 180, 160, 0.04) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      <header className="gsap-header relative z-10 text-center" style={{ padding: '160px 8% 40px' }}>
        <p className="font-script text-[#d8b4a0] text-2xl md:text-3xl mb-3 opacity-90">
          our little scrapbook
        </p>
        <h1
          className="font-serif font-semibold leading-[0.9] tracking-[-2px] text-white/95 drop-shadow-lg mb-4"
          style={{ fontSize: 'clamp(56px, 9vw, 110px)' }}
        >
          Memory Lane
        </h1>
        <p className="font-sans text-white/65 text-sm md:text-base tracking-wide max-w-md mx-auto">
          A collection of beautiful moments.
        </p>
      </header>

      {/* Premium Story-driven Bento Grid */}
      <section 
        className="relative z-10 mx-auto"
        style={{ maxWidth: '1450px', margin: '0 auto', padding: '40px 40px 0' }}
      >
        <div className="gallery-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px] justify-items-stretch mx-auto">
          {MEMORIES.length === 0 ? (
            <div className="col-span-full w-full py-20 text-center text-white/40 border border-dashed border-white/20 rounded-[32px] backdrop-blur-sm bg-white/5">
              <p className="font-serif text-xl">Please add your images to the MEMORIES array at the top of the code!</p>
            </div>
          ) : (
            MEMORIES.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`gallery-card slow-float relative cursor-pointer group border border-white/[0.07] transition-all duration-500 ease-out hover:border-[#d8b4a0]/25 hover:scale-[1.02] hover:shadow-[0_24px_56px_rgba(216,180,160,0.13)] shadow-[0_8px_24px_rgba(0,0,0,0.55)] bg-[#0a0a0a] w-full ${getBentoClasses(item)}`}
                style={{ animationDelay: `${idx * 0.3}s` }}
              >
                {/* Overflow clipped inner — no transform here so clip stays clean */}
                <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: 'inherit' }}>
                  {item.type === 'video' ? (
                    <video 
                      muted 
                      loop 
                      playsInline 
                      className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-700 ease-out"
                      style={{ objectPosition: item.objectPosition || 'center center' }}
                    >
                      <source src={item.src} type="video/mp4" />
                    </video>
                  ) : (
                    <img 
                      src={item.src} 
                      alt={item.title || `Memory ${idx}`} 
                      className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-700 ease-out" 
                      style={{
                        objectPosition: item.objectPosition || (item.cardType === 'portrait' ? 'center top' : 'center center')
                      }}
                    />
                  )}
                  {/* Subtle cinematic bottom vignette */}
                  <div 
                    className="absolute inset-0 pointer-events-none" 
                    style={{ background: 'linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.28) 100%)' }} 
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Next Chapter Button */}
      <div className="w-full flex justify-center relative z-20" style={{ marginTop: '40px', paddingBottom: '80px' }}>
        <Link
          href="/final"
          className="group flex items-center gap-4 px-10 py-5 bg-white/5 border border-white/10 rounded-full backdrop-blur-xl transition-all duration-500 hover:bg-white/8 hover:border-[#d8b4a0]/35 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(216,180,160,0.12)]"
        >
          <span className="font-serif text-[18px] tracking-wide text-white/90">Next Chapter</span>
          <span className="group-hover:translate-x-2 transition-transform duration-300 text-[#d8b4a0]">→</span>
        </Link>
      </div>
    </main>
  );
}
