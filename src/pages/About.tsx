import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Zap, 
  Award, 
  Users, 
  Target, 
  Eye, 
  Sparkles,
  CheckCircle2,
  Code2,
  Database,
  Cpu,
  Globe2
} from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext';
import { PageTab } from '../components/Header';

interface Props {
  setActiveTab: (tab: PageTab) => void;
}

export const AboutPage: React.FC<Props> = ({ setActiveTab }) => {
  const { settings } = useWebsite();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
          {settings.powered_by}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          About {settings.brand_title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {settings.tagline} — Delivers custom software engineering, cloud architecture, and digital transformation for ambitious global enterprises.
        </p>
      </div>

      {/* Story & Vision Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl w-fit">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Our Company Story</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {settings.about_story}
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-mono font-bold text-blue-600">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> A Division of Shivronix Technologies
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-blue-400 font-extrabold text-sm uppercase">
              <Target className="w-5 h-5" /> Our Mission
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {settings.mission}
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-950 to-slate-950 text-white p-6 rounded-3xl border border-indigo-900/50 space-y-3">
            <div className="flex items-center gap-2 text-purple-400 font-extrabold text-sm uppercase">
              <Eye className="w-5 h-5" /> Our Vision
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {settings.vision}
            </p>
          </div>
        </div>

      </div>

      {/* Core Engineering Principles */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Our Engineering Philosophy</h2>
          <p className="text-xs text-slate-500">How Shivronix Technologies guarantees zero-defect software execution.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3">
            <Code2 className="w-8 h-8 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">Clean, Typed Architecture</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We write strict TypeScript and modular React codebases that are self-documenting, maintainable, and built for long-term scalability.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3">
            <Database className="w-8 h-8 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">Row-Level Database Security</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Using Supabase PostgreSQL with custom RLS policies ensures customer data is completely isolated, protected, and compliant.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3">
            <Cpu className="w-8 h-8 text-purple-600" />
            <h3 className="text-base font-bold text-slate-900">Sub-Second Performance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every app is tested against Google Lighthouse standards to ensure sub-second initial page loads and high SEO scores.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
