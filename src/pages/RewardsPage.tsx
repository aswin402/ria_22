import { useEffect, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { CheckCircle2, Circle, Trophy, Coins, Calendar, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

export function RewardsPage() {
  const rewardTasks = useAppStore((state) => state.rewardTasks);
  const completeTask = useAppStore((state) => state.completeTask);
  const confessions = useAppStore((state) => state.confessions);
  const containerRef = useRef<HTMLDivElement>(null);

  // Pick the confession with highest flameScore as the confession of the week
  const featuredConfession = [...confessions]
    .sort((a, b) => b.flameScore - a.flameScore)[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal cards
      gsap.fromTo('.rewards-reveal-item',
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1, 
          duration: 0.6, 
          ease: 'power2.out' 
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCompleteTask = (id: string) => {
    completeTask(id);
    
    gsap.fromTo(`#task-card-${id}`,
      { scale: 0.98, rotation: -0.5 },
      { scale: 1, rotation: 0, duration: 0.4, ease: 'power2.out' }
    );
  };

  return (
    <div ref={containerRef} className="max-w-3xl mx-auto px-6 py-12 text-left">
      
      {/* Header */}
      <div className="text-center mb-10">
        <span className="font-script text-primary text-4xl block leading-none mb-1">earn $dope</span>
        <h1 className="text-3xl font-heading text-foreground font-normal">
          Reward Center
        </h1>
        <p className="text-foreground/50 text-xs font-body mt-1">
          spill the best tea, complete tasks, and earn $DOPE tokens.
        </p>
      </div>

      {/* Hero Reward Card */}
      <div className="rewards-reveal-item torn-paper bg-primary/10 border border-primary/20 p-8 rounded shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <div className="space-y-3">
          <span className="bg-primary/25 text-primary border border-primary/45 font-heading text-[10px] px-2.5 py-0.5 rounded uppercase tracking-wider inline-block font-semibold">
            Weekly Pool
          </span>
          <h2 className="text-3xl font-heading text-foreground font-normal flex items-center gap-2">
            $5,000 in $DOPE 🪙
          </h2>
          <p className="text-foreground/70 text-xs font-body max-w-md leading-relaxed">
            The most viral confession of the week takes home the prize. Complete cute social tasks to stack daily drops.
          </p>
        </div>
        
        <div className="flex flex-col items-center justify-center bg-white border border-border rounded p-5 shadow-sm text-center shrink-0 w-44">
          <Coins className="h-8 w-8 text-yellow-500 fill-yellow-100 animate-bounce mb-2" />
          <span className="font-heading font-medium text-2xl text-primary">12,000</span>
          <span className="text-[9px] uppercase font-bold text-foreground/45 tracking-wider font-body">Tokens Given</span>
        </div>
      </div>

      {/* Featured Confession of the Week */}
      {featuredConfession && (
        <div className="rewards-reveal-item bg-[#FDFCF7] border border-border p-6 rounded shadow-sm mb-12 relative overflow-hidden">
          {/* Award Ribbon styled as Washi Tape */}
          <div 
            className="washi-tape washi-tape-pink absolute -top-1 -right-6 scale-90 w-[140px]" 
            style={{ '--tape-rotation': '35deg' } as React.CSSProperties} 
          />
          
          <div className="absolute top-2 right-4 text-xs font-heading font-medium text-primary uppercase tracking-wider pr-1 flex items-center gap-1 z-30 pointer-events-none">
            <Trophy size={11} className="text-primary" />
            <span>Roast of the week</span>
          </div>

          <h3 className="font-heading text-xs text-primary font-medium tracking-wide mb-3 uppercase">
            ✒️ Confession #{featuredConfession.number}
          </h3>
          
          <p className="font-body text-sm leading-relaxed italic text-foreground/80 mb-5 pr-20">
            "{featuredConfession.text}"
          </p>

          <div className="border-t border-border/20 pt-4 flex items-center justify-between text-xs text-foreground/50 font-heading font-medium">
            <div className="flex items-center gap-1 text-primary">
              <Calendar size={13} />
              <span>Ends in 2 days</span>
            </div>
            <Link to={`/feed?id=${featuredConfession.id}`} className="text-primary hover:underline flex items-center gap-1 text-[11px] uppercase tracking-wider font-medium">
              Roast Details <ArrowRight size={11} />
            </Link>
          </div>
        </div>
      )}

      {/* Tasks List */}
      <div className="rewards-reveal-item">
        <h3 className="text-xl font-heading mb-6 flex items-center gap-2 border-b border-border/10 pb-2 font-normal">
          ✒️ Scrapbook Quests
        </h3>
        
        <div className="grid gap-4">
          {rewardTasks.map((task) => (
            <div
              key={task.id}
              id={`task-card-${task.id}`}
              className={`border border-border/30 rounded p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-200 ${
                task.completed 
                  ? 'bg-accent/10 border-dashed opacity-75' 
                  : 'bg-white'
              }`}
            >
              <div className="flex items-start sm:items-center gap-3">
                <button
                  onClick={() => handleCompleteTask(task.id)}
                  className="mt-1 sm:mt-0 shrink-0"
                  aria-label={task.completed ? "Task complete" : "Mark task complete"}
                >
                  {task.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 fill-emerald-50" />
                  ) : (
                    <Circle className="h-5 w-5 text-foreground/35 hover:text-primary transition-colors" />
                  )}
                </button>
                <div className="text-left">
                  <h4 className={`font-heading text-sm font-medium ${task.completed ? 'line-through text-foreground/45' : 'text-foreground'}`}>
                    {task.title}
                  </h4>
                  <p className="text-[10px] text-foreground/45 font-body">
                    Reward: <span className="text-primary font-semibold font-heading">{task.reward}</span>
                  </p>
                </div>
              </div>
              
              {!task.completed ? (
                task.id === 'task-1' ? (
                  <Link to="/confess" className="scrapbook-btn-primary py-2 px-5 text-xs sm:self-center">
                    {task.actionText}
                  </Link>
                ) : task.id === 'task-2' ? (
                  <Link to="/feed" className="scrapbook-btn-secondary py-2 px-5 text-xs sm:self-center">
                    {task.actionText}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleCompleteTask(task.id)}
                    className="scrapbook-btn bg-accent/25 hover:bg-accent/40 border-border/60 py-2 px-5 text-xs sm:self-center"
                  >
                    {task.actionText}
                  </button>
                )
              ) : (
                <span className="font-heading text-[10px] text-primary bg-primary/5 border border-primary/20 px-3 py-1 rounded sm:self-center shadow-sm uppercase tracking-wider font-semibold">
                  Completed! ✨
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
