import React, { useState, useEffect } from 'react';
import { 
  Check, 
  HelpCircle, 
  Send, 
  Calculator, 
  Sparkles, 
  Layers, 
  Zap, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { getPricing } from '../supabase/client';
import { PricingPlan } from '../types';
import { PageTab } from '../components/Header';

interface Props {
  setActiveTab: (tab: PageTab) => void;
}

export const PricingPage: React.FC<Props> = ({ setActiveTab }) => {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAnnual, setIsAnnual] = useState(false);

  // Interactive Cost Estimator Calculator State
  const [calcPlatform, setCalcPlatform] = useState<'web' | 'mobile' | 'fullstack'>('web');
  const [calcFeatures, setCalcFeatures] = useState({
    auth: true,
    database: true,
    aiChatbot: false,
    posBilling: false,
    paymentGateway: false,
    pushNotifications: false,
  });

  useEffect(() => {
    getPricing().then(data => {
      setPlans(data);
      setLoading(false);
    });
  }, []);

  // Compute calculated estimate
  const baseCost = calcPlatform === 'web' ? 15000 : calcPlatform === 'mobile' ? 30000 : 45000;
  let addOns = 0;
  if (calcFeatures.aiChatbot) addOns += 12000;
  if (calcFeatures.posBilling) addOns += 15000;
  if (calcFeatures.paymentGateway) addOns += 5000;
  if (calcFeatures.pushNotifications) addOns += 4000;

  const totalEstimate = baseCost + addOns;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
          Transparent Pricing Model
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Flexible Packages & Custom Quotes
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Choose a fixed-scope engagement package or use our interactive cost estimator below for bespoke engineering requirements.
        </p>

        {/* Monthly / Annual Toggle */}
        <div className="pt-4 flex items-center justify-center gap-4">
          <span className={`text-xs font-bold ${!isAnnual ? 'text-slate-900' : 'text-slate-400'}`}>One-Time Project</span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-8 rounded-full bg-slate-900 p-1 relative transition-colors"
          >
            <div className={`w-6 h-6 rounded-full bg-blue-500 shadow-md transform transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
          <span className={`text-xs font-bold flex items-center gap-1.5 ${isAnnual ? 'text-slate-900' : 'text-slate-400'}`}>
            Annual Support Plan
            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full">Save 20%</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-96 bg-slate-100 rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map(plan => {
            const price = isAnnual ? Math.round(plan.yearly_price * 0.8) : plan.monthly_price;
            return (
              <div
                key={plan.id}
                className={`bg-white rounded-3xl border p-8 flex flex-col justify-between space-y-6 relative shadow-sm hover:shadow-xl transition-all ${
                  plan.is_popular ? 'border-2 border-blue-600 shadow-xl scale-105' : 'border-slate-200'
                }`}
              >
                {plan.is_popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                    MOST POPULAR FOR ENTERPRISES
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900">{plan.plan_name}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{plan.description}</p>
                  </div>

                  <div className="pt-2">
                    <p className="text-3xl sm:text-4xl font-black text-slate-900">₹{price.toLocaleString()}</p>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">{isAnnual ? 'Per Year / Maintenance' : 'Estimated One-Time Cost'}</span>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Feature Bullets */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Plan Scope Deliverables:</p>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('contact')}
                  className={`w-full py-3.5 rounded-2xl font-extrabold text-xs shadow-md transition-all ${
                    plan.is_popular
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/30'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {plan.button_text || 'Choose Plan'}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* INTERACTIVE CUSTOM PROJECT COST CALCULATOR */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl space-y-8">
        
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/30">
            <Calculator className="w-4 h-4" /> Instant Quote Estimator
          </div>
          <h2 className="text-2xl sm:text-4xl font-black">Bespoke Software Cost Calculator</h2>
          <p className="text-xs text-slate-300">
            Select your target stack & modules to estimate instant investment for your project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Controls */}
          <div className="lg:col-span-2 space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
            
            {/* Step 1: Platform Type */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold uppercase text-slate-400">1. Select Target Application Type</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'web', label: 'Web App / Website' },
                  { id: 'mobile', label: 'Mobile App (iOS/Android)' },
                  { id: 'fullstack', label: 'Fullstack ERP / SaaS' },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setCalcPlatform(item.id as any)}
                    className={`p-3 rounded-xl text-xs font-bold border text-center transition-all ${
                      calcPlatform === item.id
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Add-on Modules */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold uppercase text-slate-400">2. Select Required Custom Modules</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'aiChatbot', label: 'AI Chatbot & Gemini Automation (+₹12,000)' },
                  { id: 'posBilling', label: 'POS Billing & Thermal Printer Sync (+₹15,000)' },
                  { id: 'paymentGateway', label: 'Razorpay / Stripe Payments (+₹5,000)' },
                  { id: 'pushNotifications', label: 'Push Notifications & SMS Alerts (+₹4,000)' },
                ].map(item => {
                  const active = (calcFeatures as any)[item.id];
                  return (
                    <button
                      key={item.id}
                      onClick={() => setCalcFeatures({ ...calcFeatures, [item.id]: !active })}
                      className={`p-3 rounded-xl text-xs font-bold border text-left flex items-center justify-between transition-all ${
                        active
                          ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      <span>{item.label}</span>
                      <CheckCircle2 className={`w-4 h-4 ${active ? 'text-emerald-400' : 'text-slate-600'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Result Card */}
          <div className="bg-gradient-to-br from-blue-900 to-indigo-950 p-8 rounded-2xl border border-blue-500/30 text-center space-y-6 shadow-xl">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-300">Estimated Investment</span>
            <div>
              <p className="text-4xl sm:text-5xl font-black text-white">₹{totalEstimate.toLocaleString()}</p>
              <span className="text-xs text-blue-200 mt-1 block">Includes source code, deployment & support</span>
            </div>

            <button
              onClick={() => setActiveTab('contact')}
              className="w-full py-4 rounded-xl bg-white text-slate-950 font-black text-xs hover:bg-slate-100 transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-blue-600" /> Lock In Estimate & Discuss
            </button>
          </div>

        </div>

      </section>

    </div>
  );
};
