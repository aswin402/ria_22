import { useState, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { ConfessionCard } from '@/components/ConfessionCard';
import { Send, Sparkles, RefreshCw, Eye, Share2, Image as ImageIcon } from 'lucide-react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { MemeCardModal } from '@/components/MemeCardModal';

export function ConfessPage() {
  const addConfession = useAppStore((state) => state.addConfession);
  
  const [text, setText] = useState('');
  const [category, setCategory] = useState('Trading');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [resultConfession, setResultConfession] = useState<any | null>(null);
  const [memeModalOpen, setMemeModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const categories = ['Trading', 'Memecoin', 'Founder', 'Dev', 'Gossip', 'Crush', 'Fail'];

  const loadingTexts = [
    "✒️ Whispering your secrets to RIA...",
    "🙄 RIA is rolling her eyes...",
    "💅 Structuring maximum levels of sass...",
    "✨ Wrapping your roast in a bow..."
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setLoadingStep(0);

    if (formRef.current) {
      gsap.to(formRef.current, { opacity: 0, scale: 0.95, duration: 0.3, ease: 'power2.in' });
    }

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep += 1;
      if (currentStep < loadingTexts.length) {
        setLoadingStep(currentStep);
      } else {
        clearInterval(interval);
        
        const newConf = addConfession(text, category);
        setResultConfession(newConf);
        setIsSubmitting(false);
        
        setTimeout(() => {
          if (resultRef.current) {
            gsap.fromTo(resultRef.current,
              { opacity: 0, scale: 0.95, y: 20 },
              { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'power2.out' }
            );
          }
        }, 50);
      }
    }, 1000);
  };

  const resetForm = () => {
    setText('');
    setCategory('Trading');
    setResultConfession(null);
    if (formRef.current) {
      gsap.set(formRef.current, { opacity: 1, scale: 1 });
    }
  };

  const copyLink = () => {
    if (!resultConfession) return;
    const url = `${window.location.origin}/feed?id=${resultConfession.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareToX = () => {
    if (!resultConfession) return;
    const shareText = `OMG! RIA just roasted me on Ria Confessions: "${resultConfession.riaRoast}" 😂\nRead my confession here:`;
    const url = `${window.location.origin}/feed?id=${resultConfession.id}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div ref={containerRef} className="max-w-xl mx-auto px-6 py-12">
      
      {/* 1. Normal State Form */}
      {!isSubmitting && !resultConfession && (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="torn-paper p-8 sm:p-10 text-left flex flex-col gap-6"
        >
          {/* Header */}
          <div className="text-center border-b border-border/20 pb-4">
            <span className="font-script text-primary text-4xl block leading-none mb-1">spill the tea</span>
            <h1 className="text-3xl font-heading text-foreground font-normal">
              Spill Your Secrets
            </h1>
            <p className="text-foreground/50 text-xs font-body mt-1">
              everything submitted is completely anonymous.
            </p>
          </div>

          {/* Text Area */}
          <div className="flex flex-col gap-2">
            <label className="font-heading font-medium text-xs text-foreground uppercase tracking-wider">
              Confession Details ✏️
            </label>
            <textarea
              required
              rows={5}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g., I sold my entire bag of SOL at $8. I was convinced it was going to zero. Now I cry into my latte daily..."
              className="w-full p-4 rounded border border-border/50 bg-[#FDFCF9] text-foreground font-body text-sm shadow-inner focus:ring-primary focus:border-primary focus:outline-none placeholder:text-foreground/35 leading-relaxed"
            />
          </div>

          {/* Category Selector */}
          <div className="flex flex-col gap-2">
            <label className="font-heading font-medium text-xs text-foreground uppercase tracking-wider">
              Category 🍬
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`font-heading text-xs px-4 py-1.5 rounded border transition-all ${
                    category === cat
                      ? 'bg-secondary text-secondary-foreground border-border shadow-sm font-medium'
                      : 'bg-white hover:bg-accent/10 text-foreground border-border/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="scrapbook-btn-primary py-3 w-full mt-2 flex items-center justify-center gap-2 font-heading font-medium tracking-wider"
          >
            <Send size={14} />
            <span>Spill Secrets!</span>
          </button>
        </form>
      )}

      {/* 2. Loading State */}
      {isSubmitting && (
        <div className="torn-paper p-12 text-center flex flex-col items-center justify-center gap-6 animate-sticker-pop">
          <div className="relative h-16 w-16 border border-border/40 bg-accent/25 rounded-full flex items-center justify-center shadow-inner animate-bounce text-2xl">
            ✒️
          </div>

          <h3 className="font-heading text-xl text-foreground font-normal">RIA is reading...</h3>
          <p className="font-body text-sm font-semibold text-primary animate-pulse min-h-[20px]">
            {loadingTexts[loadingStep]}
          </p>
        </div>
      )}

      {/* 3. Result Screen */}
      {resultConfession && (
        <div
          ref={resultRef}
          className="flex flex-col gap-6 text-left"
        >
          {/* Header success */}
          <div className="border border-emerald-200 bg-emerald-50/50 p-4 rounded text-center font-heading text-xs tracking-wider text-emerald-800 flex items-center justify-center gap-2 shadow-sm">
            <Sparkles size={14} className="text-emerald-600 animate-pulse" />
            <span>Your confession was successfully recorded!</span>
          </div>

          {/* Render Card */}
          <ConfessionCard confession={resultConfession} />

          {/* Post submission CTA actions */}
          <div className="grid grid-cols-2 gap-4 mt-2">
            <Link
              to="/feed"
              className="scrapbook-btn-secondary py-3 text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              <Eye size={14} /> View Feed
            </Link>
            
            <button
              onClick={resetForm}
              className="scrapbook-btn-primary py-3 text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              <RefreshCw size={14} /> Confess Again
            </button>
          </div>

          {/* Quick Share utilities */}
          <div className="border border-dashed border-border/40 rounded p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs bg-white shadow-sm">
            <span className="font-heading font-medium text-foreground/50 uppercase tracking-wider text-[10px]">Share:</span>
            <div className="flex gap-2">
              <button
                onClick={shareToX}
                className="flex items-center gap-1 hover:text-primary font-heading uppercase tracking-wider text-[10px] border border-border/40 px-3 py-1 rounded hover:border-border transition-colors"
              >
                <Share2 size={11} /> Share to X
              </button>
              <button
                onClick={copyLink}
                className="flex items-center gap-1 hover:text-primary font-heading uppercase tracking-wider text-[10px] border border-border/40 px-3 py-1 rounded hover:border-border transition-colors"
              >
                {copied ? 'Copied! ✨' : 'Copy link'}
              </button>
              <button
                onClick={() => setMemeModalOpen(true)}
                className="flex items-center gap-1 text-primary font-heading uppercase tracking-wider text-[10px] border border-primary/30 px-3 py-1 rounded hover:bg-primary/10 transition-colors"
              >
                <ImageIcon size={11} /> Meme Card
              </button>
            </div>
          </div>

          {memeModalOpen && (
            <MemeCardModal
              isOpen={memeModalOpen}
              onClose={() => setMemeModalOpen(false)}
              confessionId={resultConfession.id}
            />
          )}
        </div>
      )}

    </div>
  );
}
