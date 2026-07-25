import React, { useState, useEffect } from 'react';
import { Search, Clock, User, X, ChevronRight, Tag, BookOpen, Share2 } from 'lucide-react';
import { getBlogs } from '../supabase/client';
import { BlogPost } from '../types';

export const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activePostModal, setActivePostModal] = useState<BlogPost | null>(null);

  useEffect(() => {
    getBlogs().then(data => {
      setBlogs(data);
      setLoading(false);
    });
  }, []);

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
          Tech Insights & Engineering Blog
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Software Engineering & Architecture Articles
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Deep-dives into modern full-stack development, Next.js, Supabase, AI agent automation, and cloud optimization.
        </p>

        {/* Search Input */}
        <div className="relative max-w-md mx-auto pt-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-80 bg-slate-100 rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <p className="text-sm font-bold text-slate-600">No blog posts found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredBlogs.map(post => (
            <div
              key={post.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div className="relative h-60 overflow-hidden bg-slate-950">
                <img
                  src={post.thumbnail_url}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full">
                  {post.category}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-blue-500" /> {post.read_time || '5 min read'}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-purple-500" /> {post.author_name || 'Shivronix Team'}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {post.content.replace(/#+/g, '').slice(0, 150)}...
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-mono rounded">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono">{post.created_at?.slice(0, 10)}</span>
                  <button
                    onClick={() => setActivePostModal(post)}
                    className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    Read Article <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Article Reader Modal */}
      {activePostModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-slate-200 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setActivePostModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-950">
              <img
                src={activePostModal.thumbnail_url}
                alt={activePostModal.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 font-bold rounded-full">{activePostModal.category}</span>
                <span>{activePostModal.read_time}</span>
                <span>By {activePostModal.author_name}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{activePostModal.title}</h2>
            </div>

            <hr className="border-slate-100" />

            <div className="prose text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4 whitespace-pre-line">
              {activePostModal.content}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {activePostModal.tags.map((t, i) => (
                  <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[10px] font-mono font-bold rounded-lg">
                    #{t}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setActivePostModal(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
