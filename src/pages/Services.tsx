import React, { useState, useEffect } from 'react';
import { 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  X, 
  Sparkles, 
  Filter,
  Check,
  Send,
  Zap,
  HelpCircle
} from 'lucide-react';
import { getServices } from '../supabase/client';
import { ServiceItem, ServiceCategory } from '../types';
import { PageTab } from '../components/Header';

interface Props {
  setActiveTab: (tab: PageTab) => void;
  onSelectServiceForQuote?: (service: ServiceItem) => void;
}

export const ServicesPage: React.FC<Props> = ({ setActiveTab, onSelectServiceForQuote }) => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    getServices().then(data => {
      setServices(data);
      setLoading(false);
    });
  }, []);

  const categories: string[] = [
    'All',
    'Web Development',
    'Mobile Apps',
    'Software & ERP',
    'AI & Automation',
    'Cloud & APIs',
    'UI/UX & Branding',
    'Video Editing'
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
          Digital Service Catalog
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Explore Our Engineering & Digital Services
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          From custom full-stack web applications and Flutter mobile apps to AI chatbots, POS billing tools, and video editing — find the exact solution your business needs.
        </p>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services, e.g., 'Mobile App', 'POS'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <p className="text-xs text-slate-500 font-semibold shrink-0">
            Showing <strong className="text-slate-900">{filteredServices.length}</strong> available services
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-t border-slate-100 pt-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Service Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 bg-slate-100 rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">No services match your criteria</h3>
          <p className="text-xs text-slate-500">Try adjusting your search query or category filter.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group p-6 space-y-5"
            >
              <div className="space-y-4">
                <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-900 border border-slate-100">
                  <img
                    src={service.image_url}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-extrabold text-blue-400 uppercase tracking-wider">
                    {service.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold text-white flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" /> {service.duration || '1-2 Weeks'}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-1.5 pt-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Key Features Included:</p>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {service.features.slice(0, 4).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Estimated Investment</span>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-black text-slate-900">₹{service.discount_price || service.price}</p>
                      {service.discount_price && (
                        <span className="text-xs text-slate-400 line-through">₹{service.price}</span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveModalService(service)}
                    className="text-xs font-bold text-slate-600 hover:text-blue-600 underline"
                  >
                    View Specs
                  </button>
                </div>

                <button
                  onClick={() => {
                    if (onSelectServiceForQuote) onSelectServiceForQuote(service);
                    setActiveTab('contact');
                  }}
                  className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-md shadow-blue-900/20 flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-3.5 h-3.5" /> Order / Request Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Service Detail Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-slate-200 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-56 rounded-2xl overflow-hidden bg-slate-900">
              <img
                src={activeModalService.image_url}
                alt={activeModalService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
                {activeModalService.category}
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-900">{activeModalService.title}</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{activeModalService.description}</p>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Complete Scope Deliverables:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {activeModalService.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100">
              <div>
                <span className="text-xs text-slate-500 font-bold">Turnaround Time: {activeModalService.duration}</span>
                <p className="text-2xl font-black text-slate-900">₹{activeModalService.discount_price || activeModalService.price}</p>
              </div>

              <button
                onClick={() => {
                  if (onSelectServiceForQuote) onSelectServiceForQuote(activeModalService);
                  setActiveModalService(null);
                  setActiveTab('contact');
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2"
              >
                Proceed to Enquiry <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
