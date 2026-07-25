import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Layers, 
  DollarSign, 
  MessageSquare, 
  FileText, 
  Settings, 
  Database, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  X, 
  Upload, 
  Download, 
  Search, 
  ExternalLink,
  ShieldCheck,
  Star,
  RefreshCw,
  LogOut,
  Sparkles,
  Zap,
  Globe,
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Github,
  Image,
  Save
} from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { 
  getServices, createService, updateService, deleteService,
  getPortfolio, createPortfolioProject, updatePortfolioProject, deletePortfolioProject,
  getPricing, createPricingPlan, updatePricingPlan, deletePricingPlan,
  getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial,
  getBlogs, createBlogPost, updateBlogPost, deleteBlogPost,
  getMessages, updateMessageStatus, deleteMessage,
  getStoredSupabaseConfig, saveSupabaseConfig, isSupabaseConnected, uploadFileToBucket
} from '../supabase/client';
import { ServiceItem, PortfolioProject, PricingPlan, Testimonial, BlogPost, EnquiryMessage } from '../types';

export const AdminDashboard: React.FC = () => {
  const { settings, updateSettings, adminProfile, updateAdminProfile } = useWebsite();
  const { showToast } = useToast();
  const { logout } = useAuth();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'services' | 'portfolio' | 'pricing' | 'blogs' | 'testimonials' | 'messages' | 'settings' | 'database'
  >('overview');

  // Data State
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioProject[]>([]);
  const [pricing, setPricing] = useState<PricingPlan[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [messages, setMessages] = useState<EnquiryMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modals & Form States
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);
  const [editingPortfolio, setEditingPortfolio] = useState<Partial<PortfolioProject> | null>(null);
  const [editingPricing, setEditingPricing] = useState<Partial<PricingPlan> | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);
  const [editingBlog, setEditingBlog] = useState<Partial<BlogPost> | null>(null);

  // Settings State
  const [settingsForm, setSettingsForm] = useState(settings);

  // Supabase Config State
  const [sbUrl, setSbUrl] = useState('');
  const [sbKey, setSbKey] = useState('');

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [srv, port, prc, tst, blg, msg] = await Promise.all([
        getServices(),
        getPortfolio(),
        getPricing(),
        getTestimonials(),
        getBlogs(),
        getMessages(),
      ]);
      setServices(srv);
      setPortfolio(port);
      setPricing(prc);
      setTestimonials(tst);
      setBlogs(blg);
      setMessages(msg);
    } catch (err) {
      console.warn('Dashboard fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
    const config = getStoredSupabaseConfig();
    setSbUrl(config.url);
    setSbKey(config.key);
    setSettingsForm(settings);
  }, []);

  useEffect(() => {
    setSettingsForm(settings);
  }, [settings]);

  // Statistics Computations
  const unreadMessagesCount = messages.filter(m => m.status === 'Unread').length;

  // --- Handlers ---
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.title || !editingService?.price) return;

    if (editingService.id) {
      await updateService(editingService.id, editingService);
      showToast('Service Updated', 'Service details saved.', 'success');
    } else {
      await createService({
        title: editingService.title || '',
        category: editingService.category || 'Web Development',
        description: editingService.description || '',
        price: Number(editingService.price) || 0,
        discount_price: Number(editingService.discount_price) || 0,
        image_url: editingService.image_url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
        features: editingService.features || ['Custom Development'],
        duration: editingService.duration || '1-2 Weeks',
        is_visible: true,
      });
      showToast('Service Created', 'New service added to catalog.', 'success');
    }
    setEditingService(null);
    loadAllData();
  };

  const handleDeleteService = async (id: string) => {
    if (confirm('Delete this service permanently?')) {
      await deleteService(id);
      showToast('Service Deleted', 'Service removed.', 'info');
      loadAllData();
    }
  };

  const handleSavePortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPortfolio?.title) return;

    if (editingPortfolio.id) {
      await updatePortfolioProject(editingPortfolio.id, editingPortfolio);
      showToast('Project Updated', 'Case study updated.', 'success');
    } else {
      await createPortfolioProject({
        title: editingPortfolio.title || '',
        slug: (editingPortfolio.title || '').toLowerCase().replace(/[^a-z0-9]/g, '-'),
        description: editingPortfolio.description || '',
        category: editingPortfolio.category || 'Web Development',
        tech_stack: editingPortfolio.tech_stack || ['React', 'TypeScript'],
        client_name: editingPortfolio.client_name || 'Client',
        completion_date: editingPortfolio.completion_date || '2026-01-01',
        status: 'Completed',
        cover_image: editingPortfolio.cover_image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
        gallery_images: [],
        github_url: editingPortfolio.github_url || '',
        live_demo_url: editingPortfolio.live_demo_url || '',
        is_visible: true,
      });
      showToast('Project Created', 'New case study added to portfolio.', 'success');
    }
    setEditingPortfolio(null);
    loadAllData();
  };

  const handleDeletePortfolio = async (id: string) => {
    if (confirm('Delete this portfolio project?')) {
      await deletePortfolioProject(id);
      showToast('Project Deleted', 'Case study removed.', 'info');
      loadAllData();
    }
  };

  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);

  const handleUploadLogoFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingLogo(true);
    try {
      const res = await uploadFileToBucket(file, 'logos');
      setSettingsForm(prev => ({ ...prev, logo_url: res.url }));
      showToast('Logo Uploaded', 'New logo uploaded to Supabase storage.', 'success');
    } catch (err) {
      showToast('Upload Error', 'Could not upload logo.', 'error');
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleUploadFaviconFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingFavicon(true);
    try {
      const res = await uploadFileToBucket(file, 'logos');
      setSettingsForm(prev => ({ ...prev, favicon_url: res.url }));
      showToast('Favicon Uploaded', 'New favicon uploaded to Supabase storage.', 'success');
    } catch (err) {
      showToast('Upload Error', 'Could not upload favicon.', 'error');
    } finally {
      setUploadingFavicon(false);
    }
  };

  const handleUploadHeroFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingHero(true);
    try {
      const res = await uploadFileToBucket(file, 'portfolio');
      setSettingsForm(prev => ({ ...prev, hero_image_url: res.url }));
      showToast('Hero Banner Uploaded', 'Hero banner image saved.', 'success');
    } catch (err) {
      showToast('Upload Error', 'Could not upload hero image.', 'error');
    } finally {
      setUploadingHero(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const success = await updateSettings(settingsForm);
      if (success) {
        showToast('Website Settings Saved Successfully!', 'All branding, copy, contact numbers, map links, and social URLs updated across the entire app.', 'success');
      }
    } catch (err) {
      showToast('Save Failed', 'Could not save website settings.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSupabaseConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveSupabaseConfig(sbUrl, sbKey);
    showToast('Supabase Saved', 'Database connection parameters updated.', 'success');
    loadAllData();
  };

  const exportMessagesCSV = () => {
    const headers = ['ID', 'Name', 'Company', 'Email', 'Phone', 'Project Type', 'Budget', 'Status', 'Message', 'Created At'];
    const rows = messages.map(m => [
      m.id, `"${m.name}"`, `"${m.company || ''}"`, m.email, m.phone, m.project_type, m.budget || '', m.status, `"${m.message.replace(/"/g, '""')}"`, m.created_at
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Drums_of_Liberation_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Admin Header Bar */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={adminProfile.photo_url}
            alt={adminProfile.name}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-blue-500/30"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-white">{adminProfile.name}</h1>
              <span className="bg-blue-600 text-[10px] font-black uppercase px-2 py-0.5 rounded text-white">
                ADMIN PORTAL
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{settings.powered_by}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={loadAllData}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={logout}
            className="px-4 py-2.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800/40 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none bg-white p-2 rounded-2xl border border-slate-200">
        {[
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'services', label: 'Services', icon: Briefcase },
          { id: 'portfolio', label: 'Portfolio', icon: Layers },
          { id: 'pricing', label: 'Pricing', icon: DollarSign },
          { id: 'blogs', label: 'Blog', icon: FileText },
          { id: 'testimonials', label: 'Reviews', icon: Star },
          { id: 'messages', label: `Enquiries (${unreadMessagesCount})`, icon: MessageSquare },
          { id: 'settings', label: 'Branding Settings', icon: Settings },
          { id: 'database', label: 'Supabase Config', icon: Database },
        ].map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                active
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT */}

      {/* 1. OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">Active Services</span>
              <p className="text-3xl font-black text-slate-900">{services.length}</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">Portfolio Projects</span>
              <p className="text-3xl font-black text-slate-900">{portfolio.length}</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">Total Enquiries</span>
              <p className="text-3xl font-black text-slate-900">{messages.length}</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-amber-500 uppercase">Unread Enquiries</span>
              <p className="text-3xl font-black text-amber-600">{unreadMessagesCount}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Recent Enquiries</h3>
              <button onClick={() => setActiveTab('messages')} className="text-xs font-bold text-blue-600">
                View All Enquiries →
              </button>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {messages.slice(0, 5).map(m => (
                <div key={m.id} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <strong className="text-slate-900 block">{m.name} ({m.company || 'Individual'})</strong>
                    <span className="text-slate-500">{m.project_type} • Budget: {m.budget}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    m.status === 'Unread' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 2. SERVICES MANAGER */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900">Manage Services Catalog</h2>
            <button
              onClick={() => setEditingService({ title: '', category: 'Web Development', price: 15000, features: [] })}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" /> Add New Service
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(srv => (
              <div key={srv.id} className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
                <img src={srv.image_url} alt={srv.title} className="w-full h-36 rounded-2xl object-cover" />
                <div>
                  <span className="text-[10px] font-bold uppercase text-blue-600">{srv.category}</span>
                  <h3 className="text-base font-bold text-slate-900">{srv.title}</h3>
                  <p className="text-lg font-extrabold text-emerald-600 mt-1">₹{srv.discount_price || srv.price}</p>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setEditingService(srv)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteService(srv.id)}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs font-bold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. PORTFOLIO MANAGER */}
      {activeTab === 'portfolio' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900">Manage Portfolio Case Studies</h2>
            <button
              onClick={() => setEditingPortfolio({ title: '', category: 'Web Development', tech_stack: ['React', 'TypeScript'] })}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" /> Add Case Study
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolio.map(p => (
              <div key={p.id} className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
                <img src={p.cover_image} alt={p.title} className="w-full h-40 rounded-2xl object-cover" />
                <div>
                  <span className="text-[10px] font-bold uppercase text-purple-600">{p.category}</span>
                  <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
                  <p className="text-xs text-slate-500 font-mono">Client: {p.client_name}</p>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setEditingPortfolio(p)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDeletePortfolio(p.id)}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs font-bold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. MESSAGES MANAGER */}
      {activeTab === 'messages' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900">Enquiries & Leads ({messages.length})</h2>
            <button
              onClick={exportMessagesCSV}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <Download className="w-4 h-4" /> Export Enquiries CSV
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="divide-y divide-slate-100 text-xs">
              {messages.map(m => (
                <div key={m.id} className="p-6 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">{m.name} <span className="text-slate-400 font-normal">({m.company || 'Individual'})</span></h4>
                      <p className="text-slate-500 font-mono mt-0.5">{m.email} • {m.phone}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={m.status}
                        onChange={(e) => {
                          updateMessageStatus(m.id, e.target.value as any);
                          loadAllData();
                        }}
                        className="px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800"
                      >
                        <option value="Unread">Unread</option>
                        <option value="Read">Read</option>
                        <option value="Replied">Replied</option>
                        <option value="Archived">Archived</option>
                      </select>

                      <button
                        onClick={async () => {
                          if (confirm('Delete enquiry?')) {
                            await deleteMessage(m.id);
                            loadAllData();
                          }
                        }}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                    <p className="font-bold text-slate-700">Project Type: {m.project_type} | Budget: {m.budget} | Deadline: {m.deadline}</p>
                    <p className="text-slate-600 leading-relaxed">{m.message}</p>
                  </div>

                  {m.attachment_url && (
                    <div className="flex items-center gap-2 text-blue-600 font-bold text-xs">
                      <Upload className="w-4 h-4" />
                      <a href={m.attachment_url} target="_blank" rel="noreferrer" className="underline">
                        View Attachment ({m.attachment_name || 'File'})
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 8. WEBSITE & BRANDING SETTINGS SECTION */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="space-y-8">
          
          {/* Header Action Card */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-blue-400 font-extrabold text-xs uppercase tracking-wider">
                <Settings className="w-4 h-4" /> Global Control Panel
              </div>
              <h2 className="text-2xl font-black text-white mt-1">Website Settings & Dynamic Content</h2>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                Manage your website branding, logo, contact numbers, social channels, hero banners, and company copy. All changes are stored in Supabase and updated instantly across Navbar, Footer, Hero, and Contact pages.
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-xl shadow-blue-900/40 flex items-center gap-2 shrink-0 transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> Save Website Settings
            </button>
          </div>

          {/* 1. BRAND IDENTITY & LOGOS */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600 font-bold">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Brand Identity & Logos</h3>
                <p className="text-xs text-slate-500">Configure website title, company name, logo image, and favicon icon.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Website Name</label>
                <input
                  type="text"
                  placeholder="e.g. Drums of Liberation"
                  value={settingsForm.website_name || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, website_name: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Company Name</label>
                <input
                  type="text"
                  placeholder="e.g. Shivronix Technologies"
                  value={settingsForm.company_name || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, company_name: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Brand Title</label>
                <input
                  type="text"
                  placeholder="e.g. Drums of Liberation"
                  value={settingsForm.brand_title || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, brand_title: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Website Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. Liberating Businesses Through Technology"
                  value={settingsForm.tagline || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Powered By Badge Text</label>
                <input
                  type="text"
                  placeholder="e.g. Powered by Shivronix Technologies"
                  value={settingsForm.powered_by || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, powered_by: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Logo and Favicon Uploader Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              
              {/* Logo Card */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                    <Image className="w-4 h-4 text-blue-600" /> Website Logo
                  </label>
                  {settingsForm.logo_url && (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Custom Logo Active
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-200 p-2 flex items-center justify-center shrink-0 overflow-hidden">
                    {settingsForm.logo_url ? (
                      <img src={settingsForm.logo_url} alt="Logo Preview" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                    ) : (
                      <Zap className="w-8 h-8 text-blue-400" />
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      placeholder="Logo Image URL (or upload below)"
                      value={settingsForm.logo_url || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, logo_url: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 font-mono"
                    />

                    <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5 text-blue-400" />
                      {uploadingLogo ? 'Uploading to Supabase...' : 'Upload Logo File'}
                      <input type="file" accept="image/*" onChange={handleUploadLogoFile} className="hidden" disabled={uploadingLogo} />
                    </label>
                  </div>
                </div>
              </div>

              {/* Favicon Card */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                    <Image className="w-4 h-4 text-purple-600" /> Favicon Icon
                  </label>
                  {settingsForm.favicon_url && (
                    <span className="text-[10px] font-bold text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                      Custom Favicon Active
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-200 p-2 flex items-center justify-center shrink-0 overflow-hidden">
                    {settingsForm.favicon_url ? (
                      <img src={settingsForm.favicon_url} alt="Favicon Preview" className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />
                    ) : (
                      <Sparkles className="w-8 h-8 text-purple-400" />
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      placeholder="Favicon Image URL (or upload below)"
                      value={settingsForm.favicon_url || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, favicon_url: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 font-mono"
                    />

                    <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5 text-purple-400" />
                      {uploadingFavicon ? 'Uploading to Supabase...' : 'Upload Favicon File'}
                      <input type="file" accept="image/*" onChange={handleUploadFaviconFile} className="hidden" disabled={uploadingFavicon} />
                    </label>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* 2. HERO SECTION & BANNER IMAGE */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Hero Section Copy & Banner Image</h3>
                <p className="text-xs text-slate-500">Customize the main landing page headline, subtitle, buttons, and hero banner image.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Hero Main Title (H1 Headline)</label>
                <input
                  type="text"
                  placeholder="e.g. Liberating Businesses Through Technology"
                  value={settingsForm.hero_title || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, hero_title: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Hero Subtitle Copy</label>
                <textarea
                  rows={3}
                  placeholder="e.g. We build high-performance web applications, mobile apps, custom ERPs, and AI automation..."
                  value={settingsForm.hero_subtitle || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, hero_subtitle: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Primary CTA Button Label</label>
                  <input
                    type="text"
                    placeholder="e.g. Start Your Project"
                    value={settingsForm.primary_button_text || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, primary_button_text: e.target.value })}
                    className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Secondary CTA Button Label</label>
                  <input
                    type="text"
                    placeholder="e.g. Explore Portfolio"
                    value={settingsForm.secondary_button_text || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, secondary_button_text: e.target.value })}
                    className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium"
                  />
                </div>
              </div>

              {/* Hero Banner Image Card */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <label className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                  <Image className="w-4 h-4 text-indigo-600" /> Hero Banner Showcase Image
                </label>

                {settingsForm.hero_image_url && (
                  <div className="relative rounded-2xl max-h-48 overflow-hidden border border-slate-300">
                    <img src={settingsForm.hero_image_url} alt="Hero Banner Preview" className="w-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="text"
                    placeholder="Hero Banner Image URL (or upload file)"
                    value={settingsForm.hero_image_url || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, hero_image_url: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 font-mono"
                  />

                  <label className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer transition-colors whitespace-nowrap flex items-center gap-2 shrink-0">
                    <Upload className="w-4 h-4 text-indigo-400" />
                    {uploadingHero ? 'Uploading...' : 'Upload Banner Image'}
                    <input type="file" accept="image/*" onChange={handleUploadHeroFile} className="hidden" disabled={uploadingHero} />
                  </label>
                </div>
              </div>

            </div>
          </div>

          {/* 3. CONTACT INFORMATION & MAP LOCATION */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 font-bold">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Contact Details & Google Maps</h3>
                <p className="text-xs text-slate-500">Configure phone numbers, email address, physical address, Google Maps link, and WhatsApp numbers.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Primary Phone Hotline *</label>
                <input
                  type="text"
                  placeholder="e.g. +91 98765 43210"
                  value={settingsForm.phone || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Secondary Phone Number</label>
                <input
                  type="text"
                  placeholder="e.g. +91 98765 43211"
                  value={settingsForm.secondary_phone || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, secondary_phone: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Official Email Address *</label>
                <input
                  type="email"
                  placeholder="e.g. contact@shivronix.com"
                  value={settingsForm.email || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">WhatsApp Number *</label>
                <input
                  type="text"
                  placeholder="e.g. +91 98765 43210"
                  value={settingsForm.whatsapp_number || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp_number: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Business / Operating Hours</label>
                <input
                  type="text"
                  placeholder="e.g. Mon - Sat: 9:00 AM - 7:00 PM IST"
                  value={settingsForm.working_hours || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, working_hours: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Physical Office Address</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Shivronix Towers, Tech Park Road, Chennai, Tamil Nadu, India"
                  value={settingsForm.address || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Google Maps Location URL</label>
                <textarea
                  rows={3}
                  placeholder="e.g. https://maps.google.com/?q=Shivronix+Technologies"
                  value={settingsForm.google_maps_url || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, google_maps_url: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-mono"
                />
              </div>
            </div>
          </div>

          {/* 4. SOCIAL MEDIA LINKS */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="p-2.5 rounded-2xl bg-pink-50 text-pink-600 font-bold">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Social Media Profiles</h3>
                <p className="text-xs text-slate-500">Provide direct links to your social media platforms displayed in the website footer.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Facebook className="w-4 h-4 text-blue-600" /> Facebook Page URL
                </label>
                <input
                  type="url"
                  placeholder="https://facebook.com/shivronix"
                  value={settingsForm.facebook_url || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, facebook_url: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Instagram className="w-4 h-4 text-pink-600" /> Instagram Handle URL
                </label>
                <input
                  type="url"
                  placeholder="https://instagram.com/shivronix"
                  value={settingsForm.instagram_url || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, instagram_url: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Linkedin className="w-4 h-4 text-blue-700" /> LinkedIn Company URL
                </label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/company/shivronix"
                  value={settingsForm.linkedin_url || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, linkedin_url: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Twitter className="w-4 h-4 text-slate-800" /> X / Twitter URL
                </label>
                <input
                  type="url"
                  placeholder="https://x.com/shivronix"
                  value={settingsForm.twitter_url || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, twitter_url: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Youtube className="w-4 h-4 text-red-600" /> YouTube Channel URL
                </label>
                <input
                  type="url"
                  placeholder="https://youtube.com/@shivronix"
                  value={settingsForm.youtube_url || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, youtube_url: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Github className="w-4 h-4 text-slate-900" /> GitHub Repository URL
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/shivronix"
                  value={settingsForm.github_url || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, github_url: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium"
                />
              </div>
            </div>
          </div>

          {/* 5. FOOTER & COPYRIGHT TEXT */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600 font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Footer Text & Copyright Notices</h3>
                <p className="text-xs text-slate-500">Customize the text displayed in the website footer and copyright line.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Footer Description Text</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Delivering high-performance software engineering, bespoke mobile apps, AI automation..."
                  value={settingsForm.footer_text || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, footer_text: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Copyright Line Text</label>
                <input
                  type="text"
                  placeholder="e.g. © 2026 Drums of Liberation. All Rights Reserved."
                  value={settingsForm.copyright_text || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, copyright_text: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium"
                />
              </div>
            </div>
          </div>

          {/* 6. ABOUT US PAGE CONTENT */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="p-2.5 rounded-2xl bg-purple-50 text-purple-600 font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">About Us Page Content</h3>
                <p className="text-xs text-slate-500">Define your company story, mission statement, and long-term vision.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Company Story</label>
                <textarea
                  rows={4}
                  placeholder="Describe how your software agency was founded, your core expertise, and client focus..."
                  value={settingsForm.about_story || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, about_story: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Mission Statement</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Our mission is to liberate businesses through cutting-edge technology..."
                    value={settingsForm.mission || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, mission: e.target.value })}
                    className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Vision Statement</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. To become the world's most trusted software engineering partner..."
                    value={settingsForm.vision || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, vision: e.target.value })}
                    className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Save Action Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-blue-900/40 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <Save className="w-5 h-5" /> Save All Website Settings
            </button>
          </div>

        </form>
      )}

      {/* 9. DATABASE & SUPABASE CONFIG */}
      {activeTab === 'database' && (
        <div className="space-y-8">
          <form onSubmit={handleSaveSupabaseConfig} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900">Supabase Connection Parameters</h2>
                <p className="text-xs text-slate-500">Configure your project URL and Anon Public API Key.</p>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                isSupabaseConnected() ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {isSupabaseConnected() ? '✓ Connected to Supabase' : 'Fallback Local Data Mode'}
              </span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Supabase Project URL</label>
                <input
                  type="text"
                  placeholder="https://xyz.supabase.co"
                  value={sbUrl}
                  onChange={(e) => setSbUrl(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Supabase Anon Key</label>
                <input
                  type="password"
                  placeholder="eyJhbGci..."
                  value={sbKey}
                  onChange={(e) => setSbKey(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-8 py-3 rounded-2xl bg-blue-600 text-white font-extrabold text-xs shadow-lg"
            >
              Save Database Credentials
            </button>
          </form>

          {/* SQL Schema Script Box */}
          <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold">Supabase PostgreSQL Database Migration Script</h3>
            <p className="text-xs text-slate-400">
              Copy and execute this script inside your Supabase SQL Editor to automatically provision all required tables and storage bucket policies.
            </p>
            <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] font-mono text-emerald-400 overflow-x-auto max-h-60">
              {`-- Execute in Supabase SQL Editor
CREATE TABLE IF NOT EXISTS website_settings (
  id TEXT PRIMARY KEY DEFAULT 'main',
  company_name TEXT DEFAULT 'Shivronix Technologies',
  brand_title TEXT DEFAULT 'Drums of Liberation',
  tagline TEXT DEFAULT 'Liberating Businesses Through Technology',
  powered_by TEXT DEFAULT 'Powered by Shivronix Technologies',
  hero_title TEXT,
  hero_subtitle TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  whatsapp_number TEXT
);
-- Additional tables: services, portfolio, pricing, testimonials, blogs, messages`}
            </pre>
          </div>
        </div>
      )}

      {/* SERVICE EDIT MODAL */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleSaveService} className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-slate-900">{editingService.id ? 'Edit Service' : 'Add New Service'}</h3>
              <button type="button" onClick={() => setEditingService(null)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingService.title || ''}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={editingService.category || 'Web Development'}
                    onChange={(e) => setEditingService({ ...editingService, category: e.target.value as any })}
                    className="w-full p-3 rounded-xl bg-slate-50 border text-xs"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile Apps">Mobile Apps</option>
                    <option value="Software & ERP">Software & ERP</option>
                    <option value="AI & Automation">AI & Automation</option>
                    <option value="UI/UX & Branding">UI/UX & Branding</option>
                    <option value="Video Editing">Video Editing</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={editingService.price || 0}
                    onChange={(e) => setEditingService({ ...editingService, price: Number(e.target.value) })}
                    className="w-full p-3 rounded-xl bg-slate-50 border text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingService.description || ''}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Image URL</label>
                <input
                  type="text"
                  value={editingService.image_url || ''}
                  onChange={(e) => setEditingService({ ...editingService, image_url: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border text-xs font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button type="button" onClick={() => setEditingService(null)} className="px-4 py-2 bg-slate-100 text-xs font-bold rounded-xl">Cancel</button>
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl">Save Service</button>
            </div>
          </form>
        </div>
      )}

      {/* PORTFOLIO EDIT MODAL */}
      {editingPortfolio && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleSavePortfolio} className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-slate-900">{editingPortfolio.id ? 'Edit Case Study' : 'Add Case Study'}</h3>
              <button type="button" onClick={() => setEditingPortfolio(null)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={editingPortfolio.title || ''}
                  onChange={(e) => setEditingPortfolio({ ...editingPortfolio, title: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={editingPortfolio.category || 'Web Development'}
                    onChange={(e) => setEditingPortfolio({ ...editingPortfolio, category: e.target.value as any })}
                    className="w-full p-3 rounded-xl bg-slate-50 border text-xs"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile Apps">Mobile Apps</option>
                    <option value="Software & ERP">Software & ERP</option>
                    <option value="AI & Automation">AI & Automation</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Client Name</label>
                  <input
                    type="text"
                    value={editingPortfolio.client_name || ''}
                    onChange={(e) => setEditingPortfolio({ ...editingPortfolio, client_name: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingPortfolio.description || ''}
                  onChange={(e) => setEditingPortfolio({ ...editingPortfolio, description: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={editingPortfolio.cover_image || ''}
                  onChange={(e) => setEditingPortfolio({ ...editingPortfolio, cover_image: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border text-xs font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button type="button" onClick={() => setEditingPortfolio(null)} className="px-4 py-2 bg-slate-100 text-xs font-bold rounded-xl">Cancel</button>
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl">Save Case Study</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
