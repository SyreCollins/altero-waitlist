
import React, { useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import TaxCalculator from '@/components/TaxCalculator';
import AppShowcase from '@/components/AppShowcase';
import Waitlist from '@/components/Waitlist';
import Footer from '@/components/Footer';
import { WaitlistProvider } from '@/components/WaitlistContext';
import { useLazyLoadImage } from '@/utils/animation';

const Index = () => {
  useLazyLoadImage();

  useEffect(() => {
    // Set page title
    document.title = 'Altero - Grow Your Financial Future';
    
    // Add structured data for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Altero",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "iOS, Android",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Take control of your financial future with powerful tools for budgeting, investing, and wealth building all in one beautiful app."
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <WaitlistProvider>
      <div className="min-h-screen bg-dark-950 text-white overflow-x-hidden">
        <NavBar />
        <Hero />
        <Features />
        <TaxCalculator />
        <AppShowcase />
        <Waitlist />
        <Footer />
      </div>
    </WaitlistProvider>
  );
};

export default Index;
