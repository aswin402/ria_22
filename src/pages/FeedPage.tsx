import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { ConfessionCard } from '@/components/ConfessionCard';
import { Search, ListFilter, Trash2 } from 'lucide-react';
import { gsap } from 'gsap';

export function FeedPage() {
  const confessions = useAppStore((state) => state.confessions);
  const resetApp = useAppStore((state) => state.resetApp);
  
  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get('id');

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'chaos' | 'latest' | 'hearts'>('latest');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = ['All', 'Trading', 'Memecoin', 'Founder', 'Dev', 'Gossip', 'Crush', 'Fail'];
  const feedRef = useRef<HTMLDivElement>(null);

  // Scroll reveal animation for feed items
  useEffect(() => {
    if (confessions.length > 0) {
      gsap.fromTo('.feed-card-item',
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.08, 
          duration: 0.5, 
          ease: 'power2.out' 
        }
      );
    }
  }, [activeCategory, sortBy, searchQuery, confessions]);

  // Filter & Sort confessions
  const getFilteredConfessions = () => {
    let list = [...confessions];

    if (highlightId) {
      const match = list.find((c) => c.id === highlightId);
      if (match) return [match];
    }

    if (activeCategory !== 'All') {
      list = list.filter((c) => c.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.text.toLowerCase().includes(q) ||
          c.riaRoast.toLowerCase().includes(q) ||
          c.number.toString().includes(q)
      );
    }

    if (sortBy === 'latest') {
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === 'hearts') {
      list.sort((a, b) => b.hearts - a.hearts);
    } else if (sortBy === 'chaos') {
      list.sort((a, b) => (b.flameScore * b.hearts) - (a.flameScore * a.hearts));
    }

    return list;
  };

  const filteredList = getFilteredConfessions();

  return (
    <div ref={feedRef} className="max-w-4xl mx-auto px-6 py-12 text-left">
      
      {/* Title */}
      <div className="text-center mb-10">
        <span className="font-script text-primary text-4xl block leading-none mb-1">spilled tea archive</span>
        <h1 className="text-3xl font-heading text-foreground font-normal">
          Confession Feed
        </h1>
        <p className="text-foreground/50 text-xs font-body mt-1">
          endless poor decisions, sorted by raw chaos.
        </p>
      </div>

      {/* Single confession alert banner */}
      {highlightId && (
        <div className="mb-6 p-4 border border-primary/20 bg-accent/20 rounded flex items-center justify-between text-xs sm:text-sm font-heading font-medium shadow-sm animate-pulse">
          <span>👀 Showing single shared confession link!</span>
          <button
            onClick={() => window.history.replaceState({}, '', window.location.pathname)}
            className="text-primary hover:underline"
          >
            Show All Feed
          </button>
        </div>
      )}

      {/* Control Panel: Category Pills & Search */}
      <div className="flex flex-col gap-4 mb-8">
        
        {/* Categories Scroller */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-border/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                if (highlightId) {
                  window.history.replaceState({}, '', window.location.pathname);
                }
              }}
              className={`flex-shrink-0 font-heading text-xs px-4 py-1.5 rounded border transition-all ${
                activeCategory === cat && !highlightId
                  ? 'bg-primary text-primary-foreground border-primary font-medium'
                  : 'bg-white hover:bg-accent/15 text-foreground border-border/40'
              }`}
            >
              {cat === 'All' ? '🍭 All Confessions' : cat}
            </button>
          ))}
        </div>

        {/* Search & Sort Row */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 h-4 w-4" />
            <input
              type="text"
              placeholder="Search confessions, keywords or roasts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded border border-border/50 bg-white text-foreground font-body text-sm shadow-sm focus:ring-primary/45 focus:border-primary focus:outline-none placeholder:text-foreground/30"
            />
          </div>
          
          {/* Sort selection */}
          <div className="relative min-w-[170px] flex items-center">
            <ListFilter className="absolute left-3 text-foreground/40 h-4 w-4" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full h-10 pl-9 pr-8 rounded border border-border/50 bg-white text-foreground font-heading text-xs shadow-sm focus:outline-none appearance-none font-medium"
            >
              <option value="latest">🍡 Sort: Latest</option>
              <option value="chaos">🔥 Sort: Max Chaos</option>
              <option value="hearts">💖 Sort: Most Hearts</option>
            </select>
            <div className="absolute right-3.5 pointer-events-none text-[8px] text-foreground/45">▼</div>
          </div>
        </div>

      </div>

      {/* Feed List Grid */}
      {filteredList.length > 0 ? (
        <div className="flex flex-col gap-8">
          {filteredList.map((confession) => (
            <div key={confession.id} className="feed-card-item">
              <ConfessionCard confession={confession} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-border/30 bg-white rounded shadow-sm p-8">
          <span className="text-4xl">😿</span>
          <h3 className="font-heading text-lg mt-4 text-foreground/70">No confessions found</h3>
          <p className="text-foreground/50 text-xs font-body mt-1 max-w-xs mx-auto">
            Maybe RIA deleted them, or no one has spilled secrets matching your query.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
                window.history.replaceState({}, '', window.location.pathname);
              }}
              className="scrapbook-btn-secondary px-5 py-2 text-xs font-heading"
            >
              Clear Filters
            </button>
            <button
              onClick={resetApp}
              className="border border-red-200 bg-red-50/50 hover:bg-red-50 text-xs text-red-600 font-heading tracking-wider px-5 py-2 rounded flex items-center gap-1 transition-colors"
              title="Reset state to initial mock values"
            >
              <Trash2 size={12} /> Reset DB
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
