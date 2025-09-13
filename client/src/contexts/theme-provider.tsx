import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeProviderContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeProviderContext = createContext<ThemeProviderContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = 'dark', // Dark mode as default
  storageKey = 'theme',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Handle hydration and initial theme setting
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(storageKey) as Theme;
    if (stored && (stored === 'light' || stored === 'dark')) {
      setTheme(stored);
    } else {
      setTheme(defaultTheme);
    }
  }, [defaultTheme, storageKey]);

  // Update DOM and localStorage when theme changes
  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;

    // Remove both classes first
    root.classList.remove('light', 'dark');

    // Add the current theme class
    root.classList.add(theme);

    // Save to localStorage
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey, mounted]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};