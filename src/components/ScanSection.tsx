
import React from 'react';
import { AIScanner } from '@/components/AIScanner';

export const ScanSection = () => {
  return (
    <section className="py-20 bg-white/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent leading-tight">
            AI-Powered Waste Recognition
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Upload or capture an image of any item to get instant sustainability insights powered by advanced machine learning. 
            Discover recycling paths, material composition, and environmental impact with cutting-edge AI analysis.
          </p>
        </div>
        
        <AIScanner />
      </div>
    </section>
  );
};
