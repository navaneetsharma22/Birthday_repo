'use client';
import { useState, useEffect } from 'react';

const PRIMARY_BIRTHDAY = new Date('2026-06-22T00:00:00').getTime();

function pad(n) {
  return String(n).padStart(2, '0');
}

export default function CountdownTimer() {
  const [time, setTime] = useState({ days: '00', hours: '00', mins: '00', secs: '00' });
  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    function tick() {
      const now = Date.now();
      let target = PRIMARY_BIRTHDAY;
      let birthdayPassed = false;

      // If the primary countdown has finished
      if (now >= PRIMARY_BIRTHDAY) {
        birthdayPassed = true;
        
        // Calculate the next upcoming birthday dynamically
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        let nextBirthday = new Date(`${currentYear}-06-22T00:00:00`).getTime();
        
        if (now >= nextBirthday) {
          nextBirthday = new Date(`${currentYear + 1}-06-22T00:00:00`).getTime();
        }
        target = nextBirthday;
      }

      setIsBirthday(birthdayPassed);

      const diff = Math.max(target - now, 0);
      setTime({
        days:  pad(Math.floor(diff / 86400000)),
        hours: pad(Math.floor((diff % 86400000) / 3600000)),
        mins:  pad(Math.floor((diff % 3600000) / 60000)),
        secs:  pad(Math.floor((diff % 60000) / 1000)),
      });
    }
    
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: 'Days',  value: time.days  },
    { label: 'Hours', value: time.hours },
    { label: 'Mins',  value: time.mins  },
    { label: 'Secs',  value: time.secs  },
  ];

  return (
    <aside
      className="countdown-card gsap-slide-in justify-self-end"
      style={{
        maxWidth: '460px',
        width: '100%',
        padding: '32px',
        borderRadius: '32px',
        background: 'rgba(20,20,20,0.45)',
        border: '1px solid rgba(255,255,255,0.15)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: '0 24px 70px rgba(0,0,0,0.4)',
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .countdown-card {
            justify-self: center !important;
            max-width: 400px !important;
            padding: 24px !important;
          }
        }
        @media (max-width: 640px) {
          .countdown-card {
            max-width: 100% !important;
            padding: 20px !important;
            border-radius: 24px !important;
          }
        }
      `}</style>
      {/* Birthday Message (Only shows when the first countdown completes) */}
      {isBirthday && (
        <div className="mb-8 p-5 rounded-2xl bg-white/5 border border-white/10 text-center shadow-inner">
          <p className="font-serif text-[22px] text-white/95 mb-3 tracking-wide">Happy Birthday, Komal. 🎉</p>
          <p className="text-white/70 text-[15px] leading-relaxed">
            I wish you lots of happiness, good health, and success in life. Have a wonderful day. Take care.
          </p>
        </div>
      )}

      {/* Label */}
      <p
        className="font-script text-center transition-all duration-1000"
        style={{ fontSize: '28px', color: '#d8b4a0', marginBottom: '24px' }}
      >
        {isBirthday ? 'next birthday countdown' : 'birthday countdown'}
      </p>

      {/* Grid of 4 units */}
      <div className="grid grid-cols-4 gap-3">
        {units.map(({ label, value }) => (
          <div
            key={label}
            className="text-center"
            style={{
              padding: '16px 8px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '20px',
            }}
          >
            <strong
              className="countdown-value block font-serif"
              style={{ fontSize: '34px', lineHeight: 1, color: 'rgba(255,255,255,0.95)' }}
            >
              {value}
            </strong>
            <span
              className="countdown-label"
              style={{ display: 'block', fontSize: '11px', marginTop: '4px', color: 'rgba(255,255,255,0.6)', textTransform: 'capitalize' }}
            >
              {label}
            </span>
            <style>{`
              @media (max-width: 640px) {
                .countdown-value {
                  font-size: 26px !important;
                }
              }
            `}</style>
          </div>
        ))}
      </div>
    </aside>
  );
}
