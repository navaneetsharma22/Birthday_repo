'use client';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Link from 'next/link';
import FloatingParticles from '@/components/FloatingParticles';

gsap.registerPlugin(ScrollTrigger);

const MemoryCard = ({ src, alt, caption, className = "", imgClassName = "object-center", audioSrc }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio play blocked:', e));
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Mobile tap toggle
  const handleTap = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(e => console.log('Audio play blocked:', e));
      setIsPlaying(true);
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
        
        {/* ── Desktop Premium Audio Indicator (hidden on mobile) ── */}
        {audioSrc && (
          <div className="absolute top-6 right-6 z-10 pointer-events-none group-hover:-translate-y-1 transition-all duration-700 ease-out hidden md:block">
            {/* Outer glow ring */}
            <div className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: 'radial-gradient(circle, rgba(216,180,160,0.15) 0%, transparent 70%)' }} />
            
            <div className="relative flex items-center gap-3 rounded-full overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]" style={{ padding: '8px 14px' }}>
              {/* Glass background */}
              <div className="absolute inset-0 bg-black/80 backdrop-blur-3xl border border-[#d8b4a0]/20 rounded-full group-hover:border-[#d8b4a0]/40 transition-all duration-500" />
              
              {/* Pulsing Sound Wave Icon */}
              <div className="relative w-[32px] h-[32px] flex-shrink-0 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-[#d8b4a0]/30 sound-ring sound-ring-3" />
                <div className="absolute inset-[4px] rounded-full border border-[#d8b4a0]/40 sound-ring sound-ring-2" />
                <div className="absolute inset-[8px] rounded-full border-[1.5px] border-[#d8b4a0]/60 sound-ring sound-ring-1" />
                <div className="w-[6px] h-[6px] rounded-full bg-[#d8b4a0] shadow-[0_0_10px_rgba(216,180,160,0.7),0_0_20px_rgba(216,180,160,0.3)] sound-dot" />
              </div>

              {/* Equalizer */}
              <div className="relative flex items-center mr-1">
                <div className="flex items-end gap-[2px] h-[10px]">
                  <div className="music-bar music-bar-1" style={{ height: '10px', width: '2px' }}></div>
                  <div className="music-bar music-bar-2" style={{ height: '10px', width: '2px' }}></div>
                  <div className="music-bar music-bar-3" style={{ height: '10px', width: '2px' }}></div>
                  <div className="music-bar music-bar-4" style={{ height: '10px', width: '2px' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Mobile Audio Indicator (tap to play) ── */}
        {audioSrc && (
          <button
            onClick={handleTap}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 rounded-full overflow-hidden cursor-pointer md:hidden active:scale-95 transition-all duration-300"
            style={{ padding: '6px 14px' }}
          >
            {/* Glass bg */}
            <div className={`absolute inset-0 backdrop-blur-2xl rounded-full border transition-all duration-500 ${isPlaying ? 'bg-black/80 border-[#d8b4a0]/50 shadow-[0_0_20px_rgba(216,180,160,0.25)]' : 'bg-black/70 border-white/[0.08]'}`} />
            
            {/* Pulsing dot */}
            <div className="relative w-[20px] h-[20px] flex-shrink-0 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#d8b4a0]/30 sound-ring sound-ring-3" />
              <div className="absolute inset-[3px] rounded-full border border-[#d8b4a0]/50 sound-ring sound-ring-2" />
              <div className={`w-[6px] h-[6px] rounded-full transition-colors duration-300 ${isPlaying ? 'bg-[#d8b4a0] shadow-[0_0_10px_rgba(216,180,160,0.8)]' : 'bg-[#d8b4a0]/70 shadow-[0_0_6px_rgba(216,180,160,0.4)]'} sound-dot`} />
            </div>

            {/* Equalizer bars (visible when playing) */}
            {isPlaying && (
              <div className="relative flex items-end gap-[2px] h-[10px]">
                <div className="music-bar music-bar-1" style={{ height: '10px', width: '2px' }}></div>
                <div className="music-bar music-bar-2" style={{ height: '10px', width: '2px' }}></div>
                <div className="music-bar music-bar-3" style={{ height: '10px', width: '2px' }}></div>
              </div>
            )}

            {/* Text */}
            <span className="relative text-white/90 text-[9px] font-sans tracking-[0.2em] uppercase font-semibold whitespace-nowrap">
              {isPlaying ? 'Now Playing' : 'Tap to Listen'}
            </span>
          </button>
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
                audioSrc="/assets/memories/song05.mp3.mpeg"
              />
            </div>
            <div className="h-[450px] md:h-[600px]">
              <MemoryCard 
                src="/assets/memories/3.png" 
                className="h-full" 
                caption="When the world is asleep, our laughter is the only sound that matters." 
                audioSrc="/assets/memories/song09.mp3.mpeg"
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
                audioSrc="/assets/memories/song11.mp3.mpeg"
              />
            </div>
            <div className="md:col-span-7 h-[450px] md:h-[550px]">
              <MemoryCard 
                src="/assets/memories/5.png" 
                className="h-full" 
                caption="Watching the sky turn into paint while holding hands. A moment frozen in time." 
                audioSrc="/assets/memories/song07.mp3.mpeg"
              />
            </div>
          </div>

          {/* SPECIAL PIC */}
          <div className="w-full h-[450px] md:h-[650px] mt-[20px]">
            <MemoryCard 
              src="/assets/memories/6.png" 
              className="h-full" 
              caption="You have this beautiful way of making even the most ordinary days shine bright." 
              audioSrc="/assets/memories/song08.mp3.mpeg"
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
                audioSrc="/assets/memories/song04.mp3.mpeg"
              />
            </div>
            <div className="h-[450px] md:h-[600px]">
              <MemoryCard 
                src="/assets/memories/8.png" 
                className="h-full" 
                imgClassName="object-right"
                caption="A gentle reminder of how beautiful life is when shared with someone so rare." 
                audioSrc="/assets/memories/song13.mp3.mpeg"
              />
            </div>
            <div className="h-[450px] md:h-[600px]">
              <MemoryCard 
                src="/assets/memories/9.png" 
                className="h-full" 
                caption="The best memories are always the ones we never planned to make." 
                audioSrc="/assets/memories/song10.mp3.mpeg"
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

