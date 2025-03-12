
import React, { useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import TaxCalculator from '@/components/TaxCalculator';
import AppShowcase from '@/components/AppShowcase';
import FAQ from '@/components/FAQ';
import SecurityFeatures from '@/components/SecurityFeatures';
import ComparisonTable from '@/components/ComparisonTable';
import Waitlist from '@/components/Waitlist';
import Footer from '@/components/Footer';
import { WaitlistProvider } from '@/components/WaitlistContext';
import { useLazyLoadImage } from '@/utils/animation';

const Index = () => {
  useLazyLoadImage();

  useEffect(() => {
    // Set page title
    document.title = 'Altero - Grow Your Financial Future';
    
    // Update meta tags dynamically to ensure correct Open Graph images
    const updateMetaTags = () => {
      // Update OG image
      const ogImageMeta = document.querySelector('meta[property="og:image"]');
      if (ogImageMeta) {
        ogImageMeta.setAttribute('content', window.location.origin + '/og-image.png');
      }
      
      // Update Twitter image
      const twitterImageMeta = document.querySelector('meta[property="twitter:image"]');
      if (twitterImageMeta) {
        twitterImageMeta.setAttribute('content', window.location.origin + '/og-image.png');
      }
      
      // Update URLs
      const ogUrlMeta = document.querySelector('meta[property="og:url"]');
      const twitterUrlMeta = document.querySelector('meta[property="twitter:url"]');
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      
      if (ogUrlMeta) ogUrlMeta.setAttribute('content', window.location.href);
      if (twitterUrlMeta) twitterUrlMeta.setAttribute('content', window.location.href);
      if (canonicalLink) canonicalLink.setAttribute('href', window.location.href);
    };
    
    updateMetaTags();
    
    // Add structured data for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Altero",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "iOS, Android, Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Take control of your financial future with powerful tools for budgeting, investing, and wealth building all in one beautiful app.",
      "image": window.location.origin + "/og-image.png"
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
        <SecurityFeatures />
        <ComparisonTable />
        <FAQ />
        <Waitlist />
        <Footer />
      </div>
    </WaitlistProvider>
  );
};

export default Index;
