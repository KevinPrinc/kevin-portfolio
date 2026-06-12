import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Contact = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "30%"]);

  return (
    <section ref={ref} id="contact" className="bg-[#0a0a0a] w-full min-h-screen relative overflow-hidden flex items-end pt-32 pb-0 md:pb-0 border-t border-gray-900">
      {/* Huge Background Text */}
      <motion.div 
        style={{ y }}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0 pt-16 md:pt-12"
      >
        <h1 
          className="text-[25vw] leading-[0.75] font-black uppercase tracking-tighter select-none scale-y-[1.6] origin-top neon-text"
          style={{ fontFamily: "'Impact', 'Arial Black', sans-serif", color: '#1a6fff', opacity: 0.07 }}
        >
          Contact
        </h1>
      </motion.div>

      {/* Form Card Overlay */}
      <div className="relative z-10 w-full flex justify-end items-end">
        <div 
          data-aos="fade-up"
          className="w-full md:w-[85%] lg:w-[75%] p-8 md:p-16 flex flex-col justify-between"
          style={{
            background: 'linear-gradient(135deg, #03080f 0%, #050d1a 100%)',
            borderTop: '1px solid rgba(26,111,255,0.3)',
            borderLeft: '1px solid rgba(26,111,255,0.15)',
            boxShadow: '0 0 60px rgba(26,111,255,0.1), inset 0 1px 0 rgba(77,148,255,0.1)',
          }}
        >
          <div className="text-xs font-bold tracking-[0.2em] mb-12 md:mb-20 uppercase neon-text" style={{color: '#4d94ff'}}>
            Let's Connect
          </div>

          <form className="flex flex-col gap-12 md:gap-16 w-full">
            <div className="flex flex-col md:flex-row gap-12 md:gap-20 w-full">
              {/* Left Column */}
              <div className="flex-1 flex flex-col gap-10">
                {['First Name', 'Last Name', 'Email'].map((placeholder, i) => (
                  <div key={i} className="relative">
                    <input 
                      type={placeholder === 'Email' ? 'email' : 'text'}
                      placeholder={placeholder}
                      className="w-full bg-transparent border-b pb-3 text-lg focus:outline-none transition-colors font-medium rounded-none text-white"
                      style={{
                        borderColor: 'rgba(26,111,255,0.25)',
                        '::placeholder': {color: 'rgba(255,255,255,0.3)'}
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Right Column */}
              <div className="flex-1 flex flex-col">
                <div className="relative h-full flex flex-col">
                  <textarea 
                    placeholder="Type your message here" 
                    className="w-full h-full min-h-[120px] bg-transparent border-b pb-3 text-lg focus:outline-none transition-colors font-medium resize-none rounded-none text-white"
                    style={{borderColor: 'rgba(26,111,255,0.25)'}}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row gap-12 mt-4">
              {/* Left text */}
              <div className="flex-1 flex items-start gap-4 text-sm font-medium text-white/60">
                <input 
                  type="checkbox" 
                  id="permission" 
                  className="mt-1 w-4 h-4 rounded-sm cursor-pointer" 
                  style={{ accentColor: "#1a6fff" }}
                />
                <label htmlFor="permission" className="cursor-pointer max-w-[280px] leading-snug text-white/50">
                  I give permission to contact me at this email address.
                </label>
              </div>

              {/* Right text & button */}
              <div className="flex-1 flex flex-col gap-8 text-xs text-white/40 font-medium">
                <p className="leading-relaxed max-w-[400px]">
                  Reach me directly at <a href="mailto:ramakrishnankevin21@gmail.com" className="underline hover:text-white transition-colors font-bold neon-text" style={{color:'#4d94ff'}}>ramakrishnankevin21@gmail.com</a> — based in Pondicherry, open to remote work worldwide.
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
                  <p className="max-w-[250px] leading-relaxed text-white/30">
                    Response guaranteed within 24 hours.
                  </p>
                  
                  <button 
                    type="submit" 
                    className="px-8 py-3 rounded-full border font-bold flex items-center justify-center gap-3 transition-all duration-300 group whitespace-nowrap self-start sm:self-auto neon-border"
                    style={{borderColor: '#1a6fff', color: '#4d94ff'}}
                    onMouseEnter={e => { e.currentTarget.style.background = '#1a6fff'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.boxShadow = '0 0 24px rgba(26,111,255,0.5)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#4d94ff'; e.currentTarget.style.boxShadow = ''; }}
                  >
                    Send
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
