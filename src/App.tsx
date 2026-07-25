import React, { useState } from 'react';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { WebsiteProvider } from './context/WebsiteContext';
import { Header, PageTab } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ServicesPage } from './pages/Services';
import { PortfolioPage } from './pages/Portfolio';
import { PricingPage } from './pages/Pricing';
import { AboutPage } from './pages/About';
import { TestimonialsPage } from './pages/Testimonials';
import { BlogPage } from './pages/Blog';
import { ContactPage } from './pages/Contact';
import { LoginPage } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';
import { PrivacyTermsPage } from './pages/PrivacyTerms';
import { SupabaseConfigModal } from './components/SupabaseConfigModal';
import { ServiceItem, PortfolioProject } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [configModalOpen, setConfigModalOpen] = useState(false);

  // Cross-page state transfers
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<ServiceItem | null>(null);
  const [selectedPortfolioForModal, setSelectedPortfolioForModal] = useState<PortfolioProject | null>(null);

  const handleSelectServiceForQuote = (service: ServiceItem) => {
    setSelectedServiceForQuote(service);
    setActiveTab('contact');
  };

  const handleViewProjectDetails = (project: PortfolioProject) => {
    setSelectedPortfolioForModal(project);
    setActiveTab('portfolio');
  };

  return (
    <ToastProvider>
      <AuthProvider>
        <WebsiteProvider>
          <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between selection:bg-blue-600 selection:text-white">
            
            {/* Header */}
            <Header
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onOpenConfigModal={() => setConfigModalOpen(true)}
            />

            {/* Main Content Router */}
            <main className="flex-1">
              {activeTab === 'home' && (
                <Home
                  setActiveTab={setActiveTab}
                  onSelectService={handleSelectServiceForQuote}
                  onSelectProject={handleViewProjectDetails}
                />
              )}

              {activeTab === 'services' && (
                <ServicesPage
                  onSelectServiceForQuote={handleSelectServiceForQuote}
                  setActiveTab={setActiveTab}
                />
              )}

              {activeTab === 'portfolio' && (
                <PortfolioPage
                  selectedProjectFromHome={selectedPortfolioForModal}
                />
              )}

              {activeTab === 'pricing' && (
                <PricingPage setActiveTab={setActiveTab} />
              )}

              {activeTab === 'about' && (
                <AboutPage setActiveTab={setActiveTab} />
              )}

              {activeTab === 'testimonials' && (
                <TestimonialsPage />
              )}

              {activeTab === 'blog' && (
                <BlogPage />
              )}

              {activeTab === 'contact' && (
                <ContactPage
                  selectedServiceForQuote={selectedServiceForQuote}
                />
              )}

              {activeTab === 'login' && (
                <LoginPage setActiveTab={setActiveTab} />
              )}

              {activeTab === 'admin' && (
                <AdminDashboard />
              )}

              {activeTab === 'privacy' && (
                <PrivacyTermsPage type="privacy" />
              )}

              {activeTab === 'terms' && (
                <PrivacyTermsPage type="terms" />
              )}
            </main>

            {/* Footer */}
            <Footer
              setActiveTab={setActiveTab}
              onOpenConfigModal={() => setConfigModalOpen(true)}
            />

            {/* Supabase Config & Migration SQL Modal */}
            <SupabaseConfigModal
              isOpen={configModalOpen}
              onClose={() => setConfigModalOpen(false)}
            />

          </div>
        </WebsiteProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
