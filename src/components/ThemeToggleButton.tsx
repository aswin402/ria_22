import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';

export function ThemeToggleButton() {
  const { theme, setTheme } = useThemeStore();

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else setTheme('light');
  };

  return (
    <button
      onClick={cycleTheme}
      title={`Current: ${theme} • Click to toggle`}
      className="h-10 w-10 rounded-full border-2 border-foreground bg-white dark:bg-card text-foreground flex items-center justify-center transition-all duration-150 hover:scale-105 hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_oklch(var(--foreground))] cursor-none"
    >
      <div className="relative h-5 w-5 flex items-center justify-center">
        {theme === 'light' ? (
          <Sun className="h-5 w-5 text-yellow-500 fill-yellow-200 animate-spin-slow" />
        ) : (
          <Moon className="h-5 w-5 text-indigo-400 fill-indigo-950" />
        )}
      </div>
      <span className="sr-only">Toggle theme</span>
      
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </button>
  );
}