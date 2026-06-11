import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Feed', path: '/feed' },
    { name: 'Leaderboard', path: '/leaderboard' },
    { name: 'Rewards', path: '/rewards' },
    { name: 'RIA Memory', path: '/memory' },
    { name: 'Day9', path: '/reveal' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 h-20 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-background/90 backdrop-blur-md border-b border-border/30 shadow-[0_4px_20px_rgba(62,56,48,0.12)]' 
        : 'bg-background/80 backdrop-blur-md border-b border-border/20 shadow-[0_4px_20px_rgba(62,56,48,0.06)]'
    }`}>
      <div className="max-w-7xl mx-auto w-full h-full flex items-center justify-between px-4 sm:px-6 xl:px-0">
        {/* CT Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group hover:scale-[1.01] transition-all select-none"
        >
          <svg width="46" height="46" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            {/* Circle with C cutout */}
            <circle cx="35" cy="50" r="30" fill="#EAA8B6" />
            <circle cx="35" cy="50" r="16" fill="#FAF7F0" className="transition-colors duration-300 group-hover:fill-white" />
            <rect x="45" y="32" width="25" height="36" fill="#FAF7F0" className="transition-colors duration-300 group-hover:fill-white" />
            {/* The Letter T next to it */}
            <rect x="70" y="20" width="10" height="60" fill="#EAA8B6" />
            <rect x="58" y="20" width="34" height="10" fill="#EAA8B6" />
          </svg>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-heading text-sm px-4 py-1.5 rounded-full transition-all tracking-wide ${
                isActive(link.path)
                  ? 'bg-[#FFE2E7] text-[#C38B8B] font-semibold border border-[#EAA8B6]/30 shadow-sm'
                  : 'text-[#C38B8B]/70 hover:text-[#C38B8B] hover:bg-[#FFE2E7]/20'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Link
            to="/confess"
            className="scrapbook-btn-primary py-2 px-6 text-xs sm:text-sm font-heading font-medium tracking-wider hidden sm:inline-flex rounded-full bg-gradient-to-r from-[#EAA8B6] to-[#C38B8B] text-white border-none shadow-sm hover:opacity-90 active:scale-95 transition-all"
          >
            CONFESS ✒️
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded hover:bg-[#FFE2E7]/40 text-[#C38B8B] transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-background border-b border-border/50 p-5 flex flex-col gap-3 shadow-md lg:hidden z-50 animate-sticker-pop">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`font-heading text-base px-4 py-2.5 rounded-full transition-all ${
                isActive(link.path)
                  ? 'bg-[#FFE2E7] text-[#C38B8B] font-semibold border border-[#EAA8B6]/30 pl-5'
                  : 'hover:bg-[#FFE2E7]/20 text-[#C38B8B]/80'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/confess"
            onClick={() => setMobileMenuOpen(false)}
            className="scrapbook-btn-primary py-2.5 w-full text-center mt-2 font-heading rounded-full bg-gradient-to-r from-[#EAA8B6] to-[#C38B8B] text-white border-none"
          >
            Confess Now! ✒️
          </Link>
        </div>
      )}
    </nav>
  );
}
