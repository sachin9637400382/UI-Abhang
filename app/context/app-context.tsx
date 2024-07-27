"use client"
import { PaletteMode } from '@mui/material';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AppContextType {
  app: {
    pageTitle: string;
    subTitle: string;
    mode:PaletteMode
    showCustomTheme: boolean
  };
  setApp: (newApp: Partial<AppContextType['app']>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [app, setAppState] = useState<AppContextType['app']>({
    pageTitle: 'Default Title',
    subTitle: 'Default Subtitle',
    mode: 'light',
    showCustomTheme: true
  });

  const setApp = (newApp: Partial<AppContextType['app']>) => {
    setAppState((prevApp) => ({
      ...prevApp,
      ...newApp,
    }));
  };

  return (
    <AppContext.Provider value={{ app, setApp }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
