import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#020508] text-[#d4d4d4] py-16 px-6 md:px-12 w-full font-mono text-[10px] md:text-xs tracking-widest flex flex-col justify-between min-h-[50vh]" style={{borderTop: '1px solid rgba(26,111,255,0.12)'}}>
      
      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full font-medium">
        <div className="flex flex-col gap-1">
          <p>Web Development & Design</p>
          <p>Augmented Reality (Snap Lens)</p>
          <p>AI & Automation Solutions</p>
        </div>
        
        <div className="flex flex-col gap-1 md:items-center">
          <p>Based in Pondicherry, India</p>
          <a href="#about" className="underline hover:text-white transition-colors mt-1 underline-offset-4 decoration-1 neon-text" style={{color: '#4d94ff'}}>View Work</a>
        </div>
        
        <div className="flex flex-col gap-1 md:items-end">
          <p>Remote — Worldwide Available</p>
          <p>{new Date().getFullYear()}</p>
        </div>
      </div>

      {/* Middle Huge Text */}
      <div className="w-full flex justify-center items-center py-20 md:py-24 overflow-hidden">
        <h2
          className="text-[18vw] md:text-[16vw] leading-none font-sans font-bold tracking-tighter lowercase select-none w-full text-center"
          style={{
            color: 'transparent',
            WebkitTextStroke: '1px rgba(26,111,255,0.25)',
            textShadow: '0 0 80px rgba(26,111,255,0.08)',
          }}
        >
          kevin
        </h2>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full items-end font-medium">
        <div className="flex flex-col gap-6">
          <a href="#contact" className="underline hover:text-white transition-colors underline-offset-4 decoration-1 font-bold neon-text" style={{color: '#4d94ff'}}>Contact</a>
          <p className="text-white/30 font-mono text-[9px] md:text-[10px]">
            &copy; {new Date().getFullYear()} Kevin Ramakrishnan M | Built with React
          </p>
        </div>
        
        <div className="flex flex-col gap-1 md:items-center">
          <a href="mailto:ramakrishnankevin21@gmail.com" className="hover:text-white transition-colors underline-offset-4 decoration-1 lowercase neon-text" style={{color: '#4d94ff', textDecoration: 'underline'}}>ramakrishnankevin21@gmail.com</a>
        </div>
        
        <div className="flex flex-col gap-1 md:items-end">
          <a href="https://github.com/KevinPrinc" className="underline hover:text-white transition-colors underline-offset-4 decoration-1 neon-text" style={{color: '#4d94ff'}}>GitHub</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
