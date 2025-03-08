
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Join Waitlist', href: '#waitlist' }
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled 
          ? "bg-dark-950/80 backdrop-blur-md border-b border-white/5 shadow-lg" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="flex items-center space-x-2">
            <div className="h-10 w-10 bg-gradient-to-br from-finance-400 to-finance-600 rounded-xl flex items-center justify-center">
              <span className="font-bold text-white">FG</span>
            </div>
            <span className="text-white font-bold text-xl">FinanceGarden</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-all",
                link.name === 'Join Waitlist'
                  ? "bg-finance-600 hover:bg-finance-500 text-white px-4 py-2 rounded-lg"
                  : "text-gray-300 hover:text-white"
              )}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button 
          type="button" 
          className="md:hidden text-gray-300 hover:text-white"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "fixed inset-0 bg-dark-950/98 backdrop-blur-lg z-40 md:hidden transition-all duration-300 transform",
          mobileMenuOpen 
            ? "translate-y-0 opacity-100" 
            : "translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col h-full justify-center items-center space-y-8 p-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-xl font-medium transition-all",
                link.name === 'Join Waitlist'
                  ? "bg-finance-600 hover:bg-finance-500 text-white px-6 py-3 rounded-lg"
                  : "text-gray-300 hover:text-white"
              )}
              onClick={toggleMobileMenu}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
