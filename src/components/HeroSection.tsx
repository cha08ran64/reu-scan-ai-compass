
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Camera, Recycle, TrendingUp } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 via-blue-100/30 to-emerald-100/50" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-green-200">
              <Sparkles className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-green-700">AI-Powered Sustainability</span>
            </div>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent leading-tight">
            Scan. Learn. 
            <br />
            <span className="relative">
              Sustain.
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full transform -rotate-1" />
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform everyday items into sustainability insights with our AI-powered waste recognition platform. 
            Discover recycling paths, earn eco-points, and join a global community making a difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-lg px-8 py-4">
              <Camera className="h-5 w-5 mr-2" />
              Start Scanning
            </Button>
            <Button size="lg" variant="outline" className="border-green-300 text-green-700 hover:bg-green-50 text-lg px-8 py-4">
              <TrendingUp className="h-5 w-5 mr-2" />
              View Impact
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-green-200">
              <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Camera className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">AI Recognition</h3>
              <p className="text-sm text-gray-600">Instantly identify materials and get recycling guidance</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-200">
              <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Recycle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Smart Recycling</h3>
              <p className="text-sm text-gray-600">Location-based recycling center recommendations</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-emerald-200">
              <div className="bg-emerald-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Impact Tracking</h3>
              <p className="text-sm text-gray-600">Measure your environmental contribution</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
