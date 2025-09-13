import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/theme-provider';
import { cn } from '@/lib/utils';

interface ThemeSwitcherProps {
  className?: string;
  variant?: 'default' | 'minimal' | 'glass';
}

export function ThemeSwitcher({ className, variant = 'glass' }: ThemeSwitcherProps) {
  const { theme, toggleTheme } = useTheme();

  const getButtonStyles = () => {
    switch (variant) {
      case 'minimal':
        return 'bg-transparent hover:bg-accent/10 border-0';
      case 'glass':
        return 'glass-light hover:glass-strong border-border/30 hover:border-accent/50 backdrop-blur-md';
      default:
        return '';
    }
  };

  const getIconStyles = () => {
    const baseStyles = 'transition-all duration-500 ease-in-out';
    if (theme === 'dark') {
      return cn(baseStyles, 'rotate-0 scale-100');
    }
    return cn(baseStyles, 'rotate-90 scale-0');
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        'relative overflow-hidden transition-all duration-300 hover-glow',
        getButtonStyles(),
        className
      )}
      data-testid="theme-switcher"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-4 h-4">
        {/* Sun Icon */}
        <Sun
          className={cn(
            'absolute inset-0 text-amber-500 transition-all duration-500 ease-in-out',
            theme === 'light' 
              ? 'rotate-0 scale-100 opacity-100' 
              : 'rotate-90 scale-0 opacity-0'
          )}
        />
        
        {/* Moon Icon */}
        <Moon
          className={cn(
            'absolute inset-0 text-blue-400 transition-all duration-500 ease-in-out',
            theme === 'dark' 
              ? 'rotate-0 scale-100 opacity-100' 
              : '-rotate-90 scale-0 opacity-0'
          )}
        />
      </div>
      
      {/* Ripple effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 -skew-x-12 transform translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />
    </Button>
  );
}

// Alternative floating theme switcher for positioning anywhere
export function FloatingThemeSwitcher({ className }: { className?: string }) {
  return (
    <div className={cn('fixed top-4 right-4 z-50', className)}>
      <ThemeSwitcher variant="glass" className="shadow-lg" />
    </div>
  );
}