import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { apiClient } from '../utils/apiClient';

// Loan List Item Interface based on API response
export interface LoanListItem {
  _id: string;
  image: string;
  price: string;
  url: string;
  logoUrl: string;
  description: string;
  tags: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// API Response Interface
export interface LoanListResponse {
  success: boolean;
  timestamp: string;
  data: LoanListItem[];
}

interface LoanListContextType {
  loanList: LoanListItem[];
  loading: boolean;
  error: string | null;
  refreshLoanList: () => Promise<void>;
  clearError: () => void;
}

const LoanListContext = createContext<LoanListContextType | undefined>(undefined);

export const useLoanList = () => {
  const context = useContext(LoanListContext);
  if (context === undefined) {
    throw new Error('useLoanList must be used within a LoanListProvider');
  }
  return context;
};

interface LoanListProviderProps {
  children: ReactNode;
}

export const LoanListProvider: React.FC<LoanListProviderProps> = ({ children }) => {
  const [loanList, setLoanList] = useState<LoanListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLoanList = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.makeRequest<any>('/api/loan-lists?active=true');
      
      if (response.success && response.data) {
        setLoanList(response.data);
      } else {
        setError(response.message || 'Failed to fetch loan list');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching loan list');
    } finally {
      setLoading(false);
    }
  };

  const refreshLoanList = async () => {
    await fetchLoanList();
  };

  const clearError = () => {
    setError(null);
  };

  // Fetch loan list on component mount
  useEffect(() => {
    fetchLoanList();
  }, []);

  const value: LoanListContextType = {
    loanList,
    loading,
    error,
    refreshLoanList,
    clearError,
  };

  return (
    <LoanListContext.Provider value={value}>
      {children}
    </LoanListContext.Provider>
  );
}; 