import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  rotation: number;
}

const EMOJIS = ['🌸', '✨', '💖', '🐾', '🎀', '🎈', '🍭'];

export function CatPawCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const sparkleIdRef = useRef(0);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => {
      setIsClicked(true);
    };

    const onMouseUp = () => {
      setIsClicked(false);
    };

    const onClick = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      
      // Spawn 4-6 sparkles
      const count = 4 + Math.floor(Math.random() * 3);
      const newSparkles: Sparkle[] = [];
      
      for (let i = 0; i < count; i++) {
        const id = sparkleIdRef.current++;
        const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
        const rotation = Math.random() * 360;
        newSparkles.push({ id, x, y, emoji, rotation });
      }
      
      setSparkles((prev) => [...prev, ...newSparkles]);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('click', onClick);
    };
  }, []);

  // Animating sparkles using GSAP after they are rendered
  useEffect(() => {
    sparkles.forEach((sparkle) => {
      const el = document.getElementById(`sparkle-${sparkle.id}`);
      if (el && !el.dataset.animated) {
        el.dataset.animated = 'true';
        
        // Random trajectory
        const angle = Math.random() * Math.PI * 2;
        const distance = 40 + Math.random() * 60;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance - 20; // Float upwards a bit
        
        gsap.to(el, {
          x: tx,
          y: ty,
          opacity: 0,
          rotation: sparkle.rotation + (Math.random() * 180 - 90),
          scale: 0.5,
          duration: 0.8 + Math.random() * 0.4,
          ease: 'power2.out',
          onComplete: () => {
            setSparkles((prev) => prev.filter((s) => s.id !== sparkle.id));
          },
        });
      }
    });
  }, [sparkles]);

  return (
    <>
      {/* Custom Cat Paw Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9999] transition-transform duration-75 -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate3d(-20%, -20%, 0) scale(${isClicked ? '0.8' : '1'})`,
        }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)] filter"
        >
          {/* Main paw base */}
          <path
            d="M8 24C8 18 12 15 20 15C28 15 32 18 32 24C32 30 28 34 20 34C12 34 8 30 8 24Z"
            fill="white"
            stroke="black"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Paw pads (pink) */}
          <path
            d="M14 24.5C14 21.5 16.5 20.5 20 20.5C23.5 20.5 26 21.5 26 24.5C26 27.5 23.5 29.5 20 29.5C16.5 29.5 14 27.5 14 24.5Z"
            fill="#FF85A1"
            stroke="black"
            strokeWidth="1.5"
          />
          {/* Left bottom toe */}
          <circle cx="10" cy="14" r="4" fill="white" stroke="black" strokeWidth="2.5" />
          <circle cx="10" cy="14" r="2" fill="#FF85A1" />
          
          {/* Center-left toe */}
          <circle cx="16.5" cy="9" r="4.5" fill="white" stroke="black" strokeWidth="2.5" />
          <circle cx="16.5" cy="9" r="2.2" fill="#FF85A1" />
          
          {/* Center-right toe */}
          <circle cx="24.5" cy="9" r="4.5" fill="white" stroke="black" strokeWidth="2.5" />
          <circle cx="24.5" cy="9" r="2.2" fill="#FF85A1" />
          
          {/* Right bottom toe */}
          <circle cx="31" cy="14" r="4" fill="white" stroke="black" strokeWidth="2.5" />
          <circle cx="31" cy="14" r="2" fill="#FF85A1" />
        </svg>
      </div>

      {/* Sparkles Particle Layer */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9998]">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            id={`sparkle-${sparkle.id}`}
            className="absolute text-xl select-none"
            style={{
              left: `${sparkle.x}px`,
              top: `${sparkle.y}px`,
              transform: `translate(-50%, -50%) rotate(${sparkle.rotation}deg)`,
            }}
          >
            {sparkle.emoji}
          </div>
        ))}
      </div>
    </>
  );
}
