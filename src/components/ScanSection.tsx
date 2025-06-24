
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera, Upload, Zap, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ScanSection = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const simulateAIScan = () => {
    setIsScanning(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockResults = [
        {
          item: "Plastic Water Bottle",
          material: "PET Plastic (#1)",
          recyclable: true,
          confidence: 94,
          carbonSaved: "0.8 kg CO₂",
          nearbyFacilities: 3,
          ecoPoints: 15
        },
        {
          item: "Aluminum Can",
          material: "Aluminum",
          recyclable: true,
          confidence: 98,
          carbonSaved: "1.2 kg CO₂",
          nearbyFacilities: 5,
          ecoPoints: 25
        },
        {
          item: "Pizza Box",
          material: "Cardboard (Food Contaminated)",
          recyclable: false,
          confidence: 87,
          carbonSaved: "0 kg CO₂",
          nearbyFacilities: 0,
          ecoPoints: 0
        }
      ];
      
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setScanResult(randomResult);
      setIsScanning(false);
      
      toast({
        title: "Scan Complete!",
        description: `Identified: ${randomResult.item} with ${randomResult.confidence}% confidence`,
      });
    }, 3000);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      simulateAIScan();
    }
  };

  return (
    <section id="scan" className="py-20 bg-white/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            AI-Powered Waste Recognition
          </h2>
          <p className="text-xl text-gray-600">
            Upload or capture an image of any item to get instant sustainability insights
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 bg-white/80 backdrop-blur-sm border-2 border-dashed border-green-300 hover:border-green-400 transition-colors">
            <div className="text-center">
              {!isScanning && !scanResult && (
                <>
                  <div className="bg-gradient-to-br from-green-100 to-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Camera className="h-12 w-12 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Ready to Scan</h3>
                  <p className="text-gray-600 mb-6">
                    Our AI will analyze your item and provide detailed recycling information
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={simulateAIScan}
                      size="lg" 
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                    >
                      <Camera className="h-5 w-5 mr-2" />
                      Take Photo
                    </Button>
                    <Button 
                      onClick={() => fileInputRef.current?.click()}
                      size="lg" 
                      variant="outline" 
                      className="border-green-300 text-green-700 hover:bg-green-50"
                    >
                      <Upload className="h-5 w-5 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </>
              )}
              
              {isScanning && (
                <div className="py-8">
                  <div className="bg-gradient-to-br from-blue-100 to-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <Zap className="h-12 w-12 text-blue-600 animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">AI Analysis in Progress</h3>
                  <p className="text-gray-600 mb-4">
                    Identifying material composition and sustainability options...
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
                  </div>
                </div>
              )}
              
              {scanResult && (
                <div className="py-6">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
                    scanResult.recyclable 
                      ? 'bg-gradient-to-br from-green-100 to-emerald-100' 
                      : 'bg-gradient-to-br from-red-100 to-orange-100'
                  }`}>
                    {scanResult.recyclable ? (
                      <CheckCircle className="h-12 w-12 text-green-600" />
                    ) : (
                      <AlertCircle className="h-12 w-12 text-red-600" />
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-semibold mb-2">{scanResult.item}</h3>
                  <p className="text-gray-600 mb-4">Material: {scanResult.material}</p>
                  <p className="text-sm text-gray-500 mb-6">Confidence: {scanResult.confidence}%</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-500">Carbon Saved</p>
                      <p className="font-semibold text-green-600">{scanResult.carbonSaved}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-500">Eco Points</p>
                      <p className="font-semibold text-blue-600">+{scanResult.ecoPoints}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-500">Recyclable</p>
                      <p className={`font-semibold ${scanResult.recyclable ? 'text-green-600' : 'text-red-600'}`}>
                        {scanResult.recyclable ? 'Yes' : 'No'}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-500">Nearby Centers</p>
                      <p className="font-semibold text-purple-600">{scanResult.nearbyFacilities}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 justify-center">
                    <Button 
                      onClick={() => setScanResult(null)}
                      variant="outline"
                      className="border-green-300 text-green-700 hover:bg-green-50"
                    >
                      Scan Another
                    </Button>
                    <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                      Find Recycling Centers
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
