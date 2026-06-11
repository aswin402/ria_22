import { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import riaAvatar from '@/assets/ria_avatar.png';
import { gsap } from 'gsap';

interface MemoryItem {
  id: string;
  number: number;
  category: string;
  text: string;
  riaRoast: string;
  date: string;
  cloutLevel: string;
  sticker: string;
}

const HISTORICAL_MEMORIES: MemoryItem[] = [
  {
    id: 'mem-1',
    number: 402,
    category: 'Gossip',
    text: "I pretended to be sick to skip a family dinner, but actually stayed home to mint a hyped NFT collection. Gas war cost me $1,200 and I got blacklisted.",
    riaRoast: "karma is real, and she charges in Gwei.",
    date: "Dec 2024",
    cloutLevel: "High Chaos",
    sticker: "🩹"
  },
  {
    id: 'mem-2',
    number: 512,
    category: 'Trading',
    text: "I fat-fingered my bid size and bought a mutant monkey jpeg for 45 ETH instead of 4.5 ETH. I had to sell my car to pay off my leverage debt.",
    riaRoast: "enjoy walking. it's cardio-coded.",
    date: "Jan 2025",
    cloutLevel: "Legendary",
    sticker: "🚗"
  },
  {
    id: 'mem-3',
    number: 588,
    category: 'Founder',
    text: "I lied about graduating from Stanford in our pitch deck to secure a $3M seed round. Now our lead VC is auditing my credentials.",
    riaRoast: "stanford dropouts are so 2021. stanford liars are the new trend.",
    date: "Feb 2025",
    cloutLevel: "Infinite Drama",
    sticker: "🎓"
  },
  {
    id: 'mem-4',
    number: 620,
    category: 'Dev',
    text: "I coded a reentrancy bug in our main staking pool, drained it myself to 'save it' from hackers, and forgot the private key to the recovery multi-sig.",
    riaRoast: "you saved the funds... from everyone. including yourself. genius.",
    date: "Mar 2025",
    cloutLevel: "DAO Roasted",
    sticker: "🔑"
  },
  {
    id: 'mem-5',
    number: 699,
    category: 'Memecoin',
    text: "I launched a token named after my girlfriend's cat, she found out, broke up with me because I didn't give her tokens, and then the coin went to $10M cap.",
    riaRoast: "she lost a boyfriend, you gained 10 million. the cat won.",
    date: "Apr 2025",
    cloutLevel: "Ultra Viral",
    sticker: "🐱"
  },
  {
    id: 'mem-6',
    number: 742,
    category: 'Trading',
    text: "I spent 6 months farming a major L2 chain, spent $3,000 on gas, and got filtered out of the airdrop because my IP address matched a public VPN.",
    riaRoast: "thank you for your service to our validators.",
    date: "May 2025",
    cloutLevel: "Sad Fren",
    sticker: "📡"
  }
];

export function MemoryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);

  // Wiggle entrance for polaroids
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.polaroid-item',
        { opacity: 0, scale: 0.8, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: 'power2.out',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="max-w-5xl mx-auto px-6 py-12 text-left">
      
      {/* Header */}
      <div className="text-center mb-10">
        <span className="font-script text-primary text-4xl block leading-none mb-1">historical archive</span>
        <h1 className="text-3xl font-heading text-foreground font-normal">
          RIA's Memory Wall
        </h1>
        <p className="text-foreground/50 text-xs font-body mt-1">
          legendary crypto failures she refuses to let anyone forget.
        </p>
      </div>

      {/* Polaroid corkboard grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
        {HISTORICAL_MEMORIES.map((mem, index) => {
          const rotations = [-3, 2, -1, 3, -2, 1];
          const rot = rotations[index % rotations.length];
          const tapeColor = index % 2 === 0 ? 'washi-tape-pink' : 'washi-tape-blue';
          
          return (
            <div
              key={mem.id}
              onClick={() => setSelectedMemory(mem)}
              className="polaroid-item polaroid cursor-pointer relative flex flex-col gap-3 group"
              style={{ 
                '--polaroid-rotation': `${rot}deg` 
              } as React.CSSProperties}
            >
              {/* Push pin decoration */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl drop-shadow-sm select-none z-30">
                📌
              </div>

              {/* Tiny Washi Tape holding the polaroid */}
              <div 
                className={`washi-tape ${tapeColor} absolute top-[-6px] left-[15%] scale-75 opacity-70`}
                style={{ '--tape-rotation': `${rot * -2}deg`, width: '60px' } as React.CSSProperties}
              />

              {/* Sticker Emoji in corner */}
              <div className="absolute top-3 right-3 text-xl bg-accent/40 rounded-full h-8 w-8 flex items-center justify-center border border-border/30 shadow-sm z-10">
                {mem.sticker}
              </div>

              {/* Polaroid Photo Frame area */}
              <div className="aspect-[4/3] bg-[#FCFAF5] border border-border/30 rounded flex flex-col justify-center p-4 relative overflow-hidden">
                <span className="font-heading font-medium text-[10px] text-primary mb-2 uppercase tracking-wider">
                  Confession #{mem.number}
                </span>
                <p className="font-body text-xs leading-relaxed italic text-foreground/80 line-clamp-4">
                  "{mem.text}"
                </p>
              </div>

              {/* Polaroid bottom caption */}
              <div className="text-center mt-2 flex flex-col gap-1 border-t border-dashed border-border/20 pt-3">
                <span className="font-heading text-xs text-foreground/75 font-medium line-clamp-1 italic">
                  "{mem.riaRoast}"
                </span>
                <div className="flex justify-between items-center text-[9px] text-foreground/45 font-heading mt-1 font-medium">
                  <span>📅 {mem.date}</span>
                  <span className="bg-primary/5 text-primary border border-primary/20 px-1.5 py-0.2 rounded uppercase">
                    {mem.cloutLevel}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Memory Zoom Detail Modal */}
      {selectedMemory && (
        <Dialog open={!!selectedMemory} onOpenChange={(open) => !open && setSelectedMemory(null)}>
          <DialogContent className="max-w-md w-full bg-background border border-border/40 rounded shadow-lg text-foreground focus:outline-none p-6 text-left">
            <DialogHeader className="pb-3 border-b border-border/20">
              <DialogTitle className="font-heading text-xl font-normal flex items-center gap-2 text-foreground">
                📖 Diary Entry Details
              </DialogTitle>
              <DialogDescription className="font-body text-foreground/50 text-xs mt-1">
                Archived in RIA's personal scrapbook of clout and roasts.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-5 mt-4">
              {/* Polaroid preview */}
              <div className="border border-border/30 bg-[#FDFCF7] p-5 rounded shadow-inner">
                <span className="font-heading text-[10px] uppercase tracking-wider text-primary font-medium">
                  ✒️ Record #{selectedMemory.number} • {selectedMemory.date}
                </span>
                <p className="font-body text-xs leading-relaxed italic text-foreground/80 mt-3 border-l-2 border-[#D48C9C]/35 pl-3">
                  "{selectedMemory.text}"
                </p>
              </div>

              {/* RIA Roast speech box */}
              <div className="flex gap-4 items-start bg-accent/20 p-4 border border-dashed border-[#D48C9C]/30 rounded relative">
                {/* Washi tape */}
                <div 
                  className="washi-tape washi-tape-pink absolute top-[-7px] left-[20px] scale-75" 
                  style={{ '--tape-rotation': '-3deg', width: '50px' } as React.CSSProperties} 
                />
                
                <div className="polaroid p-0.5 bg-white border border-border/30 rotate-[-4deg] shrink-0">
                  <img
                    src={riaAvatar}
                    alt="RIA"
                    className="h-10 w-10 object-cover grayscale-[10%]"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="font-heading font-medium text-[10px] text-primary uppercase tracking-wider mb-1.5">💅 RIA'S COMMENTARY</div>
                  <p className="font-body text-xs font-semibold speech-bubble speech-bubble-left bg-white border border-border/30 p-3 rounded shadow-sm">
                    "{selectedMemory.riaRoast}"
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-5">
              <button
                onClick={() => setSelectedMemory(null)}
                className="scrapbook-btn-secondary py-2 px-5 text-xs font-heading"
              >
                Close Page
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}

    </div>
  );
}
