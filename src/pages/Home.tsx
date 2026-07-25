import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  Code, 
  Smartphone, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Users, 
  Briefcase, 
  Award, 
  Globe2, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
  Clock,
  Send,
  MessageSquare,
  FileText
} from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext';
import { getServices, getPortfolio, getTestimonials, getBlogs } from '../supabase/client';
import { ServiceItem, PortfolioProject, Testimonial, BlogPost } from '../types';
import { PageTab } from '../components/Header';

interface Props {
  setActiveTab: (tab: PageTab) => void;
  onSelectService?: (service: ServiceItem) => void;
  onSelectProject?: (project: PortfolioProject) => void;
}

export const Home: React.FC<Props> = ({ setActiveTab, onSelectService, onSelectProject }) => {
  const { settings } = useWebsite();
  
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioProject[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    Promise.all([
      getServices(),
      getPortfolio(),
      getTestimonials(),
      getBlogs()
    ]).then(([srv, port, test, blg]) => {
      setServices(srv.filter(s => s.is_visible !== false));
      setPortfolio(port.filter(p => p.is_visible !== false));
      setTestimonials(test.filter(t => t.is_visible !== false));
      setBlogs(blg.filter(b => b.is_published !== false));
    });
  }, []);

  const featuredServices = services.slice(0, 6);
  const featuredPortfolio = portfolio.slice(0, 4);

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-950 text-white pt-12 pb-24 border-b border-slate-900">
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-extrabold uppercase tracking-widest shadow-lg shadow-blue-950/50">
              <Sparkles className="w-4 h-4 text-blue-400 animate-spin" /> {settings.powered_by}
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white">
              {settings.hero_title || 'Transforming Ideas Into Powerful Digital Solutions'}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-slate-300 font-normal max-w-3xl mx-auto leading-relaxed">
              {settings.hero_subtitle || 'We build premium websites, mobile applications, AI solutions, billing software, custom business software, and professional video editing services that help businesses grow.'}
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => setActiveTab('contact')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-blue-900/40 flex items-center justify-center gap-2 group transition-all"
              >
                <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                {settings.primary_button_text || 'Start Your Project'}
              </button>

              <button
                onClick={() => setActiveTab('portfolio')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-extrabold text-sm border border-slate-800 shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <Layers className="w-5 h-5 text-blue-400" />
                {settings.secondary_button_text || 'Explore Portfolio'}
              </button>
            </div>

            {/* Trust Markers */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Production Ready</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Custom Architecture</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 24/7 Dedicated Support</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Scalable Cloud Backends</span>
            </div>

            {/* Hero Banner Image Showcase */}
            {settings.hero_image_url && (
              <div className="pt-8 max-w-5xl mx-auto">
                <div className="relative rounded-3xl p-2 bg-gradient-to-b from-blue-500/20 via-slate-800/40 to-slate-900 border border-slate-800/80 shadow-2xl shadow-blue-950/80 overflow-hidden group">
                  <img 
                    src={settings.hero_image_url} 
                    alt="Hero Banner" 
                    className="w-full max-h-[420px] object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent rounded-2xl pointer-events-none" />
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-800">
          <div className="text-center space-y-1">
            <p className="text-3xl sm:text-5xl font-black text-blue-400 font-mono">150+</p>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Projects Completed</p>
          </div>
          <div className="text-center space-y-1 pt-6 md:pt-0">
            <p className="text-3xl sm:text-5xl font-black text-emerald-400 font-mono">98%</p>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Happy Clients</p>
          </div>
          <div className="text-center space-y-1 pt-6 md:pt-0">
            <p className="text-3xl sm:text-5xl font-black text-purple-400 font-mono">6+ Years</p>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Industry Experience</p>
          </div>
          <div className="text-center space-y-1 pt-6 md:pt-0">
            <p className="text-3xl sm:text-5xl font-black text-amber-400 font-mono">12+</p>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Countries Served</p>
          </div>
        </div>
      </section>

      {/* 3. CORE CAPABILITIES PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            End-To-End Engineering
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">What We Build For You</h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
            From high-growth web platforms to Android/iOS mobile apps and complex POS software, we deliver full-stack technology tailored to your business goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all space-y-4 group">
            <div className="p-3.5 rounded-2xl bg-blue-50 text-blue-600 w-fit group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Code className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Web & Mobile Apps</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              High-speed Next.js web applications and cross-platform Flutter/React Native mobile applications with offline caching and real-time backend sync.
            </p>
            <button onClick={() => setActiveTab('services')} className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
              Explore Web & Mobile <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all space-y-4 group">
            <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-600 w-fit group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">POS & Enterprise ERP</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Billing software, thermal invoice printing, inventory management, school & hospital ERP systems tailored to streamline daily operations.
            </p>
            <button onClick={() => setActiveTab('services')} className="text-xs font-bold text-emerald-600 flex items-center gap-1 group-hover:gap-2 transition-all">
              Explore ERP Systems <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all space-y-4 group">
            <div className="p-3.5 rounded-2xl bg-purple-50 text-purple-600 w-fit group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">AI Agents & Chatbots</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Custom trained Gemini & OpenAI chatbots, automated CRM pipelines, lead scoring, and intelligent WhatsApp automation integrations.
            </p>
            <button onClick={() => setActiveTab('services')} className="text-xs font-bold text-purple-600 flex items-center gap-1 group-hover:gap-2 transition-all">
              Explore AI Solutions <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all space-y-4 group">
            <div className="p-3.5 rounded-2xl bg-amber-50 text-amber-600 w-fit group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">UI/UX & Video Editing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Figma interactive prototypes, complete brand identity suites, 4K promotional video editing, motion graphics, and digital marketing.
            </p>
            <button onClick={() => setActiveTab('services')} className="text-xs font-bold text-amber-600 flex items-center gap-1 group-hover:gap-2 transition-all">
              Explore Creative Media <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. FEATURED SERVICES GRID */}
      <section className="bg-slate-900 text-white py-16 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/30">
                Popular Services
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold">Popular Solutions & Capabilities</h2>
            </div>
            <button
              onClick={() => setActiveTab('services')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-2 border border-slate-700"
            >
              View Full Catalog <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map(service => (
              <div
                key={service.id}
                className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl flex flex-col justify-between hover:border-blue-500/50 transition-all group p-6 space-y-5"
              >
                <div className="space-y-4">
                  <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
                    <img
                      src={service.image_url}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-800 text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                      {service.category}
                    </div>
                    {service.is_popular && (
                      <div className="absolute top-3 right-3 bg-emerald-500 text-slate-950 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold">
                        POPULAR
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Feature Bullets */}
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-medium">Starting from</span>
                    <p className="text-xl font-extrabold text-emerald-400">₹{service.discount_price || service.price}</p>
                  </div>

                  <button
                    onClick={() => {
                      if (onSelectService) onSelectService(service);
                      setActiveTab('contact');
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-900/30"
                  >
                    Request Service <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. PORTFOLIO SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              Selected Case Studies
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Recent Customer Projects</h2>
          </div>
          <button
            onClick={() => setActiveTab('portfolio')}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white flex items-center gap-2 shadow-md"
          >
            Explore All Case Studies <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredPortfolio.map(project => (
            <div
              key={project.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div className="relative h-64 overflow-hidden bg-slate-900">
                <img
                  src={project.cover_image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <span className="px-3 py-1 bg-blue-600 text-[10px] font-extrabold uppercase tracking-wider rounded-full shadow-md">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400">{project.client_name}</span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tech_stack.map((tech, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-bold font-mono">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  {project.live_demo_url ? (
                    <a
                      href={project.live_demo_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      View Live Project <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-xs font-bold text-slate-400">Internal Enterprise App</span>
                  )}

                  <button
                    onClick={() => {
                      if (onSelectProject) onSelectProject(project);
                      setActiveTab('portfolio');
                    }}
                    className="text-xs font-bold text-slate-900 hover:text-blue-600"
                  >
                    Details & Gallery →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIALS SLIDER */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Verified Reviews
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">What Our Clients Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(item => (
              <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 italic leading-relaxed font-serif">
                    "{item.review}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <img
                    src={item.photo_url}
                    alt={item.customer_name}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{item.customer_name}</h4>
                    <p className="text-[10px] text-slate-500 font-semibold">{item.position} • {item.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PROJECT INQUIRY CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          
          <div className="space-y-4 max-w-2xl relative z-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3.5 py-1 rounded-full border border-blue-500/30">
              Ready to Liberate Your Business?
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Have a Project in Mind? Let's Build It Together.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Schedule a free engineering consultation with Shivronix Technologies. We analyze your requirements, provide architectural designs, and deliver exact fixed-price estimates.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 w-full lg:w-auto shrink-0">
            <button
              onClick={() => setActiveTab('contact')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm shadow-xl shadow-blue-900/40 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Request Quote Now
            </button>
            <a
              href={`https://wa.me/${(settings.whatsapp_number || '').replace(/[^0-9]/g, '')}?text=Hello%20Shivronix%20Technologies,%20I%20would%20like%20to%20discuss%20a%20project.`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-900/30 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" /> Instant WhatsApp
            </a>
          </div>

        </div>
      </section>

    </div>
  );
};
