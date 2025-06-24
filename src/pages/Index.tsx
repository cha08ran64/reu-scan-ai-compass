
import React from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ScanSection } from '@/components/ScanSection';
import { StatsSection } from '@/components/StatsSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { CommunitySection } from '@/components/CommunitySection';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <Header />
      <HeroSection />
      <ScanSection />
      <StatsSection />
      <FeaturesSection />
      <CommunitySection />
    </div>
  );
};

export default Index;
