import React, { useState } from 'react';
import { X, Database, Copy, Check, ExternalLink, ShieldCheck, Server } from 'lucide-react';
import { getStoredSupabaseConfig, saveSupabaseConfig, isSupabaseConnected } from '../supabase/client';
import { useToast } from '../context/ToastContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseConfigModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { showToast } = useToast();
  const currentCreds = getStoredSupabaseConfig();
  const [url, setUrl] = useState(currentCreds.url);
  const [anonKey, setAnonKey] = useState(currentCreds.key);
  const [copiedSql, setCopiedSql] = useState(false);
  const [activeTab, setActiveTab] = useState<'config' | 'sql'>('config');

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || !anonKey.trim()) {
      showToast('Missing Credentials', 'Please fill in both Supabase Project URL and Anon Key.', 'warning');
      return;
    }
    saveSupabaseConfig(url.trim(), anonKey.trim());
    showToast('Credentials Saved', 'Supabase configuration updated successfully.', 'success');
    onClose();
  };

  const sqlCode = `-- ========================================================
-- DRUMS OF LIBERATION (Powered by Shivronix Technologies)
-- SUPABASE POSTGRESQL SCHEMA & STORAGE BUCKET MIGRATION
-- ========================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- WEBSITE SETTINGS
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

-- SERVICES TABLE
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY DEFAULT ('srv-' || uuid_generate_v4()),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL,
  image_url TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PORTFOLIO TABLE
CREATE TABLE IF NOT EXISTS portfolio (
  id TEXT PRIMARY KEY DEFAULT ('port-' || uuid_generate_v4()),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  tech_stack TEXT[] DEFAULT '{}',
  client_name TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- MESSAGES & ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY DEFAULT ('msg-' || uuid_generate_v4()),
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  budget TEXT,
  project_type TEXT NOT NULL,
  message TEXT NOT NULL,
  attachment_url TEXT,
  status TEXT DEFAULT 'Unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- BUCKET PROVISIONING
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('attachments', 'attachments', true),
  ('portfolio', 'portfolio', true),
  ('services', 'services', true)
ON CONFLICT (id) DO NOTHING;
`;

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(sqlCode);
    setCopiedSql(true);
    showToast('SQL Copied', 'Paste this script into Supabase SQL Editor', 'info');
    setTimeout(() => setCopiedSql(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full text-slate-100 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Supabase Project Configuration</h2>
              <p className="text-xs text-slate-400">Configure database credentials & Storage bucket</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 px-6 pt-2">
          <button
            onClick={() => setActiveTab('config')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'config'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Server className="w-4 h-4" /> Credentials
          </button>
          <button
            onClick={() => setActiveTab('sql')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'sql'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> SQL Schema Script
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'config' ? (
            <form onSubmit={handleSave} className="space-y-5">
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  {isSupabaseConnected() ? 'Connected to Supabase' : 'Running in Local Memory Fallback Mode'}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Provide your Supabase URL and Anon Key below. The app works in memory / local storage out-of-the-box until configured!
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  VITE_SUPABASE_URL
                </label>
                <input
                  type="url"
                  placeholder="https://your-project.supabase.co"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:border-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  VITE_SUPABASE_ANON_KEY
                </label>
                <textarea
                  rows={3}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  value={anonKey}
                  onChange={e => setAnonKey(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:border-blue-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <a
                  href="https://supabase.com/dashboard"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:underline"
                >
                  Open Supabase Dashboard <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-lg shadow-blue-900/30"
                >
                  Save Credentials
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-300">Copy this SQL script into your Supabase SQL Editor to provision tables and storage buckets.</p>
                <button
                  onClick={copySqlToClipboard}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-bold border border-blue-500/30 transition-all"
                >
                  {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedSql ? 'Copied!' : 'Copy SQL'}
                </button>
              </div>
              <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-emerald-400 font-mono text-xs overflow-x-auto max-h-80 leading-relaxed">
                {sqlCode}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
