import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WebsiteSettings, AdminProfile } from '../types';
import { 
  getWebsiteSettings, 
  updateWebsiteSettings,
  DEFAULT_WEBSITE_SETTINGS,
  DEFAULT_ADMIN_PROFILE
} from '../supabase/client';
import { useToast } from './ToastContext';

interface WebsiteContextType {
  settings: WebsiteSettings;
  adminProfile: AdminProfile;
  isLoading: boolean;
  updateSettings: (newSettings: Partial<WebsiteSettings>) => Promise<boolean>;
  updateAdminProfile: (profile: Partial<AdminProfile>) => Promise<boolean>;
  refreshWebsiteData: () => Promise<void>;
}

const WebsiteContext = createContext<WebsiteContextType | undefined>(undefined);

export const WebsiteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [settings, setSettings] = useState<WebsiteSettings>(DEFAULT_WEBSITE_SETTINGS);
  const [adminProfile, setAdminProfile] = useState<AdminProfile>(() => {
    const saved = localStorage.getItem('dol_admin_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch { return DEFAULT_ADMIN_PROFILE; }
    }
    return DEFAULT_ADMIN_PROFILE;
  });
  const [isLoading, setIsLoading] = useState(true);

  const refreshWebsiteData = async () => {
    setIsLoading(true);
    try {
      const data = await getWebsiteSettings();
      setSettings(data);
    } catch (err) {
      console.warn('Failed loading website settings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshWebsiteData();
  }, []);

  useEffect(() => {
    if (settings) {
      const pageTitle = settings.website_name || settings.brand_title || settings.meta_title;
      if (pageTitle) {
        document.title = pageTitle;
      }

      if (settings.favicon_url) {
        let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
        if (!link) {
          link = document.createElement('link');
          link.rel = 'shortcut icon';
          document.getElementsByTagName('head')[0].appendChild(link);
        }
        link.href = settings.favicon_url;
      }
    }
  }, [settings]);

  const updateSettingsHandler = async (newSettings: Partial<WebsiteSettings>): Promise<boolean> => {
    try {
      const updated = await updateWebsiteSettings(newSettings);
      setSettings(updated);
      showToast('Website Settings Saved', 'Branding, hero copy, and contact details updated.', 'success');
      return true;
    } catch (err) {
      showToast('Update Failed', 'Could not save website settings.', 'error');
      return false;
    }
  };

  const updateAdminProfileHandler = async (newProfile: Partial<AdminProfile>): Promise<boolean> => {
    const updated = { ...adminProfile, ...newProfile };
    setAdminProfile(updated);
    localStorage.setItem('dol_admin_profile', JSON.stringify(updated));
    showToast('Admin Profile Updated', 'Credentials updated successfully.', 'success');
    return true;
  };

  return (
    <WebsiteContext.Provider
      value={{
        settings,
        adminProfile,
        isLoading,
        updateSettings: updateSettingsHandler,
        updateAdminProfile: updateAdminProfileHandler,
        refreshWebsiteData
      }}
    >
      {children}
    </WebsiteContext.Provider>
  );
};

export const useWebsite = () => {
  const context = useContext(WebsiteContext);
  if (!context) {
    throw new Error('useWebsite must be used within WebsiteProvider');
  }
  return context;
};

// Aliases for compatibility
export const ShopProvider = WebsiteProvider;
export const useShop = () => {
  const { settings, adminProfile, isLoading, updateSettings, updateAdminProfile, refreshWebsiteData } = useWebsite();
  return {
    shopSettings: {
      id: 'main',
      shop_name: settings.brand_title,
      shop_logo_url: settings.logo_url,
      shop_profile_image_url: settings.logo_url,
      shop_banner_url: settings.logo_url,
      address: settings.address,
      phone: settings.phone,
      whatsapp: settings.whatsapp_number,
      email: settings.email,
      working_hours: settings.working_hours,
      description: settings.hero_subtitle,
    },
    paymentSettings: {
      id: 'default_payment',
      qr_code_url: '',
      upi_id: '',
      payment_enabled: true,
      upi_enabled: true,
    },
    adminProfile,
    isLoadingShop: isLoading,
    updateShop: async (p: any) => updateSettings({
      brand_title: p.shop_name,
      address: p.address,
      phone: p.phone,
      whatsapp_number: p.whatsapp,
      email: p.email,
      working_hours: p.working_hours,
      hero_subtitle: p.description
    }),
    updatePayment: async () => true,
    updateAdminProfile,
    refreshShopData: refreshWebsiteData
  };
};
