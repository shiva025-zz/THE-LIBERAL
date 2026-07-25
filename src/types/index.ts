export type Role = 'admin' | 'client' | 'visitor';

export type ServiceCategory = 
  | 'Web Development' 
  | 'Mobile Apps' 
  | 'Software & ERP' 
  | 'AI & Automation' 
  | 'Cloud & APIs' 
  | 'UI/UX & Branding' 
  | 'Digital Marketing' 
  | 'Video Editing';

export type ProjectStatus = 'In Progress' | 'Completed' | 'Maintenance';

export type MessageStatus = 'Unread' | 'Read' | 'Replied' | 'Archived';

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  description: string;
  price: number;
  discount_price?: number;
  image_url: string;
  features: string[];
  duration: string; // e.g., "1-2 Weeks", "3-4 Weeks"
  is_popular?: boolean;
  is_featured?: boolean;
  is_visible?: boolean;
  sort_order?: number;
  created_at?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: ServiceCategory;
  tech_stack: string[];
  client_name: string;
  completion_date: string;
  status: ProjectStatus;
  cover_image: string;
  gallery_images: string[];
  github_url?: string;
  live_demo_url?: string;
  youtube_demo_url?: string;
  is_featured?: boolean;
  is_visible?: boolean;
  created_at?: string;
}

export interface PricingPlan {
  id: string;
  plan_name: string;
  description: string;
  monthly_price: number;
  yearly_price: number;
  features: string[];
  button_text: string;
  is_popular?: boolean;
  is_visible?: boolean;
  sort_order?: number;
  created_at?: string;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  company: string;
  position: string;
  photo_url: string;
  rating: number; // 1-5
  review: string;
  is_visible?: boolean;
  created_at?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  thumbnail_url: string;
  content: string;
  category: ServiceCategory;
  tags: string[];
  seo_title?: string;
  seo_description?: string;
  is_published?: boolean;
  is_featured?: boolean;
  read_time?: string;
  author_name?: string;
  created_at?: string;
}

export interface EnquiryMessage {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  budget?: string;
  project_type: string;
  deadline?: string;
  message: string;
  attachment_url?: string;
  attachment_name?: string;
  status: MessageStatus;
  admin_notes?: string;
  created_at: string;
}

export interface WebsiteSettings {
  id?: string;
  website_name?: string;
  company_name: string; // Shivronix Technologies
  brand_title: string; // Drums of Liberation
  tagline: string; // Liberating Businesses Through Technology
  powered_by: string; // Powered by Shivronix Technologies
  hero_title: string;
  hero_subtitle: string;
  hero_image_url?: string;
  primary_button_text: string;
  secondary_button_text: string;
  about_story: string;
  mission: string;
  vision: string;
  phone: string;
  secondary_phone?: string;
  email: string;
  address: string;
  google_maps_url?: string;
  working_hours: string;
  whatsapp_number: string;
  facebook_url?: string;
  github_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  instagram_url?: string;
  youtube_url?: string;
  footer_text?: string;
  copyright_text?: string;
  meta_title: string;
  meta_description: string;
  logo_url: string;
  favicon_url?: string;
  primary_color?: string;
  secondary_color?: string;
  accent_color?: string;
  updated_at?: string;
}

export interface MediaItem {
  id: string;
  name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  bucket_name: string;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  details: string;
  performed_by: string;
  created_at: string;
}

export interface AdminProfile {
  name: string;
  email: string;
  phone: string;
  photo_url: string;
  account_created_at?: string;
}

export interface SupabaseSettings {
  url: string;
  anonKey: string;
  isConnected: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'customer' | 'client' | 'visitor';
  created_at?: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'error' | 'info' | 'warning';
}
