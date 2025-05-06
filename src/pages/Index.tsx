
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/Hero';
import DetectionTypeSection from '@/components/home/DetectionTypeSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <DetectionTypeSection />
        <HowItWorksSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
