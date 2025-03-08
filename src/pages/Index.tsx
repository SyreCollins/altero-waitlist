
import React, { useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import AppShowcase from '@/components/AppShowcase';
import Waitlist from '@/components/Waitlist';
import Footer from '@/components/Footer';
import { WaitlistProvider } from '@/components/WaitlistContext';
import { useLazyLoadImage } from '@/utils/animation';

const Index = () => {
  useLazyLoadImage();

  useEffect(() => {
    // Set page title
    document.title = 'FinanceGarden - Grow Your Financial Future';
  }, []);

  return (
    <WaitlistProvider>
      <div className="min-h-screen bg-dark-950 text-white overflow-x-hidden">
        <NavBar />
        <Hero />
        <Features />
        <AppShowcase />
        <Waitlist />
        <Footer />
      </div>
    </WaitlistProvider>
  );
};

export default Index;
