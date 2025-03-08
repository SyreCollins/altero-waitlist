
import React, { useRef, useEffect } from 'react';
import { useInView } from '@/utils/animation';

export default function AppShowcase() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const screensRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!screensRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!screensRef.current) return;
      
      const { left, width } = screensRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      
      const screens = screensRef.current.querySelectorAll('.app-screen');
      screens.forEach((screen, index) => {
        const element = screen as HTMLElement;
        element.style.transform = `translateX(${x * (index - 1) * 20}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <section
      ref={ref}
      className="py-24 px-6 bg-dark-950 relative overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-finance-600/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-finance-600/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto">
        <div 
          className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Experience the <span className="text-gradient">Interface</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Beautifully designed and intuitive, our app makes financial management a delightful experience.
          </p>
        </div>
        
        <div 
          ref={screensRef}
          className={`relative flex justify-center items-center gap-4 md:gap-8 py-10 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="app-screen relative rounded-[2rem] border-8 border-dark-800 overflow-hidden shadow-2xl transition-all duration-300 transform scale-75 md:scale-90 opacity-40 md:opacity-60">
            <img 
              src="https://i.ibb.co/1Gbt7mj/finance-screen1.png" 
              alt="Dashboard screen" 
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10"></div>
          </div>
          
          <div className="app-screen relative rounded-[2rem] border-8 border-dark-800 overflow-hidden shadow-2xl transition-all duration-300 transform scale-85 md:scale-100 z-10">
            <img 
              src="https://i.ibb.co/nLjdNnB/finance-garden-mockup.png" 
              alt="Main app screen" 
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10"></div>
          </div>
          
          <div className="app-screen relative rounded-[2rem] border-8 border-dark-800 overflow-hidden shadow-2xl transition-all duration-300 transform scale-75 md:scale-90 opacity-40 md:opacity-60">
            <img 
              src="https://i.ibb.co/vVg6XvM/finance-screen2.png" 
              alt="Stats screen" 
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10"></div>
          </div>
        </div>
        
        <div 
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 transition-all duration-700 delay-300 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="glass-card rounded-xl p-6 text-center">
            <p className="text-3xl font-bold text-finance-500 mb-2">100K+</p>
            <p className="text-gray-300 text-sm">Active Users</p>
          </div>
          
          <div className="glass-card rounded-xl p-6 text-center">
            <p className="text-3xl font-bold text-finance-500 mb-2">4.8/5</p>
            <p className="text-gray-300 text-sm">App Store Rating</p>
          </div>
          
          <div className="glass-card rounded-xl p-6 text-center">
            <p className="text-3xl font-bold text-finance-500 mb-2">$500M+</p>
            <p className="text-gray-300 text-sm">Finances Managed</p>
          </div>
        </div>
      </div>
    </section>
  );
}
