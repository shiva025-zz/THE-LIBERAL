import React, { useState, useEffect } from 'react';
import { 
  ExternalLink, 
  Github, 
  Youtube, 
  Layers, 
  X, 
  CheckCircle2, 
  Globe, 
  ChevronRight,
  Filter,
  Sparkles
} from 'lucide-react';
import { getPortfolio } from '../supabase/client';
import { PortfolioProject } from '../types';

interface Props {
  selectedProjectFromHome?: PortfolioProject | null;
}

export const PortfolioPage: React.FC<Props> = ({ selectedProjectFromHome }) => {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<PortfolioProject | null>(selectedProjectFromHome || null);

  useEffect(() => {
    getPortfolio().then(data => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedProjectFromHome) {
      setActiveProjectModal(selectedProjectFromHome);
    }
  }, [selectedProjectFromHome]);

  const categories = ['All', 'Web Development', 'Mobile Apps', 'Software & ERP', 'AI & Automation', 'UI/UX & Branding'];

  const filteredProjects = projects.filter(p => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest text-purple-600 bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-200">
          Case Studies & Proof of Work
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Featured Engineering Portfolio
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Explore real-world software applications, mobile apps, ERP systems, and AI platforms built by Drums of Liberation for clients worldwide.
        </p>
      </div>

      {/* Filter Category Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-purple-600 text-white shadow-md shadow-purple-900/30'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-96 bg-slate-100 rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <p className="text-sm font-bold text-slate-600">No projects found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div className="relative h-72 overflow-hidden bg-slate-950">
                <img
                  src={project.cover_image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-85" />
                
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 bg-purple-600 text-white text-[10px] font-extrabold uppercase tracking-wider rounded-full shadow-md">
                    {project.category}
                  </span>
                  <span className="px-2.5 py-1 bg-slate-900/80 backdrop-blur-md text-emerald-400 text-[10px] font-mono font-bold rounded-full">
                    {project.status || 'Completed'}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs text-indigo-300 font-mono font-bold">Client: {project.client_name}</p>
                  <h3 className="text-2xl font-black">{project.title}</h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tech_stack.map((tech, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 text-[10px] font-mono font-bold">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {project.live_demo_url && (
                      <a
                        href={project.live_demo_url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white text-xs font-bold transition-all flex items-center gap-1"
                      >
                        <Globe className="w-3.5 h-3.5" /> Live Demo
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-900 hover:text-white text-xs font-bold transition-all flex items-center gap-1"
                      >
                        <Github className="w-3.5 h-3.5" /> Source
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setActiveProjectModal(project)}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-purple-600 transition-colors"
                  >
                    View Project Case Study
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Project Case Study Lightbox Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-slate-200 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setActiveProjectModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-950">
              <img
                src={activeProjectModal.cover_image}
                alt={activeProjectModal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="px-2.5 py-0.5 bg-purple-600 text-[10px] font-bold uppercase rounded-full">
                  {activeProjectModal.category}
                </span>
                <h2 className="text-2xl font-black mt-1">{activeProjectModal.title}</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 font-bold block">Client Organization</span>
                <strong className="text-slate-900 font-mono">{activeProjectModal.client_name}</strong>
              </div>
              <div>
                <span className="text-slate-400 font-bold block">Completion Date</span>
                <strong className="text-slate-900 font-mono">{activeProjectModal.completion_date || '2026'}</strong>
              </div>
              <div>
                <span className="text-slate-400 font-bold block">Project Status</span>
                <strong className="text-emerald-600 font-mono">{activeProjectModal.status}</strong>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Project Overview & Architecture:</h4>
              <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{activeProjectModal.description}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Technology Stack Employed:</h4>
              <div className="flex flex-wrap gap-1.5">
                {activeProjectModal.tech_stack.map((t, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 text-xs font-mono font-bold">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Gallery Screenshots if available */}
            {activeProjectModal.gallery_images && activeProjectModal.gallery_images.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Application Gallery:</h4>
                <div className="grid grid-cols-2 gap-3">
                  {activeProjectModal.gallery_images.map((img, idx) => (
                    <img key={idx} src={img} alt="Screenshot" className="rounded-2xl border border-slate-200 h-32 w-full object-cover" />
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              {activeProjectModal.live_demo_url && (
                <a
                  href={activeProjectModal.live_demo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold text-xs flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" /> Visit Live Site
                </a>
              )}
              {activeProjectModal.github_url && (
                <a
                  href={activeProjectModal.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-2xl bg-slate-900 text-white font-bold text-xs flex items-center gap-2"
                >
                  <Github className="w-4 h-4" /> View Source Code
                </a>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
