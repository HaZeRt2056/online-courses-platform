import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

interface ThemeColors {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

interface ThemeContextType {
  theme: ThemeColors;
  updateTheme: (newTheme: Partial<ThemeColors>) => void;
}

const defaultTheme: ThemeColors = {
  primaryColor: '#1E3A8A', // primary-700
  secondaryColor: '#047857', // secondary-700
  accentColor: '#F59E0B', // accent-500
};

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  updateTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeColors>(defaultTheme);

  // Fetch theme from API on initial load
  // useEffect(() => {
  //   const fetchTheme = async () => {
  //     try {
  //       const response = await api.get('settings/colors/');
  //       if (response.data) {
  //         setTheme({
  //           primaryColor: response.data.primaryColor || defaultTheme.primaryColor,
  //           secondaryColor: response.data.secondaryColor || defaultTheme.secondaryColor,
  //           accentColor: response.data.accentColor || defaultTheme.accentColor,
  //         });
  //       }
  //     } catch (error) {
  //       console.error('Failed to fetch theme colors:', error);
  //       // Fallback to default theme if API call fails
  //     }
  //   };
  //
  //   fetchTheme();
  // }, []);

  const updateTheme = (newTheme: Partial<ThemeColors>) => {
    setTheme((prevTheme) => ({ ...prevTheme, ...newTheme }));
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};