import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore, type Confession } from '@/store/useAppStore';
import { ConfessionCard } from '@/components/ConfessionCard';
import riaAvatar from '@/assets/ria_avatar.png';
import { Trophy, Award, Radio } from 'lucide-react';
import { gsap } from 'gsap';
import riaBannerVideo from '@/assets/riawebsitebanner.webm';
import { Sticker } from '@/components/Sticker';
import { motion } from 'framer-motion';

interface RansomLetterProps {
  char: string;
  className: string;
  textClassName: string;
  bgColor: string;
  textColor: string;
  pattern?: string;
  fontFamily: string;
  rotation: number;
  translateY: number;
  fontStyle?: string;
  textStroke?: string;
  borderWidth?: number;
  sketchText?: boolean;
}

const RansomLetter: React.FC<RansomLetterProps> = ({
  char,
  className,
  textClassName,
  bgColor,
  textColor,
  pattern,
  fontFamily,
  rotation,
  translateY,
  fontStyle = 'normal',
  textStroke,
  borderWidth = 5,
  sketchText = false,
}) => {
  const baseW = 100;
  const baseH = 120;
  
  const seed = char.charCodeAt(0) + baseW + baseH;
  
  const path = useMemo(() => {
    let points: string[] = [];
    let currentSeed = seed;
    const random = () => {
      const x = Math.sin(currentSeed++) * 10000;
      return x - Math.floor(x);
    };

    const stepsX = 14;
    const stepsY = 14;
    const jag = 3.2;

    for (let i = 0; i <= stepsX; i++) {
      const x = (i / stepsX) * baseW;
      const y = i === 0 || i === stepsX ? 0 : (random() - 0.5) * jag;
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }

    for (let i = 1; i <= stepsY; i++) {
      const y = (i / stepsY) * baseH;
      const x = i === stepsY ? baseW : baseW + (random() - 0.5) * jag;
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }

    for (let i = stepsX - 1; i >= 0; i--) {
      const x = (i / stepsX) * baseW;
      const y = i === 0 ? baseH : baseH + (random() - 0.5) * jag;
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }

    for (let i = stepsY - 1; i > 0; i--) {
      const y = (i / stepsY) * baseH;
      const x = (random() - 0.5) * jag;
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }

    return `M ${points.join(' L ')} Z`;
  }, [seed]);

  return (
    <div 
      className={`relative select-none shrink-0 ${className}`}
      style={{
        transform: `rotate(${rotation}deg) translateY(${translateY}px)`,
        filter: 'drop-shadow(3px 4px 6px rgba(0,0,0,0.15))',
      }}
    >
      <svg 
        width="100%" 
        height="100%" 
        viewBox={`0 0 ${baseW} ${baseH}`} 
        className="overflow-visible w-full h-full"
      >
        <path d={path} fill={bgColor} />
        {pattern && <path d={path} fill={`url(#${pattern})`} />}
        <path 
          d={path} 
          fill="none" 
          stroke="white" 
          strokeWidth={borderWidth} 
          strokeLinejoin="round"
        />
        <path 
          d={path} 
          fill="none" 
          stroke={textColor} 
          strokeWidth="0.8" 
          strokeDasharray="3,2" 
          opacity="0.25"
        />
      </svg>
      <div 
        className={`absolute inset-0 flex items-center justify-center pointer-events-none select-none font-bold uppercase ${textClassName}`}
        style={{
          fontFamily,
          color: textStroke ? 'transparent' : textColor,
          fontStyle,
          WebkitTextStroke: textStroke || 'none',
          filter: sketchText ? 'url(#sketch-filter)' : 'none',
        }}
      >
        {char}
      </div>
    </div>
  );
};

export function HomePage() {
  const confessions = useAppStore((state) => state.confessions);
  const notices = useAppStore((state) => state.notices);
  const containerRef = useRef<HTMLDivElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);
  
  const [riaQuote, setRiaQuote] = useState("stop trying to make your exits happen. they're not going to happen.");

  const mockHeroConfession = useMemo<Confession>(() => ({
    id: 'conf-hero-mock',
    number: 843,
    category: 'Trading',
    text: "I turned $10k into $500k and back into $10k in less than 48 hours. I haven't slept in three days and my mom thinks I bought a house.",
    riaRoast: "speedrunning wealth. maybe try sleep next time? it's free.",
    views: "482K",
    hearts: 38200,
    commentsCount: 2100,
    flameScore: 98,
    timeAgo: "2m ago",
    createdAt: new Date().toISOString()
  }), []);

  const quotes = [
    "stop trying to make your exits happen. they're not going to happen.",
    "oh sweetie, selling SOL at $8 is a personality trait. enjoy your gas money.",
    "on Wednesdays we don't buy shitcoins, but clearly you didn't get the memo.",
    "getting rugged in 2026? please tell me you at least got a cute sticker.",
    "liquidated? is that your new way of saying you're financially humbled? cute.",
    "the dog is doing better than you."
  ];

  // Cycle RIA quote every 5 seconds with a bounce animation
  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to('.ria-speech', {
        scale: 0.95,
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          setRiaQuote(quotes[Math.floor(Math.random() * quotes.length)]);
          gsap.to('.ria-speech', {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo('.hero-title', 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 }
      );
      
      tl.fromTo('.hero-sticker', 
        { opacity: 0, scale: 0, rotate: -30 },
        { opacity: 1, scale: 1, rotate: 12, duration: 0.6, ease: 'back.out(1.5)' },
        '-=0.4'
      );

      tl.fromTo('.hero-video', 
        { opacity: 0, scale: 0.95, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8 },
        '-=0.5'
      );

      tl.fromTo('.hero-cards', 
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.8 },
        '-=0.6'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden pb-16">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-10 pb-32 mt-4 z-10 w-full">
        


        {/* Background Video */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none hero-video">
          <video 
            src={riaBannerVideo} 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-85"
          />
        </div>

        <div className="grid grid-cols-12 gap-8 items-center w-full max-w-7xl mx-auto px-4 sm:px-6 xl:px-0 text-left relative z-10">
          
          {/* Left Column: Stacked Title */}
          <div className="col-span-12 lg:col-span-7 flex flex-col items-start justify-center relative">
            <div className="relative">
              {/* SVG definitions for sketch filters and patterns */}
              <svg className="absolute w-0 h-0" style={{ pointerEvents: 'none' }}>
                <defs>
                  {/* Sketch Filter for rough hand-drawn outlines */}
                  <filter id="sketch-filter" x="-10%" y="-10%" width="120%" height="120%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
                  </filter>

                  {/* Grid Pattern */}
                  <pattern id="grid-pink" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#f43f5e" strokeWidth="0.5" opacity="0.15" />
                  </pattern>

                  {/* Dots Pattern */}
                  <pattern id="dots-pink" width="8" height="8" patternUnits="userSpaceOnUse">
                    <circle cx="4" cy="4" r="1.2" fill="#e11d48" opacity="0.2" />
                  </pattern>

                  {/* Notebook Lines Pattern */}
                  <pattern id="lines-pink" width="100" height="12" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="12" x2="100" y2="12" stroke="#e11d48" strokeWidth="0.6" opacity="0.15" />
                  </pattern>

                  {/* Diagonal Stripes Pattern */}
                  <pattern id="stripes-pink" width="16" height="16" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="0" y2="16" stroke="#fda4af" strokeWidth="3.5" opacity="0.35" />
                  </pattern>

                  {/* Washi Tape Hearts Pattern */}
                  <pattern id="hearts-pink" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M12 5c-1.2-1.5-3-2-4.5-.5-1.5 1.5-1 3.5.5 5l4 4 4-4c1.5-1.5 2-3.5.5-5-1.5-1.5-3.3-1-4.5.5z" fill="#e11d48" opacity="0.12" transform="scale(0.8)" />
                  </pattern>
                </defs>
              </svg>

              <h1 className="hero-title flex flex-col gap-3 select-none relative pb-2">
                {/* RIA Row */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <RansomLetter 
                    char="R"
                    className="w-16 h-20 sm:w-22 sm:h-26 md:w-26 md:h-32 lg:w-30 lg:h-36"
                    textClassName="text-5xl sm:text-7xl md:text-[5.5rem] lg:text-[6.5rem]"
                    bgColor="oklch(0.7196 0.1499 14.95)"
                    textColor="#2C1619"
                    pattern="grid-pink"
                    fontFamily="'Playfair Display', serif"
                    rotation={-4}
                    translateY={4}
                    sketchText={true}
                  />
                  <RansomLetter 
                    char="i"
                    className="w-12 h-16 sm:w-18 sm:h-22 md:w-20 md:h-24 lg:w-24 lg:h-30"
                    textClassName="text-4xl sm:text-6xl md:text-[4.5rem] lg:text-[5.5rem] translate-y-[-4px]"
                    bgColor="#FFE2E7"
                    textColor="#FF5A8F"
                    pattern="dots-pink"
                    fontFamily="'Caveat', cursive"
                    fontStyle="italic"
                    rotation={6}
                    translateY={-8}
                  />
                  <RansomLetter 
                    char="A"
                    className="w-16 h-20 sm:w-22 sm:h-26 md:w-26 md:h-32 lg:w-30 lg:h-36"
                    textClassName="text-5xl sm:text-7xl md:text-[5.5rem] lg:text-[6.5rem]"
                    bgColor="#FFCCD5"
                    textColor="#881337"
                    pattern="lines-pink"
                    fontFamily="'Courier Prime', monospace"
                    rotation={-2}
                    translateY={6}
                    textStroke="2px #881337"
                  />
                </div>
                
                {/* UNTOLD Row */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 mt-2">
                  <RansomLetter 
                    char="U"
                    className="w-9 h-12 sm:w-13 sm:h-16 md:w-15 md:h-18 lg:w-17 lg:h-20"
                    textClassName="text-2xl sm:text-3xl md:text-[2.2rem] lg:text-[2.8rem]"
                    bgColor="#FDE2F3"
                    textColor="#BE123C"
                    pattern="stripes-pink"
                    fontFamily="'Outfit', sans-serif"
                    rotation={5}
                    translateY={-4}
                  />
                  <RansomLetter 
                    char="N"
                    className="w-8 h-11 sm:w-12 sm:h-15 md:w-14 md:h-17 lg:w-16 lg:h-19"
                    textClassName="text-2xl sm:text-3xl md:text-[2rem] lg:text-[2.6rem]"
                    bgColor="#FFF0F2"
                    textColor="#3E3830"
                    pattern="dots-pink"
                    fontFamily="'Courier Prime', monospace"
                    rotation={-6}
                    translateY={4}
                    sketchText={true}
                  />
                  <RansomLetter 
                    char="T"
                    className="w-9 h-12 sm:w-13 sm:h-16 md:w-15 md:h-18 lg:w-17 lg:h-21"
                    textClassName="text-2xl sm:text-3xl md:text-[2.4rem] lg:text-[3.1rem]"
                    bgColor="#FFE5EC"
                    textColor="#881337"
                    pattern="grid-pink"
                    fontFamily="'Playfair Display', serif"
                    rotation={4}
                    translateY={-2}
                  />
                  <RansomLetter 
                    char="O"
                    className="w-10 h-12 sm:w-14 sm:h-16 md:w-16 md:h-18 lg:w-18 lg:h-20"
                    textClassName="text-2xl sm:text-3xl md:text-[2.2rem] lg:text-[2.8rem]"
                    bgColor="#FF8093"
                    textColor="#FFFFFF"
                    pattern="hearts-pink"
                    fontFamily="'Outfit', sans-serif"
                    rotation={-4}
                    translateY={5}
                  />
                  <RansomLetter 
                    char="L"
                    className="w-8 h-11 sm:w-12 sm:h-15 md:w-14 md:h-17 lg:w-16 lg:h-19"
                    textClassName="text-2xl sm:text-3xl md:text-[2rem] lg:text-[2.6rem]"
                    bgColor="#2C1619"
                    textColor="#FDA4AF"
                    pattern="lines-pink"
                    fontFamily="'Playfair Display', serif"
                    rotation={6}
                    translateY={-5}
                  />
                  <RansomLetter 
                    char="D"
                    className="w-10 h-12 sm:w-14 sm:h-16 md:w-16 md:h-18 lg:w-18 lg:h-20"
                    textClassName="text-3xl sm:text-4xl md:text-[2.8rem] lg:text-[3.5rem] translate-y-[-2px]"
                    bgColor="#FDE2F3"
                    textColor="#FF5A8F"
                    pattern="stripes-pink"
                    fontFamily="'Caveat', cursive"
                    rotation={-5}
                    translateY={3}
                  />
                </div>
              </h1>
              
              {/* CT CONFESSIONS subtitle below */}
              <p className="text-xs sm:text-sm tracking-[0.3em] font-heading font-bold text-[#8C6D6D] mt-6 select-none hero-subtitle">
                CT CONFESSIONS
              </p>

              {/* Tagline description */}
              <p className="text-xs sm:text-sm font-body text-[#8C6D6D]/80 mt-2 select-none uppercase tracking-widest leading-relaxed max-w-sm">
                anonymous crypto confessions.<br />
                public embarrassment.<br />
                potential rewards.
              </p>

              {/* CONFESS NOW Button */}
              <div className="mt-6 select-none">
                <Link 
                  to="/confess" 
                  className="inline-flex items-center justify-center bg-gradient-to-r from-[#EAA8B6] to-[#C38B8B] hover:opacity-90 hover:shadow-lg text-white font-sans font-black text-xs sm:text-sm uppercase tracking-widest px-8 py-3.5 rounded-full shadow-md active:scale-95 transition-all"
                >
                  CONFESS NOW
                </Link>
              </div>

              {/* 12K Sticker Badge overlapping RIA */}
              <div className="absolute -top-12 -right-6 w-24 h-24 rounded-full bg-[#FF8093] text-white flex flex-col justify-center items-center text-center shadow-lg rotate-[12deg] z-20 select-none border border-white/20 hero-sticker">
                <span className="text-2xl font-sans font-black leading-none">12K</span>
                <span className="text-[8px] font-sans font-bold leading-tight mt-1">Confessions<br/>Submitted</span>
              </div>
            </div>
          </div>

          {/* Right Column: Preview cards stack */}
          <div className="col-span-12 lg:col-span-5 flex flex-col items-end justify-center mt-8 lg:mt-0 hero-cards">
            <div className="relative w-full max-w-[360px] mb-8">
              {/* 1. Main Card Preview */}
              <div className="relative z-20">
                <ConfessionCard confession={mockHeroConfession} />
              </div>
              
              {/* 2. Faded Background Card Layer */}
              <div 
                className="absolute inset-0 bg-[#FAF6EE]/90 border border-[#C8B195]/30 shadow-md z-10 translate-x-2.5 translate-y-2.5 rotate-[3deg] pointer-events-none"
                style={{ 
                  clipPath: 'polygon(2% 1%, 97% 2%, 99% 97%, 1% 98%)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Diagonal Marquee (acting as hero footer, overlapping the bottom of the video) */}
        <div className="absolute bottom-[-52px] left-[-20%] right-[-20%] z-20 w-[140%] overflow-hidden h-20 flex items-center justify-center pointer-events-none">
          <div 
            className="absolute w-full bg-[oklch(0.7196_0.1499_14.95)] border-y-2 border-dashed border-[#3E3830]/25 py-2.5 shadow-[0_4px_15px_rgba(0,0,0,0.06)] rotate-[-1.5deg] transform"
            style={{ backdropFilter: 'blur(1px)' }}
          >
            <div className="flex w-max animate-marquee-reverse whitespace-nowrap gap-16 select-none font-heading text-[10px] sm:text-xs text-[#3E3830] uppercase tracking-[0.18em] items-center font-bold">
              <span>DIAMOND HANDS ♥ RUGGED AGAIN ♥ REGINA GEORGE OF CRYPTO TWITTER ♥ COPE & SEETHE ♥ LIQUIDATION HEARTBREAK ♥ RIA CONFESSIONS</span>
              <span>DIAMOND HANDS ♥ RUGGED AGAIN ♥ REGINA GEORGE OF CRYPTO TWITTER ♥ COPE & SEETHE ♥ LIQUIDATION HEARTBREAK ♥ RIA CONFESSIONS</span>
              <span>DIAMOND HANDS ♥ RUGGED AGAIN ♥ REGINA GEORGE OF CRYPTO TWITTER ♥ COPE & SEETHE ♥ LIQUIDATION HEARTBREAK ♥ RIA CONFESSIONS</span>
            </div>
          </div>
        </div>

      </section>

      {/* 2. Meet RIA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-0 pt-24 pb-12 relative z-10">
        <div className="torn-paper p-8 sm:p-12 md:grid md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-2 flex justify-center mb-6 md:mb-0 relative">
            {/* Washi Tape */}
            <div className="washi-tape washi-tape-blue absolute -top-4 left-[20%]" style={{ '--tape-rotation': '10deg' } as React.CSSProperties} />
            
            <div className="polaroid w-48" style={{ '--polaroid-rotation': '-4deg' } as React.CSSProperties}>
              <div className="aspect-square overflow-hidden bg-[#FAF6EE]">
                <img
                  src={riaAvatar}
                  alt="RIA"
                  className="w-full h-full object-cover grayscale-[10%]"
                />
              </div>
              <div className="mt-2 font-script text-2xl text-center text-primary leading-none">
                judging you.
              </div>
            </div>
          </div>

          <div className="md:col-span-3 text-left">
            <span className="font-script text-primary text-4xl block mb-2">Meet the responder</span>
            <h2 className="text-3xl font-heading text-foreground mb-4 font-normal">
              RIA, Regina of CT
            </h2>
            <p className="text-foreground/80 font-body text-sm leading-relaxed mb-6">
              RIA has witnessed every gas-fee disaster, founder exit, and leverage-induced breakdown on Crypto Twitter. She doesn't just archive your secrets—she roasts them with clinical precision. Think of her as your portfolio's best frenemy.
            </p>

            {/* Speach bubble */}
            <div className="ria-speech speech-bubble speech-bubble-left text-left font-body text-sm italic border-border/80 shadow-sm pl-4 relative">
              <div className="absolute top-2 left-2 text-[10px] uppercase tracking-wider text-primary font-bold font-sans">
                RIA'S ROAST OF THE MINUTE:
              </div>
              <p className="mt-4 font-semibold text-foreground">
                "{riaQuote}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Latest Confessions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-0 py-12 relative z-10">
        <div className="mb-10 flex items-baseline justify-between border-b border-border/30 pb-3">
          <div>
            <span className="font-script text-primary text-3xl block">The ledger of shame</span>
            <h2 className="text-3xl font-heading text-foreground font-normal">Latest Confessions</h2>
          </div>
          <Link to="/feed" className="font-heading text-xs text-primary hover:underline uppercase tracking-wider">
            View Ledger →
          </Link>
        </div>

        {/* Confession Cards list */}
        <div className="grid gap-8 md:grid-cols-2">
          {confessions.slice(0, 4).map((confession) => (
            <div key={confession.id} className="transition-transform duration-300 hover:scale-[1.01] h-full flex w-full">
              <ConfessionCard confession={confession} />
            </div>
          ))}
        </div>
      </section>

      {/* 4. Things RIA Has Noticed (Collage Style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-0 py-12 relative z-10">
        <div className="text-center mb-10">
          <span className="font-script text-primary text-4xl block">Stats on paper</span>
          <h2 className="text-3xl font-heading text-foreground font-normal">Things RIA Has Noticed</h2>
        </div>
        
        {/* Mobile View: Standard Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:hidden">
          <Link to="/feed" className="block">
            <div className="bg-white p-5 rounded shadow-sm border border-border/40 text-left relative rotate-[1deg] hover:shadow-md transition-shadow">
              <span className="text-2xl">📉</span>
              <div className="text-2xl font-heading text-primary mt-2 font-semibold">{notices.soldEarly}</div>
              <p className="text-xs font-body text-slate-500 mt-1 uppercase tracking-wider font-bold">sold SOL early</p>
            </div>
          </Link>
          <Link to="/feed" className="block">
            <div className="bg-white p-5 rounded shadow-sm border border-border/40 text-left relative rotate-[-2deg] hover:shadow-md transition-shadow">
              <span className="text-2xl">👑</span>
              <div className="text-2xl font-heading text-primary mt-2 font-semibold">{notices.boughtTops}</div>
              <p className="text-xs font-body text-slate-500 mt-1 uppercase tracking-wider font-bold">bought tops</p>
            </div>
          </Link>
          <Link to="/feed" className="block">
            <div className="bg-white p-5 rounded shadow-sm border border-border/40 text-left relative rotate-[2deg] hover:shadow-md transition-shadow">
              <span className="text-2xl">🚜</span>
              <div className="text-2xl font-heading text-primary mt-2 font-semibold">{notices.foundersTraded}</div>
              <p className="text-xs font-body text-slate-500 mt-1 uppercase tracking-wider font-bold">founder sybils</p>
            </div>
          </Link>
          <Link to="/feed" className="block">
            <div className="bg-white p-5 rounded shadow-sm border border-border/40 text-left relative rotate-[-1deg] hover:shadow-md transition-shadow">
              <span className="text-2xl">🗑️</span>
              <div className="text-2xl font-heading text-primary mt-2 font-semibold">{notices.devRugs}</div>
              <p className="text-xs font-body text-slate-500 mt-1 uppercase tracking-wider font-bold">dev exit rugs</p>
            </div>
          </Link>
        </div>

        {/* Mobile View: Quick Link Cards */}
        <div className="grid gap-6 sm:grid-cols-3 md:hidden mt-8">
          <Link
            to="/leaderboard"
            className="group block bg-white border border-border/40 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow relative rotate-[-1deg] hover:rotate-0 duration-300 text-left"
          >
            <div className="w-10 h-10 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center text-primary mb-4">
              <Trophy size={18} className="stroke-[1.5]" />
            </div>
            <h3 className="text-xl font-heading font-normal mb-2 text-foreground">Leaderboard</h3>
            <p className="text-xs text-foreground/70 leading-relaxed font-body">Top CT responders ranking and viral confessions leaderboard.</p>
          </Link>
          <Link
            to="/rewards"
            className="group block bg-white border border-border/40 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow relative rotate-[1deg] hover:rotate-0 duration-300 text-left"
          >
            <div className="w-10 h-10 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center text-primary mb-4">
              <Award size={18} className="stroke-[1.5]" />
            </div>
            <h3 className="text-xl font-heading font-normal mb-2 text-foreground">Rewards</h3>
            <p className="text-xs text-foreground/70 leading-relaxed font-body">Earn $DOPE tokens for sharing your worst mistakes and tasks.</p>
          </Link>
          <Link
            to="/feed"
            className="group block bg-white border border-border/40 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow relative rotate-[-1deg] hover:rotate-0 duration-300 text-left"
          >
            <div className="w-10 h-10 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center text-primary mb-4">
              <Radio size={18} className="stroke-[1.5]" />
            </div>
            <h3 className="text-xl font-heading font-normal mb-2 text-foreground">Live Feed</h3>
            <p className="text-xs text-foreground/70 leading-relaxed font-body">Watch a steady flow of chaotic bad trades and CT drama.</p>
          </Link>
        </div>

        {/* Desktop View: Draggable Scrapbook Collage */}
        <div 
          ref={collageRef} 
          className="hidden md:block relative w-full h-[600px] overflow-hidden select-none"
        >

          {/* Cursive Background Scribble annotations */}
          <div className="absolute left-[30%] top-[42%] text-rose-300 font-script text-2xl rotate-[-12deg] opacity-65 select-none pointer-events-none">
            r &hearts; c
          </div>
          <div className="absolute right-[28%] top-[25%] text-rose-300 font-script text-2xl rotate-[15deg] opacity-65 select-none pointer-events-none">
            nya &hearts;
          </div>

          {/* Scribbled pink hearts */}
          <svg className="absolute left-[34%] top-[30%] text-[#EAA8B6] opacity-35 h-12 w-12 pointer-events-none select-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M 50,30 C 60,10 85,15 80,45 C 75,70 50,85 50,85 C 50,85 25,70 20,45 C 15,15 40,10 50,30 Z" />
          </svg>
          <svg className="absolute right-[33%] top-[45%] text-[#EAA8B6] opacity-35 h-16 w-16 pointer-events-none select-none" viewBox="0 0 120 100" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M 30,30 C 40,10 65,15 60,45 C 55,70 30,85 30,85 C 30,85 5,70 0,45 C -5,15 20,10 30,30 Z" />
            <path d="M 70,50 L 95,50 M 85,40 L 95,50 L 85,60" />
          </svg>

          {/* Center Polaroid representing RIA */}
          <div className="absolute top-[38%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none select-none">
            <div className="polaroid w-44 sm:w-48" style={{ '--polaroid-rotation': '2deg' } as React.CSSProperties}>
              <div className="aspect-[4/5] relative overflow-hidden bg-accent/20">
                <img
                  src={riaAvatar}
                  alt="RIA Avatar"
                  className="object-cover w-full h-full grayscale-[10%] contrast-[105%]"
                />
              </div>
              <div className="mt-3 font-script text-2xl text-center text-primary leading-none">
                things she noticed
              </div>
            </div>
          </div>

          {/* Draggable Stats Cards (Styled as plain white scraps) */}
          
          {/* Stat 1: Sold SOL early (Top Left) */}
          <motion.div
            drag
            dragConstraints={collageRef}
            dragMomentum={false}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
            whileDrag={{ scale: 1.05, zIndex: 40, cursor: 'grabbing' }}
            className="absolute z-20 cursor-grab active:cursor-grabbing left-[4%] top-[8%]"
            style={{ rotate: -8, touchAction: 'none' }}
          >
            <Link to="/feed" className="block select-none">
              <div className="bg-white p-4 rounded shadow-md border border-border/40 text-left w-40 hover:shadow-lg transition-shadow">
                <span className="text-xl">📉</span>
                <div className="text-xl font-heading text-primary mt-1 font-semibold">{notices.soldEarly}</div>
                <p className="text-[10px] font-body text-slate-500 uppercase tracking-wider font-bold">sold SOL early</p>
              </div>
            </Link>
          </motion.div>

          {/* Stat 2: Bought Tops (Top Right) */}
          <motion.div
            drag
            dragConstraints={collageRef}
            dragMomentum={false}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
            whileDrag={{ scale: 1.05, zIndex: 40, cursor: 'grabbing' }}
            className="absolute z-20 cursor-grab active:cursor-grabbing right-[4%] top-[8%]"
            style={{ rotate: 6, touchAction: 'none' }}
          >
            <Link to="/feed" className="block select-none">
              <div className="bg-white p-4 rounded shadow-md border border-border/40 text-left w-40 hover:shadow-lg transition-shadow">
                <span className="text-xl">👑</span>
                <div className="text-xl font-heading text-primary mt-1 font-semibold">{notices.boughtTops}</div>
                <p className="text-[10px] font-body text-slate-500 uppercase tracking-wider font-bold">bought tops</p>
              </div>
            </Link>
          </motion.div>

          {/* Draggable Quick Link Cards */}

          {/* Leaderboard Card (Middle Left) */}
          <motion.div
            drag
            dragConstraints={collageRef}
            dragMomentum={false}
            whileHover={{ scale: 1.04, rotate: 0, zIndex: 30 }}
            whileDrag={{ scale: 1.05, zIndex: 40, cursor: 'grabbing' }}
            className="absolute z-20 cursor-grab active:cursor-grabbing left-[18%] top-[34%]"
            style={{ rotate: -3, touchAction: 'none' }}
          >
            <Link to="/leaderboard" className="block select-none">
              <div className="bg-white border border-border/40 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow w-[230px] text-left">
                <div className="w-10 h-10 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center text-primary mb-4">
                  <Trophy size={18} className="stroke-[1.5]" />
                </div>
                <h3 className="text-xl font-heading font-normal mb-2 text-foreground">Leaderboard</h3>
                <p className="text-xs text-foreground/70 leading-relaxed font-body">Top CT responders ranking and viral confessions leaderboard.</p>
              </div>
            </Link>
          </motion.div>

          {/* Rewards Card (Middle Right) */}
          <motion.div
            drag
            dragConstraints={collageRef}
            dragMomentum={false}
            whileHover={{ scale: 1.04, rotate: 0, zIndex: 30 }}
            whileDrag={{ scale: 1.05, zIndex: 40, cursor: 'grabbing' }}
            className="absolute z-20 cursor-grab active:cursor-grabbing right-[18%] top-[34%]"
            style={{ rotate: 3, touchAction: 'none' }}
          >
            <Link to="/rewards" className="block select-none">
              <div className="bg-white border border-border/40 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow w-[230px] text-left">
                <div className="w-10 h-10 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center text-primary mb-4">
                  <Award size={18} className="stroke-[1.5]" />
                </div>
                <h3 className="text-xl font-heading font-normal mb-2 text-foreground">Rewards</h3>
                <p className="text-xs text-foreground/70 leading-relaxed font-body">Earn $DOPE tokens for sharing your worst mistakes and tasks.</p>
              </div>
            </Link>
          </motion.div>

          {/* Stat 3: Founder Sybils (Bottom Left) */}
          <motion.div
            drag
            dragConstraints={collageRef}
            dragMomentum={false}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
            whileDrag={{ scale: 1.05, zIndex: 40, cursor: 'grabbing' }}
            className="absolute z-20 cursor-grab active:cursor-grabbing left-[6%] top-[70%]"
            style={{ rotate: 4, touchAction: 'none' }}
          >
            <Link to="/feed" className="block select-none">
              <div className="bg-white p-4 rounded shadow-md border border-border/40 text-left w-40 hover:shadow-lg transition-shadow">
                <span className="text-xl">🚜</span>
                <div className="text-xl font-heading text-primary mt-1 font-semibold">{notices.foundersTraded}</div>
                <p className="text-[10px] font-body text-slate-500 uppercase tracking-wider font-bold">founder sybils</p>
              </div>
            </Link>
          </motion.div>

          {/* Live Feed Card (Bottom Center) */}
          <motion.div
            drag
            dragConstraints={collageRef}
            dragMomentum={false}
            whileHover={{ scale: 1.04, rotate: 0, zIndex: 30 }}
            whileDrag={{ scale: 1.05, zIndex: 40, cursor: 'grabbing' }}
            className="absolute z-20 cursor-grab active:cursor-grabbing left-[50%] top-[70%] -translate-x-1/2"
            style={{ rotate: -2, touchAction: 'none' }}
          >
            <Link to="/feed" className="block select-none">
              <div className="bg-white border border-border/40 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow w-[230px] text-left">
                <div className="w-10 h-10 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center text-primary mb-4">
                  <Radio size={18} className="stroke-[1.5]" />
                </div>
                <h3 className="text-xl font-heading font-normal mb-2 text-foreground">Live Feed</h3>
                <p className="text-xs text-foreground/70 leading-relaxed font-body">Watch a steady flow of chaotic bad trades and CT drama.</p>
              </div>
            </Link>
          </motion.div>

          {/* Stat 4: Dev Exit Rugs (Bottom Right) */}
          <motion.div
            drag
            dragConstraints={collageRef}
            dragMomentum={false}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
            whileDrag={{ scale: 1.05, zIndex: 40, cursor: 'grabbing' }}
            className="absolute z-20 cursor-grab active:cursor-grabbing right-[6%] top-[70%]"
            style={{ rotate: -4, touchAction: 'none' }}
          >
            <Link to="/feed" className="block select-none">
              <div className="bg-white p-4 rounded shadow-md border border-border/40 text-left w-40 hover:shadow-lg transition-shadow">
                <span className="text-xl">🗑️</span>
                <div className="text-xl font-heading text-primary mt-1 font-semibold">{notices.devRugs}</div>
                <p className="text-[10px] font-body text-slate-500 uppercase tracking-wider font-bold">dev exit rugs</p>
              </div>
            </Link>
          </motion.div>

          {/* Decorative Draggable Stickers (like in the Hero section) */}
          <Sticker type="cat" defaultPosition={{ x: 230, y: 45 }} rotation={12} className="pointer-events-auto z-25" />
          <Sticker type="moon" defaultPosition={{ x: 420, y: 390 }} rotation={-10} className="pointer-events-auto z-25" />
          <Sticker type="approved" defaultPosition={{ x: 335, y: 160 }} rotation={-8} className="pointer-events-auto z-25" />

        </div>

        <div className="mt-10 text-center">
          <Link to="/memory" className="scrapbook-btn-secondary text-xs uppercase font-heading tracking-wider">
            🧠 Open the Memory Wall
          </Link>
        </div>
      </section>

      {/* 6. Bottom Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-0 py-12 text-center relative z-10">
        <div className="torn-paper p-8 sm:p-12">
          <div className="washi-tape washi-tape-pink absolute -top-3 left-[40%]" style={{ '--tape-rotation': '-2deg', width: '120px' } as React.CSSProperties} />
          
          <h2 className="text-2xl sm:text-3xl font-heading text-foreground mb-2">Your secrets are safe here.</h2>
          <p className="text-sm font-body text-foreground/60 mb-6">Confess anonymously. RIA will handle the emotional damage.</p>
          <div className="flex justify-center">
            <Link to="/confess" className="scrapbook-btn-primary h-11 px-8 text-xs font-heading font-medium tracking-wide">
              Write a Confession ✒️
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
