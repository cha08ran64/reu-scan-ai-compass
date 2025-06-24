
import React from 'react';
import { Card } from '@/components/ui/card';
import { Brain, MapPin, Award, Smartphone, Globe, BarChart3 } from 'lucide-react';

export const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "Advanced AI Recognition",
      description: "Multi-model computer vision system with 95%+ accuracy for material identification and recycling classification.",
      gradient: "from-purple-500 to-blue-500"
    },
    {
      icon: MapPin,
      title: "Location-Based Services",
      description: "Real-time mapping of nearby recycling centers, drop-off points, and specialized waste facilities.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Award,
      title: "Gamified Sustainability",
      description: "Earn eco-points, unlock achievements, and compete with friends while making a positive environmental impact.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Smartphone,
      title: "Cross-Platform Access",
      description: "Seamless experience across mobile, web, and AR platforms with offline scanning capabilities.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connect with eco-warriors worldwide, share tips, and participate in local sustainability challenges.",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: BarChart3,
      title: "Impact Analytics",
      description: "Detailed tracking of your environmental contribution with personalized insights and carbon footprint analysis.",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Powerful Features for Sustainable Living
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how our AI-powered platform makes sustainability accessible, engaging, and impactful for everyone
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-8 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className={`bg-gradient-to-r ${feature.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
