'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MemoryModal({ memory, onClose }) {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (memory) {
      // Lock scroll on the body
      document.body.style.overflow = 'hidden';

      gsap.to(modalRef.current, { opacity: 1, backdropFilter: 'blur(16px)', duration: 0.4, ease: 'power2.out' });
      gsap.fromTo(contentRef.current, 
        { y: 60, scale: 0.9, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.2)', delay: 0.1 }
      );
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [memory]);

  const handleClose = () => {
    gsap.to(contentRef.current, { y: 30, scale: 0.95, opacity: 0, duration: 0.3, ease: 'power2.in' });
    gsap.to(modalRef.current, { 
      opacity: 0, 
      backdropFilter: 'blur(0px)', 
      duration: 0.4, 
      ease: 'power2.in', 
      onComplete: () => {
        document.body.style.overflow = 'auto';
        onClose();
      }
    });
  };

  if (!memory) return null;

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/70 opacity-0"
      onClick={handleClose}
    >
      <div 
        ref={contentRef}
        className="relative max-w-3xl w-full bg-[#0d0d0d] border border-white/15 rounded-3xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.9)]"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all hover:scale-105"
        >
          ✕
        </button>

        <div className="w-full bg-black relative flex items-center justify-center overflow-hidden" style={{ maxHeight: '65vh' }}>
          {memory.type === 'video' ? (
            <video src={memory.src} autoPlay controls playsInline className="w-full h-auto max-h-[65vh] object-contain" />
          ) : (
            <img src={memory.src} alt={memory.title || 'Memory'} className="w-full h-auto max-h-[65vh] object-contain" />
          )}
        </div>

        <div className="p-6 md:p-8 bg-gradient-to-b from-[#111] to-[#050505]">
          <p className="font-serif text-2xl md:text-3xl text-white/95 mb-2">{memory.title}</p>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mt-2">
            <p className="font-sans text-[15px] leading-relaxed text-white/60 max-w-lg">{memory.description}</p>
            <p className="font-script text-[#d8b4a0] text-2xl opacity-90 sm:shrink-0">{memory.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
