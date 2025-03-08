
import React, { useEffect, useRef } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { useInView } from '@/utils/animation';

export default function Hero() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const phoneRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!phoneRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!phoneRef.current) return;
      
      const { left, top, width, height } = phoneRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      phoneRef.current.style.transform = `
        perspective(1000px)
        rotateY(${x * 10}deg)
        rotateX(${-y * 10}deg)
        translateZ(20px)
      `;
    };
    
    const handleMouseLeave = () => {
      if (!phoneRef.current) return;
      
      phoneRef.current.style.transform = `
        perspective(1000px)
        rotateY(0deg)
        rotateX(0deg)
        translateZ(0)
      `;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    phoneRef.current.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (phoneRef.current) {
        phoneRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);
  
  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="shape-circle bg-finance-500/10 top-20 -left-48 animate-float"></div>
      <div className="shape-blob bg-finance-800/10 bottom-20 -right-48 w-96 h-96 animate-float animate-delay-500"></div>
      
      <div 
        className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center"
      >
        <div 
          className={`space-y-8 transition-all duration-700 delay-100 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-block">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs rounded-full bg-finance-500/10 text-finance-500 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-finance-500 animate-pulse"></span>
              Now available on iOS & Android
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Grow Your
            <span className="text-gradient block"> Financial Garden</span>
          </h1>
          
          <p className="text-lg text-gray-300 max-w-xl">
            Take control of your financial future with powerful tools for budgeting, investing, and wealth building all in one beautiful app.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#waitlist" 
              className="inline-flex items-center justify-center gap-2 bg-finance-600 hover:bg-finance-500 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105"
            >
              Join the Waitlist <ArrowRight size={18} />
            </a>
            
            <a 
              href="#features" 
              className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-white px-6 py-3 rounded-lg font-medium transition-all"
            >
              Explore Features <ArrowDown size={18} />
            </a>
          </div>
          
          <div className="flex items-center gap-8 pt-4">
            <a 
              href="#" 
              className="text-sm text-gray-400 hover:text-white flex items-center gap-2 transition-all"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                alt="App Store" 
                className="h-10"
              />
            </a>
            
            <a 
              href="#" 
              className="text-sm text-gray-400 hover:text-white flex items-center gap-2 transition-all"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Play Store" 
                className="h-10"
              />
            </a>
          </div>
        </div>
        
        <div 
          ref={phoneRef}
          className={`relative transition-all duration-1000 ease-out transform ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
          style={{ transformStyle: 'preserve-3d', transition: 'transform 0.3s ease-out' }}
        >
          <div className="relative z-10 mx-auto max-w-xs">
            <div className="relative rounded-[2.5rem] border-8 border-dark-800 overflow-hidden shadow-2xl">
              <img 
                src="https://i.ibb.co/nLjdNnB/finance-garden-mockup.png"
                alt="Finance Garden App" 
                className="w-full h-auto"
              />
              
              {/* Screen glare effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none"></div>
            </div>
            
            {/* Reflection */}
            <div className="absolute -bottom-10 left-0 right-0 h-20 bg-gradient-to-b from-finance-600/30 to-transparent blur-md mx-auto transform -scale-y-100 opacity-40 rounded-t-[2.5rem]"></div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute -right-12 top-20 glass-card p-3 rounded-lg shadow-xl transform rotate-6 animate-float animate-delay-200">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-finance-600 flex items-center justify-center text-white text-xs">+</div>
              <div>
                <p className="text-xs text-gray-300">Investment</p>
                <p className="text-sm font-semibold">+$1,240.50</p>
              </div>
            </div>
          </div>
          
          <div className="absolute -left-12 bottom-32 glass-card p-3 rounded-lg shadow-xl transform -rotate-3 animate-float animate-delay-500">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-finance-800 flex items-center justify-center text-white text-xs">%</div>
              <div>
                <p className="text-xs text-gray-300">Interest Rate</p>
                <p className="text-sm font-semibold">2.5% APY</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <a 
        href="#features" 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white opacity-60 hover:opacity-100 transition-opacity"
      >
        <ArrowDown size={24} />
      </a>
    </section>
  );
}
