
-- Create users profiles table for personalized features
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create scan history table
CREATE TABLE public.scan_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  image_url TEXT,
  item_name TEXT NOT NULL,
  material_type TEXT,
  recyclable BOOLEAN,
  reusable BOOLEAN,
  category TEXT, -- 'recyclable', 'reusable', 'non-recyclable'
  bin_type TEXT, -- 'dry', 'wet', 'e-waste', 'hazardous'
  confidence_score INTEGER,
  carbon_saved DECIMAL(10,2),
  eco_points INTEGER DEFAULT 0,
  ai_generated_info TEXT,
  eco_advice TEXT,
  fun_facts TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create community contributions table
CREATE TABLE public.community_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  item_name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  material_type TEXT,
  category TEXT,
  bin_type TEXT,
  verified BOOLEAN DEFAULT FALSE,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create recycling centers table
CREATE TABLE public.recycling_centers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  phone TEXT,
  website TEXT,
  accepted_materials TEXT[], -- array of materials they accept
  operating_hours JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user rewards/points table
CREATE TABLE public.user_points (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  total_points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  badges TEXT[], -- array of earned badges
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  type TEXT, -- 'scan_result', 'community_update', 'reward', 'reminder'
  read BOOLEAN DEFAULT FALSE,
  data JSONB, -- additional notification data
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create educational content table
CREATE TABLE public.educational_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  category TEXT, -- 'blog', 'tip', 'video', 'guide'
  image_url TEXT,
  video_url TEXT,
  tags TEXT[],
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scan_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for scan_history
CREATE POLICY "Users can view their own scan history" ON public.scan_history
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own scans" ON public.scan_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own scans" ON public.scan_history
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for community_items
CREATE POLICY "Anyone can view verified community items" ON public.community_items
  FOR SELECT USING (verified = TRUE OR auth.uid() = user_id);
CREATE POLICY "Users can insert their own community items" ON public.community_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own community items" ON public.community_items
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for user_points
CREATE POLICY "Users can view their own points" ON public.user_points
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own points" ON public.user_points
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own points" ON public.user_points
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Make recycling_centers and educational_content publicly readable
CREATE POLICY "Anyone can view recycling centers" ON public.recycling_centers
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can view published educational content" ON public.educational_content
  FOR SELECT TO anon, authenticated USING (published = true);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, username)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'username', split_part(NEW.email, '@', 1))
  );
  
  INSERT INTO public.user_points (user_id, total_points, level)
  VALUES (NEW.id, 0, 1);
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample recycling centers data
INSERT INTO public.recycling_centers (name, address, latitude, longitude, phone, accepted_materials, operating_hours)
VALUES 
  ('Green Valley Recycling Center', '123 Eco Street, Green Valley, CA 94040', 37.4419, -122.1430, '+1-555-0123', 
   ARRAY['plastic', 'glass', 'paper', 'metal'], 
   '{"monday": "8:00-17:00", "tuesday": "8:00-17:00", "wednesday": "8:00-17:00", "thursday": "8:00-17:00", "friday": "8:00-17:00", "saturday": "9:00-15:00", "sunday": "closed"}'::jsonb),
  ('City Waste Management', '456 Recycle Ave, Silicon Valley, CA 94041', 37.4419, -122.1730, '+1-555-0456',
   ARRAY['e-waste', 'batteries', 'electronics'],
   '{"monday": "9:00-18:00", "tuesday": "9:00-18:00", "wednesday": "9:00-18:00", "thursday": "9:00-18:00", "friday": "9:00-18:00", "saturday": "closed", "sunday": "closed"}'::jsonb),
  ('EcoHub Recycling', '789 Sustainability Blvd, Palo Alto, CA 94301', 37.4219, -122.1200, '+1-555-0789',
   ARRAY['organic', 'compost', 'hazardous'],
   '{"monday": "7:00-16:00", "tuesday": "7:00-16:00", "wednesday": "7:00-16:00", "thursday": "7:00-16:00", "friday": "7:00-16:00", "saturday": "8:00-14:00", "sunday": "10:00-14:00"}'::jsonb);

-- Insert sample educational content
INSERT INTO public.educational_content (title, content, category, tags, published)
VALUES 
  ('The Basics of Recycling', 'Learn the fundamental principles of recycling and how it helps our environment...', 'guide', ARRAY['recycling', 'basics', 'environment'], true),
  ('Reducing Plastic Waste', 'Practical tips for reducing plastic consumption in your daily life...', 'tip', ARRAY['plastic', 'waste reduction', 'tips'], true),
  ('E-Waste: What You Need to Know', 'Understanding electronic waste and proper disposal methods...', 'blog', ARRAY['e-waste', 'electronics', 'disposal'], true);
