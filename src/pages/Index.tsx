
import React from 'react';
import { Header } from '@/components/Header';
import { ScanSection } from '@/components/ScanSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <Header />
      <ScanSection />
    </div>
  );
};

export default Index;
