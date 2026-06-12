import React from 'react';
import kevinImage from '../assets/about/kevin.png';

const skills = [
  { name: 'React', color: '#61DAFB' },
  { name: 'Python', color: '#3776AB' },
  { name: 'JavaScript', color: '#F7DF1E' },
  { name: 'C / C++', color: '#00599C' },
  { name: 'Tailwind', color: '#06B6D4' },
  { name: 'AR / Snap', color: '#FFFC00' },
];

const About = () => {
  return (
    <section
      id="about"
      className="pt-20 pb-40 px-6 md:px-12 w-full relative overflow-hidden font-sans"
      style={{background: '#1a6fff'}}
    >
      {/* subtle animated bg tint overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 80% 20%, rgba(77,148,255,0.35) 0%, transparent 60%)',
          animation: 'bgGlowPulse 4s ease-in-out infinite',
        }}
      />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start relative z-10">
        
        {/* Left Side: ID Badge */}
        <div className="flex flex-col items-center w-full md:w-[350px] shrink-0 mt-12 md:mt-0">
          <div data-aos="drop-bounce" className="relative flex justify-center w-full">
            <div className="absolute -top-32 left-1/2 w-3 h-40 bg-black transform -translate-x-1/2 shadow-inner z-0"></div>
            <div className="absolute -top-6 left-1/2 w-6 h-12 bg-gray-300 rounded border border-gray-400 transform -translate-x-1/2 z-10 shadow-[0_2px_10px_rgba(0,0,0,0.3)]"></div>
            
            <div className="bg-gray-900 w-full max-w-[280px] rounded-2xl p-3 shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative z-20 transform -rotate-3 hover:rotate-0 transition-transform duration-500 neon-border" style={{border: '2px solid #1a6fff'}}>
              <div className="absolute -top-3 left-1/2 w-16 h-6 bg-gray-900 rounded-t-xl transform -translate-x-1/2 flex justify-center items-center">
                <div className="w-8 h-2 bg-black/30 rounded-full shadow-inner"></div>
              </div>
              <div className="w-full aspect-[3/4] overflow-hidden rounded-xl bg-gray-800 border-2 border-transparent">
                <img 
                  src={kevinImage} 
                  alt="Kevin Ramakrishnan M" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="mt-3 text-center pb-2">
                <p className="text-white font-black text-sm tracking-wide">KEVIN R. M.</p>
                <p className="neon-text text-xs font-bold tracking-widest uppercase" style={{color:'#4d94ff'}}>Developer & Innovator</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Info Content */}
        <div data-aos="fade-left" data-aos-delay="200" className="flex-1 text-white mt-8 md:mt-0 relative z-20">
          <h2 className="text-4xl md:text-5xl font-black text-black mb-4">Hello!</h2>
          <p className="text-lg font-bold mb-8 leading-relaxed max-w-3xl" style={{color: '#001a3a'}}>
            Hi, I'm <span className="text-black text-xl font-black mx-1 tracking-wide uppercase">Kevin Ramakrishnan M</span>, a final-year BTech student and passionate developer based in <span className="text-black font-black">Pondicherry, India</span>. I build intelligent digital solutions that blend web development, AI, augmented reality, and automation.
          </p>

          <p className="text-base font-medium mb-10 leading-relaxed max-w-3xl" style={{color: '#001f4d'}}>
            From building a Smart Wire Stripper that reached the <span className="font-bold text-black">Top 8 at Startup India</span>, to developing Snapchat AR lenses, dynamic websites for clients, and AI-powered applications — I turn ideas into real, impactful technology.
          </p>

          <div className="flex flex-wrap gap-3 mt-4">
            {skills.map((skill, i) => (
              <div 
                key={i}
                data-aos="zoom-in"
                data-aos-delay={200 + i * 100}
                className="px-4 py-2 rounded-full font-bold text-sm shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform duration-300 cursor-default"
                style={{background: '#000', color: skill.color, border: `1.5px solid ${skill.color}`}}
              >
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Torn paper divider */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-30 transform translate-y-1">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20 fill-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.62,189.5,99.8,242.79,81.82,282.88,63.6,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="absolute top-10 right-10 md:right-20 text-black opacity-20 animate-pulse">
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z"/></svg>
      </div>
      <div className="absolute bottom-32 left-4 md:left-20 text-black opacity-20 animate-pulse" style={{ animationDelay: '1s' }}>
        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z"/></svg>
      </div>
    </section>
  );
};

export default About;
