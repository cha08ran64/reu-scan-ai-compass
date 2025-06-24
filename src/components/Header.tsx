
import React from 'react';
import { Button } from '@/components/ui/button';
import { Leaf, User, Menu } from 'lucide-react';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-green-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-xl">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            ReuScan
          </span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#scan" className="text-gray-700 hover:text-green-600 transition-colors">Scan</a>
          <a href="#features" className="text-gray-700 hover:text-green-600 transition-colors">Features</a>
          <a href="#community" className="text-gray-700 hover:text-green-600 transition-colors">Community</a>
          <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors">About</a>
        </nav>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            <User className="h-4 w-4 mr-2" />
            Sign In
          </Button>
          <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
            Get Started
          </Button>
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
