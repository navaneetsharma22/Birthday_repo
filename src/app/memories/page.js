'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Link from 'next/link';
import FloatingParticles from '@/components/FloatingParticles';

gsap.registerPlugin(ScrollTrigger);

const MemoryCard = ({ src, alt, caption, className = "", imgClassName = "object-center", audioSrc }) => {
  const audioRef = useRef(null);

  const handleMouseEnter = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio play blocked:', e));
    }
  };

  const handleMouseLeave = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <div 
      className={`gsap-card flex flex-col ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full flex-1 rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/[0.08] hover:border-[#d8b4a0]/30 hover:shadow-[0_20px_60px_rgba(216,180,160,0.15)] transition-all duration-700 group bg-white/5">
        <img 
          src={src} 
          alt={alt || "Memory"} 
          className={`absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out ${imgClassName}`} 
        />
        {/* Subtle cinematic bottom vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.4) 100%)' }} />
        
        {/* Audio Indicator */}
        {audioSrc && (
          <div className="absolute top-8 right-8 z-10 flex items-center gap-5 bg-gradient-to-r from-black/80 to-black/50 backdrop-blur-2xl px-10 py-5 rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] pointer-events-none group-hover:from-black/90 group-hover:to-black/70 group-hover:border-[#d8b4a0]/50 group-hover:shadow-[0_8px_32px_rgba(216,180,160,0.25)] transition-all duration-500 ease-out translate-y-0 group-hover:-translate-y-1">
            
            {/* Equalizer Container */}
            <div className="flex items-end gap-[4px] h-[20px] opacity-80 group-hover:opacity-100 transition-opacity duration-300">
              <div className="music-bar music-bar-1"></div>
              <div className="music-bar music-bar-2"></div>
              <div className="music-bar music-bar-3"></div>
              <div className="music-bar music-bar-4"></div>
            </div>

            {/* Text */}
            <span className="text-white/90 group-hover:text-white text-[13px] font-sans tracking-[0.25em] uppercase font-bold whitespace-nowrap mt-[2px] transition-colors duration-300">
              Hover to Play
            </span>
          </div>
        )}
      </div>
      {audioSrc && <audio ref={audioRef} src={audioSrc} preload="auto" loop />}
    </div>
  );
};

const SectionHeader = ({ title, icon }) => (
  <div className="gsap-header flex flex-col items-center justify-center mt-[100px] mb-[60px]">
    <div className="flex items-center gap-5 opacity-90">
      <div className="w-[40px] md:w-[80px] h-[1px] bg-gradient-to-r from-transparent to-[#d8b4a0]" />
      <div className="flex items-center gap-3">
        {icon && <span className="text-[22px]">{icon}</span>}
        <h2 className="font-serif text-2xl md:text-3xl text-white tracking-[0.15em] uppercase">{title}</h2>
      </div>
      <div className="w-[40px] md:w-[80px] h-[1px] bg-gradient-to-l from-transparent to-[#d8b4a0]" />
    </div>
  </div>
);

export default function MemoriesPage() {
  const container = useRef(null);

  // Refresh ScrollTrigger to ensure accurate calculations after images load
  useEffect(() => {
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);
    
    // Dynamic refreshes
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
    // Header sequence
    gsap.fromTo('.gsap-hero-header > *', 
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power3.out',
      }
    );

    // Section headers fade up
    gsap.utils.toArray('.gsap-header').forEach((header) => {
      gsap.fromTo(header, 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 90%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    // Cards gentle fade up & scale
    gsap.utils.toArray('.gsap-card').forEach((card) => {
      gsap.fromTo(card, 
        { y: 40, scale: 0.96, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            toggleActions: 'play none none none',
          }
        }
      );
    });
  }, { scope: container });

  return (
    <main
      ref={container}
      className="relative min-h-screen text-white overflow-x-hidden"
      style={{ 
        background: 'linear-gradient(to bottom, #050505 0%, #0d0d0d 50%, #000000 100%)' 
      }}
    >
      <FloatingParticles />

      {/* Luxury glowing backdrop */}
      <div 
        className="fixed left-1/2 top-1/4 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[800px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(216, 180, 160, 0.04) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      <header className="gsap-hero-header relative z-10 text-center" style={{ padding: '160px 8% 40px' }}>
        <p className="font-script text-[#d8b4a0] text-3xl md:text-4xl mb-4 opacity-90">
          Our little scrapbook
        </p>
        <h1
          className="font-serif font-semibold leading-[0.9] tracking-[-2px] text-white/95 drop-shadow-lg mb-6"
          style={{ fontSize: 'clamp(56px, 9vw, 110px)' }}
        >
          Memory Lane
        </h1>
        <p className="font-serif text-white/60 text-lg md:text-xl tracking-wide max-w-lg mx-auto italic">
          "Some moments are too beautiful to be forgotten."
        </p>
      </header>

      {/* Premium Scrapbook Container */}
      <section 
        className="relative z-10 mx-auto"
        style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 5% 40px' }}
      >
        
        {/* ── ✨ First Smile ── */}
        <SectionHeader title="Through My Eyes" icon="" />
        <div className="w-full flex flex-col gap-[20px]">
          {/* HERO MEMORY */}
          <div className="w-full h-[450px] md:h-[650px]">
            <MemoryCard 
              src="/assets/memories/1.png" 
              className="h-full" 
              caption="Wishing upon stars and realizing my biggest wish is already right next to me." 
              audioSrc="/assets/memories/song.mp3.mpeg"
            />
          </div>
          
          {/* 2 PHOTOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mt-[20px]">
            <div className="h-[450px] md:h-[600px]">
              <MemoryCard 
                src="/assets/memories/2.png" 
                className="h-full" 
                caption="Every sweet story has a beginning, and this was one of our absolute favorites." 
              />
            </div>
            <div className="h-[450px] md:h-[600px]">
              <MemoryCard 
                src="/assets/memories/3.png" 
                className="h-full" 
                caption="When the world is asleep, our laughter is the only sound that matters." 
              />
            </div>
          </div>
        </div>

        {/* ── 🌸 Cute Days ── */}
        <SectionHeader title="Cute Days" icon="🌸" />
        <div className="w-full flex flex-col gap-[20px]">
          {/* PHOTO + WIDE PHOTO */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-[20px]">
            <div className="md:col-span-5 h-[450px] md:h-[550px]">
              <MemoryCard 
                src="/assets/memories/4.png" 
                className="h-full" 
                caption="No maps, no destinations, just random walks and the best company." 
              />
            </div>
            <div className="md:col-span-7 h-[450px] md:h-[550px]">
              <MemoryCard 
                src="/assets/memories/5.png" 
                className="h-full" 
                caption="Watching the sky turn into paint while holding hands. A moment frozen in time." 
              />
            </div>
          </div>

          {/* SPECIAL PIC */}
          <div className="w-full h-[450px] md:h-[650px] mt-[20px]">
            <MemoryCard 
              src="/assets/memories/6.png" 
              className="h-full" 
              caption="You have this beautiful way of making even the most ordinary days shine bright." 
            />
          </div>
        </div>

        {/* ── 💖 Beautiful You ── */}
        <SectionHeader title="Beautiful You" icon="💖" />
        <div className="w-full">
          {/* 3 PREMIUM CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
            <div className="h-[450px] md:h-[600px]">
              <MemoryCard 
                src="/assets/memories/7.png" 
                className="h-full" 
                caption="Finding my safest place in your laughter." 
              />
            </div>
            <div className="h-[450px] md:h-[600px]">
              <MemoryCard 
                src="/assets/memories/8.png" 
                className="h-full" 
                imgClassName="object-right"
                caption="A gentle reminder of how beautiful life is when shared with someone so rare." 
              />
            </div>
            <div className="h-[450px] md:h-[600px]">
              <MemoryCard 
                src="/assets/memories/9.png" 
                className="h-full" 
                caption="The best memories are always the ones we never planned to make." 
              />
            </div>
          </div>
        </div>

        {/* ── 🌙 Favorite Memories ── */}
        <SectionHeader title="Favorite Memories" icon="🌙" />
        <div className="w-full mb-[40px]">
          {/* BIG CINEMATIC IMAGE */}
          <div className="w-full h-[500px] md:h-[750px]">
            <MemoryCard 
              src="/assets/memories/10.png" 
              className="h-full" 
              caption="Every picture is a love letter to the times we share and the future we are building." 
              audioSrc="/assets/memories/song02.mp3.mpeg"
            />
          </div>
        </div>

      </section>

      {/* Next Chapter Button */}
      <div className="w-full flex justify-center relative z-20" style={{ marginTop: '60px', paddingBottom: '100px' }}>
        <Link
          href="/final"
          className="group flex items-center justify-center gap-4 bg-white/5 border border-white/10 rounded-full backdrop-blur-xl transition-all duration-500 hover:bg-white/10 hover:border-[#d8b4a0]/50 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(216,180,160,0.15)]"
          style={{ padding: '20px 50px', width: 'fit-content', minWidth: '240px' }}
        >
          <span className="font-serif text-[20px] tracking-wide text-white/90">Next Chapter</span>
          <span className="group-hover:translate-x-2 transition-transform duration-300 text-[#d8b4a0] text-[20px]">→</span>
        </Link>
      </div>
    </main>
  );
}

