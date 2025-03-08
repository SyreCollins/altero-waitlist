
import React from 'react';
import { 
  Facebook, Twitter, Instagram, Linkedin, Github, 
  ArrowUp 
} from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <footer className="bg-dark-950 border-t border-white/5 pt-16 pb-8 px-6 relative">
      <div className="absolute bottom-full left-0 right-0 h-px bg-gradient-to-r from-transparent via-finance-600/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-5">
              <div className="h-10 w-10 bg-gradient-to-br from-finance-400 to-finance-600 rounded-xl flex items-center justify-center">
                <span className="font-bold text-white">FG</span>
              </div>
              <span className="text-white font-bold text-xl">FinanceGarden</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Helping you grow your financial future with powerful tools and expert insights.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Linkedin, href: '#' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="h-10 w-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-5">Product</h3>
            <ul className="space-y-3">
              {['Features', 'Pricing', 'Integrations', 'FAQ', 'Roadmap'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-all">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-5">Company</h3>
            <ul className="space-y-3">
              {['About Us', 'Careers', 'Blog', 'Press', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-all">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-5">Legal</h3>
            <ul className="space-y-3">
              {['Terms', 'Privacy', 'Cookies', 'Licenses', 'Settings'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-all">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} FinanceGarden. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="h-10 w-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all"
            >
              <ArrowUp size={18} />
            </button>
            
            <a 
              href="#" 
              className="text-gray-400 hover:text-white text-sm flex items-center gap-2 transition-all"
            >
              <Github size={16} />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
