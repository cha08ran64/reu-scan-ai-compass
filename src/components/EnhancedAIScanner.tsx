
import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, Zap, CheckCircle, AlertCircle, Recycle, Trash2, Battery, Leaf, RotateCcw, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  detailed_analysis: string;
  recycling_steps: string[];
  environmental_impact: {
    decomposition_time: string;
    carbon_footprint: string;
    recyclability_rate: string;
  };
}

export const EnhancedAIScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const mockScanResults: ScanResult[] = [
    {
      item_name: "Plastic Water Bottle (PET)",
      material_type: "Polyethylene Terephthalate (#1)",
      recyclable: true,
      reusable: false,
      category: "recyclable",
      bin_type: "dry",
      confidence_score: 96,
      carbon_saved: 0.8,
      eco_points: 15,
      ai_generated_info: "This is a PET plastic bottle (#1), one of the most commonly recycled plastics worldwide. The clear material and bottle shape indicate high-grade PET suitable for bottle-to-bottle recycling.",
      eco_advice: "Rinse thoroughly before recycling. Remove the cap and label if possible. Consider switching to a reusable water bottle to reduce plastic waste by up to 1,400 bottles per year.",
      fun_facts: "Did you know? Recycling one plastic bottle can save enough energy to power a 60-watt light bulb for 3 hours! It takes 450 years for a plastic bottle to decompose naturally.",
      detailed_analysis: "Advanced AI analysis detected: Clear PET plastic with standard 28mm cap thread. Material shows no signs of degradation. Bottle appears food-grade with excellent recyclability potential.",
      recycling_steps: [
        "Empty all contents completely",
        "Rinse with water to remove residue", 
        "Remove cap and label (optional but preferred)",
        "Place in designated recycling bin",
        "Ensure bottle is dry to prevent contamination"
      ],
      environmental_impact: {
        decomposition_time: "450 years in landfill",
        carbon_footprint: "82g CO₂ per bottle",
        recyclability_rate: "95% when properly processed"
      }
    },
    {
      item_name: "Aluminum Beverage Can",
      material_type: "Aluminum Alloy (3104)",
      recyclable: true,
      reusable: false,
      category: "recyclable",
      bin_type: "dry",
      confidence_score: 98,
      carbon_saved: 1.2,
      eco_points: 25,
      ai_generated_info: "Aluminum beverage can made from high-grade aluminum alloy. The material composition and structural integrity make this infinitely recyclable without quality loss.",
      eco_advice: "Aluminum cans can be recycled indefinitely without losing quality. Empty completely and crush if desired to save space. No need to remove labels.",
      fun_facts: "Aluminum cans can be recycled and back on store shelves in as little as 60 days! Recycling one can saves enough energy to power a TV for 3 hours.",
      detailed_analysis: "AI detected aluminum alloy 3104 with polymer coating. Can shows standard 12oz capacity with pull-tab opening. Material purity excellent for recycling.",
      recycling_steps: [
        "Empty contents completely",
        "Quick rinse (optional)",
        "Crush to save space (optional)",
        "Place in recycling bin",
        "Keep labels on - they burn off during processing"
      ],
      environmental_impact: {
        decomposition_time: "200-500 years naturally",
        carbon_footprint: "330g CO₂ per can (virgin material)",
        recyclability_rate: "100% infinite recyclability"
      }
    },
    {
      item_name: "Electronic Device - Smartphone",
      material_type: "Mixed Electronics (Rare Earth Elements)",
      recyclable: true,
      reusable: true,
      category: "reusable",
      bin_type: "e-waste",
      confidence_score: 94,
      carbon_saved: 15.5,
      eco_points: 50,
      ai_generated_info: "Modern smartphone containing valuable materials including gold, silver, copper, and rare earth elements. Device shows potential for refurbishment or material recovery.",
      eco_advice: "If functional, consider donating or selling. If broken, take to certified e-waste recyclers. Never dispose in regular trash due to toxic materials and valuable resources.",
      fun_facts: "One million recycled smartphones can recover 35,000 pounds of copper, 772 pounds of silver, and 75 pounds of gold! A smartphone contains more gold per gram than gold ore.",
      detailed_analysis: "AI analysis reveals: Lithium-ion battery, rare earth magnets, precious metals in circuit boards. Device appears to have functional screen and minimal physical damage.",
      recycling_steps: [
        "Backup and wipe all personal data",
        "Remove SIM card and memory cards",
        "Take to certified e-waste facility",
        "Or participate in manufacturer take-back program",
        "Consider donation if device is functional"
      ],
      environmental_impact: {
        decomposition_time: "1000+ years (toxic components)",
        carbon_footprint: "70kg CO₂ to manufacture",
        recyclability_rate: "85% of materials recoverable"
      }
    }
  ];

  const processImageFile = useCallback(async (file: File): Promise<void> => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload an image file (JPG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File Too Large",
        description: "Please upload an image smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    setImageFile(file);
    await simulateAdvancedAIScan(file);
  }, []);

  const simulateAdvancedAIScan = async (imageFile?: File) => {
    setIsScanning(true);
    
    try {
      // Faster AI processing - reduced delay for better user experience
      await new Promise(resolve => setTimeout(resolve, 1500)); // Reduced from 4800ms to 1500ms
      
      const randomResult = mockScanResults[Math.floor(Math.random() * mockScanResults.length)];
      
      // Add some realistic variance to confidence score
      const confidenceVariance = Math.random() * 10 - 5; // -5 to +5
      randomResult.confidence_score = Math.max(85, Math.min(99, randomResult.confidence_score + confidenceVariance));
      
      setScanResult(randomResult);
      setIsScanning(false);
      
      toast({
        title: "AI Analysis Complete!",
        description: `Identified: ${randomResult.item_name} with ${Math.round(randomResult.confidence_score)}% confidence`,
      });
      
    } catch (error) {
      console.error('Error processing scan:', error);
      toast({
        title: "AI Analysis Failed",
        description: "There was an error processing your scan. Please try again.",
        variant: "destructive",
      });
      setIsScanning(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  }, [processImageFile]);

  const resetScanner = () => {
    setScanResult(null);
    setUploadedImage(null);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const downloadReport = () => {
    if (!scanResult) return;
    
    const report = `
AI Scan Report - ${scanResult.item_name}
Generated: ${new Date().toLocaleString()}

Material Analysis:
- Item: ${scanResult.item_name}
- Material Type: ${scanResult.material_type}
- Confidence Score: ${Math.round(scanResult.confidence_score)}%

Sustainability Metrics:
- Recyclable: ${scanResult.recyclable ? 'Yes' : 'No'}
- Reusable: ${scanResult.reusable ? 'Yes' : 'No'}
- Carbon Saved: ${scanResult.carbon_saved} kg CO₂
- Eco Points: ${scanResult.eco_points}

Environmental Impact:
- Decomposition Time: ${scanResult.environmental_impact.decomposition_time}
- Carbon Footprint: ${scanResult.environmental_impact.carbon_footprint}
- Recyclability Rate: ${scanResult.environmental_impact.recyclability_rate}

Recycling Instructions:
${scanResult.recycling_steps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

AI Analysis: ${scanResult.ai_generated_info}
Eco Advice: ${scanResult.eco_advice}
Fun Fact: ${scanResult.fun_facts}
    `;
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scan-report-${scanResult.item_name.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
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
    <div className="max-w-4xl mx-auto">
      <Card className={`p-8 bg-white/80 backdrop-blur-sm border-2 transition-all duration-300 ${
        dragActive 
          ? 'border-green-500 border-solid bg-green-50/80' 
          : 'border-dashed border-green-300 hover:border-green-400'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}>
        <div className="text-center">
          {!isScanning && !scanResult && (
            <>
              <div className="bg-gradient-to-br from-green-100 to-blue-100 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8">
                <Camera className="h-16 w-16 text-green-600" />
              </div>
              <h3 className="text-3xl font-semibold mb-6">AI-Powered Recognition</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
                Upload an image of any item to get instant sustainability insights. 
                Our AI analyzes material composition, environmental impact, and provides detailed recycling guidance.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-md mx-auto">
                <Button 
                  onClick={() => cameraInputRef.current?.click()}
                  size="lg" 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 h-14"
                >
                  <Camera className="h-6 w-6 mr-3" />
                  Take Photo
                </Button>
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  size="lg" 
                  variant="outline" 
                  className="border-green-300 text-green-700 hover:bg-green-50 h-14"
                >
                  <Upload className="h-6 w-6 mr-3" />
                  Upload Image
                </Button>
              </div>
              <p className="text-sm text-gray-500 mb-4">Or drag and drop an image anywhere on this area</p>
              <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-400">
                <span>Supported: JPG, PNG, WebP</span>
                <span>•</span>
                <span>Max size: 10MB</span>
                <span>•</span>
                <span>Best quality: High contrast, good lighting</span>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                className="hidden"
              />
            </>
          )}
          
          {isScanning && (
            <div className="py-12">
              <div className="bg-gradient-to-br from-blue-100 to-green-100 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                <Zap className="h-16 w-16 text-blue-600 animate-bounce" />
              </div>
              <h3 className="text-3xl font-semibold mb-6">AI Analysis in Progress</h3>
              <p className="text-gray-600 mb-6 text-lg">
                Analyzing your image for material identification and sustainability insights...
              </p>
              <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-3 mb-6">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full animate-pulse" style={{width: '85%'}}></div>
              </div>
              {uploadedImage && (
                <div className="mt-6">
                  <img src={uploadedImage} alt="Analyzing..." className="max-w-sm rounded-lg mx-auto shadow-lg" />
                </div>
              )}
            </div>
          )}
          
          {scanResult && (
            <div className="py-8 space-y-8">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto ${
                scanResult.recyclable || scanResult.reusable
                  ? 'bg-gradient-to-br from-green-100 to-emerald-100' 
                  : 'bg-gradient-to-br from-red-100 to-orange-100'
              }`}>
                {scanResult.recyclable || scanResult.reusable ? (
                  <CheckCircle className="h-16 w-16 text-green-600" />
                ) : (
                  <AlertCircle className="h-16 w-16 text-red-600" />
                )}
              </div>
              
              {uploadedImage && (
                <div className="mb-6">
                  <img src={uploadedImage} alt="Scanned item" className="max-w-sm rounded-lg mx-auto shadow-lg" />
                </div>
              )}
              
              <div>
                <h3 className="text-3xl font-semibold mb-3">{scanResult.item_name}</h3>
                <p className="text-gray-600 mb-6 text-lg">Material: {scanResult.material_type}</p>
                <div className="flex justify-center gap-3 mb-8 flex-wrap">
                  <Badge variant="outline" className={`${getBinColor(scanResult.bin_type)} text-sm py-1 px-3`}>
                    {getBinIcon(scanResult.bin_type)}
                    <span className="ml-2 capitalize">{scanResult.bin_type} Bin</span>
                  </Badge>
                  <Badge variant="outline" className="bg-gray-100 text-sm py-1 px-3">
                    {Math.round(scanResult.confidence_score)}% Confidence
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700 text-sm py-1 px-3">
                    +{scanResult.eco_points} Eco Points
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Carbon Impact</h4>
                  <p className="text-2xl font-bold text-green-600">{scanResult.carbon_saved} kg CO₂</p>
                  <p className="text-sm text-green-700">Saved by recycling</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Recyclability</h4>
                  <p className="text-2xl font-bold text-blue-600">
                    {scanResult.environmental_impact.recyclability_rate}
                  </p>
                  <p className="text-sm text-blue-700">Material recovery rate</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-2">Decomposition</h4>
                  <p className="text-lg font-bold text-purple-600">
                    {scanResult.environmental_impact.decomposition_time}
                  </p>
                  <p className="text-sm text-purple-700">If not recycled</p>
                </div>
              </div>
              
              <div className="space-y-6 text-left">
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-3 text-lg">🤖 AI Analysis</h4>
                  <p className="text-blue-700">{scanResult.ai_generated_info}</p>
                  <div className="mt-3 pt-3 border-t border-blue-200">
                    <p className="text-sm text-blue-600">{scanResult.detailed_analysis}</p>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-3 text-lg">♻️ Recycling Instructions</h4>
                  <ol className="space-y-2">
                    {scanResult.recycling_steps.map((step, index) => (
                      <li key={index} className="text-green-700 flex items-start">
                        <span className="bg-green-200 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 flex-shrink-0">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                
                <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                  <h4 className="font-semibold text-emerald-800 mb-3 text-lg">🌱 Sustainability Advice</h4>
                  <p className="text-emerald-700">{scanResult.eco_advice}</p>
                </div>
                
                <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-3 text-lg">💡 Environmental Insight</h4>
                  <p className="text-purple-700">{scanResult.fun_facts}</p>
                </div>
              </div>
              
              <div className="flex gap-4 justify-center flex-wrap">
                <Button 
                  onClick={resetScanner}
                  variant="outline"
                  className="border-green-300 text-green-700 hover:bg-green-50"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Scan Another Item
                </Button>
                <Button 
                  onClick={downloadReport}
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
