import React from 'react';

// Hand-drawn star SVG
export const SketchedStar: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = '', style }) => (
  <svg
    width="34"
    height="34"
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`opacity-30 pointer-events-none select-none ${className}`}
    style={style}
  >
    <path
      d="M17 2L21.5 11.5L32 13L24.5 20.5L26.5 31L17 26L7.5 31L9.5 20.5L2 13L12.5 11.5L17 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Hand-drawn heart SVG
export const SketchedHeart: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = '', style }) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`opacity-25 pointer-events-none select-none ${className}`}
    style={style}
  >
    <path
      d="M14 24C14 24 2 16.5 2 9.5C2 5.5 5 2.5 9 2.5C11.5 2.5 13 3.5 14 5C15 3.5 16.5 2.5 19 2.5C23 2.5 26 5.5 26 9.5C26 16.5 14 24 14 24Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Hand-drawn scribble ring SVG
export const SketchedScribble: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = '', style }) => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`opacity-20 pointer-events-none select-none ${className}`}
    style={style}
  >
    <path
      d="M32 6C15 4 4 19 8 36C12 51 28 60 45 56C58 52 62 38 58 26C54 16 42 12 32 14C20 16 12 26 16 38C20 48 34 52 44 46C52 40 52 28 44 22C38 18 28 20 26 28C24 34 30 40 36 38C40 36 40 30 36 28"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function CloudBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Sketched stars scattered */}
      <SketchedStar className="absolute text-primary left-[8%] top-[10%] rotate-12 scale-110" />
      <SketchedStar className="absolute text-[#C8B195] right-[15%] top-[18%] -rotate-15" />
      <SketchedStar className="absolute text-primary left-[3%] top-[55%] rotate-45 scale-75" />
      <SketchedStar className="absolute text-[#C8B195] right-[22%] top-[60%] rotate-12 scale-90" />
      <SketchedStar className="absolute text-primary left-[24%] top-[82%] -rotate-6 scale-95" />
      
      {/* Sketched hearts */}
      <SketchedHeart className="absolute text-primary right-[8%] top-[38%] rotate-[20deg] scale-125" />
      <SketchedHeart className="absolute text-primary left-[18%] top-[30%] -rotate-[10deg] scale-95" />
      <SketchedHeart className="absolute text-primary left-[5%] top-[72%] rotate-[15deg]" />
      <SketchedHeart className="absolute text-[#C8B195] right-[5%] top-[85%] -rotate-[35deg] scale-110" />
      
      {/* Scribble rings */}
      <SketchedScribble className="absolute text-[#C8B195] left-[25%] top-[15%] rotate-12" />
      <SketchedScribble className="absolute text-primary right-[12%] top-[48%] -rotate-45 scale-125" />
      <SketchedScribble className="absolute text-[#C8B195] left-[10%] top-[90%] rotate-6 scale-90" />

      {/* Decorative Washi Tape elements randomly on background */}
      <div 
        className="washi-tape washi-tape-pink absolute left-[-20px] top-[25%] opacity-35" 
        style={{ '--tape-rotation': '25deg', width: '80px' } as React.CSSProperties} 
      />
      <div 
        className="washi-tape washi-tape-blue absolute right-[-20px] top-[70%] opacity-30" 
        style={{ '--tape-rotation': '-35deg', width: '90px' } as React.CSSProperties} 
      />
    </div>
  );
}
