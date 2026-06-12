import React, { useRef, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import heroVideo from '../assets/hero video/kevin_reel.mp4';

const Hero = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-out' });
    // Autoplay muted on load
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Video — autoplay, muted, looping */}
      <video
        ref={videoRef}
        loop
        muted
        autoPlay
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-10 bg-black/45" />

      {/* Subtle neon blue vignette bottom-left */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 15% 90%, rgba(26,111,255,0.12) 0%, transparent 55%)',
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 z-20 px-6 pb-20 md:pb-[8%] md:px-14 max-w-7xl mx-auto flex flex-col justify-end items-start text-left w-full">

        {/* Tag pill */}
        <div
          data-aos="fade-up"
          className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 backdrop-blur-md"
          style={{
            background: 'rgba(26,111,255,0.12)',
            border: '1px solid rgba(77,148,255,0.3)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full neon-bg"
            style={{ background: '#4d94ff' }}
          />
          <span
            className="text-[10px] font-black tracking-[0.2em] uppercase neon-text"
            style={{ color: '#80b3ff' }}
          >
            Available for freelance
          </span>
        </div>

        {/* Main Heading */}
        <h1
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-white text-4xl md:text-6xl lg:text-7xl font-black mb-5 tracking-tight leading-[1.05]"
        >
          Hi, I'm{' '}
          <span className="neon-text" style={{ color: '#4d94ff' }}>
            Kevin
          </span>
          <br />
          <span className="text-white/90">Developer &</span>
          <br />
          <span className="text-white/90">Innovator</span>
        </h1>

        {/* Subheading */}
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-white/70 text-sm md:text-lg font-medium mb-8 max-w-md leading-relaxed"
        >
          Building intelligent web experiences with React, AI, and Augmented
          Reality — from Pondicherry to the world.
        </p>

        {/* CTA Buttons */}
        <div
          data-aos="fade-up"
          data-aos-delay="350"
          className="flex flex-row flex-wrap items-center gap-3"
        >
          <a
            href="#projects"
            className="neon-bg px-6 py-2.5 text-sm md:text-base rounded-full font-bold transition-all duration-300 hover:scale-105 text-white"
            style={{ background: '#1a6fff' }}
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="neon-border px-6 py-2.5 text-sm md:text-base rounded-full bg-black/30 border font-bold hover:bg-black/50 transition-all duration-300 backdrop-blur-md"
            style={{ borderColor: '#1a6fff', color: '#4d94ff' }}
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        data-aos="fade-up"
        data-aos-delay="700"
        className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
      >
        <div className="animate-bounce">
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            viewBox="0 0 24 24"
            stroke="#4d94ff"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
