import { useState, useRef } from 'react';
import { KeyRound, RefreshCw } from 'lucide-react';
import { gsap } from 'gsap';

export function RevealPage() {
  const [tapCount, setTapCount] = useState(0);
  const [isHatched, setIsHatched] = useState(false);
  const [secretText, setSecretText] = useState('');
  const [decodedMessage, setDecodedMessage] = useState('');
  const [isDecoding, setIsDecoding] = useState(false);
  const eggRef = useRef<HTMLDivElement>(null);

  const targetTaps = 9;

  const handleEggTap = () => {
    if (isHatched) return;

    const nextCount = tapCount + 1;
    setTapCount(nextCount);

    if (eggRef.current) {
      gsap.fromTo(
        eggRef.current,
        { scale: 1, rotation: -2 },
        {
          scale: 1.12,
          rotation: 2,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: 'power2.out',
          onComplete: () => {
            if (nextCount >= targetTaps) {
              triggerHatch();
            }
          }
        }
      );
    }
  };

  const triggerHatch = () => {
    setIsHatched(true);
    setSecretText("0x4e79615f436f6e66657373696f6e735f4172655f5468655f42657374");

    if (eggRef.current) {
      gsap.timeline()
        .to(eggRef.current, { scale: 1.2, rotation: 10, duration: 0.3, ease: 'power2.out' })
        .to(eggRef.current, { scale: 0, opacity: 0, duration: 0.5, ease: 'power2.in' });
    }
  };

  const handleDecode = () => {
    if (!secretText || isDecoding) return;
    
    setIsDecoding(true);
    
    let interval: any;
    let iterations = 0;
    const originalText = "🎀 RIA CONFESSIONS ARE THE BEST! 🎀";
    
    interval = setInterval(() => {
      setDecodedMessage(
        originalText
          .split('')
          .map((_, index) => {
            if (index < iterations) return originalText[index];
            return String.fromCharCode(33 + Math.floor(Math.random() * 90));
          })
          .join('')
      );
      
      iterations += 1;
      if (iterations > originalText.length) {
        clearInterval(interval);
        setDecodedMessage(originalText);
        setIsDecoding(false);
      }
    }, 50);
  };

  const resetGame = () => {
    setTapCount(0);
    setIsHatched(false);
    setSecretText('');
    setDecodedMessage('');
    setIsDecoding(false);
    
    if (eggRef.current) {
      gsap.set(eggRef.current, { scale: 1, opacity: 1, rotation: 0 });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col items-center text-left">
      
      {/* Header */}
      <div className="text-center mb-10">
        <span className="font-script text-primary text-4xl block leading-none mb-1">secret room</span>
        <h1 className="text-3xl font-heading text-foreground font-normal">
          Classified Decoder
        </h1>
        <p className="text-foreground/50 text-xs font-body mt-1">
          hatch the developer eggs to decode RIA's classified drops.
        </p>
      </div>

      <div className="w-full max-w-md torn-paper p-8 text-center relative overflow-hidden">
        
        {/* Corner decorations */}
        <span className="absolute top-2 left-2 text-sm opacity-40">✨</span>
        <span className="absolute bottom-2 right-2 text-sm opacity-40">✨</span>

        {!isHatched ? (
          <div className="flex flex-col items-center justify-center py-6">
            <h3 className="font-heading text-lg mb-2 font-normal text-foreground/85">Tap to Hatch! 🥚</h3>
            <p className="text-xs text-foreground/50 font-body mb-6">
              Tap {targetTaps - tapCount} more times to reveal secret code
            </p>

            {/* Tap Target Egg */}
            <div
              ref={eggRef}
              onClick={handleEggTap}
              className="h-40 w-32 border border-border/60 rounded-[50%_50%_50%_50%/_60%_60%_40%_40%] bg-gradient-to-br from-white via-pink-50 to-primary/10 flex items-center justify-center shadow-sm hover:scale-[1.01] cursor-pointer select-none relative group"
            >
              {/* Cute sleeping face on egg */}
              <div className="flex flex-col items-center gap-0.5 pointer-events-none opacity-70">
                <div className="flex gap-4">
                  <span className="font-bold text-xs select-none">◡</span>
                  <span className="font-bold text-xs select-none">◡</span>
                </div>
                <span className="text-[8px] font-bold">o</span>
                <div className="flex gap-6 mt-1">
                  <span className="h-1 w-2.5 bg-primary/40 rounded-full"></span>
                  <span className="h-1 w-2.5 bg-primary/40 rounded-full"></span>
                </div>
              </div>
              
              {/* Cracking guides */}
              {tapCount > 2 && (
                <div className="absolute top-10 left-6 text-xs text-primary font-bold rotate-[-25deg] pointer-events-none opacity-45">⚡</div>
              )}
              {tapCount > 5 && (
                <div className="absolute bottom-12 right-6 text-xs text-primary font-bold rotate-[15deg] pointer-events-none opacity-45">⚡</div>
              )}
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-accent/20 h-2.5 rounded-full border border-border/40 mt-8 overflow-hidden shadow-inner">
              <div
                className="bg-primary h-full transition-all duration-150"
                style={{ width: `${(tapCount / targetTaps) * 100}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-4 animate-sticker-pop">
            <span className="text-4xl animate-bounce">🐣</span>
            <h3 className="font-heading text-lg text-primary font-normal mt-2">Hatched Successfully!</h3>
            <p className="text-xs text-foreground/50 font-body max-w-xs leading-relaxed">
              You've unlocked the classified hexadecimal hash. Let's decode it to read the message!
            </p>

            {/* Secret Hex Hash */}
            <div className="w-full border border-border bg-[#FCFAF5] p-3 rounded font-mono text-xs text-center break-all shadow-inner mt-2">
              {secretText}
            </div>

            {/* Decode CTA */}
            {!decodedMessage ? (
              <button
                onClick={handleDecode}
                disabled={isDecoding}
                className="scrapbook-btn-primary py-2.5 px-6 text-xs flex items-center gap-2 mt-2 font-heading tracking-wider uppercase"
              >
                <KeyRound size={13} />
                <span>{isDecoding ? 'Decrypting...' : 'Decode Secret 🔓'}</span>
              </button>
            ) : (
              <div className="w-full mt-2 animate-sticker-pop">
                <div className="text-[10px] font-heading font-medium text-foreground/45 uppercase tracking-wider mb-1.5">Decrypted Output</div>
                <div className="border border-[#C8B195]/40 bg-accent/20 text-foreground py-4 px-6 rounded font-heading font-medium text-sm shadow-inner italic">
                  {decodedMessage}
                </div>
                
                <button
                  onClick={resetGame}
                  className="mt-6 flex items-center gap-1.5 mx-auto text-xs font-heading font-medium text-foreground/50 hover:text-foreground transition-colors"
                >
                  <RefreshCw size={11} /> Play Again
                </button>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
