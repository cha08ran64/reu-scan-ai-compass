
import React from 'react';
import { AIScanner } from '@/components/AIScanner';

export const ScanSection = () => {
  return (
    <section id="scan" className="py-20 bg-white/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            AI-Powered Waste Recognition
          </h2>
          <p className="text-xl text-gray-600">
            Upload or capture an image of any item to get instant sustainability insights powered by advanced machine learning
          </p>
        </div>
        
        <AIScanner />
      </div>
    </section>
  );
};
