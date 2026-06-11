export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[oklch(0.7196_0.1499_14.95)] text-white relative z-10 pt-20 pb-0 px-6 mt-16 overflow-hidden flex flex-col items-center justify-center text-center">
      {/* 1. Main script heading */}
      <h3 
        className="text-white text-5xl sm:text-6xl md:text-7xl font-normal tracking-wide my-4 select-none"
        style={{ fontFamily: "'Sacramento', cursive" }}
      >
        Thanks for stopping by!
      </h3>

      {/* 2. Copyright and attribution */}
      <p className="text-white/90 font-body text-xs sm:text-sm tracking-wide mt-2 mb-16">
        © {currentYear} Ria Confessions · Made with ❤ by{' '}
        <a 
          href="https://github.com/celestialabs" 
          target="_blank" 
          rel="noopener noreferrer"
          className="underline hover:text-white/80 transition-colors font-semibold"
        >
          Celestialabs
        </a>
      </p>

      {/* 3. Giant bottom title */}
      <div className="w-full select-none pointer-events-none translate-y-[25%] md:translate-y-[20%]">
        <h1 
          className="text-white font-heading font-extrabold text-[12vw] leading-none tracking-tight text-center whitespace-nowrap opacity-100"
          style={{ textShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
        >
          Ria Confessions
        </h1>
      </div>
    </footer>
  );
}
