
import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, Users, Recycle, TreePine } from 'lucide-react';

export const StatsSection = () => {
  const stats = [
    {
      icon: Recycle,
      value: "2.3M+",
      label: "Items Scanned",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: Users,
      value: "150K+",
      label: "Active Users",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: TreePine,
      value: "500T",
      label: "CO₂ Saved",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100"
    },
    {
      icon: TrendingUp,
      value: "85%",
      label: "Accuracy Rate",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
            Global Impact in Numbers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join millions of users making a real difference in sustainability
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className={`${stat.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
