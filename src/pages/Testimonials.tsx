import React, { useState, useEffect } from 'react';
import { Star, MessageSquareQuote, CheckCircle2 } from 'lucide-react';
import { getTestimonials } from '../supabase/client';
import { Testimonial } from '../types';

export const TestimonialsPage: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTestimonials().then(data => {
      setTestimonials(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
          Client Feedback
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Client Reviews & Endorsements
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Read what leaders and executives say about partnering with Drums of Liberation (Shivronix Technologies).
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 bg-slate-100 rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(item => (
            <div
              key={item.id}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
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
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/20"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{item.customer_name}</h4>
                  <p className="text-[10px] text-slate-500 font-semibold">{item.position}</p>
                  <span className="text-[10px] font-mono font-bold text-blue-600">{item.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
