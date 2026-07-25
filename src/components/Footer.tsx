import React from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Youtube, 
  Facebook,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Heart
} from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext';
import { PageTab } from './Header';

interface Props {
  setActiveTab: (tab: PageTab) => void;
}

export const Footer: React.FC<Props> = ({ setActiveTab }) => {
  const { settings } = useWebsite();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              {settings.logo_url ? (
                <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-800 p-1 shadow-lg shadow-blue-950/50 flex items-center justify-center overflow-hidden">
                  <img 
                    src={settings.logo_url} 
                    alt={settings.website_name || settings.brand_title}
                    className="w-full h-full object-contain rounded-xl"
                    referrerPolicy="no-referrer"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-blue-950/50">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                    <Zap className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
              )}
              <div>
                <h3 className="text-xl font-black text-white">{settings.website_name || settings.brand_title}</h3>
                <p className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">{settings.powered_by}</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              {settings.footer_text || settings.about_story || 'Delivering high-performance software engineering, bespoke mobile apps, AI automation, custom ERPs, and digital branding solutions for ambitious companies worldwide.'}
            </p>

            {/* Social Links (All 6 platforms) */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {settings.facebook_url && (
                <a href={settings.facebook_url} target="_blank" rel="noreferrer" title="Facebook" className="p-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white transition-all">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings.instagram_url && (
                <a href={settings.instagram_url} target="_blank" rel="noreferrer" title="Instagram" className="p-2 rounded-xl bg-slate-900 hover:bg-pink-600 text-slate-300 hover:text-white transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings.linkedin_url && (
                <a href={settings.linkedin_url} target="_blank" rel="noreferrer" title="LinkedIn" className="p-2 rounded-xl bg-slate-900 hover:bg-blue-500 text-slate-300 hover:text-white transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {settings.twitter_url && (
                <a href={settings.twitter_url} target="_blank" rel="noreferrer" title="X (Twitter)" className="p-2 rounded-xl bg-slate-900 hover:bg-slate-700 text-slate-300 hover:text-white transition-all">
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {settings.youtube_url && (
                <a href={settings.youtube_url} target="_blank" rel="noreferrer" title="YouTube" className="p-2 rounded-xl bg-slate-900 hover:bg-red-600 text-slate-300 hover:text-white transition-all">
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              {settings.github_url && (
                <a href={settings.github_url} target="_blank" rel="noreferrer" title="GitHub" className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-all">
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-blue-400 transition-colors">Home Page</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-blue-400 transition-colors">Digital Services</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('portfolio')} className="hover:text-blue-400 transition-colors">Case Studies & Portfolio</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('pricing')} className="hover:text-blue-400 transition-colors">Pricing Plans</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-blue-400 transition-colors">About Shivronix</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('blog')} className="hover:text-blue-400 transition-colors">Engineering Blog</button>
              </li>
            </ul>
          </div>

          {/* Services Offered */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Core Capabilities</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setActiveTab('services')} className="hover:text-blue-400 transition-colors">Web Development</button></li>
              <li><button onClick={() => setActiveTab('services')} className="hover:text-blue-400 transition-colors">Android & iOS Apps</button></li>
              <li><button onClick={() => setActiveTab('services')} className="hover:text-blue-400 transition-colors">Billing & POS Systems</button></li>
              <li><button onClick={() => setActiveTab('services')} className="hover:text-blue-400 transition-colors">Custom Enterprise ERP</button></li>
              <li><button onClick={() => setActiveTab('services')} className="hover:text-blue-400 transition-colors">AI Agents & Chatbots</button></li>
              <li><button onClick={() => setActiveTab('services')} className="hover:text-blue-400 transition-colors">UI/UX & Branding</button></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Global Headquarters</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-mono">{settings.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-500 shrink-0" />
                <span>{settings.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{settings.working_hours}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500">
            {settings.copyright_text || `© ${new Date().getFullYear()} ${settings.website_name || settings.brand_title}. All Rights Reserved.`}
          </p>

          <p className="text-indigo-400 font-bold flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> {settings.powered_by}
          </p>

          <div className="flex items-center gap-4 text-slate-500">
            <button onClick={() => setActiveTab('privacy')} className="hover:text-slate-300 transition-colors">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => setActiveTab('terms')} className="hover:text-slate-300 transition-colors">Terms of Service</button>
            <span>•</span>
            <button onClick={() => setActiveTab('admin')} className="hover:text-slate-300 transition-colors">Admin Portal</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
