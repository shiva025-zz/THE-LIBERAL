import React, { useState } from 'react';
import { 
  Building2, 
  Database, 
  ShieldCheck, 
  LogOut, 
  PhoneCall,
  LayoutDashboard,
  Rocket,
  Menu,
  X,
  User,
  Sparkles,
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWebsite } from '../context/WebsiteContext';
import { getStoredSupabaseConfig } from '../supabase/client';

export type PageTab = 
  | 'home' 
  | 'services' 
  | 'portfolio' 
  | 'pricing' 
  | 'about' 
  | 'testimonials' 
  | 'blog' 
  | 'contact' 
  | 'login' 
  | 'admin'
  | 'privacy'
  | 'terms';

interface Props {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  onOpenConfigModal: () => void;
}

export const Header: React.FC<Props> = ({ activeTab, setActiveTab, onOpenConfigModal }) => {
  const { user, isAdmin, logout } = useAuth();
  const { settings } = useWebsite();
  const creds = getStoredSupabaseConfig();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isConnected = Boolean(creds.url && creds.key);

  const navTabs: { id: PageTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'about', label: 'About Us' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 text-white transition-all shadow-xl">
      
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-xs py-1.5 px-4 border-b border-slate-800/60 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-slate-300">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-bold text-blue-400">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" /> {settings.powered_by}
            </span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-400 flex items-center gap-1 font-mono">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" /> {settings.phone}
            </span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-400 text-[11px]">
              {settings.tagline}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Supabase Status Pill */}
            <button
              onClick={onOpenConfigModal}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1.5 border transition-all ${
                isConnected
                  ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/30 hover:bg-emerald-900'
                  : 'bg-amber-950/80 text-amber-300 border-amber-500/30 hover:bg-amber-900'
              }`}
            >
              <Database className="w-3 h-3" />
              {isConnected ? 'Supabase Connected' : 'Database Settings'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 group text-left shrink-0"
        >
          {settings.logo_url ? (
            <div className="w-11 h-11 rounded-2xl bg-slate-900 border border-slate-800 p-1 shadow-lg shadow-blue-950/50 group-hover:scale-105 transition-transform overflow-hidden flex items-center justify-center">
              <img 
                src={settings.logo_url} 
                alt={settings.website_name || settings.brand_title} 
                className="w-full h-full object-contain rounded-xl"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          ) : (
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-emerald-500 p-0.5 shadow-lg shadow-blue-950/50 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-blue-400 transition-colors">
                {settings.website_name || settings.brand_title}
              </h1>
            </div>
            <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">
              {settings.powered_by}
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800/80">
          {navTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons Right */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setActiveTab('contact')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-900/30 flex items-center gap-1.5"
          >
            <Rocket className="w-4 h-4" /> Start Your Project
          </button>

          {user ? (
            <div className="flex items-center gap-2 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
              {isAdmin ? (
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 ${
                    activeTab === 'admin' ? 'bg-indigo-600 text-white' : 'text-indigo-300 hover:bg-slate-800'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" /> Admin Control
                </button>
              ) : (
                <span className="text-xs text-slate-300 px-3 font-semibold">{user.name}</span>
              )}
              <button
                onClick={logout}
                title="Logout"
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setActiveTab('login')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                activeTab === 'login'
                  ? 'border-blue-500 text-blue-400 bg-blue-500/10'
                  : 'border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <User className="w-4 h-4" /> Admin Login
            </button>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 p-4 space-y-3 animate-in slide-in-from-top-2 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-1.5">
            {navTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-3 rounded-xl text-left font-bold text-xs ${
                  activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <button
              onClick={() => {
                setActiveTab('contact');
                setMobileMenuOpen(false);
              }}
              className="w-full p-3 rounded-xl bg-blue-600 text-white font-bold text-center text-xs flex items-center justify-center gap-2"
            >
              <Rocket className="w-4 h-4" /> Start Your Project
            </button>

            {user ? (
              <div className="space-y-2 pt-1">
                {isAdmin && (
                  <button
                    onClick={() => {
                      setActiveTab('admin');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full p-3 rounded-xl bg-indigo-600 text-white font-bold text-center text-xs"
                  >
                    Open Admin Dashboard
                  </button>
                )}
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full p-3 rounded-xl bg-rose-950/60 text-rose-300 border border-rose-800/40 font-bold text-center text-xs"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setActiveTab('login');
                  setMobileMenuOpen(false);
                }}
                className="w-full p-3 rounded-xl border border-slate-800 text-slate-200 font-bold text-center text-xs"
              >
                Admin Login
              </button>
            )}

            <button
              onClick={() => {
                onOpenConfigModal();
                setMobileMenuOpen(false);
              }}
              className="w-full p-2 text-center text-xs text-amber-400 font-semibold"
            >
              {isConnected ? '✓ Supabase Connected' : '⚙ Database Settings'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
