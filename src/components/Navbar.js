'use client';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { SHOW_MEMORIES } from '@/config/settings';

const ALL_NAV_LINKS = [
  { href: '/letter',   label: 'Letter'   },
  { href: '/cake',     label: 'Cake'     },
  { href: '/reasons',  label: '100 Reasons' },
  { href: '/map',      label: 'Our Spots' },
  { href: '/vault',    label: 'The Vault' },
  { href: '/memories', label: 'Memories' },
  { href: '/final',    label: 'Final'    },
];

const NAV_LINKS = ALL_NAV_LINKS.filter(link => link.href !== '/memories' || SHOW_MEMORIES);

const HEART_MODES = [
  { id: 'gentle', label: '🌸 Gentle Drift' },
  { id: 'spiral', label: '🌀 Spiral Twirl' },
  { id: 'cascade', label: '🌧️ Love Rain' },
  { id: 'fountain', label: '⛲ Heart Fountain' },
  { id: 'breathe', label: '💓 Pulse Shimmer' },
  { id: 'magnetic', label: '🧲 Magnetic Flow' },
];

export default function Navbar() {
  const navRef = useRef(null);
  const dropdownRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHeartMode, setActiveHeartMode] = useState('gentle');
  const [heartDropdownOpen, setHeartDropdownOpen] = useState(false);

  const tapCountRef = useRef(0);
  const lastTapRef = useRef(0);

  const handleLogoTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 600) {
      tapCountRef.current += 1;
    } else {
      tapCountRef.current = 1;
    }
    lastTapRef.current = now;

    if (tapCountRef.current >= 3) {
      tapCountRef.current = 0;
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('trigger-easter-egg'));
      }
    }
  };

  useGSAP(() => {
    if (navRef.current) {
      gsap.from(navRef.current, {
        y: -80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2
      });
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setHeartDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const handleSelectMode = (modeId) => {
    setActiveHeartMode(modeId);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('change-heart-mode', { detail: modeId }));
    }
    setHeartDropdownOpen(false);
  };

  const handleBurst = () => {
    if (typeof window !== 'undefined') {
      if (typeof window.triggerEnvelopeHearts === 'function') {
        window.triggerEnvelopeHearts();
      } else {
        window.dispatchEvent(new CustomEvent('trigger-envelope-hearts'));
      }
    }
  };

  return (
    <>
      <style>{`
        .nav-link {
          color: rgba(255,255,255,0.78);
          opacity: 0.78;
          transition: opacity 0.25s, color 0.25s;
          font-size: 13px;
          font-weight: 500;
        }
        .nav-link:hover {
          opacity: 1;
          color: #fff;
        }

        /* Desktop nav links */
        .nav-desktop-links {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        /* Hamburger button — hidden on desktop */
        .nav-hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 36px;
          height: 36px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          z-index: 70;
        }
        .nav-hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: rgba(255,255,255,0.85);
          border-radius: 2px;
          transition: transform 0.3s, opacity 0.3s;
        }
        .nav-hamburger.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .nav-hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        .nav-hamburger.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* Mobile overlay menu — hidden on desktop */
        .nav-mobile-overlay {
          display: none;
        }

        /* ── Show hamburger & overlay on mobile/tablet ── */
        @media (max-width: 768px) {
          .nav-desktop-links {
            display: none;
          }
          .nav-hamburger {
            display: flex;
          }
          .nav-mobile-overlay {
            display: flex;
            position: fixed;
            inset: 0;
            z-index: 60;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 24px;
            background: rgba(5,5,5,0.92);
            backdrop-filter: blur(28px);
            -webkit-backdrop-filter: blur(28px);
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.35s ease;
          }
          .nav-mobile-overlay.open {
            opacity: 1;
            pointer-events: auto;
          }
          .nav-mobile-overlay a {
            font-family: 'Cormorant Garamond', serif;
            font-size: 32px;
            font-weight: 500;
            color: rgba(255,255,255,0.85);
            letter-spacing: 2px;
            transition: color 0.3s, transform 0.3s;
          }
          .nav-mobile-overlay a:hover {
            color: #d8b4a0;
            transform: translateX(6px);
          }
        }
      `}</style>

      <nav
        ref={navRef}
        className="fixed top-[22px] left-1/2 -translate-x-1/2 z-50 flex items-center justify-between"
        style={{
          width: 'min(1120px, 92%)',
          padding: '11px 26px',
          borderRadius: '999px',
          background: 'rgba(20,20,20,0.55)',
          border: '1px solid rgba(255,255,255,0.12)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-script font-bold select-none cursor-pointer"
          style={{ fontSize: '28px', color: '#fff' }}
          onClick={() => {
            closeMenu();
            handleLogoTap();
          }}
        >
          Komal
        </Link>

        {/* Desktop Links + Hearts Selector */}
        <div className="nav-desktop-links">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="nav-link">
              {label}
            </Link>
          ))}

          {/* Sleek Floating Hearts Dropdown Pill in Navbar (No Outline) */}
          <div ref={dropdownRef} className="relative ml-1">
            <button
              onClick={() => setHeartDropdownOpen(!heartDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer select-none"
              style={{
                border: 'none',
                outline: 'none',
                background: heartDropdownOpen 
                  ? 'rgba(255, 255, 255, 0.12)' 
                  : 'rgba(255, 255, 255, 0.04)',
                color: '#fff',
                boxShadow: heartDropdownOpen ? '0 4px 16px rgba(0,0,0,0.25)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!heartDropdownOpen) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              }}
              onMouseLeave={(e) => {
                if (!heartDropdownOpen) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
              }}
            >
              <span className="text-sm">💖</span>
              <span className="tracking-wide text-white/90 font-medium">
                {HEART_MODES.find(m => m.id === activeHeartMode)?.label.split(' ')[1] || 'Hearts'}
              </span>
              <span 
                className="text-[9px] text-[#d8b4a0] transition-transform duration-300 ease-out inline-block ml-0.5"
                style={{ transform: heartDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                ▼
              </span>
            </button>

            {/* Ultra-Luxury Glassmorphic Dropdown Menu */}
            {heartDropdownOpen && (
              <div
                className="absolute right-0 mt-3.5 w-72 p-4 rounded-[24px] flex flex-col transition-all z-50 animate-fadeIn"
                style={{
                  background: 'rgba(16, 14, 18, 0.88)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(36px)',
                  WebkitBackdropFilter: 'blur(36px)',
                  boxShadow: '0 30px 80px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
                }}
              >
                {/* Header with generous breathing space */}
                <div className="pb-3 mb-2.5 border-b border-white/[0.08] flex items-center justify-between px-1">
                  <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-[#d8b4a0]">
                    Floating Hearts
                  </span>
                  <span className="text-[10px] text-white/40 tracking-wider font-sans">
                    6 styles ✦
                  </span>
                </div>

                {/* Mode Items List */}
                <div className="flex flex-col gap-1.5 py-1">
                  {HEART_MODES.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => handleSelectMode(mode.id)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs transition-all duration-200 cursor-pointer ${
                        activeHeartMode === mode.id
                          ? 'text-white font-medium'
                          : 'text-white/75 hover:text-white hover:bg-white/[0.06]'
                      }`}
                      style={{
                        border: 'none',
                        outline: 'none',
                        background: activeHeartMode === mode.id
                          ? 'linear-gradient(135deg, rgba(216, 180, 160, 0.18), rgba(62, 50, 50, 0.35))'
                          : 'transparent',
                        boxShadow: activeHeartMode === mode.id
                          ? 'inset 0 0 0 1px rgba(216, 180, 160, 0.25)'
                          : 'none',
                      }}
                    >
                      <span className="tracking-wide flex items-center gap-2">
                        {mode.label}
                      </span>
                      {activeHeartMode === mode.id && (
                        <span className="text-[#d8b4a0] text-xs font-bold drop-shadow-[0_0_8px_rgba(216,180,160,0.5)]">
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Polished Burst Button */}
                <div className="mt-3 pt-3 border-t border-white/[0.08]">
                  <button
                    onClick={handleBurst}
                    className="group relative overflow-hidden w-full py-3 px-4 rounded-2xl text-xs font-medium transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 select-none active:scale-[0.98] hover:scale-[1.01]"
                    style={{
                      border: 'none',
                      outline: 'none',
                      background: 'linear-gradient(135deg, #3e2f31 0%, #291e20 100%)',
                      color: '#f5e4dc',
                      boxShadow: '0 12px 28px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                      letterSpacing: '0.4px',
                    }}
                  >
                    <span className="text-sm transition-transform duration-300 group-hover:scale-125">💖</span>
                    <span className="font-sans font-medium tracking-wide">Release Hearts Burst</span>
                    {/* Subtle inner shimmer line */}
                    <div className="absolute inset-0 -translate-x-[150%] skew-x-[-25deg] w-[150%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[150%]" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hamburger Button (mobile only) */}
        <button
          className={`nav-hamburger${menuOpen ? ' open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile Full-Screen Overlay */}
      <div className={`nav-mobile-overlay${menuOpen ? ' open' : ''}`}>
        {NAV_LINKS.map(({ href, label }) => (
          <Link key={href} href={href} onClick={closeMenu}>
            {label}
          </Link>
        ))}

        {/* Mobile Heart Mode Selector */}
        <div className="flex flex-col items-center gap-3 mt-4 pt-6 border-t border-white/10 w-full max-w-[300px]">
          <span className="text-xs text-[#d8b4a0]/90 uppercase tracking-[0.14em] font-serif font-medium">
            Floating Hearts Style ✦
          </span>
          <div className="grid grid-cols-2 gap-2 w-full">
            {HEART_MODES.map((mode) => (
              <button
                key={mode.id}
                onClick={() => {
                  handleSelectMode(mode.id);
                  closeMenu();
                }}
                className={`py-2.5 px-3 rounded-2xl text-xs text-center transition-all cursor-pointer ${
                  activeHeartMode === mode.id
                    ? 'text-white font-medium'
                    : 'bg-white/[0.05] text-white/70 hover:bg-white/10'
                }`}
                style={{
                  border: 'none',
                  outline: 'none',
                  background: activeHeartMode === mode.id
                    ? 'linear-gradient(135deg, rgba(216, 180, 160, 0.25), rgba(62, 50, 50, 0.5))'
                    : undefined,
                  boxShadow: activeHeartMode === mode.id
                    ? 'inset 0 0 0 1px rgba(216, 180, 160, 0.3)'
                    : 'none',
                }}
              >
                {mode.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              handleBurst();
              closeMenu();
            }}
            className="w-full mt-2 py-3 px-4 rounded-2xl text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
            style={{
              border: 'none',
              outline: 'none',
              background: 'linear-gradient(135deg, #3e2f31 0%, #291e20 100%)',
              color: '#f5e4dc',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
            }}
          >
            <span>💖 Release Hearts Burst</span>
          </button>
        </div>
      </div>
    </>
  );
}
