import { useEffect, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Flame, Heart, Star } from 'lucide-react';
import { gsap } from 'gsap';

export function LeaderboardPage() {
  const responders = useAppStore((state) => state.leaderboardResponders);
  const confessions = useAppStore((state) => state.confessions);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sorting confessions by hearts to rank the viral confessions
  const topConfessions = [...confessions]
    .sort((a, b) => b.hearts - a.hearts)
    .slice(0, 5);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Podium entrance
      gsap.fromTo('.podium-col',
        { opacity: 0, y: 30, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          stagger: 0.12, 
          duration: 0.7, 
          ease: 'power2.out' 
        }
      );

      // List cards reveals
      gsap.fromTo('.list-reveal-item',
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.leaderboard-lists',
            start: 'top 85%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto px-6 py-12 text-left">
      
      {/* Header */}
      <div className="text-center mb-10">
        <span className="font-script text-primary text-4xl block leading-none mb-1">clout ranking</span>
        <h1 className="text-3xl font-heading text-foreground font-normal">
          CT Clout Leaderboard
        </h1>
        <p className="text-foreground/50 text-xs font-body mt-1">
          the most viral confessions and top community roasters.
        </p>
      </div>

      {/* Podium Section (Top 3 Responders) */}
      <div className="mb-16">
        <h2 className="text-xl font-heading text-center mb-8 font-normal text-foreground/85 flex justify-center items-center gap-2">
          👑 Top CT Responders
        </h2>
        
        <div className="grid grid-cols-3 gap-4 sm:gap-8 items-end max-w-xl mx-auto pt-6 px-2">
          
          {/* 2nd Place */}
          {responders[1] && (
            <div className="podium-col flex flex-col items-center">
              <div className="relative mb-3 group">
                <div className="polaroid p-1 bg-white rotate-[-4deg] shadow-sm border border-border/30">
                  <img
                    src={responders[1].avatar}
                    alt={responders[1].name}
                    className="h-14 w-14 sm:h-18 sm:w-18 object-cover grayscale-[10%]"
                  />
                </div>
                <span className="absolute -bottom-2 -right-1 bg-slate-100 text-slate-700 border border-border h-6 w-6 rounded-full flex items-center justify-center font-heading font-semibold text-xs shadow-sm">
                  2
                </span>
              </div>
              <div className="text-center max-w-[90px] sm:max-w-none">
                <div className="font-heading font-medium text-xs sm:text-sm truncate">{responders[1].name}</div>
                <div className="text-[9px] text-foreground/50 truncate font-body">{responders[1].handle}</div>
              </div>
              {/* Podium block */}
              <div className="w-full bg-[#BACFD9]/15 border border-b-0 border-border rounded-t h-20 sm:h-28 mt-3 flex flex-col items-center justify-center p-2 shadow-sm">
                <span className="text-base sm:text-lg">🥈</span>
                <span className="font-heading font-semibold text-[10px] sm:text-xs text-[#2C5263] mt-1">{responders[1].points} pts</span>
              </div>
            </div>
          )}

          {/* 1st Place */}
          {responders[0] && (
            <div className="podium-col flex flex-col items-center z-10">
              <div className="relative mb-3 group">
                <Star className="absolute -top-5 left-1/2 -translate-x-1/2 h-5 w-5 text-yellow-500 fill-yellow-400 animate-bounce" />
                <div className="polaroid p-1 bg-white rotate-[3deg] shadow-md border border-[#D48C9C]/30">
                  <img
                    src={responders[0].avatar}
                    alt={responders[0].name}
                    className="h-18 w-18 sm:h-24 sm:w-24 object-cover grayscale-[10%]"
                  />
                </div>
                <span className="absolute -bottom-2 -right-1 bg-yellow-100 text-yellow-800 border border-yellow-300 h-7 w-7 rounded-full flex items-center justify-center font-heading font-bold text-sm shadow-sm">
                  1
                </span>
              </div>
              <div className="text-center max-w-[100px] sm:max-w-none">
                <div className="font-heading font-medium text-sm truncate">{responders[0].name}</div>
                <div className="text-[10px] text-foreground/50 truncate font-body">{responders[0].handle}</div>
              </div>
              {/* Podium block */}
              <div className="w-full bg-primary/10 border border-b-0 border-primary/20 rounded-t h-28 sm:h-36 mt-3 flex flex-col items-center justify-center p-2 shadow-md">
                <span className="text-xl sm:text-2xl">🥇</span>
                <span className="font-heading font-bold text-xs sm:text-sm text-primary mt-1">{responders[0].points} pts</span>
              </div>
            </div>
          )}

          {/* 3rd Place */}
          {responders[2] && (
            <div className="podium-col flex flex-col items-center">
              <div className="relative mb-3 group">
                <div className="polaroid p-1 bg-white rotate-[5deg] shadow-sm border border-border/30">
                  <img
                    src={responders[2].avatar}
                    alt={responders[2].name}
                    className="h-12 w-12 sm:h-16 sm:w-16 object-cover grayscale-[10%]"
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 bg-orange-55 text-orange-800 border border-orange-200 h-5.5 w-5.5 rounded-full flex items-center justify-center font-heading font-semibold text-[10px] shadow-sm">
                  3
                </span>
              </div>
              <div className="text-center max-w-[80px] sm:max-w-none">
                <div className="font-heading font-medium text-xs truncate">{responders[2].name}</div>
                <div className="text-[9px] text-foreground/50 truncate font-body">{responders[2].handle}</div>
              </div>
              {/* Podium block */}
              <div className="w-full bg-orange-400/5 border border-b-0 border-border rounded-t h-16 sm:h-22 mt-3 flex flex-col items-center justify-center p-2 shadow-sm">
                <span className="text-sm sm:text-base">🥉</span>
                <span className="font-heading font-semibold text-[9px] sm:text-xs text-orange-600 mt-1">{responders[2].points} pts</span>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Grid of lists */}
      <div className="leaderboard-lists grid gap-8 md:grid-cols-2">
        
        {/* Left: Top Responders List */}
        <div className="torn-paper p-6 bg-white rounded border border-border/40 shadow-sm">
          <h3 className="text-lg font-heading mb-4 flex items-center gap-2 border-b border-border/10 pb-2">
            🏆 Responders Ranking
          </h3>
          <div className="flex flex-col gap-3">
            {responders.map((resp) => (
              <div
                key={resp.id}
                className="list-reveal-item flex items-center gap-3 p-3 border border-border/30 bg-white rounded shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <span className="font-heading font-bold text-xs h-6 w-6 rounded border border-border/40 bg-accent/30 flex items-center justify-center shrink-0 text-foreground/60">
                  {resp.rank}
                </span>
                <div className="polaroid p-0.5 bg-white border border-border/30 shrink-0">
                  <img src={resp.avatar} alt={resp.name} className="h-8 w-8 object-cover rounded-sm grayscale-[5%]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-heading font-medium text-xs sm:text-sm truncate">{resp.name}</div>
                  <div className="text-[9px] text-foreground/45 truncate font-body">{resp.handle}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-heading font-semibold text-xs text-primary">{resp.points} pts</div>
                  <div className="text-[8px] text-foreground/45 font-body">{resp.confessionCount} roasts</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Most Viral Confessions */}
        <div className="torn-paper p-6 bg-white rounded border border-border/40 shadow-sm">
          <h3 className="text-lg font-heading mb-4 flex items-center gap-2 border-b border-border/10 pb-2">
            🔥 Viral Confessions
          </h3>
          <div className="flex flex-col gap-3">
            {topConfessions.map((conf, index) => (
              <div
                key={conf.id}
                className="list-reveal-item flex items-start gap-3 p-3 border border-border/30 bg-white rounded shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <span className="font-heading font-bold text-xs h-6 w-6 rounded border border-border/40 bg-primary text-primary-foreground flex items-center justify-center shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-heading font-semibold text-xs text-primary">CONFESSION #{conf.number}</div>
                  <p className="font-body text-xs text-foreground/80 line-clamp-2 mt-1 italic">
                    "{conf.text}"
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 font-heading text-[10px] text-red-500 font-semibold">
                    <Heart size={10} className="fill-current" />
                    <span>{(conf.hearts / 1000).toFixed(1)}K</span>
                  </div>
                  <div className="flex items-center gap-1 font-heading text-[10px] text-orange-500 mt-0.5 font-semibold">
                    <Flame size={10} />
                    <span>{conf.flameScore}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
