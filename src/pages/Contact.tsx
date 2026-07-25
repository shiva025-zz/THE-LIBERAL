import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Paperclip, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  FileText,
  Upload
} from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext';
import { useToast } from '../context/ToastContext';
import { createEnquiryMessage, uploadFileToBucket } from '../supabase/client';
import { ServiceItem } from '../types';

interface Props {
  selectedServiceForQuote?: ServiceItem | null;
}

export const ContactPage: React.FC<Props> = ({ selectedServiceForQuote }) => {
  const { settings } = useWebsite();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    budget: '₹25,000 - ₹50,000',
    project_type: selectedServiceForQuote ? selectedServiceForQuote.category : 'Web Development',
    deadline: 'Within 2-4 Weeks',
    message: selectedServiceForQuote ? `Inquiring about ${selectedServiceForQuote.title} service (Est. ₹${selectedServiceForQuote.discount_price || selectedServiceForQuote.price}).` : '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    if (selectedServiceForQuote) {
      setFormData(prev => ({
        ...prev,
        project_type: selectedServiceForQuote.category,
        message: `Inquiring about ${selectedServiceForQuote.title} service (Est. ₹${selectedServiceForQuote.discount_price || selectedServiceForQuote.price}).`
      }));
    }
  }, [selectedServiceForQuote]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      showToast('Required Fields Missing', 'Please fill in your name, email, phone number, and project brief.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      let attachment_url = '';
      let attachment_name = '';

      if (selectedFile) {
        const uploadRes = await uploadFileToBucket(selectedFile, 'attachments');
        attachment_url = uploadRes.url;
        attachment_name = selectedFile.name;
      }

      await createEnquiryMessage({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        budget: formData.budget,
        project_type: formData.project_type,
        deadline: formData.deadline,
        message: formData.message,
        attachment_url,
        attachment_name,
      });

      setSubmittedSuccess(true);
      showToast('Enquiry Submitted Successfully!', 'Our engineering team will contact you within 2 hours.', 'success');
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        budget: '₹25,000 - ₹50,000',
        project_type: 'Web Development',
        deadline: 'Within 2-4 Weeks',
        message: '',
      });
      setSelectedFile(null);
    } catch (err) {
      showToast('Submission Failed', 'Could not send enquiry. Please try again or WhatsApp us.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
          Get In Touch
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Start Your Engineering Journey
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Submit your project requirements or RFPs directly to Shivronix Technologies. Our senior engineers respond with architectural plans and fixed proposals within 2 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Direct Contact Details & WhatsApp */}
        <div className="space-y-6">
          
          <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">{settings.powered_by}</span>
              <h3 className="text-2xl font-black">{settings.brand_title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{settings.tagline}</p>
            </div>

            <hr className="border-slate-800" />

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-200 font-bold">Office Address</strong>
                  <p className="text-slate-400">{settings.address}</p>
                  {settings.google_maps_url && (
                    <a 
                      href={settings.google_maps_url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-400 hover:underline mt-1"
                    >
                      View Google Maps Location →
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <strong className="block text-slate-200 font-bold">Phone Hotline(s)</strong>
                  <p className="text-slate-400 font-mono">{settings.phone}</p>
                  {settings.secondary_phone && (
                    <p className="text-slate-400 font-mono text-[11px]">{settings.secondary_phone}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-purple-400 shrink-0" />
                <div>
                  <strong className="block text-slate-200 font-bold">Official Email</strong>
                  <p className="text-slate-400">{settings.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <strong className="block text-slate-200 font-bold">Operating Hours</strong>
                  <p className="text-slate-400">{settings.working_hours}</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${settings.whatsapp_number.replace(/[^0-9]/g, '')}?text=Hello%20Shivronix%20Technologies,%20I%20want%20to%20discuss%20a%20project.`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all"
              >
                <MessageSquare className="w-4 h-4" /> Connect via WhatsApp
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Project Enquiry Form */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Project Enquiry Form</h2>
              <p className="text-xs text-slate-500 mt-1">
                Fill out your details below. Attach RFPs, wireframes, or reference documents if available.
              </p>
            </div>

            {submittedSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">Thank You! Your Enquiry Has Been Received.</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Our software architects at Shivronix Technologies are reviewing your project requirements and will reach out shortly.
                </p>
                <button
                  onClick={() => setSubmittedSuccess(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
                >
                  Submit Another Project
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Company / Organization</label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Tech Pvt Ltd"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Mobile / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Project Type</label>
                    <select
                      value={formData.project_type}
                      onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Web Development">Web Application / Next.js</option>
                      <option value="Mobile Apps">Mobile App (Flutter/React Native)</option>
                      <option value="Software & ERP">Billing POS / Custom ERP</option>
                      <option value="AI & Automation">AI Chatbot & Gemini AI</option>
                      <option value="UI/UX & Branding">UI/UX Design & Branding</option>
                      <option value="Video Editing">Video Editing & Reels</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Estimated Budget</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="₹10,000 - ₹25,000">₹10,000 - ₹25,000</option>
                      <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                      <option value="₹50,000 - ₹1,000,000">₹50,000 - ₹1,00,000</option>
                      <option value="₹1,000,000+">₹1,00,000+ Enterprise</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Target Timeline</label>
                    <select
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Urgent (1 Week)">Urgent (1 Week)</option>
                      <option value="Within 2-4 Weeks">Within 2-4 Weeks</option>
                      <option value="1-2 Months">1-2 Months</option>
                      <option value="Flexible Schedule">Flexible Schedule</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Project Requirements Brief *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your project goals, features required, target audience, or specific tech preferences..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Supabase Storage File Attachment */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Attach Reference RFP / Document (Optional)</label>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-300 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Upload className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-xs font-bold text-slate-800">
                          {selectedFile ? selectedFile.name : 'Upload PDF, DOCX, ZIP or Wireframe image'}
                        </p>
                        <p className="text-[10px] text-slate-400">Stored securely in Supabase Bucket</p>
                      </div>
                    </div>

                    <label className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-slate-800">
                      Browse File
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                      />
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-xl shadow-blue-900/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting to Shivronix Systems...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Submit Project Enquiry
                    </>
                  )}
                </button>

              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
