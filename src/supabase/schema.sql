-- ============================================================
-- DRUMS OF LIBERATION (Powered by Shivronix Technologies)
-- PostgreSQL + Supabase Database Schema & RLS Policies
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. WEBSITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS website_settings (
  id TEXT PRIMARY KEY DEFAULT 'main',
  company_name TEXT NOT NULL DEFAULT 'Shivronix Technologies',
  brand_title TEXT NOT NULL DEFAULT 'Drums of Liberation',
  tagline TEXT NOT NULL DEFAULT 'Liberating Businesses Through Technology',
  powered_by TEXT NOT NULL DEFAULT 'Powered by Shivronix Technologies',
  hero_title TEXT NOT NULL,
  hero_subtitle TEXT NOT NULL,
  primary_button_text TEXT DEFAULT 'Start Your Project',
  secondary_button_text TEXT DEFAULT 'Explore Portfolio',
  about_story TEXT,
  mission TEXT,
  vision TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  working_hours TEXT,
  whatsapp_number TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  instagram_url TEXT,
  youtube_url TEXT,
  meta_title TEXT,
  meta_description TEXT,
  logo_url TEXT,
  favicon_url TEXT,
  primary_color TEXT DEFAULT '#2563eb',
  secondary_color TEXT DEFAULT '#0f172a',
  accent_color TEXT DEFAULT '#10b981',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. SERVICES TABLE
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY DEFAULT ('srv-' || uuid_generate_v4()),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL,
  discount_price NUMERIC,
  image_url TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  duration TEXT DEFAULT '1-2 Weeks',
  is_popular BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  is_visible BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. PORTFOLIO TABLE
CREATE TABLE IF NOT EXISTS portfolio (
  id TEXT PRIMARY KEY DEFAULT ('port-' || uuid_generate_v4()),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  tech_stack TEXT[] DEFAULT '{}',
  client_name TEXT NOT NULL,
  completion_date TEXT,
  status TEXT DEFAULT 'Completed',
  cover_image TEXT NOT NULL,
  gallery_images TEXT[] DEFAULT '{}',
  github_url TEXT,
  live_demo_url TEXT,
  youtube_demo_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. PRICING TABLE
CREATE TABLE IF NOT EXISTS pricing (
  id TEXT PRIMARY KEY DEFAULT ('price-' || uuid_generate_v4()),
  plan_name TEXT NOT NULL,
  description TEXT NOT NULL,
  monthly_price NUMERIC NOT NULL,
  yearly_price NUMERIC NOT NULL,
  features TEXT[] DEFAULT '{}',
  button_text TEXT DEFAULT 'Choose Plan',
  is_popular BOOLEAN DEFAULT FALSE,
  is_visible BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY DEFAULT ('test-' || uuid_generate_v4()),
  customer_name TEXT NOT NULL,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  rating INT DEFAULT 5,
  review TEXT NOT NULL,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. BLOGS TABLE
CREATE TABLE IF NOT EXISTS blogs (
  id TEXT PRIMARY KEY DEFAULT ('blog-' || uuid_generate_v4()),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  thumbnail_url TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  seo_title TEXT,
  seo_description TEXT,
  is_published BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  read_time TEXT DEFAULT '5 min read',
  author_name TEXT DEFAULT 'Shivronix Technologies',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. MESSAGES & ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY DEFAULT ('msg-' || uuid_generate_v4()),
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  budget TEXT,
  project_type TEXT NOT NULL,
  deadline TEXT,
  message TEXT NOT NULL,
  attachment_url TEXT,
  attachment_name TEXT,
  status TEXT DEFAULT 'Unread',
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES
CREATE POLICY "Public Read Website Settings" ON website_settings FOR SELECT USING (true);
CREATE POLICY "Public Read Visible Services" ON services FOR SELECT USING (is_visible = true);
CREATE POLICY "Public Read Visible Portfolio" ON portfolio FOR SELECT USING (is_visible = true);
CREATE POLICY "Public Read Visible Pricing" ON pricing FOR SELECT USING (is_visible = true);
CREATE POLICY "Public Read Visible Testimonials" ON testimonials FOR SELECT USING (is_visible = true);
CREATE POLICY "Public Read Published Blogs" ON blogs FOR SELECT USING (is_published = true);

-- PUBLIC INSERT FOR ENQUIRIES
CREATE POLICY "Public Create Messages" ON messages FOR INSERT WITH CHECK (true);

-- ADMIN FULL ACCESS POLICIES
CREATE POLICY "Admin Full Settings" ON website_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Portfolio" ON portfolio FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Pricing" ON pricing FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Blogs" ON blogs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Messages" ON messages FOR ALL USING (auth.role() = 'authenticated');

-- SUPABASE STORAGE BUCKETS POLICIES
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('attachments', 'attachments', true),
  ('portfolio', 'portfolio', true),
  ('services', 'services', true),
  ('logos', 'logos', true),
  ('blog', 'blog', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access Attachments Bucket" ON storage.objects FOR SELECT USING (bucket_id IN ('attachments', 'portfolio', 'services', 'logos', 'blog'));
CREATE POLICY "Public Upload Attachments Bucket" ON storage.objects FOR INSERT WITH CHECK (bucket_id IN ('attachments', 'portfolio', 'services', 'logos', 'blog'));
