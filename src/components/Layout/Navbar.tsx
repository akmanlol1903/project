import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, Settings, LogOut, User, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0, opacity: 0 });
  const [activeLinkStyle, setActiveLinkStyle] = useState({ width: 0, left: 0, opacity: 0 });

  const navLinksRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const navItems = React.useMemo(() => [
    { to: '/', text: 'Home' },
    { to: '/games', text: 'Games' },
    { to: '/categories', text: 'Categories' },
  ], []);

  useEffect(() => {
    const calculateActiveStyle = () => {
      const activeLinkIndex = navItems.findIndex(item => item.to === location.pathname);
      const activeLink = linkRefs.current[activeLinkIndex];
      
      if (activeLink) {
        const style = {
          width: activeLink.offsetWidth,
          left: activeLink.offsetLeft,
          opacity: 1
        };
        setActiveLinkStyle(style);
        setUnderlineStyle(style);
      } else {
        const style = { width: 0, left: 0, opacity: 0 };
        setActiveLinkStyle(style);
        setUnderlineStyle(style);
      }
    };
    
    const timeoutId = setTimeout(calculateActiveStyle, 100);
    
    window.addEventListener('resize', calculateActiveStyle);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', calculateActiveStyle);
    };
  }, [location.pathname, navItems]);

  const handleMouseEnter = (index: number) => {
    const link = linkRefs.current[index];
    if (link) {
      setUnderlineStyle({
        width: link.offsetWidth,
        left: link.offsetLeft,
        opacity: 1
      });
    }
  };

  const handleMouseLeave = () => {
    setUnderlineStyle(activeLinkStyle);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkClasses = (isActive: boolean) =>
    cn(
      'relative text-[15.5px] font-medium transition-colors py-2 z-10',
      isActive ? 'text-purple-500' : 'text-black dark:text-white hover:text-purple-500'
    );

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full font-nhaas">
      <div className="w-full h-[110px] flex items-center justify-between px-[54.5px]">
        
        <div className="flex items-center space-x-[34px]">
          <NavLink to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="GameStore Logo" className="h-7 w-auto" />
          </NavLink>
          
          <div 
            className="hidden md:flex items-center relative" 
            ref={navLinksRef}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-center space-x-[15px]">
              {navItems.map((item, index) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  ref={el => linkRefs.current[index] = el}
                  className={({ isActive }) => navLinkClasses(isActive)}
                  onMouseEnter={() => handleMouseEnter(index)}
                >
                  {item.text}
                </NavLink>
              ))}
            </div>
            <div
              className="absolute bottom-1 h-[1px] bg-purple-500 transition-all duration-300 ease-in-out"
              style={{
                left: `${underlineStyle.left}px`,
                width: `${underlineStyle.width}px`,
                opacity: underlineStyle.opacity
              }}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search games..."
              className="pl-10 w-64"
            />
          </div>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} alt={user?.username} />
                    <AvatarFallback>{user?.username?.[0]?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user?.username}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                {user?.isAdmin && (
                  <DropdownMenuItem onClick={() => navigate('/admin')}>
                    <Shield className="mr-2 h-4 w-4" />
                    Admin Panel
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button onClick={() => navigate('/register')}>
                Register
              </Button>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}