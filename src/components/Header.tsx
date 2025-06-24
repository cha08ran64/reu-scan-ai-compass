
import React from 'react';
import { Leaf } from 'lucide-react';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-green-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-xl">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            ReuScan
          </span>
        </div>
      </div>
    </header>
  );
};
