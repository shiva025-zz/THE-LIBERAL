import React from 'react';
import { ShieldCheck, FileText } from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext';

export const PrivacyTermsPage: React.FC<{ type: 'privacy' | 'terms' }> = ({ type }) => {
  const { settings } = useWebsite();

  if (type === 'privacy') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase">{settings.powered_by}</span>
          <h1 className="text-3xl font-black text-slate-900">Privacy Policy</h1>
          <p className="text-xs text-slate-500">Last updated: January 2026</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-xs text-slate-700 leading-relaxed">
          <h3 className="text-sm font-bold text-slate-900">1. Information We Collect</h3>
          <p>We collect contact information, company details, and project requirements submitted via our project enquiry forms for the sole purpose of evaluating and providing bespoke software services.</p>

          <h3 className="text-sm font-bold text-slate-900">2. Data Security & Storage</h3>
          <p>All submitted RFPs and attachments are stored in secured database clusters with strict row-level security (RLS) policies. We do not sell or distribute client data to third parties.</p>

          <h3 className="text-sm font-bold text-slate-900">3. Contact Us</h3>
          <p>For privacy queries, contact us at {settings.email} or call {settings.phone}.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <div className="space-y-2">
        <span className="text-xs font-bold text-blue-600 uppercase">{settings.powered_by}</span>
        <h1 className="text-3xl font-black text-slate-900">Terms of Service</h1>
        <p className="text-xs text-slate-500">Last updated: January 2026</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-xs text-slate-700 leading-relaxed">
        <h3 className="text-sm font-bold text-slate-900">1. Service Scope & Deliverables</h3>
        <p>All software development projects undertaken by {settings.brand_title} (a {settings.company_name} company) are governed by individual Statement of Work (SOW) contracts.</p>

        <h3 className="text-sm font-bold text-slate-900">2. Intellectual Property</h3>
        <p>Upon full project settlement, complete source code rights and intellectual property are transferred to the client, unless specified otherwise in custom licensing agreements.</p>
      </div>
    </div>
  );
};
