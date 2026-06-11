import { motion } from 'framer-motion';
import React from 'react';

interface StickerProps {
  type: 'rugged' | 'cat' | 'diamond' | 'liquidated' | 'moon' | 'approved' | 'custom';
  text?: string;
  defaultPosition?: { x: number; y: number };
  rotation?: number;
  className?: string;
  children?: React.ReactNode;
}

export function Sticker({
  type,
  text,
  defaultPosition = { x: 0, y: 0 },
  rotation = 0,
  className = '',
  children
}: StickerProps) {
  // Common container with drag properties
  const dragProps = {
    drag: true,
    dragMomentum: false,
    whileDrag: { scale: 1.1, zIndex: 50, cursor: 'grabbing' },
  };

  const getStickerContent = () => {
    switch (type) {
      case 'rugged':
        return (
          <div 
            className="bg-[#D95D70] text-white border-[3px] border-white font-heading text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full rotate-[-5deg] select-none text-center shadow-md hover:scale-105 transition-transform"
            style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.2)' }}
          >
            🚨 RUGGED
          </div>
        );
      case 'cat':
        return (
          <div className="relative p-2 bg-white border-[3px] border-white rounded-2xl rotate-[8deg] shadow-md select-none hover:scale-105 transition-transform">
            <svg width="60" height="50" viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Cat Ears */}
              <path d="M12 25 L3 3 L18 12 Z" fill="#433E3B" />
              <path d="M48 25 L57 3 L42 12 Z" fill="#433E3B" />
              <path d="M7 21 L5 8 L14 14 Z" fill="#EAA8B6" />
              <path d="M53 21 L55 8 L46 14 Z" fill="#EAA8B6" />
              {/* Cat Head */}
              <path d="M5 25 Q 30 18 55 25 Q 58 38 52 46 Q 30 50 8 46 Q 2 38 5 25 Z" fill="#FAF6EE" stroke="#433E3B" strokeWidth="2.5" />
              {/* Eyes */}
              <circle cx="18" cy="32" r="3.5" fill="#433E3B" />
              <circle cx="42" cy="32" r="3.5" fill="#433E3B" />
              <circle cx="19" cy="31" r="1" fill="white" />
              <circle cx="43" cy="31" r="1" fill="white" />
              {/* Nose/Mouth */}
              <path d="M30 35 L28 37 Q 30 39 32 37 Z" fill="#EAA8B6" stroke="#433E3B" strokeWidth="1" />
              {/* Blush */}
              <circle cx="12" cy="36" r="3" fill="#EAA8B6" opacity="0.6" />
              <circle cx="48" cy="36" r="3" fill="#EAA8B6" opacity="0.6" />
              {/* Whiskers */}
              <path d="M8 35 L1 34 M8 38 L0 39" stroke="#433E3B" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M52 35 L59 34 M52 38 L60 39" stroke="#433E3B" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <div className="absolute -top-1 -right-2 text-[10px] bg-[#EAA8B6] text-white px-1 py-0.2 rounded-full rotate-[12deg] font-heading font-semibold scale-90 border border-white">
              nya!
            </div>
          </div>
        );
      case 'diamond':
        return (
          <div className="bg-[#BACFD9] text-[#2C5263] border-[3px] border-white font-heading text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded rotate-[4deg] shadow-md select-none flex items-center gap-1 hover:scale-105 transition-transform">
            <span>💎</span> DIAMOND HANDS
          </div>
        );
      case 'liquidated':
        return (
          <div className="bg-[#FFF0F2] text-[#D95D70] border-[3px] border-white font-heading text-xs font-bold px-3 py-2 rounded-xl rotate-[-7deg] shadow-md select-none text-center flex flex-col items-center hover:scale-105 transition-transform">
            <span className="text-lg leading-none">💔</span>
            <span className="text-[10px] tracking-wider uppercase font-semibold mt-0.5">LIQUIDATED</span>
          </div>
        );
      case 'moon':
        return (
          <div className="bg-[#FAF5D5] text-[#8C7A2B] border-[3px] border-white font-heading text-[10px] font-bold uppercase px-3 py-1 rounded-full rotate-[12deg] shadow-md select-none flex items-center gap-1 hover:scale-105 transition-transform">
            <span>🌙</span> TO THE MOON 🚀
          </div>
        );
      case 'approved':
        return (
          <div className="relative bg-white border-[3px] border-white p-3 rounded-full shadow-md rotate-[-15deg] select-none hover:scale-105 transition-transform w-20 h-20 flex flex-col items-center justify-center text-center">
            {/* Seal background circle */}
            <div className="absolute inset-0.5 border border-dashed border-[#D48C9C] rounded-full" />
            <span className="font-script text-2xl text-[#D48C9C] -mb-1 select-none">Ria</span>
            <span className="font-heading text-[7px] text-[#433E3B] font-bold tracking-widest uppercase select-none">APPROVED</span>
          </div>
        );
      case 'custom':
        return (
          <div className="bg-white text-foreground border-[3px] border-white font-heading text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-md select-none hover:scale-105 transition-transform">
            {text}
          </div>
        );
      default:
        return children;
    }
  };

  return (
    <motion.div
      {...dragProps}
      className={`sticker-container absolute z-20 ${className}`}
      style={{
        left: defaultPosition.x,
        top: defaultPosition.y,
        rotate: rotation,
        touchAction: 'none'
      }}
    >
      <div className="sticker-peel">
        {getStickerContent()}
      </div>
    </motion.div>
  );
}
