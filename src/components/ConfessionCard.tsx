import { useState, useRef } from 'react';
import { type Confession } from '@/store/useAppStore';
import { Heart, Share2, Link2, Image as ImageIcon, AlertCircle, Coins } from 'lucide-react';
import { MemeCardModal } from './MemeCardModal';

// Helper function to highlight key emotional/crypto phrases in the text
const highlightConfessionText = (text: string) => {
  const phrasesToHighlight = [
    '19 years old', 'biggest regret', 'didn\'t love him', 'said yes', 'one week before the wedding',
    'childhood crush', 'questioning everything', 'actually loving someone', 'more guilty',
    'create chaos', 'hardest decision', 'called it off', 'devastated', 'furious', 'talked about me',
    'never ended up together', 'lost both', 'supposed to marry', 'thought I loved', 'deep down, I know',
    'love letter', 'Solidity dev partner', 'co-founder', 'dating', 'leverage positions',
    'liquidated clown', 'ramen', 'speedrunning wealth', 'sleep', 'SOL bag at $8', 'iced matcha latte',
    'rent money', 'rugged', 'DeFi protocol', 'sybil wallets', 'fair launches', 'private deployer keys',
    'GitHub repo', 'flashloan exploit', 'expert researcher', 'WeChat', 'ChatGPT'
  ];
  
  let highlighted = text;
  const sortedPhrases = [...phrasesToHighlight].sort((a, b) => b.length - a.length);
  
  sortedPhrases.forEach(phrase => {
    const regex = new RegExp(`(${phrase})`, 'gi');
    highlighted = highlighted.replace(regex, '<span class="bg-[#FDE2F3] text-slate-800 px-1 py-0.5 rounded-sm font-semibold inline">$1</span>');
  });
  
  return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
};

interface ConfessionCardProps {
  confession: Confession;
}

export function ConfessionCard({ confession }: ConfessionCardProps) {
  const [copied, setCopied] = useState(false);
  const [memeModalOpen, setMemeModalOpen] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);

  const copyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/feed?id=${confession.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareToX = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `OMG! RIA just roasted Confession #${confession.number} on Ria Confessions: "${confession.riaRoast}" 😂\nRead more here:`;
    const url = `${window.location.origin}/feed?id=${confession.id}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  // Helper to determine theme based on category
  const getCardTheme = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('crush') || cat.includes('love') || cat.includes('romance') || cat.includes('gossip') || cat.includes('founder')) {
      return {
        bg: 'bg-white',
        border: 'border-slate-200/55',
        tagBg: 'bg-[#FDE2F3] text-[#FF5A8F]',
        iconBg: 'bg-[#FDE2F3]',
        icon: <Heart className="w-5 h-5 text-[#FF5A8F] fill-[#FF5A8F]/10" />,
      };
    }
    if (cat.includes('fail') || cat.includes('trading') || cat.includes('dev')) {
      return {
        bg: 'bg-white',
        border: 'border-slate-200/55',
        tagBg: 'bg-[#FFF3E0] text-orange-700',
        iconBg: 'bg-[#FFF3E0]',
        icon: <AlertCircle className="w-5 h-5 text-orange-600" />,
      };
    }
    // Default / Memecoin
    return {
      bg: 'bg-white',
      border: 'border-slate-200/55',
      tagBg: 'bg-[#E0F2FE] text-blue-700',
      iconBg: 'bg-[#E0F2FE]',
      icon: <Coins className="w-5 h-5 text-blue-600" />,
    };
  };

  const theme = getCardTheme(confession.category);

  return (
    <div 
      className="relative group transition-all duration-300 hover:-translate-y-1.5 pt-3.5 pb-3.5 h-full flex flex-col"
      style={{ 
        filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.05)) drop-shadow(0 2px 4px rgba(0,0,0,0.03))'
      }}
    >
            {/* SVG Top Jagged Edge */}
      <svg 
        className="absolute top-0 pointer-events-none z-10" 
        style={{ left: '12px', width: 'calc(100% - 24px)', height: '16px' }} 
        viewBox="0 0 100 16" 
        preserveAspectRatio="none"
      >
        <path d="M 0,16 L 0,10 C 0.6,8.5 1.1,9.2 1.7,9.0 C 2.2,9.4 2.8,9.3 3.3,9.7 C 3.9,11.2 4.5,11.6 5.0,11.9 C 5.6,12.5 6.1,12.9 6.7,12.5 C 7.2,10.9 7.8,11.6 8.3,11.0 C 8.9,13.2 9.4,13.1 10.0,13.1 C 10.6,11.3 11.1,12.5 11.7,11.8 C 12.2,12.1 12.8,11.7 13.3,11.7 C 13.9,14.4 14.4,14.3 15.0,14.0 C 15.6,14.6 16.1,14.3 16.7,14.0 C 17.2,11.5 17.8,12.4 18.3,12.1 C 18.9,11.9 19.4,12.0 20.0,12.3 C 20.6,12.8 21.1,12.5 21.7,12.8 C 22.2,11.0 22.8,10.5 23.3,11.2 C 23.9,11.4 24.4,10.9 25.0,11.0 C 25.6,11.0 26.1,11.0 26.7,10.3 C 27.2,10.2 27.8,9.9 28.3,10.3 C 28.9,8.7 29.4,8.3 30.0,8.1 C 30.6,9.0 31.1,9.5 31.7,9.5 C 32.2,7.7 32.8,8.7 33.3,8.0 C 33.9,6.7 34.5,6.1 35.0,6.5 C 35.6,6.4 36.1,6.6 36.7,6.7 C 37.2,6.0 37.8,5.8 38.3,5.6 C 38.9,7.9 39.5,7.7 40.0,8.3 C 40.6,6.1 41.1,6.1 41.7,5.7 C 42.2,9.8 42.8,10.0 43.3,9.4 C 43.9,9.4 44.5,10.1 45.0,9.9 C 45.6,9.9 46.1,11.1 46.7,10.5 C 47.2,11.3 47.8,11.1 48.3,10.5 C 48.9,10.0 49.5,10.9 50.0,10.4 C 50.6,10.4 51.1,9.7 51.7,10.4 C 52.2,11.8 52.8,11.4 53.3,12.0 C 53.9,12.1 54.5,13.4 55.0,12.7 C 55.6,11.8 56.1,11.5 56.7,11.9 C 57.2,11.9 57.8,12.2 58.3,12.4 C 58.9,11.2 59.5,11.7 60.0,11.8 C 60.6,13.4 61.1,13.7 61.7,14.0 C 62.2,12.7 62.8,12.8 63.3,13.1 C 63.9,13.5 64.5,13.0 65.0,13.2 C 65.6,12.8 66.1,13.1 66.7,13.3 C 67.2,12.0 67.8,11.8 68.3,12.4 C 68.9,11.5 69.5,12.1 70.0,11.6 C 70.6,11.1 71.1,10.8 71.7,10.6 C 72.2,10.7 72.8,10.8 73.3,10.7 C 73.9,11.5 74.5,12.0 75.0,11.3 C 75.6,9.2 76.1,8.6 76.7,8.7 C 77.2,7.0 77.8,7.7 78.3,7.4 C 78.9,6.5 79.5,6.6 80.0,6.9 C 80.6,8.5 81.1,9.1 81.7,9.0 C 82.2,5.5 82.8,5.7 83.3,6.3 C 83.9,8.0 84.5,8.0 85.0,8.3 C 85.6,6.4 86.1,7.3 86.7,6.7 C 87.2,7.7 87.8,7.8 88.3,7.1 C 88.9,8.0 89.5,7.6 90.0,7.7 C 90.6,7.9 91.1,7.9 91.7,8.5 C 92.2,6.4 92.8,6.0 93.3,6.2 C 93.9,10.2 94.5,9.6 95.0,9.5 C 95.6,8.1 96.1,7.0 96.7,7.5 C 97.2,10.7 97.8,10.3 98.3,10.4 C 98.9,11.8 99.5,11.0 100.0,11.2 L 100,16 Z" fill="white" />
        <path d="M 0,16 L 0,10 C 0.6,8.5 1.1,9.2 1.7,9.0 C 2.2,9.4 2.8,9.3 3.3,9.7 C 3.9,11.2 4.5,11.6 5.0,11.9 C 5.6,12.5 6.1,12.9 6.7,12.5 C 7.2,10.9 7.8,11.6 8.3,11.0 C 8.9,13.2 9.4,13.1 10.0,13.1 C 10.6,11.3 11.1,12.5 11.7,11.8 C 12.2,12.1 12.8,11.7 13.3,11.7 C 13.9,14.4 14.4,14.3 15.0,14.0 C 15.6,14.6 16.1,14.3 16.7,14.0 C 17.2,11.5 17.8,12.4 18.3,12.1 C 18.9,11.9 19.4,12.0 20.0,12.3 C 20.6,12.8 21.1,12.5 21.7,12.8 C 22.2,11.0 22.8,10.5 23.3,11.2 C 23.9,11.4 24.4,10.9 25.0,11.0 C 25.6,11.0 26.1,11.0 26.7,10.3 C 27.2,10.2 27.8,9.9 28.3,10.3 C 28.9,8.7 29.4,8.3 30.0,8.1 C 30.6,9.0 31.1,9.5 31.7,9.5 C 32.2,7.7 32.8,8.7 33.3,8.0 C 33.9,6.7 34.5,6.1 35.0,6.5 C 35.6,6.4 36.1,6.6 36.7,6.7 C 37.2,6.0 37.8,5.8 38.3,5.6 C 38.9,7.9 39.5,7.7 40.0,8.3 C 40.6,6.1 41.1,6.1 41.7,5.7 C 42.2,9.8 42.8,10.0 43.3,9.4 C 43.9,9.4 44.5,10.1 45.0,9.9 C 45.6,9.9 46.1,11.1 46.7,10.5 C 47.2,11.3 47.8,11.1 48.3,10.5 C 48.9,10.0 49.5,10.9 50.0,10.4 C 50.6,10.4 51.1,9.7 51.7,10.4 C 52.2,11.8 52.8,11.4 53.3,12.0 C 53.9,12.1 54.5,13.4 55.0,12.7 C 55.6,11.8 56.1,11.5 56.7,11.9 C 57.2,11.9 57.8,12.2 58.3,12.4 C 58.9,11.2 59.5,11.7 60.0,11.8 C 60.6,13.4 61.1,13.7 61.7,14.0 C 62.2,12.7 62.8,12.8 63.3,13.1 C 63.9,13.5 64.5,13.0 65.0,13.2 C 65.6,12.8 66.1,13.1 66.7,13.3 C 67.2,12.0 67.8,11.8 68.3,12.4 C 68.9,11.5 69.5,12.1 70.0,11.6 C 70.6,11.1 71.1,10.8 71.7,10.6 C 72.2,10.7 72.8,10.8 73.3,10.7 C 73.9,11.5 74.5,12.0 75.0,11.3 C 75.6,9.2 76.1,8.6 76.7,8.7 C 77.2,7.0 77.8,7.7 78.3,7.4 C 78.9,6.5 79.5,6.6 80.0,6.9 C 80.6,8.5 81.1,9.1 81.7,9.0 C 82.2,5.5 82.8,5.7 83.3,6.3 C 83.9,8.0 84.5,8.0 85.0,8.3 C 85.6,6.4 86.1,7.3 86.7,6.7 C 87.2,7.7 87.8,7.8 88.3,7.1 C 88.9,8.0 89.5,7.6 90.0,7.7 C 90.6,7.9 91.1,7.9 91.7,8.5 C 92.2,6.4 92.8,6.0 93.3,6.2 C 93.9,10.2 94.5,9.6 95.0,9.5 C 95.6,8.1 96.1,7.0 96.7,7.5 C 97.2,10.7 97.8,10.3 98.3,10.4 C 98.9,11.8 99.5,11.0 100.0,11.2" fill="none" stroke="#C8B195" strokeWidth="0.6" opacity="0.4" />
      </svg>

      {/* SVG Bottom Jagged Edge */}
      <svg 
        className="absolute bottom-0 pointer-events-none z-10" 
        style={{ left: '12px', width: 'calc(100% - 24px)', height: '16px' }} 
        viewBox="0 0 100 16" 
        preserveAspectRatio="none"
      >
        <path d="M 0,0 L 0,6 C 0.6,5.4 1.1,5.9 1.7,5.4 C 2.2,9.3 2.8,9.2 3.3,8.7 C 3.9,8.8 4.5,8.7 5.0,8.6 C 5.6,7.7 6.1,7.4 6.7,7.0 C 7.2,10.9 7.8,11.0 8.3,10.3 C 8.9,8.7 9.4,9.6 10.0,9.0 C 10.6,9.6 11.1,9.3 11.7,9.3 C 12.2,10.4 12.8,10.9 13.3,10.4 C 13.9,8.3 14.4,9.3 15.0,8.6 C 15.6,8.2 16.1,9.4 16.7,8.7 C 17.2,7.2 17.8,8.6 18.3,7.9 C 18.9,7.7 19.4,7.2 20.0,7.3 C 20.6,6.2 21.1,6.8 21.7,6.2 C 22.2,6.7 22.8,7.3 23.3,6.9 C 23.9,7.8 24.4,8.2 25.0,7.7 C 25.6,5.4 26.1,4.9 26.7,5.5 C 27.2,5.9 27.8,5.5 28.3,5.8 C 28.9,4.4 29.4,4.9 30.0,4.7 C 30.6,4.0 31.1,4.1 31.7,3.5 C 32.2,5.1 32.8,4.4 33.3,5.0 C 33.9,4.0 34.5,3.1 35.0,3.5 C 35.6,1.7 36.1,2.6 36.7,2.1 C 37.2,2.2 37.8,3.0 38.3,2.8 C 38.9,1.9 39.5,2.7 40.0,2.5 C 40.6,1.4 41.1,2.3 41.7,2.0 C 42.2,2.9 42.8,2.5 43.3,2.3 C 43.9,4.9 44.5,5.4 45.0,5.5 C 45.6,5.1 46.1,5.4 46.7,5.2 C 47.2,7.1 47.8,7.0 48.3,6.5 C 48.9,8.1 49.5,7.4 50.0,7.4 C 50.6,5.6 51.1,5.6 51.7,5.6 C 52.2,6.6 52.8,5.8 53.3,6.0 C 53.9,7.3 54.5,7.5 55.0,7.9 C 55.6,6.5 56.1,7.0 56.7,7.1 C 57.2,7.0 57.8,7.0 58.3,7.6 C 58.9,9.0 59.5,7.7 60.0,8.3 C 60.6,7.1 61.1,7.5 61.7,7.5 C 62.2,10.8 62.8,9.7 63.3,10.2 C 63.9,7.5 64.5,8.3 65.0,8.0 C 65.6,7.6 66.1,6.9 66.7,7.1 C 67.2,9.7 67.8,9.1 68.3,9.4 C 68.9,8.7 69.5,8.5 70.0,8.9 C 70.6,9.1 71.1,8.0 71.7,8.7 C 72.2,6.9 72.8,6.6 73.3,6.4 C 73.9,7.9 74.5,6.6 75.0,7.2 C 75.6,5.1 76.1,6.3 76.7,5.6 C 77.2,4.6 77.8,4.9 78.3,5.0 C 78.9,4.5 79.5,5.3 80.0,4.6 C 80.6,2.6 81.1,3.4 81.7,3.0 C 82.2,1.3 82.8,2.5 83.3,2.0 C 83.9,1.8 84.5,1.8 85.0,2.0 C 85.6,3.5 86.1,3.9 86.7,4.2 C 87.2,2.3 87.8,2.9 88.3,2.3 C 88.9,3.8 89.5,4.2 90.0,4.4 C 90.6,2.7 91.1,3.9 91.7,3.3 C 92.2,5.1 92.8,5.7 93.3,5.5 C 93.9,2.8 94.5,3.0 95.0,2.9 C 95.6,2.9 96.1,3.7 96.7,3.2 C 97.2,3.9 97.8,3.6 98.3,4.0 C 98.9,7.6 99.5,6.2 100.0,6.9 L 100,0 Z" fill="white" />
        <path d="M 0,0 L 0,6 C 0.6,5.4 1.1,5.9 1.7,5.4 C 2.2,9.3 2.8,9.2 3.3,8.7 C 3.9,8.8 4.5,8.7 5.0,8.6 C 5.6,7.7 6.1,7.4 6.7,7.0 C 7.2,10.9 7.8,11.0 8.3,10.3 C 8.9,8.7 9.4,9.6 10.0,9.0 C 10.6,9.6 11.1,9.3 11.7,9.3 C 12.2,10.4 12.8,10.9 13.3,10.4 C 13.9,8.3 14.4,9.3 15.0,8.6 C 15.6,8.2 16.1,9.4 16.7,8.7 C 17.2,7.2 17.8,8.6 18.3,7.9 C 18.9,7.7 19.4,7.2 20.0,7.3 C 20.6,6.2 21.1,6.8 21.7,6.2 C 22.2,6.7 22.8,7.3 23.3,6.9 C 23.9,7.8 24.4,8.2 25.0,7.7 C 25.6,5.4 26.1,4.9 26.7,5.5 C 27.2,5.9 27.8,5.5 28.3,5.8 C 28.9,4.4 29.4,4.9 30.0,4.7 C 30.6,4.0 31.1,4.1 31.7,3.5 C 32.2,5.1 32.8,4.4 33.3,5.0 C 33.9,4.0 34.5,3.1 35.0,3.5 C 35.6,1.7 36.1,2.6 36.7,2.1 C 37.2,2.2 37.8,3.0 38.3,2.8 C 38.9,1.9 39.5,2.7 40.0,2.5 C 40.6,1.4 41.1,2.3 41.7,2.0 C 42.2,2.9 42.8,2.5 43.3,2.3 C 43.9,4.9 44.5,5.4 45.0,5.5 C 45.6,5.1 46.1,5.4 46.7,5.2 C 47.2,7.1 47.8,7.0 48.3,6.5 C 48.9,8.1 49.5,7.4 50.0,7.4 C 50.6,5.6 51.1,5.6 51.7,5.6 C 52.2,6.6 52.8,5.8 53.3,6.0 C 53.9,7.3 54.5,7.5 55.0,7.9 C 55.6,6.5 56.1,7.0 56.7,7.1 C 57.2,7.0 57.8,7.0 58.3,7.6 C 58.9,9.0 59.5,7.7 60.0,8.3 C 60.6,7.1 61.1,7.5 61.7,7.5 C 62.2,10.8 62.8,9.7 63.3,10.2 C 63.9,7.5 64.5,8.3 65.0,8.0 C 65.6,7.6 66.1,6.9 66.7,7.1 C 67.2,9.7 67.8,9.1 68.3,9.4 C 68.9,8.7 69.5,8.5 70.0,8.9 C 70.6,9.1 71.1,8.0 71.7,8.7 C 72.2,6.9 72.8,6.6 73.3,6.4 C 73.9,7.9 74.5,6.6 75.0,7.2 C 75.6,5.1 76.1,6.3 76.7,5.6 C 77.2,4.6 77.8,4.9 78.3,5.0 C 78.9,4.5 79.5,5.3 80.0,4.6 C 80.6,2.6 81.1,3.4 81.7,3.0 C 82.2,1.3 82.8,2.5 83.3,2.0 C 83.9,1.8 84.5,1.8 85.0,2.0 C 85.6,3.5 86.1,3.9 86.7,4.2 C 87.2,2.3 87.8,2.9 88.3,2.3 C 88.9,3.8 89.5,4.2 90.0,4.4 C 90.6,2.7 91.1,3.9 91.7,3.3 C 92.2,5.1 92.8,5.7 93.3,5.5 C 93.9,2.8 94.5,3.0 95.0,2.9 C 95.6,2.9 96.1,3.7 96.7,3.2 C 97.2,3.9 97.8,3.6 98.3,4.0 C 98.9,7.6 99.5,6.2 100.0,6.9" fill="none" stroke="#C8B195" strokeWidth="0.6" opacity="0.4" />
      </svg>

      {/* SVG Left Jagged Edge */}
      <svg 
        className="absolute left-0 pointer-events-none z-10" 
        style={{ top: '12px', width: '16px', height: 'calc(100% - 24px)' }} 
        viewBox="0 0 16 100" 
        preserveAspectRatio="none"
      >
        <path d="M 16,0 L 16,100 L 10,100 C 8.5,99.4 9.2,98.9 9.0,98.3 C 9.4,97.8 9.3,97.2 9.7,96.7 C 11.2,96.1 11.6,95.5 11.9,95.0 C 12.5,94.4 12.9,93.9 12.5,93.3 C 10.9,92.8 11.6,92.2 11.0,91.7 C 13.2,91.1 13.1,90.6 13.1,90.0 C 11.3,89.4 12.5,88.9 11.8,88.3 C 12.1,87.8 11.7,87.2 11.7,86.7 C 14.4,86.1 14.3,85.6 14.0,85.0 C 14.6,84.4 14.3,83.9 14.0,83.3 C 11.5,82.8 12.4,82.2 12.1,81.7 C 11.9,81.1 12.0,80.6 12.3,80.0 C 12.8,79.4 12.5,78.9 12.8,78.3 C 11.0,77.8 10.5,77.2 11.2,76.7 C 11.4,76.1 10.9,75.6 11.0,75.0 C 11.0,74.4 11.0,73.9 10.3,73.3 C 10.2,72.8 9.9,72.2 10.3,71.7 C 8.7,71.1 8.3,70.6 8.1,70.0 C 9.0,69.4 9.5,68.9 9.5,68.3 C 7.7,67.8 8.7,67.2 8.0,66.7 C 6.7,66.1 6.1,65.5 6.5,65.0 C 6.4,64.4 6.6,63.9 6.7,63.3 C 6.0,62.8 5.8,62.2 5.6,61.7 C 7.9,61.1 7.7,60.6 8.3,60.0 C 6.1,59.4 6.1,58.9 5.7,58.3 C 9.8,57.8 10.0,57.2 9.4,56.7 C 9.4,56.1 10.1,55.6 9.9,55.0 C 9.9,54.4 11.1,53.9 10.5,53.3 C 11.3,52.8 11.1,52.2 10.5,51.7 C 10.0,51.1 10.9,50.6 10.4,50.0 C 10.4,49.4 9.7,48.9 10.4,48.3 C 11.8,47.8 11.4,47.2 12.0,46.7 C 12.1,46.1 13.4,45.6 12.7,45.0 C 11.8,44.4 11.5,43.9 11.9,43.3 C 11.9,42.8 12.2,42.2 12.4,41.7 C 11.2,41.1 11.7,40.6 11.8,40.0 C 13.4,39.4 13.7,38.9 14.0,38.3 C 12.7,37.8 12.8,37.2 13.1,36.7 C 13.5,36.1 13.0,35.6 13.2,35.0 C 12.8,34.4 13.1,33.9 13.3,33.3 C 12.0,32.8 11.8,32.2 12.4,31.7 C 11.5,31.1 12.1,30.6 11.6,30.0 C 11.1,29.4 10.8,28.9 10.6,28.3 C 10.7,27.8 10.8,27.2 10.7,26.7 C 11.5,26.1 12.0,25.6 11.3,25.0 C 9.2,24.4 8.6,23.9 8.7,23.3 C 7.0,22.8 7.7,22.2 7.4,21.7 C 6.5,21.1 6.6,20.6 6.9,20.0 C 8.5,19.4 9.1,18.9 9.0,18.3 C 5.5,17.8 5.7,17.2 6.3,16.7 C 8.0,16.1 8.0,15.6 8.3,15.0 C 6.4,14.4 7.3,13.9 6.7,13.3 C 7.7,12.8 7.8,12.2 7.1,11.7 C 8.0,11.1 7.6,10.6 7.7,10.0 C 7.9,9.4 7.9,8.9 8.5,8.3 C 6.4,7.8 6.0,7.2 6.2,6.7 C 10.2,6.1 9.6,5.6 9.5,5.0 C 8.1,4.4 7.0,3.9 7.5,3.3 C 10.7,2.8 10.3,2.2 10.4,1.7 C 11.8,1.1 11.0,0.6 11.2,0 Z" fill="white" />
        <path d="M 10,100 C 8.5,99.4 9.2,98.9 9.0,98.3 C 9.4,97.8 9.3,97.2 9.7,96.7 C 11.2,96.1 11.6,95.5 11.9,95.0 C 12.5,94.4 12.9,93.9 12.5,93.3 C 10.9,92.8 11.6,92.2 11.0,91.7 C 13.2,91.1 13.1,90.6 13.1,90.0 C 11.3,89.4 12.5,88.9 11.8,88.3 C 12.1,87.8 11.7,87.2 11.7,86.7 C 14.4,86.1 14.3,85.6 14.0,85.0 C 14.6,84.4 14.3,83.9 14.0,83.3 C 11.5,82.8 12.4,82.2 12.1,81.7 C 11.9,81.1 12.0,80.6 12.3,80.0 C 12.8,79.4 12.5,78.9 12.8,78.3 C 11.0,77.8 10.5,77.2 11.2,76.7 C 11.4,76.1 10.9,75.6 11.0,75.0 C 11.0,74.4 11.0,73.9 10.3,73.3 C 10.2,72.8 9.9,72.2 10.3,71.7 C 8.7,71.1 8.3,70.6 8.1,70.0 C 9.0,69.4 9.5,68.9 9.5,68.3 C 7.7,67.8 8.7,67.2 8.0,66.7 C 6.7,66.1 6.1,65.5 6.5,65.0 C 6.4,64.4 6.6,63.9 6.7,63.3 C 6.0,62.8 5.8,62.2 5.6,61.7 C 7.9,61.1 7.7,60.6 8.3,60.0 C 6.1,59.4 6.1,58.9 5.7,58.3 C 9.8,57.8 10.0,57.2 9.4,56.7 C 9.4,56.1 10.1,55.6 9.9,55.0 C 9.9,54.4 11.1,53.9 10.5,53.3 C 11.3,52.8 11.1,52.2 10.5,51.7 C 10.0,51.1 10.9,50.6 10.4,50.0 C 10.4,49.4 9.7,48.9 10.4,48.3 C 11.8,47.8 11.4,47.2 12.0,46.7 C 12.1,46.1 13.4,45.6 12.7,45.0 C 11.8,44.4 11.5,43.9 11.9,43.3 C 11.9,42.8 12.2,42.2 12.4,41.7 C 11.2,41.1 11.7,40.6 11.8,40.0 C 13.4,39.4 13.7,38.9 14.0,38.3 C 12.7,37.8 12.8,37.2 13.1,36.7 C 13.5,36.1 13.0,35.6 13.2,35.0 C 12.8,34.4 13.1,33.9 13.3,33.3 C 12.0,32.8 11.8,32.2 12.4,31.7 C 11.5,31.1 12.1,30.6 11.6,30.0 C 11.1,29.4 10.8,28.9 10.6,28.3 C 10.7,27.8 10.8,27.2 10.7,26.7 C 11.5,26.1 12.0,25.6 11.3,25.0 C 9.2,24.4 8.6,23.9 8.7,23.3 C 7.0,22.8 7.7,22.2 7.4,21.7 C 6.5,21.1 6.6,20.6 6.9,20.0 C 8.5,19.4 9.1,18.9 9.0,18.3 C 5.5,17.8 5.7,17.2 6.3,16.7 C 8.0,16.1 8.0,15.6 8.3,15.0 C 6.4,14.4 7.3,13.9 6.7,13.3 C 7.7,12.8 7.8,12.2 7.1,11.7 C 8.0,11.1 7.6,10.6 7.7,10.0 C 7.9,9.4 7.9,8.9 8.5,8.3 C 6.4,7.8 6.0,7.2 6.2,6.7 C 10.2,6.1 9.6,5.6 9.5,5.0 C 8.1,4.4 7.0,3.9 7.5,3.3 C 10.7,2.8 10.3,2.2 10.4,1.7 C 11.8,1.1 11.0,0.6 11.2,0" fill="none" stroke="#C8B195" strokeWidth="0.6" opacity="0.4" />
      </svg>

      {/* SVG Right Jagged Edge */}
      <svg 
        className="absolute right-0 pointer-events-none z-10" 
        style={{ top: '12px', width: '16px', height: 'calc(100% - 24px)' }} 
        viewBox="0 0 16 100" 
        preserveAspectRatio="none"
      >
        <g transform="matrix(-1 0 0 1 16 0)">
          <path d="M 16,0 L 16,100 L 10,100 C 8.5,99.4 9.2,98.9 9.0,98.3 C 9.4,97.8 9.3,97.2 9.7,96.7 C 11.2,96.1 11.6,95.5 11.9,95.0 C 12.5,94.4 12.9,93.9 12.5,93.3 C 10.9,92.8 11.6,92.2 11.0,91.7 C 13.2,91.1 13.1,90.6 13.1,90.0 C 11.3,89.4 12.5,88.9 11.8,88.3 C 12.1,87.8 11.7,87.2 11.7,86.7 C 14.4,86.1 14.3,85.6 14.0,85.0 C 14.6,84.4 14.3,83.9 14.0,83.3 C 11.5,82.8 12.4,82.2 12.1,81.7 C 11.9,81.1 12.0,80.6 12.3,80.0 C 12.8,79.4 12.5,78.9 12.8,78.3 C 11.0,77.8 10.5,77.2 11.2,76.7 C 11.4,76.1 10.9,75.6 11.0,75.0 C 11.0,74.4 11.0,73.9 10.3,73.3 C 10.2,72.8 9.9,72.2 10.3,71.7 C 8.7,71.1 8.3,70.6 8.1,70.0 C 9.0,69.4 9.5,68.9 9.5,68.3 C 7.7,67.8 8.7,67.2 8.0,66.7 C 6.7,66.1 6.1,65.5 6.5,65.0 C 6.4,64.4 6.6,63.9 6.7,63.3 C 6.0,62.8 5.8,62.2 5.6,61.7 C 7.9,61.1 7.7,60.6 8.3,60.0 C 6.1,59.4 6.1,58.9 5.7,58.3 C 9.8,57.8 10.0,57.2 9.4,56.7 C 9.4,56.1 10.1,55.6 9.9,55.0 C 9.9,54.4 11.1,53.9 10.5,53.3 C 11.3,52.8 11.1,52.2 10.5,51.7 C 10.0,51.1 10.9,50.6 10.4,50.0 C 10.4,49.4 9.7,48.9 10.4,48.3 C 11.8,47.8 11.4,47.2 12.0,46.7 C 12.1,46.1 13.4,45.6 12.7,45.0 C 11.8,44.4 11.5,43.9 11.9,43.3 C 11.9,42.8 12.2,42.2 12.4,41.7 C 11.2,41.1 11.7,40.6 11.8,40.0 C 13.4,39.4 13.7,38.9 14.0,38.3 C 12.7,37.8 12.8,37.2 13.1,36.7 C 13.5,36.1 13.0,35.6 13.2,35.0 C 12.8,34.4 13.1,33.9 13.3,33.3 C 12.0,32.8 11.8,32.2 12.4,31.7 C 11.5,31.1 12.1,30.6 11.6,30.0 C 11.1,29.4 10.8,28.9 10.6,28.3 C 10.7,27.8 10.8,27.2 10.7,26.7 C 11.5,26.1 12.0,25.6 11.3,25.0 C 9.2,24.4 8.6,23.9 8.7,23.3 C 7.0,22.8 7.7,22.2 7.4,21.7 C 6.5,21.1 6.6,20.6 6.9,20.0 C 8.5,19.4 9.1,18.9 9.0,18.3 C 5.5,17.8 5.7,17.2 6.3,16.7 C 8.0,16.1 8.0,15.6 8.3,15.0 C 6.4,14.4 7.3,13.9 6.7,13.3 C 7.7,12.8 7.8,12.2 7.1,11.7 C 8.0,11.1 7.6,10.6 7.7,10.0 C 7.9,9.4 7.9,8.9 8.5,8.3 C 6.4,7.8 6.0,7.2 6.2,6.7 C 10.2,6.1 9.6,5.6 9.5,5.0 C 8.1,4.4 7.0,3.9 7.5,3.3 C 10.7,2.8 10.3,2.2 10.4,1.7 C 11.8,1.1 11.0,0.6 11.2,0 Z" fill="white" />
          <path d="M 10,100 C 8.5,99.4 9.2,98.9 9.0,98.3 C 9.4,97.8 9.3,97.2 9.7,96.7 C 11.2,96.1 11.6,95.5 11.9,95.0 C 12.5,94.4 12.9,93.9 12.5,93.3 C 10.9,92.8 11.6,92.2 11.0,91.7 C 13.2,91.1 13.1,90.6 13.1,90.0 C 11.3,89.4 12.5,88.9 11.8,88.3 C 12.1,87.8 11.7,87.2 11.7,86.7 C 14.4,86.1 14.3,85.6 14.0,85.0 C 14.6,84.4 14.3,83.9 14.0,83.3 C 11.5,82.8 12.4,82.2 12.1,81.7 C 11.9,81.1 12.0,80.6 12.3,80.0 C 12.8,79.4 12.5,78.9 12.8,78.3 C 11.0,77.8 10.5,77.2 11.2,76.7 C 11.4,76.1 10.9,75.6 11.0,75.0 C 11.0,74.4 11.0,73.9 10.3,73.3 C 10.2,72.8 9.9,72.2 10.3,71.7 C 8.7,71.1 8.3,70.6 8.1,70.0 C 9.0,69.4 9.5,68.9 9.5,68.3 C 7.7,67.8 8.7,67.2 8.0,66.7 C 6.7,66.1 6.1,65.5 6.5,65.0 C 6.4,64.4 6.6,63.9 6.7,63.3 C 6.0,62.8 5.8,62.2 5.6,61.7 C 7.9,61.1 7.7,60.6 8.3,60.0 C 6.1,59.4 6.1,58.9 5.7,58.3 C 9.8,57.8 10.0,57.2 9.4,56.7 C 9.4,56.1 10.1,55.6 9.9,55.0 C 9.9,54.4 11.1,53.9 10.5,53.3 C 11.3,52.8 11.1,52.2 10.5,51.7 C 10.0,51.1 10.9,50.6 10.4,50.0 C 10.4,49.4 9.7,48.9 10.4,48.3 C 11.8,47.8 11.4,47.2 12.0,46.7 C 12.1,46.1 13.4,45.6 12.7,45.0 C 11.8,44.4 11.5,43.9 11.9,43.3 C 11.9,42.8 12.2,42.2 12.4,41.7 C 11.2,41.1 11.7,40.6 11.8,40.0 C 13.4,39.4 13.7,38.9 14.0,38.3 C 12.7,37.8 12.8,37.2 13.1,36.7 C 13.5,36.1 13.0,35.6 13.2,35.0 C 12.8,34.4 13.1,33.9 13.3,33.3 C 12.0,32.8 11.8,32.2 12.4,31.7 C 11.5,31.1 12.1,30.6 11.6,30.0 C 11.1,29.4 10.8,28.9 10.6,28.3 C 10.7,27.8 10.8,27.2 10.7,26.7 C 11.5,26.1 12.0,25.6 11.3,25.0 C 9.2,24.4 8.6,23.9 8.7,23.3 C 7.0,22.8 7.7,22.2 7.4,21.7 C 6.5,21.1 6.6,20.6 6.9,20.0 C 8.5,19.4 9.1,18.9 9.0,18.3 C 5.5,17.8 5.7,17.2 6.3,16.7 C 8.0,16.1 8.0,15.6 8.3,15.0 C 6.4,14.4 7.3,13.9 6.7,13.3 C 7.7,12.8 7.8,12.2 7.1,11.7 C 8.0,11.1 7.6,10.6 7.7,10.0 C 7.9,9.4 7.9,8.9 8.5,8.3 C 6.4,7.8 6.0,7.2 6.2,6.7 C 10.2,6.1 9.6,5.6 9.5,5.0 C 8.1,4.4 7.0,3.9 7.5,3.3 C 10.7,2.8 10.3,2.2 10.4,1.7 C 11.8,1.1 11.0,0.6 11.2,0" fill="none" stroke="#C8B195" strokeWidth="0.6" opacity="0.4" />
        </g>
      </svg>

      {/* White background middle block */}
      <div className="absolute inset-[16px] bg-white z-0" />

      {/* Main card content container */}
      <div
        ref={cardRef}
        className="relative z-20 p-6 pt-7 pb-7 flex flex-col text-left overflow-hidden bg-transparent flex-1"
      >
        {/* Header Banner Block */}
        <div className="bg-transparent text-slate-800 py-3.5 px-6 flex items-center justify-between relative select-none -mx-6 -mt-7 mb-6 border-b border-[#C8B195]/25">
          <div className="flex items-center gap-2">
            <h4 className="font-heading font-black text-xl sm:text-2xl tracking-wider text-slate-800 uppercase italic">
              CONFESSION #{confession.number}
            </h4>
            <span className={`font-sans text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider ml-2 ${theme.tagBg}`}>
              {confession.category}
            </span>
          </div>
          
          {/* Circular Badge Sticker */}
          <div className="w-14 h-14 rounded-full bg-[#1C1A18] border border-rose-300/45 flex flex-col items-center justify-center text-center shrink-0 shadow-md rotate-[6deg] -mr-3 -my-2 select-none text-white">
            <span className="text-[6px] font-sans font-bold uppercase tracking-wider text-rose-300 leading-none">RIA</span>
            <span className="text-[6px] font-sans font-bold uppercase tracking-wider text-slate-300 leading-none mt-0.5">SECRET</span>
            <span className="text-[5px] font-sans text-slate-400 uppercase leading-none mt-0.5">ledger</span>
            <span className="text-[10px] mt-0.5">👑</span>
          </div>
        </div>

        {/* Meta information */}
        <div className="flex items-center gap-3 text-[11px] font-body text-slate-400 mb-3 px-1 select-none">
          <span className="flex items-center gap-0.5">
            📅 {confession.timeAgo}
          </span>
          <span>•</span>
          <span className="flex items-center gap-0.5 text-orange-600 font-semibold">
            🔥 {confession.flameScore} chaos score
          </span>
        </div>

        {/* Details and content block */}
        <div className="relative flex-1 px-1">
          <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-slate-800 select-text pr-2 sm:pr-8">
            {highlightConfessionText(confession.text)}
          </p>
        </div>

        {/* Dotted separator */}
        <div className="border-t border-dotted border-slate-200 w-full my-4" />

        {/* Bottom row: Pink sticky note on right */}
        <div className="flex justify-end items-end gap-4 mt-2">
          {/* Sticky Note with RIA Roast */}
          <div className="bg-[#FFE2E7] border border-rose-200 p-4 pt-5 pb-3 rounded-sm shadow-sm rotate-[-2deg] w-60 relative max-w-[65%] shrink-0">
            {/* Washi Tape */}
            <div className="washi-tape washi-tape-pink absolute -top-3 left-[30%] w-16 h-5 rotate-[4deg] opacity-75" />
            
            <div className="text-[10px] font-sans font-extrabold uppercase tracking-wider text-rose-500 mb-1 select-none">
              RIA'S ROAST:
            </div>
            
            <p 
              className="text-[17px] sm:text-[19px] text-rose-600 font-bold leading-tight italic select-text"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              "{confession.riaRoast}"
            </p>
            
            {/* Small heart outline doodle on sticky note */}
            <svg className="w-4 h-4 text-rose-400 opacity-60 ml-auto mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>

        {/* Action buttons row - fades in on hover */}
        <div className="absolute inset-x-0 bottom-4 px-6 flex items-center justify-between gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 pointer-events-none group-hover:pointer-events-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={shareToX}
              className="flex items-center gap-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-[10px] text-slate-700 font-sans font-bold uppercase tracking-wider px-3 py-1.5 rounded transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <Share2 size={11} /> Share
            </button>
            <button
              onClick={copyLink}
              className="flex items-center gap-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-[10px] text-slate-700 font-sans font-bold uppercase tracking-wider px-3 py-1.5 rounded transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <Link2 size={11} /> {copied ? 'Copied! ✨' : 'Copy'}
            </button>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMemeModalOpen(true);
            }}
            className="flex items-center gap-1.5 border border-[#FF5A8F]/30 bg-white hover:bg-[#FF5A8F] hover:text-white text-[10px] text-[#FF5A8F] font-sans font-bold uppercase tracking-wider px-3 py-1.5 rounded transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <ImageIcon size={11} /> Meme Card 🍓
          </button>
        </div>

        {/* Meme Card Generation Modal */}
        {memeModalOpen && (
          <MemeCardModal
            isOpen={memeModalOpen}
            onClose={() => setMemeModalOpen(false)}
            confessionId={confession.id}
          />
        )}
      </div>
    </div>
  );
}
