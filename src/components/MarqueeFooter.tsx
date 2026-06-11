import { useEffect, useState } from 'react';

const TICKER_ITEMS = [
  "🎀 CONFESSION #1124 submitted 12s ago",
  "🐾 RIA just roasted CONFESSION #553: 'speedrunning poverty' 😭",
  "🌸 New leader on top CT Responders Leaderboard!",
  "✨ CONFESSION #1125 hit 100K impressions on X",
  "💖 RIA picked CONFESSION #840 for the Memory Wall",
  "🧸 Whale Edition unlocked a new secret drop",
  "🍡 RIA remembered something you'd rather forget",
  "🍬 CONFESSION #1126 submitted 4s ago",
  "🎀 CONFESSION #1127: 'I traded my college savings' 💀",
  "🐾 RIA: 'stop trying to make your exits happen, they are NOT going to happen!'",
];

export function MarqueeFooter() {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    // Duplicate items to ensure smooth continuous scrolling
    setItems([...TICKER_ITEMS, ...TICKER_ITEMS]);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 z-40 w-full border-t border-border/40 bg-secondary text-secondary-foreground py-2 font-heading text-xs shadow-md overflow-hidden">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 sm:px-6">
        {/* Live Status indicator */}
        <span className="flex shrink-0 items-center gap-1.5 font-bold uppercase tracking-wider bg-white text-foreground border border-border px-2 py-0.5 rounded text-[10px]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
          </span>
          Live Ticker
        </span>

        {/* CSS-based Marquee */}
        <div className="relative flex-1 overflow-hidden">
          <div className="flex w-max animate-marquee whitespace-nowrap gap-12 select-none">
            {items.map((item, index) => (
              <span key={index} className="flex items-center gap-2 font-medium">
                <span className="text-primary font-normal">✦</span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Adding custom marquee animation style directly */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
