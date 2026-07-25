/// <reference types="vite/client" />

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { 
  ServiceItem, 
  PortfolioProject, 
  PricingPlan, 
  Testimonial, 
  BlogPost, 
  EnquiryMessage, 
  WebsiteSettings, 
  AdminProfile,
  MediaItem,
  ActivityLog
} from '../types';

export const DEFAULT_WEBSITE_SETTINGS: WebsiteSettings = {
  website_name: 'Drums of Liberation',
  company_name: 'Drums of Liberatiom',
  brand_title: 'Drums of Liberation',
  tagline: 'Liberating Businesses Through Technology',
  powered_by: 'Powered by Shivronix Technologies',
  hero_title: 'Transforming Ideas Into Powerful Digital Solutions',
  hero_subtitle: 'We build premium websites, mobile applications, AI solutions, billing software, custom business software, and professional video editing services that help businesses grow.',
  hero_image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200',
  primary_button_text: 'Start Your Project',
  secondary_button_text: 'Explore Portfolio',
  about_story: 'Founded with a mission to liberate modern enterprises from technical friction, Drums of Liberation (a Shivronix Technologies company) delivers end-to-end digital engineering. From high-performance web applications and native mobile apps to AI-powered automation and custom enterprise ERPs, we build resilient software designed for scale.',
  mission: 'To empower organizations worldwide with bespoke software solutions that accelerate digital transformation, maximize operational efficiency, and elevate brand influence.',
  vision: 'To be the global benchmark for technical excellence, creative design, and transformative AI-driven software engineering.',
  phone: '+91 98765 43210',
  secondary_phone: '+91 91234 56789',
  email: 'contact@shivronix.com',
  address: 'Shivronix Tech Park, Cyber Heights, Sector 62, Technology Hub, India',
  google_maps_url: 'https://maps.google.com/?q=Shivronix+Tech+Park',
  working_hours: 'Monday - Saturday: 9:00 AM - 7:00 PM IST',
  whatsapp_number: '+91 98765 43210',
  facebook_url: 'https://facebook.com/shivronixtechnologies',
  instagram_url: 'https://instagram.com/drumsofliberation',
  linkedin_url: 'https://linkedin.com/company/shivronix-technologies',
  twitter_url: 'https://twitter.com/shivronix',
  youtube_url: 'https://youtube.com/@shivronixtechnologies',
  github_url: 'https://github.com/shivronix-technologies',
  footer_text: 'Drums of Liberation is a premier software engineering agency powered by Shivronix Technologies. We build scalable, high-performance web apps, mobile solutions, custom ERPs, and AI tools for enterprise clients.',
  copyright_text: '© 2026 Drums of Liberation. Powered by Shivronix Technologies. All rights reserved.',
  meta_title: 'Drums of Liberation | Powered by Shivronix Technologies',
  meta_description: 'Enterprise Web Development, Mobile Apps, Custom ERP Software, AI Chatbots, and UI/UX Design by Shivronix Technologies.',
  logo_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300',
  favicon_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=100',
  primary_color: '#2563eb',
  secondary_color: '#0f172a',
  accent_color: '#10b981',
  updated_at: new Date().toISOString(),
};

export const DEFAULT_ADMIN_PROFILE: AdminProfile = {
  name: 'drums of liberation Admin',
  email: 'shiva27509@gmail.com',
  phone: '+91 9489651325',
  photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  account_created_at: new Date().toISOString(),
};

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Custom Website Development',
    category: 'Web Development',
    description: 'High-speed, SEO-optimized, ultra-responsive web applications built with Next.js, React, TypeScript, and Tailwind CSS.',
    price: 15000,
    discount_price: 12999,
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
    features: ['Custom UI/UX Design', 'Next.js / React Engine', 'SEO & Speed Optimization', 'Content Management System', 'Supabase / Firebase Database Integration', '1 Year Free Maintenance'],
    duration: '1-2 Weeks',
    is_popular: true,
    is_featured: true,
    is_visible: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 'srv-2',
    title: 'Mobile App Development (Android & iOS)',
    category: 'Mobile Apps',
    description: 'Cross-platform native mobile applications crafted with Flutter & React Native with push notifications and secure auth.',
    price: 35000,
    discount_price: 29999,
    image_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600',
    features: ['Flutter / React Native Codebase', 'Android Play Store & Apple App Store Publishing', 'Biometric & OTP Login', 'Real-time Chat & Push Notifications', 'Offline Caching & Cloud Sync'],
    duration: '3-4 Weeks',
    is_popular: true,
    is_featured: true,
    is_visible: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 'srv-3',
    title: 'Billing, POS & Inventory Software',
    category: 'Software & ERP',
    description: 'Desktop & Web-based POS billing systems with barcode scanning, GST thermal receipts, and inventory tracking.',
    price: 25000,
    discount_price: 19999,
    image_url: 'https://images.unsplash.com/photo-1556742049-0a67d8f370eb?auto=format&fit=crop&q=80&w=600',
    features: ['GST & Non-GST Invoice Generation', 'Thermal Printer & Barcode Scanner Integration', 'Stock Alert & Low Inventory Tracking', 'Daily / Monthly P&L Analytics Reports', 'Offline-First SQLite / Cloud Backup'],
    duration: '2-3 Weeks',
    is_popular: false,
    is_featured: true,
    is_visible: true,
    sort_order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: 'srv-4',
    title: 'AI Chatbots & Automation Tools',
    category: 'AI & Automation',
    description: 'Intelligent AI customer support agents powered by Gemini & OpenAI, automated workflow pipelines, and lead scoring.',
    price: 20000,
    discount_price: 16999,
    image_url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=600',
    features: ['Gemini / OpenAI Fine-Tuned Chatbot', 'WhatsApp Business API Integration', 'Lead Capture & CRM Synchronization', 'Automated Email & SMS Follow-ups', 'Custom Knowledge Base Training'],
    duration: '1-2 Weeks',
    is_popular: true,
    is_featured: true,
    is_visible: true,
    sort_order: 4,
    created_at: new Date().toISOString(),
  },
  {
    id: 'srv-5',
    title: 'Custom ERP & CRM Management Systems',
    category: 'Software & ERP',
    description: 'Full-fledged enterprise resource management software tailored specifically to your business workflows.',
    price: 45000,
    discount_price: 39999,
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
    features: ['Role-Based Employee Permissions', 'School / Hospital / Retail Workflow Modules', 'Automated Attendance & Payroll Engine', 'Advanced Data Visualizations & Export', 'Secure Microservice Architecture'],
    duration: '4-6 Weeks',
    is_popular: false,
    is_featured: true,
    is_visible: true,
    sort_order: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: 'srv-6',
    title: 'UI/UX Design & Brand Identity',
    category: 'UI/UX & Branding',
    description: 'Figma prototypes, sleek user interfaces, logo suites, vector graphics, and comprehensive brand guidelines.',
    price: 12000,
    discount_price: 9999,
    image_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600',
    features: ['Interactive Figma Prototypes', 'Design System & Component Library', 'Vector Logo & Typography Palette', 'Marketing Banners & Social Media Kit', 'User Experience Flow Optimization'],
    duration: '1 Week',
    is_popular: false,
    is_featured: false,
    is_visible: true,
    sort_order: 6,
    created_at: new Date().toISOString(),
  },
  {
    id: 'srv-7',
    title: 'Video Editing & Motion Graphics',
    category: 'Video Editing',
    description: 'High-impact promotional reels, product walkthrough videos, motion graphics, and corporate video editing.',
    price: 8000,
    discount_price: 6499,
    image_url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=600',
    features: ['4K Video Editing & Color Grading', 'Motion Graphics & Logo Animations', 'Sound Design & Royalty-Free Audio', 'Social Media Reels / Shorts Formatting', 'Fast 48-Hour Turnaround'],
    duration: '2-3 Days',
    is_popular: false,
    is_featured: false,
    is_visible: true,
    sort_order: 7,
    created_at: new Date().toISOString(),
  },
  {
    id: 'srv-8',
    title: 'Cloud Deployment & DevOps Services',
    category: 'Cloud & APIs',
    description: 'Containerized deployment on AWS, Google Cloud, Cloud Run, Vercel, server security hardening, and CI/CD pipelines.',
    price: 18000,
    discount_price: 14999,
    image_url: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&q=80&w=600',
    features: ['Docker Containerization', 'Automated GitHub CI/CD Workflows', 'SSL Certificates & DNS Configuration', 'Load Balancing & Auto-Scaling', '24/7 Server Monitoring & Backups'],
    duration: '3-5 Days',
    is_popular: false,
    is_featured: false,
    is_visible: true,
    sort_order: 8,
    created_at: new Date().toISOString(),
  }
];

export const DEFAULT_PORTFOLIO: PortfolioProject[] = [
  {
    id: 'port-1',
    title: 'AuraCloud - AI-Powered Analytics Platform',
    slug: 'auracloud-analytics',
    description: 'Enterprise data visualization software providing real-time AI predictive insights and custom report generation.',
    category: 'AI & Automation',
    tech_stack: ['React', 'TypeScript', 'Python', 'FastAPI', 'Tailwind CSS', 'Recharts'],
    client_name: 'AuraCloud Technologies Inc.',
    completion_date: '2026-02-15',
    status: 'Completed',
    cover_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    gallery_images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800'
    ],
    github_url: 'https://github.com/shivronix-technologies/auracloud-demo',
    live_demo_url: 'https://auracloud-demo.shivronix.com',
    youtube_demo_url: 'https://youtube.com/watch?v=demo',
    is_featured: true,
    is_visible: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'port-2',
    title: 'FinPay POS - Cloud Billing & Retail ERP',
    slug: 'finpay-pos-erp',
    description: 'Multi-branch retail billing solution supporting offline transactions, barcode printing, and inventory sync.',
    category: 'Software & ERP',
    tech_stack: ['Electron', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'SQLite'],
    client_name: 'FinPay Retail Group',
    completion_date: '2026-01-20',
    status: 'Completed',
    cover_image: 'https://images.unsplash.com/photo-1556742049-0a67d8f370eb?auto=format&fit=crop&q=80&w=800',
    gallery_images: [
      'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=800'
    ],
    github_url: 'https://github.com/shivronix-technologies/finpay-pos',
    live_demo_url: 'https://finpay.shivronix.com',
    is_featured: true,
    is_visible: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'port-3',
    title: 'MedixConnect - Doctor & Patient Mobile App',
    slug: 'medixconnect-mobile-app',
    description: 'Cross-platform iOS and Android mobile app for instant appointment booking, teleconsultation, and prescription history.',
    category: 'Mobile Apps',
    tech_stack: ['Flutter', 'Dart', 'Firebase Auth', 'Firestore', 'Razorpay API'],
    client_name: 'Medix Health Services',
    completion_date: '2025-11-10',
    status: 'Completed',
    cover_image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
    gallery_images: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800'
    ],
    live_demo_url: 'https://medixconnect.com',
    is_featured: true,
    is_visible: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'port-4',
    title: 'EduSphere - School & Campus Management System',
    slug: 'edusphere-school-management',
    description: 'End-to-end ERP for educational institutions featuring student records, fees collection, bus tracking, and exam marksheets.',
    category: 'Software & ERP',
    tech_stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Node.js'],
    client_name: 'St. Xavier Public School Chain',
    completion_date: '2025-09-05',
    status: 'Completed',
    cover_image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    gallery_images: [],
    live_demo_url: 'https://edusphere.shivronix.com',
    is_featured: false,
    is_visible: true,
    created_at: new Date().toISOString(),
  }
];

export const DEFAULT_PRICING: PricingPlan[] = [
  {
    id: 'price-1',
    plan_name: 'Startup Launch',
    description: 'Ideal for small businesses and professionals launching their digital presence.',
    monthly_price: 14999,
    yearly_price: 149990,
    features: [
      'Responsive Business Website',
      '5 Core Page Layouts',
      'Contact & Enquiry Form',
      'SEO & Speed Optimization',
      'SSL & Custom Domain Setup',
      'Basic Analytics Integration',
      '3 Months Technical Support'
    ],
    button_text: 'Choose Launch',
    is_popular: false,
    is_visible: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 'price-2',
    plan_name: 'Business Growth',
    description: 'Perfect for growing companies needing custom web apps, mobile apps or billing systems.',
    monthly_price: 34999,
    yearly_price: 349990,
    features: [
      'Everything in Launch Plan',
      'Full-Stack Web App or Flutter Mobile App',
      'Admin Dashboard Control Panel',
      'Supabase Database & User Auth',
      'Payment Gateway Integration',
      'AI Chatbot Customer Support',
      '6 Months Priority Support'
    ],
    button_text: 'Start Growth Project',
    is_popular: true,
    is_visible: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 'price-3',
    plan_name: 'Enterprise Custom',
    description: 'Bespoke ERP software, complex mobile systems, and dedicated engineering team.',
    monthly_price: 79999,
    yearly_price: 799990,
    features: [
      'Tailor-Made Custom Architecture',
      'Complete ERP / CRM / POS Engine',
      'Multi-Platform (Web + Android + iOS)',
      'Custom AI Fine-Tuned Models',
      'DevOps, Docker & Cloud Infrastructure',
      'SLA Guaranteed Uptime',
      '1 Year Dedicated Account Manager'
    ],
    button_text: 'Request Enterprise Quote',
    is_popular: false,
    is_visible: true,
    sort_order: 3,
    created_at: new Date().toISOString(),
  }
];

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    customer_name: 'Vikramaditya Sharma',
    company: 'FinPay Retail Ltd.',
    position: 'Chief Operations Officer',
    photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    review: 'Shivronix Technologies transformed our entire retail operations with their custom POS billing software. Their technical depth, speed of delivery, and attention to detail are unprecedented!',
    is_visible: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'test-2',
    customer_name: 'Priya Sundaram',
    company: 'AuraCloud Systems',
    position: 'Founder & CEO',
    photo_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    review: 'Drums of Liberation built our AI analytics dashboard in record time. The UI is sleek, the database queries are lightning-fast, and our clients love using it every single day.',
    is_visible: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'test-3',
    customer_name: 'Dr. Rajesh Kannan',
    company: 'Medix Health Group',
    position: 'Managing Director',
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    review: 'Extremely professional team! They delivered our Flutter iOS and Android doctor consultation app ahead of deadline with zero bugs. Highly recommended for complex digital software!',
    is_visible: true,
    created_at: new Date().toISOString(),
  }
];

export const DEFAULT_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Why Modern Businesses Are Switching to Next.js & Supabase in 2026',
    slug: 'why-businesses-switch-nextjs-supabase',
    thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    content: `## The Modern Stack Revolution

Monolithic, slow systems are being rapidly replaced by Jamstack and serverless architectures. By pairing **Next.js** with **Supabase**, businesses achieve lightning-fast loading speeds, instantaneous database updates, and row-level security out of the box.

### Key Advantages:
1. **Unmatched Performance**: Server-side rendering and edge caching ensure sub-second page loads.
2. **Real-time Synchronization**: WebSockets enable live dashboards without manual refresh polling.
3. **Reduced Cloud Costs**: Serverless infrastructure scales dynamically with traffic, saving thousands in server overhead.

Partnering with **Shivronix Technologies** ensures your platform is built on this battle-tested, high-performance architecture.`,
    category: 'Web Development',
    tags: ['Next.js', 'Supabase', 'React', 'Web Development'],
    seo_title: 'Why Next.js & Supabase Power Modern Web Applications in 2026',
    seo_description: 'Explore how combining Next.js and Supabase accelerates web application speed, security, and scalability.',
    is_published: true,
    is_featured: true,
    read_time: '4 min read',
    author_name: 'Engineering Team @ Shivronix',
    created_at: new Date().toISOString(),
  },
  {
    id: 'blog-2',
    title: 'Building AI-Powered Chatbots for Enterprise CRM Automation',
    slug: 'building-ai-chatbots-enterprise-crm',
    thumbnail_url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=800',
    content: `## Transforming Customer Support with Gemini & AI Agents

Automating customer interactions without losing human empathy is the gold standard for enterprise CRM systems today.

### Benefits of Custom AI Agents:
- **Instant Response Times**: Handle thousands of simultaneous enquiries round the clock.
- **Deep Integration**: Connect directly to your inventory database to provide real-time order tracking and price quotes.
- **Lead Qualification**: Automatically gather budget, timeline, and requirements before transferring high-value leads to human sales executives.`,
    category: 'AI & Automation',
    tags: ['AI', 'Gemini API', 'Automation', 'CRM'],
    seo_title: 'Enterprise AI Chatbots & CRM Automation Guide',
    seo_description: 'Discover how AI chatbots streamline lead capture, customer support, and CRM synchronization.',
    is_published: true,
    is_featured: false,
    read_time: '5 min read',
    author_name: 'AI Division @ Shivronix',
    created_at: new Date().toISOString(),
  }
];

export const DEFAULT_MESSAGES: EnquiryMessage[] = [
  {
    id: 'msg-1',
    name: 'Anand Kumar',
    company: 'Apex Logistics Solutions',
    email: 'anand@apexlogistics.in',
    phone: '+91 91234 56789',
    budget: '₹25,000 - ₹50,000',
    project_type: 'Software & ERP',
    deadline: 'Within 1 Month',
    message: 'We need a custom fleet tracking and billing management software for 40 trucks with driver expense logging.',
    status: 'Unread',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'msg-2',
    name: 'Kavitha Nathan',
    company: 'Bloom Retail Outlets',
    email: 'kavitha@bloomretail.com',
    phone: '+91 99887 76655',
    budget: '₹50,000+',
    project_type: 'Mobile Apps',
    deadline: 'Urgent (2 Weeks)',
    message: 'Looking for a Flutter mobile app for iOS and Android so our retail customers can browse products and order directly.',
    status: 'Read',
    created_at: new Date(Date.now() - 3600000 * 28).toISOString(),
  }
];

// --- Supabase Client Storage & Connection Initialization ---

const STORAGE_KEYS = {
  SUPABASE_URL: 'dol_sb_url',
  SUPABASE_KEY: 'dol_sb_key',
  SERVICES: 'dol_services_data',
  PORTFOLIO: 'dol_portfolio_data',
  PRICING: 'dol_pricing_data',
  TESTIMONIALS: 'dol_testimonials_data',
  BLOGS: 'dol_blogs_data',
  MESSAGES: 'dol_messages_data',
  SETTINGS: 'dol_website_settings_data',
  ADMIN_PROFILE: 'dol_admin_profile_data',
};

export const getStoredSupabaseConfig = () => {
  const url = localStorage.getItem(STORAGE_KEYS.SUPABASE_URL) || import.meta.env.VITE_SUPABASE_URL || '';
  const key = localStorage.getItem(STORAGE_KEYS.SUPABASE_KEY) || import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  return { url, key };
};

export const saveSupabaseConfig = (url: string, key: string) => {
  if (url) localStorage.setItem(STORAGE_KEYS.SUPABASE_URL, url.trim());
  else localStorage.removeItem(STORAGE_KEYS.SUPABASE_URL);

  if (key) localStorage.setItem(STORAGE_KEYS.SUPABASE_KEY, key.trim());
  else localStorage.removeItem(STORAGE_KEYS.SUPABASE_KEY);

  initSupabaseClient();
};

let supabaseInstance: SupabaseClient | null = null;

export const initSupabaseClient = (): SupabaseClient | null => {
  const { url, key } = getStoredSupabaseConfig();
  if (url && key && url.startsWith('http')) {
    try {
      supabaseInstance = createClient(url, key);
      return supabaseInstance;
    } catch (e) {
      console.warn('Failed to initialize Supabase client:', e);
      supabaseInstance = null;
    }
  } else {
    supabaseInstance = null;
  }
  return supabaseInstance;
};

export const getSupabase = (): SupabaseClient | null => {
  if (!supabaseInstance) {
    initSupabaseClient();
  }
  return supabaseInstance;
};

export const isSupabaseConnected = (): boolean => {
  const { url, key } = getStoredSupabaseConfig();
  return Boolean(url && key && url.startsWith('http'));
};

// Generic Local Storage Persistence Helpers for Fallback Mode
const getLocalData = <T>(key: string, defaultValue: T): T => {
  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return defaultValue;
    }
  }
  return defaultValue;
};

const saveLocalData = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// ==========================================
// WEBSITE SETTINGS API
// ==========================================

export const getWebsiteSettings = async (): Promise<WebsiteSettings> => {
  const client = getSupabase();
  if (client) {
    try {
      const { data, error } = await client.from('website_settings').select('*').limit(1).single();
      if (!error && data) return { ...DEFAULT_WEBSITE_SETTINGS, ...data };
    } catch (e) {
      console.warn('Supabase fetch website settings error, fallback to local:', e);
    }
  }
  return getLocalData<WebsiteSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_WEBSITE_SETTINGS);
};

export const updateWebsiteSettings = async (settings: Partial<WebsiteSettings>): Promise<WebsiteSettings> => {
  const client = getSupabase();
  const current = await getWebsiteSettings();
  const updated = { ...current, ...settings, updated_at: new Date().toISOString() };

  if (client) {
    try {
      const { error } = await client.from('website_settings').upsert({ id: current.id || 'main', ...updated });
      if (error) console.warn('Supabase website settings save error:', error);
    } catch (e) {
      console.warn('Supabase settings error:', e);
    }
  }
  saveLocalData(STORAGE_KEYS.SETTINGS, updated);
  return updated;
};

// ==========================================
// SERVICES API
// ==========================================

export const getServices = async (): Promise<ServiceItem[]> => {
  const client = getSupabase();
  if (client) {
    try {
      const { data, error } = await client.from('services').select('*').order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn('Supabase getServices fallback:', e);
    }
  }
  return getLocalData<ServiceItem[]>(STORAGE_KEYS.SERVICES, DEFAULT_SERVICES);
};

export const createService = async (item: Omit<ServiceItem, 'id' | 'created_at'>): Promise<ServiceItem> => {
  const newItem: ServiceItem = {
    ...item,
    id: 'srv-' + Date.now(),
    created_at: new Date().toISOString(),
  };

  const client = getSupabase();
  if (client) {
    try {
      const { data, error } = await client.from('services').insert([newItem]).select().single();
      if (!error && data) {
        const services = await getServices();
        saveLocalData(STORAGE_KEYS.SERVICES, [data, ...services]);
        return data;
      }
    } catch (e) {
      console.warn('Supabase createService fallback:', e);
    }
  }

  const current = getLocalData<ServiceItem[]>(STORAGE_KEYS.SERVICES, DEFAULT_SERVICES);
  const updated = [newItem, ...current];
  saveLocalData(STORAGE_KEYS.SERVICES, updated);
  return newItem;
};

export const updateService = async (id: string, updates: Partial<ServiceItem>): Promise<boolean> => {
  const client = getSupabase();
  if (client) {
    try {
      const { error } = await client.from('services').update(updates).eq('id', id);
      if (!error) {
        const current = getLocalData<ServiceItem[]>(STORAGE_KEYS.SERVICES, DEFAULT_SERVICES);
        saveLocalData(STORAGE_KEYS.SERVICES, current.map(s => s.id === id ? { ...s, ...updates } : s));
        return true;
      }
    } catch (e) {
      console.warn('Supabase updateService error:', e);
    }
  }

  const current = getLocalData<ServiceItem[]>(STORAGE_KEYS.SERVICES, DEFAULT_SERVICES);
  saveLocalData(STORAGE_KEYS.SERVICES, current.map(s => s.id === id ? { ...s, ...updates } : s));
  return true;
};

export const deleteService = async (id: string): Promise<boolean> => {
  const client = getSupabase();
  if (client) {
    try {
      await client.from('services').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase deleteService error:', e);
    }
  }

  const current = getLocalData<ServiceItem[]>(STORAGE_KEYS.SERVICES, DEFAULT_SERVICES);
  saveLocalData(STORAGE_KEYS.SERVICES, current.filter(s => s.id !== id));
  return true;
};

// ==========================================
// PORTFOLIO PROJECTS API
// ==========================================

export const getPortfolio = async (): Promise<PortfolioProject[]> => {
  const client = getSupabase();
  if (client) {
    try {
      const { data, error } = await client.from('portfolio').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn('Supabase getPortfolio fallback:', e);
    }
  }
  return getLocalData<PortfolioProject[]>(STORAGE_KEYS.PORTFOLIO, DEFAULT_PORTFOLIO);
};

export const createPortfolioProject = async (item: Omit<PortfolioProject, 'id' | 'created_at'>): Promise<PortfolioProject> => {
  const newItem: PortfolioProject = {
    ...item,
    id: 'port-' + Date.now(),
    created_at: new Date().toISOString(),
  };

  const client = getSupabase();
  if (client) {
    try {
      const { data, error } = await client.from('portfolio').insert([newItem]).select().single();
      if (!error && data) {
        const list = await getPortfolio();
        saveLocalData(STORAGE_KEYS.PORTFOLIO, [data, ...list]);
        return data;
      }
    } catch (e) {
      console.warn('Supabase createPortfolioProject error:', e);
    }
  }

  const current = getLocalData<PortfolioProject[]>(STORAGE_KEYS.PORTFOLIO, DEFAULT_PORTFOLIO);
  const updated = [newItem, ...current];
  saveLocalData(STORAGE_KEYS.PORTFOLIO, updated);
  return newItem;
};

export const updatePortfolioProject = async (id: string, updates: Partial<PortfolioProject>): Promise<boolean> => {
  const client = getSupabase();
  if (client) {
    try {
      await client.from('portfolio').update(updates).eq('id', id);
    } catch (e) {
      console.warn('Supabase updatePortfolioProject error:', e);
    }
  }

  const current = getLocalData<PortfolioProject[]>(STORAGE_KEYS.PORTFOLIO, DEFAULT_PORTFOLIO);
  saveLocalData(STORAGE_KEYS.PORTFOLIO, current.map(p => p.id === id ? { ...p, ...updates } : p));
  return true;
};

export const deletePortfolioProject = async (id: string): Promise<boolean> => {
  const client = getSupabase();
  if (client) {
    try {
      await client.from('portfolio').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase deletePortfolioProject error:', e);
    }
  }

  const current = getLocalData<PortfolioProject[]>(STORAGE_KEYS.PORTFOLIO, DEFAULT_PORTFOLIO);
  saveLocalData(STORAGE_KEYS.PORTFOLIO, current.filter(p => p.id !== id));
  return true;
};

// ==========================================
// PRICING PLANS API
// ==========================================

export const getPricing = async (): Promise<PricingPlan[]> => {
  const client = getSupabase();
  if (client) {
    try {
      const { data, error } = await client.from('pricing').select('*').order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn('Supabase getPricing fallback:', e);
    }
  }
  return getLocalData<PricingPlan[]>(STORAGE_KEYS.PRICING, DEFAULT_PRICING);
};

export const createPricingPlan = async (item: Omit<PricingPlan, 'id' | 'created_at'>): Promise<PricingPlan> => {
  const newItem: PricingPlan = {
    ...item,
    id: 'price-' + Date.now(),
    created_at: new Date().toISOString(),
  };

  const client = getSupabase();
  if (client) {
    try {
      const { data, error } = await client.from('pricing').insert([newItem]).select().single();
      if (!error && data) {
        const list = await getPricing();
        saveLocalData(STORAGE_KEYS.PRICING, [...list, data]);
        return data;
      }
    } catch (e) {
      console.warn('Supabase createPricing error:', e);
    }
  }

  const current = getLocalData<PricingPlan[]>(STORAGE_KEYS.PRICING, DEFAULT_PRICING);
  saveLocalData(STORAGE_KEYS.PRICING, [...current, newItem]);
  return newItem;
};

export const updatePricingPlan = async (id: string, updates: Partial<PricingPlan>): Promise<boolean> => {
  const client = getSupabase();
  if (client) {
    try {
      await client.from('pricing').update(updates).eq('id', id);
    } catch (e) {
      console.warn('Supabase updatePricing error:', e);
    }
  }

  const current = getLocalData<PricingPlan[]>(STORAGE_KEYS.PRICING, DEFAULT_PRICING);
  saveLocalData(STORAGE_KEYS.PRICING, current.map(p => p.id === id ? { ...p, ...updates } : p));
  return true;
};

export const deletePricingPlan = async (id: string): Promise<boolean> => {
  const client = getSupabase();
  if (client) {
    try {
      await client.from('pricing').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase deletePricing error:', e);
    }
  }

  const current = getLocalData<PricingPlan[]>(STORAGE_KEYS.PRICING, DEFAULT_PRICING);
  saveLocalData(STORAGE_KEYS.PRICING, current.filter(p => p.id !== id));
  return true;
};

// ==========================================
// TESTIMONIALS API
// ==========================================

export const getTestimonials = async (): Promise<Testimonial[]> => {
  const client = getSupabase();
  if (client) {
    try {
      const { data, error } = await client.from('testimonials').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn('Supabase getTestimonials fallback:', e);
    }
  }
  return getLocalData<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, DEFAULT_TESTIMONIALS);
};

export const createTestimonial = async (item: Omit<Testimonial, 'id' | 'created_at'>): Promise<Testimonial> => {
  const newItem: Testimonial = {
    ...item,
    id: 'test-' + Date.now(),
    created_at: new Date().toISOString(),
  };

  const client = getSupabase();
  if (client) {
    try {
      const { data, error } = await client.from('testimonials').insert([newItem]).select().single();
      if (!error && data) return data;
    } catch (e) {
      console.warn('Supabase createTestimonial error:', e);
    }
  }

  const current = getLocalData<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, DEFAULT_TESTIMONIALS);
  saveLocalData(STORAGE_KEYS.TESTIMONIALS, [newItem, ...current]);
  return newItem;
};

export const updateTestimonial = async (id: string, updates: Partial<Testimonial>): Promise<boolean> => {
  const client = getSupabase();
  if (client) {
    try {
      await client.from('testimonials').update(updates).eq('id', id);
    } catch (e) {
      console.warn('Supabase updateTestimonial error:', e);
    }
  }

  const current = getLocalData<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, DEFAULT_TESTIMONIALS);
  saveLocalData(STORAGE_KEYS.TESTIMONIALS, current.map(t => t.id === id ? { ...t, ...updates } : t));
  return true;
};

export const deleteTestimonial = async (id: string): Promise<boolean> => {
  const client = getSupabase();
  if (client) {
    try {
      await client.from('testimonials').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase deleteTestimonial error:', e);
    }
  }

  const current = getLocalData<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, DEFAULT_TESTIMONIALS);
  saveLocalData(STORAGE_KEYS.TESTIMONIALS, current.filter(t => t.id !== id));
  return true;
};

// ==========================================
// BLOG POSTS API
// ==========================================

export const getBlogs = async (): Promise<BlogPost[]> => {
  const client = getSupabase();
  if (client) {
    try {
      const { data, error } = await client.from('blogs').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn('Supabase getBlogs fallback:', e);
    }
  }
  return getLocalData<BlogPost[]>(STORAGE_KEYS.BLOGS, DEFAULT_BLOGS);
};

export const createBlogPost = async (item: Omit<BlogPost, 'id' | 'created_at'>): Promise<BlogPost> => {
  const newItem: BlogPost = {
    ...item,
    id: 'blog-' + Date.now(),
    created_at: new Date().toISOString(),
  };

  const client = getSupabase();
  if (client) {
    try {
      const { data, error } = await client.from('blogs').insert([newItem]).select().single();
      if (!error && data) return data;
    } catch (e) {
      console.warn('Supabase createBlogPost error:', e);
    }
  }

  const current = getLocalData<BlogPost[]>(STORAGE_KEYS.BLOGS, DEFAULT_BLOGS);
  saveLocalData(STORAGE_KEYS.BLOGS, [newItem, ...current]);
  return newItem;
};

export const updateBlogPost = async (id: string, updates: Partial<BlogPost>): Promise<boolean> => {
  const client = getSupabase();
  if (client) {
    try {
      await client.from('blogs').update(updates).eq('id', id);
    } catch (e) {
      console.warn('Supabase updateBlogPost error:', e);
    }
  }

  const current = getLocalData<BlogPost[]>(STORAGE_KEYS.BLOGS, DEFAULT_BLOGS);
  saveLocalData(STORAGE_KEYS.BLOGS, current.map(b => b.id === id ? { ...b, ...updates } : b));
  return true;
};

export const deleteBlogPost = async (id: string): Promise<boolean> => {
  const client = getSupabase();
  if (client) {
    try {
      await client.from('blogs').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase deleteBlogPost error:', e);
    }
  }

  const current = getLocalData<BlogPost[]>(STORAGE_KEYS.BLOGS, DEFAULT_BLOGS);
  saveLocalData(STORAGE_KEYS.BLOGS, current.filter(b => b.id !== id));
  return true;
};

// ==========================================
// ENQUIRY MESSAGES API
// ==========================================

export const getMessages = async (): Promise<EnquiryMessage[]> => {
  const client = getSupabase();
  if (client) {
    try {
      const { data, error } = await client.from('messages').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn('Supabase getMessages fallback:', e);
    }
  }
  return getLocalData<EnquiryMessage[]>(STORAGE_KEYS.MESSAGES, DEFAULT_MESSAGES);
};

export const createEnquiryMessage = async (msg: Omit<EnquiryMessage, 'id' | 'created_at' | 'status'>): Promise<EnquiryMessage> => {
  const newMsg: EnquiryMessage = {
    ...msg,
    id: 'msg-' + Date.now(),
    status: 'Unread',
    created_at: new Date().toISOString(),
  };

  const client = getSupabase();
  if (client) {
    try {
      const { data, error } = await client.from('messages').insert([newMsg]).select().single();
      if (!error && data) {
        const list = await getMessages();
        saveLocalData(STORAGE_KEYS.MESSAGES, [data, ...list]);
        return data;
      }
    } catch (e) {
      console.warn('Supabase createEnquiryMessage error:', e);
    }
  }

  const current = getLocalData<EnquiryMessage[]>(STORAGE_KEYS.MESSAGES, DEFAULT_MESSAGES);
  saveLocalData(STORAGE_KEYS.MESSAGES, [newMsg, ...current]);
  return newMsg;
};

export const updateMessageStatus = async (id: string, status: EnquiryMessage['status'], adminNotes?: string): Promise<boolean> => {
  const client = getSupabase();
  const updates: Partial<EnquiryMessage> = { status };
  if (adminNotes !== undefined) updates.admin_notes = adminNotes;

  if (client) {
    try {
      await client.from('messages').update(updates).eq('id', id);
    } catch (e) {
      console.warn('Supabase updateMessageStatus error:', e);
    }
  }

  const current = getLocalData<EnquiryMessage[]>(STORAGE_KEYS.MESSAGES, DEFAULT_MESSAGES);
  saveLocalData(STORAGE_KEYS.MESSAGES, current.map(m => m.id === id ? { ...m, ...updates } : m));
  return true;
};

export const deleteMessage = async (id: string): Promise<boolean> => {
  const client = getSupabase();
  if (client) {
    try {
      await client.from('messages').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase deleteMessage error:', e);
    }
  }

  const current = getLocalData<EnquiryMessage[]>(STORAGE_KEYS.MESSAGES, DEFAULT_MESSAGES);
  saveLocalData(STORAGE_KEYS.MESSAGES, current.filter(m => m.id !== id));
  return true;
};

// ==========================================
// FILE STORAGE UPLOAD (Supabase Storage Bucket)
// ==========================================

export const uploadFileToBucket = async (
  file: File, 
  bucket: 'attachments' | 'portfolio' | 'services' | 'logos' | 'blog' = 'attachments'
): Promise<{ url: string; path: string }> => {
  const client = getSupabase();
  if (client) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `${bucket}/${fileName}`;

      const { data, error } = await client.storage.from(bucket).upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

      if (!error && data) {
        const { data: publicUrlData } = client.storage.from(bucket).getPublicUrl(filePath);
        return { url: publicUrlData.publicUrl, path: filePath };
      } else {
        console.warn('Bucket upload error, fallback to data URL:', error);
      }
    } catch (e) {
      console.warn('Supabase storage upload exception:', e);
    }
  }

  // Fallback Base64 Data URL if Supabase Storage is not provisioned
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve({
        url: reader.result as string,
        path: file.name,
      });
    };
    reader.readAsDataURL(file);
  });
};

// Realtime Subscriptions
export const subscribeToMessages = (onNewMessage: (msg: EnquiryMessage) => void) => {
  const client = getSupabase();
  if (client) {
    const channel = client
      .channel('messages_realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'messages' },
        (payload) => {
          if (payload.new) onNewMessage(payload.new as EnquiryMessage);
        }
      )
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  }
  return () => {};
};
