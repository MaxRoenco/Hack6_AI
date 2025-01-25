import { useState } from 'react';
import { Menu, X, Home, User, Settings } from 'lucide-react';
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem, 
  NavigationMenuTrigger, 
  NavigationMenuContent 
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { 
      label: 'Home', 
      href: '/', 
      icon: <Home className="mr-2 h-4 w-4" /> 
    },
    { 
      label: 'Profile', 
      href: '/profile', 
      icon: <User className="mr-2 h-4 w-4" /> 
    },
    { 
      label: 'Settings', 
      href: '/settings', 
      icon: <Settings className="mr-2 h-4 w-4" /> 
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gray-800">BiasAware</span>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList className="flex space-x-4">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.label}>
                <Button 
                  variant="ghost" 
                >
                  <a href={item.href} className="flex items-center hover:bg-gray-100">
                    {item.icon}
                    {item.label}
                  </a>
                </Button>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Button 
                  key={item.label} 
                  variant="ghost" 
                  className="w-full justify-start"
                >
                  {item.icon}
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;