'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MemoryModal({ memories, activeIndex, setActiveIndex, onClose }) {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  const memory = activeIndex !== null ? memories[activeIndex] : null;

  useEffect(() => {
    if (memory) {
      document.body.style.overflow = 'hidden';
      
      // Open animation
      gsap.to(modalRef.current, { opacity: 1, backdropFilter: 'blur(24px)', duration: 0.4, ease: 'power2.out' });
      gsap.fromTo(contentRef.current, 
        { y: 40, scale: 0.95, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.05 }
      );
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [memory]);

  // Keyboard navigation
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  const handleClose = () => {
    gsap.to(contentRef.current, { y: 20, scale: 0.98, opacity: 0, duration: 0.25, ease: 'power2.in' });
    gsap.to(modalRef.current, { 
      opacity: 0, 
      backdropFilter: 'blur(0px)', 
      duration: 0.3, 
      ease: 'power2.in', 
      onComplete: () => {
        document.body.style.overflow = 'auto';
        onClose();
      }
    });
  };

  const handleNext = () => {
    if (activeIndex === null) return;
    const nextIdx = (activeIndex + 1) % memories.length;
    // Quick crossfade animation
    gsap.fromTo(contentRef.current, 
      { opacity: 0.7, scale: 0.99 }, 
      { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
    );
    setActiveIndex(nextIdx);
  };

  const handlePrev = () => {
    if (activeIndex === null) return;
    const prevIdx = (activeIndex - 1 + memories.length) % memories.length;
    // Quick crossfade animation
    gsap.fromTo(contentRef.current, 
      { opacity: 0.7, scale: 0.99 }, 
      { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
    );
    setActiveIndex(prevIdx);
  };

  if (activeIndex === null || !memory) return null;

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 bg-black/85 opacity-0"
      onClick={handleClose}
      style={{ backdropFilter: 'blur(0px)' }}
    >
      {/* Navigation - Left Arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); handlePrev(); }}
        className="absolute left-4 sm:left-8 z-[210] w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white flex items-center justify-center transition-all hover:scale-105"
        aria-label="Previous image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Navigation - Right Arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); handleNext(); }}
        className="absolute right-4 sm:right-8 z-[210] w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white flex items-center justify-center transition-all hover:scale-105"
        aria-label="Next image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      <div 
        ref={contentRef}
        className="relative max-w-4xl w-full bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.95)] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-all hover:scale-105"
        >
          ✕
        </button>

        {/* Media Frame */}
        <div className="w-full bg-black flex items-center justify-center overflow-hidden h-[60vh] sm:h-[65vh]">
          {memory.type === 'video' ? (
            <video src={memory.src} autoPlay controls playsInline className="w-full h-full object-contain" />
          ) : (
            <img src={memory.src} alt={memory.title || 'Memory'} className="w-full h-full object-contain" />
          )}
        </div>

        {/* Captions Block */}
        <div className="p-6 sm:p-8 bg-gradient-to-b from-[#111111] to-[#050505] border-t border-white/5">
          <p className="font-serif text-2xl sm:text-3xl text-white/95 mb-2">{memory.title}</p>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mt-2">
            <p className="font-sans text-[15px] leading-relaxed text-white/60 max-w-xl">{memory.description}</p>
            <p className="font-script text-[#d8b4a0] text-2xl opacity-90 sm:shrink-0">{memory.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
