
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';

export interface ScanRecord {
  id: string;
  user_id: string;
  image_url?: string;
  item_name: string;
  material_type?: string;
  recyclable?: boolean;
  reusable?: boolean;
  category?: string;
  bin_type?: string;
  confidence_score?: number;
  carbon_saved?: number;
  eco_points: number;
  ai_generated_info?: string;
  eco_advice?: string;
  fun_facts?: string;
  created_at: string;
}

export const useScanHistory = () => {
  const [scans, setScans] = useState<ScanRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchScanHistory();
    }
  }, [user]);

  const fetchScanHistory = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('scan_history')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setScans(data || []);
    } catch (error) {
      console.error('Error fetching scan history:', error);
    } finally {
      setLoading(false);
    }
  };

  const addScanRecord = async (scanData: Omit<ScanRecord, 'id' | 'user_id' | 'created_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('scan_history')
        .insert([{
          ...scanData,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) throw error;

      setScans(prev => [data, ...prev]);
      await updateUserPoints(scanData.eco_points);
      
      return data;
    } catch (error) {
      console.error('Error adding scan record:', error);
      throw error;
    }
  };

  const updateUserPoints = async (points: number) => {
    if (!user || points <= 0) return;

    try {
      const { data: currentPoints } = await supabase
        .from('user_points')
        .select('total_points, level')
        .eq('user_id', user.id)
        .single();

      const newTotal = (currentPoints?.total_points || 0) + points;
      const newLevel = Math.floor(newTotal / 100) + 1; // Level up every 100 points

      await supabase
        .from('user_points')
        .upsert({
          user_id: user.id,
          total_points: newTotal,
          level: newLevel
        });
    } catch (error) {
      console.error('Error updating user points:', error);
    }
  };

  return {
    scans,
    loading,
    addScanRecord,
    refetch: fetchScanHistory
  };
};
