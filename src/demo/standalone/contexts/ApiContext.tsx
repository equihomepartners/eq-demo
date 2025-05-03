import React, { createContext, useContext, ReactNode } from 'react';

// Define the API context type
interface ApiContextType {
  fetchData: (endpoint: string) => Promise<any>;
  postData: (endpoint: string, data: any) => Promise<any>;
  updateData: (endpoint: string, data: any) => Promise<any>;
  deleteData: (endpoint: string) => Promise<any>;
  isLoading: boolean;
  error: string | null;
}

// Create the context
const ApiContext = createContext<ApiContextType | undefined>(undefined);

// Provider component
export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  // Mock API methods
  const fetchData = async (endpoint: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log(`[Standalone API] Fetching data from ${endpoint}`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Return mock data based on endpoint
      if (endpoint.includes('loan')) {
        return { success: true, data: { loans: [] } };
      }
      
      if (endpoint.includes('suburb')) {
        return { success: true, data: { suburbs: [] } };
      }
      
      return { success: true, data: {} };
    } catch (err) {
      console.error(`[Standalone API] Error fetching data from ${endpoint}:`, err);
      setError('Failed to fetch data');
      return { success: false, error: 'Failed to fetch data' };
    } finally {
      setIsLoading(false);
    }
  };

  const postData = async (endpoint: string, data: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log(`[Standalone API] Posting data to ${endpoint}:`, data);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return { success: true, data: { id: 'mock-id-123', ...data } };
    } catch (err) {
      console.error(`[Standalone API] Error posting data to ${endpoint}:`, err);
      setError('Failed to post data');
      return { success: false, error: 'Failed to post data' };
    } finally {
      setIsLoading(false);
    }
  };

  const updateData = async (endpoint: string, data: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log(`[Standalone API] Updating data at ${endpoint}:`, data);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return { success: true, data };
    } catch (err) {
      console.error(`[Standalone API] Error updating data at ${endpoint}:`, err);
      setError('Failed to update data');
      return { success: false, error: 'Failed to update data' };
    } finally {
      setIsLoading(false);
    }
  };

  const deleteData = async (endpoint: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log(`[Standalone API] Deleting data at ${endpoint}`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return { success: true };
    } catch (err) {
      console.error(`[Standalone API] Error deleting data at ${endpoint}:`, err);
      setError('Failed to delete data');
      return { success: false, error: 'Failed to delete data' };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ApiContext.Provider
      value={{
        fetchData,
        postData,
        updateData,
        deleteData,
        isLoading,
        error
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

// Hook to use the API context
export const useApi = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};

export default ApiContext;
