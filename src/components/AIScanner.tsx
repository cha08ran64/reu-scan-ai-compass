
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, Zap, CheckCircle, AlertCircle, Recycle, Trash2, Battery, Leaf } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useScanHistory } from '@/hooks/useScanHistory';
import { useAuth } from '@/components/AuthProvider';

interface ScanResult {
  item_name: string;
  material_type: string;
  recyclable: boolean;
  reusable: boolean;
  category: 'recyclable' | 'reusable' | 'non-recyclable' | 'hazardous';
  bin_type: 'dry' | 'wet' | 'e-waste' | 'hazardous';
  confidence_score: number;
  carbon_saved: number;
  eco_points: number;
  ai_generated_info: string;
  eco_advice: string;
  fun_facts: string;
}

export const AIScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { addScanRecord } = useScanHistory();
  const { user } = useAuth();

  const mockScanResults: ScanResult[] = [
    {
      item_name: "Plastic Water Bottle",
      material_type: "PET Plastic (#1)",
      recyclable: true,
      reusable: false,
      category: "recyclable",
      bin_type: "dry",
      confidence_score: 94,
      carbon_saved: 0.8,
      eco_points: 15,
      ai_generated_info: "This is a PET plastic bottle, one of the most commonly recycled plastics worldwide.",
      eco_advice: "Rinse thoroughly before recycling. Consider switching to a reusable water bottle to reduce plastic waste.",
      fun_facts: "Did you know? Recycling one plastic bottle can save enough energy to power a 60-watt light bulb for 3 hours!"
    },
    {
      item_name: "Aluminum Can",
      material_type: "Aluminum",
      recyclable: true,
      reusable: false,
      category: "recyclable",
      bin_type: "dry",
      confidence_score: 98,
      carbon_saved: 1.2,
      eco_points: 25,
      ai_generated_info: "Aluminum cans are infinitely recyclable and retain their properties through the recycling process.",
      eco_advice: "Aluminum cans can be recycled indefinitely. Make sure to empty completely before recycling.",
      fun_facts: "Aluminum cans can be recycled and back on store shelves in as little as 60 days!"
    },
    {
      item_name: "Smartphone",
      material_type: "Electronic Device",
      recyclable: true,
      reusable: true,
      category: "reusable",
      bin_type: "e-waste",
      confidence_score: 91,
      carbon_saved: 15.5,
      eco_points: 50,
      ai_generated_info: "Smartphones contain valuable materials like gold, silver, and rare earth elements that can be recovered.",
      eco_advice: "Consider donating if still functional, or take to certified e-waste recycling centers. Never throw in regular trash.",
      fun_facts: "One million recycled smartphones can recover 35,000 pounds of copper, 772 pounds of silver, and 75 pounds of gold!"
    },
    {
      item_name: "Pizza Box (Food Stained)",
      material_type: "Contaminated Cardboard",
      recyclable: false,
      reusable: false,
      category: "non-recyclable",
      bin_type: "wet",
      confidence_score: 87,
      carbon_saved: 0,
      eco_points: 5,
      ai_generated_info: "Food-contaminated cardboard cannot be recycled as the grease interferes with the recycling process.",
      eco_advice: "Cut out clean portions for recycling, compost if possible, or dispose in general waste.",
      fun_facts: "Clean pizza boxes can be recycled, but grease and food residue make them non-recyclable!"
    },
    {
      item_name: "LED Light Bulb",
      material_type: "Electronic Component",
      recyclable: true,
      reusable: false,
      category: "recyclable",
      bin_type: "e-waste",
      confidence_score: 89,
      carbon_saved: 2.3,
      eco_points: 20,
      ai_generated_info: "LED bulbs contain electronic components and should be recycled at specialized facilities.",
      eco_advice: "Take to electronics recycling centers or retailer take-back programs. Do not dispose in regular trash.",
      fun_facts: "LED bulbs use 75% less energy than incandescent bulbs and last 25 times longer!"
    }
  ];

  const simulateAIScan = async (imageFile?: File) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to use the scanning feature.",
        variant: "destructive",
      });
      return;
    }

    setIsScanning(true);
    
    // Simulate image upload if file provided
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setUploadedImage(imageUrl);
    }
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    try {
      const randomResult = mockScanResults[Math.floor(Math.random() * mockScanResults.length)];
      setScanResult(randomResult);
      
      // Save to database
      await addScanRecord(randomResult);
      
      setIsScanning(false);
      
      toast({
        title: "Scan Complete!",
        description: `Identified: ${randomResult.item_name} with ${randomResult.confidence_score}% confidence`,
      });
      
      // Show eco points earned
      if (randomResult.eco_points > 0) {
        setTimeout(() => {
          toast({
            title: `+${randomResult.eco_points} Eco Points!`,
            description: "Great job contributing to sustainability!",
          });
        }, 1000);
      }
    } catch (error) {
      console.error('Error processing scan:', error);
      toast({
        title: "Scan Failed",
        description: "There was an error processing your scan. Please try again.",
        variant: "destructive",
      });
      setIsScanning(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      simulateAIScan(file);
    }
  };

  const resetScanner = () => {
    setScanResult(null);
    setUploadedImage(null);
  };

  const getBinIcon = (binType: string) => {
    switch (binType) {
      case 'dry': return <Recycle className="h-5 w-5" />;
      case 'wet': return <Leaf className="h-5 w-5" />;
      case 'e-waste': return <Battery className="h-5 w-5" />;
      case 'hazardous': return <AlertCircle className="h-5 w-5" />;
      default: return <Trash2 className="h-5 w-5" />;
    }
  };

  const getBinColor = (binType: string) => {
    switch (binType) {
      case 'dry': return 'bg-blue-100 text-blue-800';
      case 'wet': return 'bg-green-100 text-green-800';
      case 'e-waste': return 'bg-purple-100 text-purple-800';
      case 'hazardous': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-8 bg-white/80 backdrop-blur-sm border-2 border-dashed border-green-300 hover:border-green-400 transition-colors">
        <div className="text-center">
          {!isScanning && !scanResult && (
            <>
              <div className="bg-gradient-to-br from-green-100 to-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">AI-Powered Recognition</h3>
              <p className="text-gray-600 mb-6">
                Upload an image of any item to get instant sustainability insights powered by advanced AI
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => simulateAIScan()}
                  size="lg" 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                >
                  <Camera className="h-5 w-5 mr-2" />
                  Capture Photo
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
                Analyzing material composition, recyclability, and environmental impact...
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
              </div>
              {uploadedImage && (
                <div className="mt-4">
                  <img src={uploadedImage} alt="Uploaded" className="max-w-xs rounded-lg mx-auto" />
                </div>
              )}
            </div>
          )}
          
          {scanResult && (
            <div className="py-6 space-y-6">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto ${
                scanResult.recyclable || scanResult.reusable
                  ? 'bg-gradient-to-br from-green-100 to-emerald-100' 
                  : 'bg-gradient-to-br from-red-100 to-orange-100'
              }`}>
                {scanResult.recyclable || scanResult.reusable ? (
                  <CheckCircle className="h-12 w-12 text-green-600" />
                ) : (
                  <AlertCircle className="h-12 w-12 text-red-600" />
                )}
              </div>
              
              {uploadedImage && (
                <div className="mb-4">
                  <img src={uploadedImage} alt="Scanned item" className="max-w-xs rounded-lg mx-auto" />
                </div>
              )}
              
              <div>
                <h3 className="text-2xl font-semibold mb-2">{scanResult.item_name}</h3>
                <p className="text-gray-600 mb-4">Material: {scanResult.material_type}</p>
                <div className="flex justify-center gap-2 mb-6">
                  <Badge variant="outline" className={getBinColor(scanResult.bin_type)}>
                    {getBinIcon(scanResult.bin_type)}
                    <span className="ml-1 capitalize">{scanResult.bin_type} Bin</span>
                  </Badge>
                  <Badge variant="outline" className="bg-gray-100">
                    {scanResult.confidence_score}% Confidence
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-500">Carbon Saved</p>
                  <p className="font-semibold text-green-600">{scanResult.carbon_saved} kg CO₂</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-500">Eco Points</p>
                  <p className="font-semibold text-blue-600">+{scanResult.eco_points}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-500">Recyclable</p>
                  <p className={`font-semibold ${scanResult.recyclable ? 'text-green-600' : 'text-red-600'}`}>
                    {scanResult.recyclable ? 'Yes' : 'No'}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-500">Reusable</p>
                  <p className={`font-semibold ${scanResult.reusable ? 'text-green-600' : 'text-red-600'}`}>
                    {scanResult.reusable ? 'Yes' : 'No'}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4 text-left">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">AI Analysis</h4>
                  <p className="text-blue-700 text-sm">{scanResult.ai_generated_info}</p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Eco Advice</h4>
                  <p className="text-green-700 text-sm">{scanResult.eco_advice}</p>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Fun Fact</h4>
                  <p className="text-purple-700 text-sm">{scanResult.fun_facts}</p>
                </div>
              </div>
              
              <div className="flex gap-3 justify-center">
                <Button 
                  onClick={resetScanner}
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
  );
};
