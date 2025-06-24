
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useScanHistory } from '@/hooks/useScanHistory';
import { useAuth } from '@/components/AuthProvider';
import { History, Calendar, Recycle, Trash2, Battery, Leaf, TrendingUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export const ScanHistoryPage: React.FC = () => {
  const { scans, loading } = useScanHistory();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Authentication Required</h2>
        <p className="text-gray-600">Please sign in to view your scan history.</p>
      </div>
    );
  }

  const getBinIcon = (binType: string) => {
    switch (binType) {
      case 'dry': return <Recycle className="h-4 w-4" />;
      case 'wet': return <Leaf className="h-4 w-4" />;
      case 'e-waste': return <Battery className="h-4 w-4" />;
      case 'hazardous': return <Trash2 className="h-4 w-4" />;
      default: return <Recycle className="h-4 w-4" />;
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

  const totalScans = scans.length;
  const totalCarbonSaved = scans.reduce((sum, scan) => sum + (scan.carbon_saved || 0), 0);
  const totalEcoPoints = scans.reduce((sum, scan) => sum + scan.eco_points, 0);

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Your Scan History
          </h2>
          <p className="text-xl text-gray-600">
            Track your sustainability journey and environmental impact
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <History className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">{totalScans}</div>
            <div className="text-sm text-gray-600">Items Scanned</div>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">{totalCarbonSaved.toFixed(1)} kg</div>
            <div className="text-sm text-gray-600">CO₂ Saved</div>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">{totalEcoPoints}</div>
            <div className="text-sm text-gray-600">Eco Points</div>
          </Card>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your scan history...</p>
          </div>
        ) : scans.length === 0 ? (
          <Card className="p-12 text-center">
            <History className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No scans yet</h3>
            <p className="text-gray-600 mb-6">Start scanning items to build your sustainability history!</p>
            <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
              Start Scanning
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {scans.map((scan) => (
              <Card key={scan.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold">{scan.item_name}</h3>
                      <Badge variant="outline" className={getBinColor(scan.bin_type || 'dry')}>
                        {getBinIcon(scan.bin_type || 'dry')}
                        <span className="ml-1 capitalize">{scan.bin_type || 'Dry'} Bin</span>
                      </Badge>
                      {scan.recyclable && (
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          Recyclable
                        </Badge>
                      )}
                      {scan.reusable && (
                        <Badge variant="outline" className="bg-blue-100 text-blue-800">
                          Reusable
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-3">{scan.material_type}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Confidence</p>
                        <p className="font-semibold">{scan.confidence_score}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Carbon Saved</p>
                        <p className="font-semibold text-green-600">{scan.carbon_saved} kg CO₂</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Eco Points</p>
                        <p className="font-semibold text-blue-600">+{scan.eco_points}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-semibold">{formatDistanceToNow(new Date(scan.created_at), { addSuffix: true })}</p>
                      </div>
                    </div>
                    
                    {scan.eco_advice && (
                      <div className="bg-green-50 rounded-lg p-3 mt-3">
                        <p className="text-sm text-green-800">{scan.eco_advice}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
