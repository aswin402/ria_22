import { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useAppStore } from '@/store/useAppStore';

interface MemeCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  confessionId: string;
}

type ThemeKey = 'strawberry' | 'sakura' | 'matcha' | 'blueberry';

interface ThemeConfig {
  bg: string;
  cardBg: string;
  accent: string;
  accentDark: string;
  name: string;
  emoji: string;
}

const THEMES: Record<ThemeKey, ThemeConfig> = {
  strawberry: {
    bg: '#FAF5F5',
    cardBg: '#FFFFFF',
    accent: '#EAA8B6',
    accentDark: '#D48C9C',
    name: 'Rose Tea',
    emoji: '🌹'
  },
  sakura: {
    bg: '#FCFAF7',
    cardBg: '#FFFFFF',
    accent: '#F3D1D9',
    accentDark: '#EAA8B6',
    name: 'Sakura Petal',
    emoji: '🌸'
  },
  matcha: {
    bg: '#FAFBF7',
    cardBg: '#FFFFFF',
    accent: '#D3E2D6',
    accentDark: '#A8C3B4',
    name: 'Soft Sage',
    emoji: '🌿'
  },
  blueberry: {
    bg: '#FAF8F5',
    cardBg: '#FFFFFF',
    accent: '#BACFD9',
    accentDark: '#709CB3',
    name: 'Sky Ink',
    emoji: '🖋️'
  }
};

export function MemeCardModal({ isOpen, onClose, confessionId }: MemeCardModalProps) {
  const confessions = useAppStore((state) => state.confessions);
  const completeTask = useAppStore((state) => state.completeTask);
  const confession = confessions.find((c) => c.id === confessionId);
  const [selectedTheme, setSelectedTheme] = useState<ThemeKey>('strawberry');
  const svgRef = useRef<SVGSVGElement>(null);

  if (!confession) return null;

  const activeTheme = THEMES[selectedTheme];

  const handleDownload = () => {
    if (!svgRef.current) return;
    
    // Complete reward task 3 (Generate a Meme Card)
    completeTask('task-3');

    try {
      const svgString = new XMLSerializer().serializeToString(svgRef.current);
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      
      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = `confession-${confession.number}-${selectedTheme}.svg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(svgUrl);
    } catch (err) {
      console.error('Failed to export SVG meme card', err);
    }
  };

  // Split text into lines of max characters so it displays nicely in the SVG
  const wrapText = (text: string, maxCharsPerLine = 35) => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    words.forEach((word) => {
      if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
        currentLine = (currentLine + ' ' + word).trim();
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    });
    if (currentLine) {
      lines.push(currentLine);
    }
    return lines;
  };

  const confessionLines = wrapText(confession.text, 34);
  const roastLines = wrapText(`"${confession.riaRoast}"`, 22);

  const getTagColors = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('crush') || cat.includes('love') || cat.includes('romance') || cat.includes('gossip') || cat.includes('founder')) {
      return { bg: '#FDE2F3', text: '#FF5A8F' };
    }
    if (cat.includes('fail') || cat.includes('trading') || cat.includes('dev')) {
      return { bg: '#FFF3E0', text: '#C2410C' };
    }
    return { bg: '#E0F2FE', text: '#1D4ED8' };
  };
  const tagColors = getTagColors(confession.category);
  const tagWidth = confession.category.length * 5.2 + 10;
  const tagX = 52 + (confession.number.toString().length + 12) * 7.5;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[95vw] max-w-4xl sm:max-w-4xl md:max-w-5xl bg-background border border-border/40 rounded-xl shadow-lg text-foreground focus:outline-none p-6 md:p-8 text-left">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Preview (takes 6/12 cols) */}
          <div className="col-span-12 md:col-span-6 flex justify-center">
            {/* SVG Card Preview Wrapper */}
            <div className="border border-border rounded overflow-hidden bg-white shadow-sm w-[320px] sm:w-[360px] h-[450px] sm:h-[506px]">
              <svg
                ref={svgRef}
                width="100%"
                height="100%"
                viewBox="0 0 320 450"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                style={{ background: activeTheme.bg }}
              >
                <defs>
                  {/* Google Fonts import inside downloadable SVG */}
                  <style type="text/css">
                    {`
                      @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Outfit:wght@400;500;700;800;900&family=Playfair+Display:ital,wght@1,900&family=Courier+Prime&display=swap');
                      .card-title {
                        font-family: 'Playfair Display', Georgia, serif;
                        font-weight: 900;
                        font-style: italic;
                      }
                      .card-tag {
                        font-family: 'Outfit', sans-serif;
                        font-weight: 800;
                        text-transform: uppercase;
                      }
                      .card-body {
                        font-family: 'Outfit', sans-serif;
                        font-weight: 400;
                      }
                      .card-roast-title {
                        font-family: 'Outfit', sans-serif;
                        font-weight: 800;
                      }
                      .card-roast-text {
                        font-family: 'Caveat', cursive;
                        font-weight: 700;
                      }
                      .card-meta {
                        font-family: 'Courier Prime', 'Courier New', monospace;
                      }
                    `}
                  </style>
                  {/* Card Shadow Filter */}
                  <filter id="card-shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#000000" flood-opacity="0.06" />
                    <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.04" />
                  </filter>
                </defs>

                {/* Background polka dots / sparkles */}
                <circle cx="40" cy="50" r="2.5" fill={activeTheme.accent} opacity="0.3" />
                <circle cx="280" cy="80" r="3.5" fill={activeTheme.accent} opacity="0.25" />
                <circle cx="60" cy="380" r="2.5" fill={activeTheme.accent} opacity="0.3" />
                <circle cx="260" cy="400" r="4.5" fill={activeTheme.accent} opacity="0.2" />
                
                {/* Heart decoration top right */}
                <path d="M280,30 C283,26 290,26 290,32 C290,37 280,44 280,44 C280,44 270,37 270,32 C270,26 277,26 280,30 Z" fill={activeTheme.accent} opacity="0.4" />
                {/* Heart decoration bottom left */}
                <path d="M40,410 C43,406 50,406 50,412 C50,417 40,424 40,424 C40,424 30,417 30,412 C30,406 37,406 40,410 Z" fill={activeTheme.accent} opacity="0.35" />

                {/* Card Container Group with drop shadow */}
                <g filter="url(#card-shadow)">
                  {/* White background middle block */}
                  <rect x="36" y="36" width="248" height="378" fill="white" />

                  {/* Top Jagged Edge */}
                  <svg 
                    x="32" 
                    y="20" 
                    width="256" 
                    height="16" 
                    viewBox="0 0 100 16" 
                    preserveAspectRatio="none"
                  >
                    <path d="M 0,16 L 0,10 C 0.6,8.5 1.1,9.2 1.7,9.0 C 2.2,9.4 2.8,9.3 3.3,9.7 C 3.9,11.2 4.5,11.6 5.0,11.9 C 5.6,12.5 6.1,12.9 6.7,12.5 C 7.2,10.9 7.8,11.6 8.3,11.0 C 8.9,13.2 9.4,13.1 10.0,13.1 C 10.6,11.3 11.1,12.5 11.7,11.8 C 12.2,12.1 12.8,11.7 13.3,11.7 C 13.9,14.4 14.4,14.3 15.0,14.0 C 15.6,14.6 16.1,14.3 16.7,14.0 C 17.2,11.5 17.8,12.4 18.3,12.1 C 18.9,11.9 19.4,12.0 20.0,12.3 C 20.6,12.8 21.1,12.5 21.7,12.8 C 22.2,11.0 22.8,10.5 23.3,11.2 C 23.9,11.4 24.4,10.9 25.0,11.0 C 25.6,11.0 26.1,11.0 26.7,10.3 C 27.2,10.2 27.8,9.9 28.3,10.3 C 28.9,8.7 29.4,8.3 30.0,8.1 C 30.6,9.0 31.1,9.5 31.7,9.5 C 32.2,7.7 32.8,8.7 33.3,8.0 C 33.9,6.7 34.5,6.1 35.0,6.5 C 35.6,6.4 36.1,6.6 36.7,6.7 C 37.2,6.0 37.8,5.8 38.3,5.6 C 38.9,7.9 39.5,7.7 40.0,8.3 C 40.6,6.1 41.1,6.1 41.7,5.7 C 42.2,9.8 42.8,10.0 43.3,9.4 C 43.9,9.4 44.5,10.1 45.0,9.9 C 45.6,9.9 46.1,11.1 46.7,10.5 C 47.2,11.3 47.8,11.1 48.3,10.5 C 48.9,10.0 49.5,10.9 50.0,10.4 C 50.6,10.4 51.1,9.7 51.7,10.4 C 52.2,11.8 52.8,11.4 53.3,12.0 C 53.9,12.1 54.5,13.4 55.0,12.7 C 55.6,11.8 56.1,11.5 56.7,11.9 C 57.2,11.9 57.8,12.2 58.3,12.4 C 58.9,11.2 59.5,11.7 60.0,11.8 C 60.6,13.4 61.1,13.7 61.7,14.0 C 62.2,12.7 62.8,12.8 63.3,13.1 C 63.9,13.5 64.5,13.0 65.0,13.2 C 65.6,12.8 66.1,13.1 66.7,13.3 C 67.2,12.0 67.8,11.8 68.3,12.4 C 68.9,11.5 69.5,12.1 70.0,11.6 C 70.6,11.1 71.1,10.8 71.7,10.6 C 72.2,10.7 72.8,10.8 73.3,10.7 C 73.9,11.5 74.5,12.0 75.0,11.3 C 75.6,9.2 76.1,8.6 76.7,8.7 C 77.2,7.0 77.8,7.7 78.3,7.4 C 78.9,6.5 79.5,6.6 80.0,6.9 C 80.6,8.5 81.1,9.1 81.7,9.0 C 82.2,5.5 82.8,5.7 83.3,6.3 C 83.9,8.0 84.5,8.0 85.0,8.3 C 85.6,6.4 86.1,7.3 86.7,6.7 C 87.2,7.7 87.8,7.8 88.3,7.1 C 88.9,8.0 89.5,7.6 90.0,7.7 C 90.6,7.9 91.1,7.9 91.7,8.5 C 92.2,6.4 92.8,6.0 93.3,6.2 C 93.9,10.2 94.5,9.6 95.0,9.5 C 95.6,8.1 96.1,7.0 96.7,7.5 C 97.2,10.7 97.8,10.3 98.3,10.4 C 98.9,11.8 99.5,11.0 100.0,11.2 L 100,16 Z" fill="white" />
                    <path d="M 0,16 L 0,10 C 0.6,8.5 1.1,9.2 1.7,9.0 C 2.2,9.4 2.8,9.3 3.3,9.7 C 3.9,11.2 4.5,11.6 5.0,11.9 C 5.6,12.5 6.1,12.9 6.7,12.5 C 7.2,10.9 7.8,11.6 8.3,11.0 C 8.9,13.2 9.4,13.1 10.0,13.1 C 10.6,11.3 11.1,12.5 11.7,11.8 C 12.2,12.1 12.8,11.7 13.3,11.7 C 13.9,14.4 14.4,14.3 15.0,14.0 C 15.6,14.6 16.1,14.3 16.7,14.0 C 17.2,11.5 17.8,12.4 18.3,12.1 C 18.9,11.9 19.4,12.0 20.0,12.3 C 20.6,12.8 21.1,12.5 21.7,12.8 C 22.2,11.0 22.8,10.5 23.3,11.2 C 23.9,11.4 24.4,10.9 25.0,11.0 C 25.6,11.0 26.1,11.0 26.7,10.3 C 27.2,10.2 27.8,9.9 28.3,10.3 C 28.9,8.7 29.4,8.3 30.0,8.1 C 30.6,9.0 31.1,9.5 31.7,9.5 C 32.2,7.7 32.8,8.7 33.3,8.0 C 33.9,6.7 34.5,6.1 35.0,6.5 C 35.6,6.4 36.1,6.6 36.7,6.7 C 37.2,6.0 37.8,5.8 38.3,5.6 C 38.9,7.9 39.5,7.7 40.0,8.3 C 40.6,6.1 41.1,6.1 41.7,5.7 C 42.2,9.8 42.8,10.0 43.3,9.4 C 43.9,9.4 44.5,10.1 45.0,9.9 C 45.6,9.9 46.1,11.1 46.7,10.5 C 47.2,11.3 47.8,11.1 48.3,10.5 C 48.9,10.0 49.5,10.9 50.0,10.4 C 50.6,10.4 51.1,9.7 51.7,10.4 C 52.2,11.8 52.8,11.4 53.3,12.0 C 53.9,12.1 54.5,13.4 55.0,12.7 C 55.6,11.8 56.1,11.5 56.7,11.9 C 57.2,11.9 57.8,12.2 58.3,12.4 C 58.9,11.2 59.5,11.7 60.0,11.8 C 60.6,13.4 61.1,13.7 61.7,14.0 C 62.2,12.7 62.8,12.8 63.3,13.1 C 63.9,13.5 64.5,13.0 65.0,13.2 C 65.6,12.8 66.1,13.1 66.7,13.3 C 67.2,12.0 67.8,11.8 68.3,12.4 C 68.9,11.5 69.5,12.1 70.0,11.6 C 70.6,11.1 71.1,10.8 71.7,10.6 C 72.2,10.7 72.8,10.8 73.3,10.7 C 73.9,11.5 74.5,12.0 75.0,11.3 C 75.6,9.2 76.1,8.6 76.7,8.7 C 77.2,7.0 77.8,7.7 78.3,7.4 C 78.9,6.5 79.5,6.6 80.0,6.9 C 80.6,8.5 81.1,9.1 81.7,9.0 C 82.2,5.5 82.8,5.7 83.3,6.3 C 83.9,8.0 84.5,8.0 85.0,8.3 C 85.6,6.4 86.1,7.3 86.7,6.7 C 87.2,7.7 87.8,7.8 88.3,7.1 C 88.9,8.0 89.5,7.6 90.0,7.7 C 90.6,7.9 91.1,7.9 91.7,8.5 C 92.2,6.4 92.8,6.0 93.3,6.2 C 93.9,10.2 94.5,9.6 95.0,9.5 C 95.6,8.1 96.1,7.0 96.7,7.5 C 97.2,10.7 97.8,10.3 98.3,10.4 C 98.9,11.8 99.5,11.0 100.0,11.2" fill="none" stroke="#C8B195" strokeWidth="0.6" opacity="0.4" />
                  </svg>

                  {/* Bottom Jagged Edge */}
                  <svg 
                    x="32" 
                    y="414" 
                    width="256" 
                    height="16" 
                    viewBox="0 0 100 16" 
                    preserveAspectRatio="none"
                  >
                    <path d="M 0,0 L 0,6 C 0.6,5.4 1.1,5.9 1.7,5.4 C 2.2,9.3 2.8,9.2 3.3,8.7 C 3.9,8.8 4.5,8.7 5.0,8.6 C 5.6,7.7 6.1,7.4 6.7,7.0 C 7.2,10.9 7.8,11.0 8.3,10.3 C 8.9,8.7 9.4,9.6 10.0,9.0 C 10.6,9.6 11.1,9.3 11.7,9.3 C 12.2,10.4 12.8,10.9 13.3,10.4 C 13.9,8.3 14.4,9.3 15.0,8.6 C 15.6,8.2 16.1,9.4 16.7,8.7 C 17.2,7.2 17.8,8.6 18.3,7.9 C 18.9,7.7 19.4,7.2 20.0,7.3 C 20.6,6.2 21.1,6.8 21.7,6.2 C 22.2,6.7 22.8,7.3 23.3,6.9 C 23.9,7.8 24.4,8.2 25.0,7.7 C 25.6,5.4 26.1,4.9 26.7,5.5 C 27.2,5.9 27.8,5.5 28.3,5.8 C 28.9,4.4 29.4,4.9 30.0,4.7 C 30.6,4.0 31.1,4.1 31.7,3.5 C 32.2,5.1 32.8,4.4 33.3,5.0 C 33.9,4.0 34.5,3.1 35.0,3.5 C 35.6,1.7 36.1,2.6 36.7,2.1 C 37.2,2.2 37.8,3.0 38.3,2.8 C 38.9,1.9 39.5,2.7 40.0,2.5 C 40.6,1.4 41.1,2.3 41.7,2.0 C 42.2,2.9 42.8,2.5 43.3,2.3 C 43.9,4.9 44.5,5.4 45.0,5.5 C 45.6,5.1 46.1,5.4 46.7,5.2 C 47.2,7.1 47.8,7.0 48.3,6.5 C 48.9,8.1 49.5,7.4 50.0,7.4 C 50.6,5.6 51.1,5.6 51.7,5.6 C 52.2,6.6 52.8,5.8 53.3,6.0 C 53.9,7.3 54.5,7.5 55.0,7.9 C 55.6,6.5 56.1,7.0 56.7,7.1 C 57.2,7.0 57.8,7.0 58.3,7.6 C 58.9,9.0 59.5,7.7 60.0,8.3 C 60.6,7.1 61.1,7.5 61.7,7.5 C 62.2,10.8 62.8,9.7 63.3,10.2 C 63.9,7.5 64.5,8.3 65.0,8.0 C 65.6,7.6 66.1,6.9 66.7,7.1 C 67.2,9.7 67.8,9.1 68.3,9.4 C 68.9,8.7 69.5,8.5 70.0,8.9 C 70.6,9.1 71.1,8.0 71.7,8.7 C 72.2,6.9 72.8,6.6 73.3,6.4 C 73.9,7.9 74.5,6.6 75.0,7.2 C 75.6,5.1 76.1,6.3 76.7,5.6 C 77.2,4.6 77.8,4.9 78.3,5.0 C 78.9,4.5 79.5,5.3 80.0,4.6 C 80.6,2.6 81.1,3.4 81.7,3.0 C 82.2,1.3 82.8,2.5 83.3,2.0 C 83.9,1.8 84.5,1.8 85.0,2.0 C 85.6,3.5 86.1,3.9 86.7,4.2 C 87.2,2.3 87.8,2.9 88.3,2.3 C 88.9,3.8 89.5,4.2 90.0,4.4 C 90.6,2.7 91.1,3.9 91.7,3.3 C 92.2,5.1 92.8,5.7 93.3,5.5 C 93.9,2.8 94.5,3.0 95.0,2.9 C 95.6,2.9 96.1,3.7 96.7,3.2 C 97.2,3.9 97.8,3.6 98.3,4.0 C 98.9,7.6 99.5,6.2 100.0,6.9 L 100,0 Z" fill="white" />
                    <path d="M 0,0 L 0,6 C 0.6,5.4 1.1,5.9 1.7,5.4 C 2.2,9.3 2.8,9.2 3.3,8.7 C 3.9,8.8 4.5,8.7 5.0,8.6 C 5.6,7.7 6.1,7.4 6.7,7.0 C 7.2,10.9 7.8,11.0 8.3,10.3 C 8.9,8.7 9.4,9.6 10.0,9.0 C 10.6,9.6 11.1,9.3 11.7,9.3 C 12.2,10.4 12.8,10.9 13.3,10.4 C 13.9,8.3 14.4,9.3 15.0,8.6 C 15.6,8.2 16.1,9.4 16.7,8.7 C 17.2,7.2 17.8,8.6 18.3,7.9 C 18.9,7.7 19.4,7.2 20.0,7.3 C 20.6,6.2 21.1,6.8 21.7,6.2 C 22.2,6.7 22.8,7.3 23.3,6.9 C 23.9,7.8 24.4,8.2 25.0,7.7 C 25.6,5.4 26.1,4.9 26.7,5.5 C 27.2,5.9 27.8,5.5 28.3,5.8 C 28.9,4.4 29.4,4.9 30.0,4.7 C 30.6,4.0 31.1,4.1 31.7,3.5 C 32.2,5.1 32.8,4.4 33.3,5.0 C 33.9,4.0 34.5,3.1 35.0,3.5 C 35.6,1.7 36.1,2.6 36.7,2.1 C 37.2,2.2 37.8,3.0 38.3,2.8 C 38.9,1.9 39.5,2.7 40.0,2.5 C 40.6,1.4 41.1,2.3 41.7,2.0 C 42.2,2.9 42.8,2.5 43.3,2.3 C 43.9,4.9 44.5,5.4 45.0,5.5 C 45.6,5.1 46.1,5.4 46.7,5.2 C 47.2,7.1 47.8,7.0 48.3,6.5 C 48.9,8.1 49.5,7.4 50.0,7.4 C 50.6,5.6 51.1,5.6 51.7,5.6 C 52.2,6.6 52.8,5.8 53.3,6.0 C 53.9,7.3 54.5,7.5 55.0,7.9 C 55.6,6.5 56.1,7.0 56.7,7.1 C 57.2,7.0 57.8,7.0 58.3,7.6 C 58.9,9.0 59.5,7.7 60.0,8.3 C 60.6,7.1 61.1,7.5 61.7,7.5 C 62.2,10.8 62.8,9.7 63.3,10.2 C 63.9,7.5 64.5,8.3 65.0,8.0 C 65.6,7.6 66.1,6.9 66.7,7.1 C 67.2,9.7 67.8,9.1 68.3,9.4 C 68.9,8.7 69.5,8.5 70.0,8.9 C 70.6,9.1 71.1,8.0 71.7,8.7 C 72.2,6.9 72.8,6.6 73.3,6.4 C 73.9,7.9 74.5,6.6 75.0,7.2 C 75.6,5.1 76.1,6.3 76.7,5.6 C 77.2,4.6 77.8,4.9 78.3,5.0 C 78.9,4.5 79.5,5.3 80.0,4.6 C 80.6,2.6 81.1,3.4 81.7,3.0 C 82.2,1.3 82.8,2.5 83.3,2.0 C 83.9,1.8 84.5,1.8 85.0,2.0 C 85.6,3.5 86.1,3.9 86.7,4.2 C 87.2,2.3 87.8,2.9 88.3,2.3 C 88.9,3.8 89.5,4.2 90.0,4.4 C 90.6,2.7 91.1,3.9 91.7,3.3 C 92.2,5.1 92.8,5.7 93.3,5.5 C 93.9,2.8 94.5,3.0 95.0,2.9 C 95.6,2.9 96.1,3.7 96.7,3.2 C 97.2,3.9 97.8,3.6 98.3,4.0 C 98.9,7.6 99.5,6.2 100.0,6.9" fill="none" stroke="#C8B195" strokeWidth="0.6" opacity="0.4" />
                  </svg>

                  {/* Left Jagged Edge */}
                  <svg 
                    x="20" 
                    y="32" 
                    width="16" 
                    height="386" 
                    viewBox="0 0 16 100" 
                    preserveAspectRatio="none"
                  >
                    <path d="M 16,0 L 16,100 L 10,100 C 8.5,99.4 9.2,98.9 9.0,98.3 C 9.4,97.8 9.3,97.2 9.7,96.7 C 11.2,96.1 11.6,95.5 11.9,95.0 C 12.5,94.4 12.9,93.9 12.5,93.3 C 10.9,92.8 11.6,92.2 11.0,91.7 C 13.2,91.1 13.1,90.6 13.1,90.0 C 11.3,89.4 12.5,88.9 11.8,88.3 C 12.1,87.8 11.7,87.2 11.7,86.7 C 14.4,86.1 14.3,85.6 14.0,85.0 C 14.6,84.4 14.3,83.9 14.0,83.3 C 11.5,82.8 12.4,82.2 12.1,81.7 C 11.9,81.1 12.0,80.6 12.3,80.0 C 12.8,79.4 12.5,78.9 12.8,78.3 C 11.0,77.8 10.5,77.2 11.2,76.7 C 11.4,76.1 10.9,75.6 11.0,75.0 C 11.0,74.4 11.0,73.9 10.3,73.3 C 10.2,72.8 9.9,72.2 10.3,71.7 C 8.7,71.1 8.3,70.6 8.1,70.0 C 9.0,69.4 9.5,68.9 9.5,68.3 C 7.7,67.8 8.7,67.2 8.0,66.7 C 6.7,66.1 6.1,65.5 6.5,65.0 C 6.4,64.4 6.6,63.9 6.7,63.3 C 6.0,62.8 5.8,62.2 5.6,61.7 C 7.9,61.1 7.7,60.6 8.3,60.0 C 6.1,59.4 6.1,58.9 5.7,58.3 C 9.8,57.8 10.0,57.2 9.4,56.7 C 9.4,56.1 10.1,55.6 9.9,55.0 C 9.9,54.4 11.1,53.9 10.5,53.3 C 11.3,52.8 11.1,52.2 10.5,51.7 C 10.0,51.1 10.9,50.6 10.4,50.0 C 10.4,49.4 9.7,48.9 10.4,48.3 C 11.8,47.8 11.4,47.2 12.0,46.7 C 12.1,46.1 13.4,45.6 12.7,45.0 C 11.8,44.4 11.5,43.9 11.9,43.3 C 11.9,42.8 12.2,42.2 12.4,41.7 C 11.2,41.1 11.7,40.6 11.8,40.0 C 13.4,39.4 13.7,38.9 14.0,38.3 C 12.7,37.8 12.8,37.2 13.1,36.7 C 13.5,36.1 13.0,35.6 13.2,35.0 C 12.8,34.4 13.1,33.9 13.3,33.3 C 12.0,32.8 11.8,32.2 12.4,31.7 C 11.5,31.1 12.1,30.6 11.6,30.0 C 11.1,29.4 10.8,28.9 10.6,28.3 C 10.7,27.8 10.8,27.2 10.7,26.7 C 11.5,26.1 12.0,25.6 11.3,25.0 C 9.2,24.4 8.6,23.9 8.7,23.3 C 7.0,22.8 7.7,22.2 7.4,21.7 C 6.5,21.1 6.6,20.6 6.9,20.0 C 8.5,19.4 9.1,18.9 9.0,18.3 C 5.5,17.8 5.7,17.2 6.3,16.7 C 8.0,16.1 8.0,15.6 8.3,15.0 C 6.4,14.4 7.3,13.9 6.7,13.3 C 7.7,12.8 7.8,12.2 7.1,11.7 C 8.0,11.1 7.6,10.6 7.7,10.0 C 7.9,9.4 7.9,8.9 8.5,8.3 C 6.4,7.8 6.0,7.2 6.2,6.7 C 10.2,6.1 9.6,5.6 9.5,5.0 C 8.1,4.4 7.0,3.9 7.5,3.3 C 10.7,2.8 10.3,2.2 10.4,1.7 C 11.8,1.1 11.0,0.6 11.2,0 Z" fill="white" />
                    <path d="M 10,100 C 8.5,99.4 9.2,98.9 9.0,98.3 C 9.4,97.8 9.3,97.2 9.7,96.7 C 11.2,96.1 11.6,95.5 11.9,95.0 C 12.5,94.4 12.9,93.9 12.5,93.3 C 10.9,92.8 11.6,92.2 11.0,91.7 C 13.2,91.1 13.1,90.6 13.1,90.0 C 11.3,89.4 12.5,88.9 11.8,88.3 C 12.1,87.8 11.7,87.2 11.7,86.7 C 14.4,86.1 14.3,85.6 14.0,85.0 C 14.6,84.4 14.3,83.9 14.0,83.3 C 11.5,82.8 12.4,82.2 12.1,81.7 C 11.9,81.1 12.0,80.6 12.3,80.0 C 12.8,79.4 12.5,78.9 12.8,78.3 C 11.0,77.8 10.5,77.2 11.2,76.7 C 11.4,76.1 10.9,75.6 11.0,75.0 C 11.0,74.4 11.0,73.9 10.3,73.3 C 10.2,72.8 9.9,72.2 10.3,71.7 C 8.7,71.1 8.3,70.6 8.1,70.0 C 9.0,69.4 9.5,68.9 9.5,68.3 C 7.7,67.8 8.7,67.2 8.0,66.7 C 6.7,66.1 6.1,65.5 6.5,65.0 C 6.4,64.4 6.6,63.9 6.7,63.3 C 6.0,62.8 5.8,62.2 5.6,61.7 C 7.9,61.1 7.7,60.6 8.3,60.0 C 6.1,59.4 6.1,58.9 5.7,58.3 C 9.8,57.8 10.0,57.2 9.4,56.7 C 9.4,56.1 10.1,55.6 9.9,55.0 C 9.9,54.4 11.1,53.9 10.5,53.3 C 11.3,52.8 11.1,52.2 10.5,51.7 C 10.0,51.1 10.9,50.6 10.4,50.0 C 10.4,49.4 9.7,48.9 10.4,48.3 C 11.8,47.8 11.4,47.2 12.0,46.7 C 12.1,46.1 13.4,45.6 12.7,45.0 C 11.8,44.4 11.5,43.9 11.9,43.3 C 11.9,42.8 12.2,42.2 12.4,41.7 C 11.2,41.1 11.7,40.6 11.8,40.0 C 13.4,39.4 13.7,38.9 14.0,38.3 C 12.7,37.8 12.8,37.2 13.1,36.7 C 13.5,36.1 13.0,35.6 13.2,35.0 C 12.8,34.4 13.1,33.9 13.3,33.3 C 12.0,32.8 11.8,32.2 12.4,31.7 C 11.5,31.1 12.1,30.6 11.6,30.0 C 11.1,29.4 10.8,28.9 10.6,28.3 C 10.7,27.8 10.8,27.2 10.7,26.7 C 11.5,26.1 12.0,25.6 11.3,25.0 C 9.2,24.4 8.6,23.9 8.7,23.3 C 7.0,22.8 7.7,22.2 7.4,21.7 C 6.5,21.1 6.6,20.6 6.9,20.0 C 8.5,19.4 9.1,18.9 9.0,18.3 C 5.5,17.8 5.7,17.2 6.3,16.7 C 8.0,16.1 8.0,15.6 8.3,15.0 C 6.4,14.4 7.3,13.9 6.7,13.3 C 7.7,12.8 7.8,12.2 7.1,11.7 C 8.0,11.1 7.6,10.6 7.7,10.0 C 7.9,9.4 7.9,8.9 8.5,8.3 C 6.4,7.8 6.0,7.2 6.2,6.7 C 10.2,6.1 9.6,5.6 9.5,5.0 C 8.1,4.4 7.0,3.9 7.5,3.3 C 10.7,2.8 10.3,2.2 10.4,1.7 C 11.8,1.1 11.0,0.6 11.2,0" fill="none" stroke="#C8B195" strokeWidth="0.6" opacity="0.4" />
                  </svg>

                  {/* Right Jagged Edge */}
                  <svg 
                    x="284" 
                    y="32" 
                    width="16" 
                    height="386" 
                    viewBox="0 0 16 100" 
                    preserveAspectRatio="none"
                  >
                    <g transform="matrix(-1 0 0 1 16 0)">
                      <path d="M 16,0 L 16,100 L 10,100 C 8.5,99.4 9.2,98.9 9.0,98.3 C 9.4,97.8 9.3,97.2 9.7,96.7 C 11.2,96.1 11.6,95.5 11.9,95.0 C 12.5,94.4 12.9,93.9 12.5,93.3 C 10.9,92.8 11.6,92.2 11.0,91.7 C 13.2,91.1 13.1,90.6 13.1,90.0 C 11.3,89.4 12.5,88.9 11.8,88.3 C 12.1,87.8 11.7,87.2 11.7,86.7 C 14.4,86.1 14.3,85.6 14.0,85.0 C 14.6,84.4 14.3,83.9 14.0,83.3 C 11.5,82.8 12.4,82.2 12.1,81.7 C 11.9,81.1 12.0,80.6 12.3,80.0 C 12.8,79.4 12.5,78.9 12.8,78.3 C 11.0,77.8 10.5,77.2 11.2,76.7 C 11.4,76.1 10.9,75.6 11.0,75.0 C 11.0,74.4 11.0,73.9 10.3,73.3 C 10.2,72.8 9.9,72.2 10.3,71.7 C 8.7,71.1 8.3,70.6 8.1,70.0 C 9.0,69.4 9.5,68.9 9.5,68.3 C 7.7,67.8 8.7,67.2 8.0,66.7 C 6.7,66.1 6.1,65.5 6.5,65.0 C 6.4,64.4 6.6,63.9 6.7,63.3 C 6.0,62.8 5.8,62.2 5.6,61.7 C 7.9,61.1 7.7,60.6 8.3,60.0 C 6.1,59.4 6.1,58.9 5.7,58.3 C 9.8,57.8 10.0,57.2 9.4,56.7 C 9.4,56.1 10.1,55.6 9.9,55.0 C 9.9,54.4 11.1,53.9 10.5,53.3 C 11.3,52.8 11.1,52.2 10.5,51.7 C 10.0,51.1 10.9,50.6 10.4,50.0 C 10.4,49.4 9.7,48.9 10.4,48.3 C 11.8,47.8 11.4,47.2 12.0,46.7 C 12.1,46.1 13.4,45.6 12.7,45.0 C 11.8,44.4 11.5,43.9 11.9,43.3 C 11.9,42.8 12.2,42.2 12.4,41.7 C 11.2,41.1 11.7,40.6 11.8,40.0 C 13.4,39.4 13.7,38.9 14.0,38.3 C 12.7,37.8 12.8,37.2 13.1,36.7 C 13.5,36.1 13.0,35.6 13.2,35.0 C 12.8,34.4 13.1,33.9 13.3,33.3 C 12.0,32.8 11.8,32.2 12.4,31.7 C 11.5,31.1 12.1,30.6 11.6,30.0 C 11.1,29.4 10.8,28.9 10.6,28.3 C 10.7,27.8 10.8,27.2 10.7,26.7 C 11.5,26.1 12.0,25.6 11.3,25.0 C 9.2,24.4 8.6,23.9 8.7,23.3 C 7.0,22.8 7.7,22.2 7.4,21.7 C 6.5,21.1 6.6,20.6 6.9,20.0 C 8.5,19.4 9.1,18.9 9.0,18.3 C 5.5,17.8 5.7,17.2 6.3,16.7 C 8.0,16.1 8.0,15.6 8.3,15.0 C 6.4,14.4 7.3,13.9 6.7,13.3 C 7.7,12.8 7.8,12.2 7.1,11.7 C 8.0,11.1 7.6,10.6 7.7,10.0 C 7.9,9.4 7.9,8.9 8.5,8.3 C 6.4,7.8 6.0,7.2 6.2,6.7 C 10.2,6.1 9.6,5.6 9.5,5.0 C 8.1,4.4 7.0,3.9 7.5,3.3 C 10.7,2.8 10.3,2.2 10.4,1.7 C 11.8,1.1 11.0,0.6 11.2,0 Z" fill="white" />
                      <path d="M 10,100 C 8.5,99.4 9.2,98.9 9.0,98.3 C 9.4,97.8 9.3,97.2 9.7,96.7 C 11.2,96.1 11.6,95.5 11.9,95.0 C 12.5,94.4 12.9,93.9 12.5,93.3 C 10.9,92.8 11.6,92.2 11.0,91.7 C 13.2,91.1 13.1,90.6 13.1,90.0 C 11.3,89.4 12.5,88.9 11.8,88.3 C 12.1,87.8 11.7,87.2 11.7,86.7 C 14.4,86.1 14.3,85.6 14.0,85.0 C 14.6,84.4 14.3,83.9 14.0,83.3 C 11.5,82.8 12.4,82.2 12.1,81.7 C 11.9,81.1 12.0,80.6 12.3,80.0 C 12.8,79.4 12.5,78.9 12.8,78.3 C 11.0,77.8 10.5,77.2 11.2,76.7 C 11.4,76.1 10.9,75.6 11.0,75.0 C 11.0,74.4 11.0,73.9 10.3,73.3 C 10.2,72.8 9.9,72.2 10.3,71.7 C 8.7,71.1 8.3,70.6 8.1,70.0 C 9.0,69.4 9.5,68.9 9.5,68.3 C 7.7,67.8 8.7,67.2 8.0,66.7 C 6.7,66.1 6.1,65.5 6.5,65.0 C 6.4,64.4 6.6,63.9 6.7,63.3 C 6.0,62.8 5.8,62.2 5.6,61.7 C 7.9,61.1 7.7,60.6 8.3,60.0 C 6.1,59.4 6.1,58.9 5.7,58.3 C 9.8,57.8 10.0,57.2 9.4,56.7 C 9.4,56.1 10.1,55.6 9.9,55.0 C 9.9,54.4 11.1,53.9 10.5,53.3 C 11.3,52.8 11.1,52.2 10.5,51.7 C 10.0,51.1 10.9,50.6 10.4,50.0 C 10.4,49.4 9.7,48.9 10.4,48.3 C 11.8,47.8 11.4,47.2 12.0,46.7 C 12.1,46.1 13.4,45.6 12.7,45.0 C 11.8,44.4 11.5,43.9 11.9,43.3 C 11.9,42.8 12.2,42.2 12.4,41.7 C 11.2,41.1 11.7,40.6 11.8,40.0 C 13.4,39.4 13.7,38.9 14.0,38.3 C 12.7,37.8 12.8,37.2 13.1,36.7 C 13.5,36.1 13.0,35.6 13.2,35.0 C 12.8,34.4 13.1,33.9 13.3,33.3 C 12.0,32.8 11.8,32.2 12.4,31.7 C 11.5,31.1 12.1,30.6 11.6,30.0 C 11.1,29.4 10.8,28.9 10.6,28.3 C 10.7,27.8 10.8,27.2 10.7,26.7 C 11.5,26.1 12.0,25.6 11.3,25.0 C 9.2,24.4 8.6,23.9 8.7,23.3 C 7.0,22.8 7.7,22.2 7.4,21.7 C 6.5,21.1 6.6,20.6 6.9,20.0 C 8.5,19.4 9.1,18.9 9.0,18.3 C 5.5,17.8 5.7,17.2 6.3,16.7 C 8.0,16.1 8.0,15.6 8.3,15.0 C 6.4,14.4 7.3,13.9 6.7,13.3 C 7.7,12.8 7.8,12.2 7.1,11.7 C 8.0,11.1 7.6,10.6 7.7,10.0 C 7.9,9.4 7.9,8.9 8.5,8.3 C 6.4,7.8 6.0,7.2 6.2,6.7 C 10.2,6.1 9.6,5.6 9.5,5.0 C 8.1,4.4 7.0,3.9 7.5,3.3 C 10.7,2.8 10.3,2.2 10.4,1.7 C 11.8,1.1 11.0,0.6 11.2,0 Z" fill="none" stroke="#C8B195" strokeWidth="0.6" opacity="0.4" />
                    </g>
                  </svg>
                </g>

                {/* Card Header Content */}
                {/* Card Title */}
                <text x="52" y="66" className="card-title" fontSize="15" fill="#1E293B">
                  CONFESSION #{confession.number}
                </text>
                
                {/* Category Pill Tag */}
                <rect x={tagX} y="52" width={tagWidth} height="17" rx="3" fill={tagColors.bg} />
                <text x={tagX + tagWidth / 2} y="64" textAnchor="middle" className="card-tag" fontSize="8" fill={tagColors.text}>
                  {confession.category}
                </text>

                {/* Circular Badge Sticker */}
                <g transform="rotate(6, 260, 60)">
                  <circle cx="260" cy="60" r="23" fill="#1C1A18" stroke="#FDA4AF" strokeWidth="0.6" opacity="0.95" />
                  <text x="260" y="47" textAnchor="middle" className="card-tag" fontSize="5" fill="#FDA4AF" letterSpacing="0.4">RIA</text>
                  <text x="260" y="53" textAnchor="middle" className="card-tag" fontSize="5" fill="#CBD5E1" letterSpacing="0.4">SECRET</text>
                  <text x="260" y="59" textAnchor="middle" className="card-tag" fontSize="4.5" fill="#94A3B8" letterSpacing="0.4">LEDGER</text>
                  <text x="260" y="72" textAnchor="middle" fontSize="9">👑</text>
                </g>

                {/* Header bottom separator line */}
                <line x1="36" y1="85" x2="284" y2="85" stroke="#C8B195" strokeOpacity="0.25" strokeWidth="1" />

                {/* Meta information row */}
                <text x="52" y="105" className="card-meta" fontSize="8.5" fill="#94A3B8">
                  📅 {confession.timeAgo}  •  🔥 {confession.flameScore} chaos score
                </text>

                {/* Confession Body Text */}
                <g id="confession-text-group">
                  {confessionLines.slice(0, 8).map((line, i) => (
                    <text
                      key={i}
                      x="52"
                      y={130 + i * 18}
                      className="card-body"
                      fontSize="12"
                      fill="#1E293B"
                    >
                      {line}
                    </text>
                  ))}
                </g>

                {/* Dotted separator */}
                <line x1="52" y1="285" x2="268" y2="285" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />

                {/* Rotated Pink Sticky Note for RIA'S ROAST */}
                <g transform="rotate(-2, 194, 344)">
                  {/* Sticky Note background */}
                  <rect x="114" y="305" width="160" height="78" fill="#FFE2E7" stroke="#FECDD3" strokeWidth="0.8" rx="1" />
                  
                  {/* Washi Tape */}
                  <rect x="162" y="296" width="48" height="12" fill="#FDA4AF" opacity="0.65" transform="rotate(4, 186, 302)" />

                  {/* RIA'S ROAST: label */}
                  <text x="124" y="322" className="card-roast-title" fontSize="7" fill="#F43F5E" letterSpacing="0.5">
                    RIA'S ROAST:
                  </text>

                  {/* Roast text */}
                  {roastLines.slice(0, 3).map((line, i) => (
                    <text
                      key={i}
                      x="124"
                      y={338 + i * 12}
                      className="card-roast-text"
                      fontSize="12"
                      fill="#E11D48"
                    >
                      {line}
                    </text>
                  ))}

                  {/* Heart outline doodle */}
                  <path 
                    d="M260,366 C261.5,364 265,364 265,367 C265,369.5 260,373 260,373 C260,373 255,369.5 255,367 C255,364 258.5,364 260,366 Z" 
                    fill="none" 
                    stroke="#FB7185" 
                    strokeWidth="0.8" 
                    opacity="0.8" 
                  />
                </g>

                {/* Card Footer Brand */}
                <text x="160" y="408" textAnchor="middle" className="card-title" fontSize="8" fill="#CBD5E1" letterSpacing="0.5">
                  ✦ RIA CONFESSION VAULT ✦
                </text>
              </svg>
            </div>
          </div>

          {/* Right Column: Controls (takes 6/12 cols) */}
          <div className="col-span-12 md:col-span-6 flex flex-col justify-between self-stretch gap-6 py-2">
            <div>
              <DialogHeader className="pb-3 border-b border-border/20">
                <DialogTitle className="font-heading text-2xl font-normal text-foreground flex items-center gap-1.5">
                  ✨ Generate Meme Card
                </DialogTitle>
                <DialogDescription className="font-body text-foreground/50 text-xs mt-1">
                  Save this legendary roast and share it with your frens!
                </DialogDescription>
              </DialogHeader>

              {/* Theme Selector */}
              <div className="mt-6 flex flex-col gap-3">
                <label className="font-heading font-extrabold text-[10px] uppercase tracking-wider text-foreground/60">
                  Select Theme 🎨
                </label>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(THEMES) as ThemeKey[]).map((themeKey) => (
                    <button
                      key={themeKey}
                      onClick={() => setSelectedTheme(themeKey)}
                      className={`flex items-center gap-1.5 text-[10px] font-heading uppercase tracking-wider px-3.5 py-2 rounded border transition-all ${
                        selectedTheme === themeKey
                          ? 'bg-primary text-primary-foreground border-primary font-medium'
                          : 'bg-white hover:bg-accent/15 text-foreground border-border/40'
                      }`}
                    >
                      <span>{THEMES[themeKey].emoji}</span>
                      <span>{THEMES[themeKey].name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-auto border-t border-border/20 pt-4">
              <button
                onClick={onClose}
                className="scrapbook-btn-secondary py-2.5 px-6 text-xs font-heading font-medium tracking-wide uppercase"
              >
                Cancel
              </button>
              <button
                onClick={handleDownload}
                className="scrapbook-btn-primary py-2.5 px-6 text-xs font-heading font-medium tracking-wide uppercase"
              >
                Download Card
              </button>
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
