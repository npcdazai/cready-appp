import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { apiClient } from '../utils/apiClient';

// Footer Social Link Interface
export interface SocialLink {
  _id: string;
  platform: string;
  url: string;
}

// Footer Link Interface
export interface FooterLink {
  _id: string;
  title: string;
  url: string;
}

// Footer Data Interface based on API response
export interface FooterData {
  _id: string;
  googlePlayLink: string;
  appStoreLink: string;
  qrCodeImage: string;
  footerLinks: FooterLink[];
  socialLinks: SocialLink[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// API Response Interface
export interface FooterResponse {
  success: boolean;
  timestamp: string;
  data: FooterData;
}

interface FooterContextType {
  footerData: FooterData | null;
  loading: boolean;
  error: string | null;
  refreshFooter: () => Promise<void>;
  clearError: () => void;
}

const FooterContext = createContext<FooterContextType | undefined>(undefined);

export const useFooter = () => {
  const context = useContext(FooterContext);
  if (context === undefined) {
    throw new Error('useFooter must be used within a FooterProvider');
  }
  return context;
};

interface FooterProviderProps {
  children: ReactNode;
}

export const FooterProvider: React.FC<FooterProviderProps> = ({ children }) => {
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFooter = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.makeRequest<any>('/api/footer');
      
      if (response.success && response.data) {
        setFooterData(response.data);
      } else {
        setError(response.message || 'Failed to fetch footer data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching footer data');
    } finally {
      setLoading(false);
    }
  };

  const refreshFooter = async () => {
    await fetchFooter();
  };

  const clearError = () => {
    setError(null);
  };

  // Fetch footer data on component mount
  useEffect(() => {
    fetchFooter();
  }, []);

  const value: FooterContextType = {
    footerData,
    loading,
    error,
    refreshFooter,
    clearError,
  };

  return (
    <FooterContext.Provider value={value}>
      {children}
    </FooterContext.Provider>
  );
}; 