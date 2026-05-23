import { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = ({ onCartClick }) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const [prevLocation, setPrevLocation] = useState(location);
  if (location.pathname !== prevLocation.pathname || location.search !== prevLocation.search) {
    setPrevLocation(location);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { 
      name: 'Programs', 
      hasDropdown: true,
      dropdownItems: [
        { name: 'Self Paced Courses', path: '/self-paced' },
        { name: 'Internship Programs', path: '/internships' },
        { name: 'Placement Programs', path: '/placement' },
      ]
    },
    { 
      name: 'Advanced Programs', 
      hasDropdown: true,
      dropdownItems: [
        { name: 'Digital Marketing', path: '/advanced-digital-marketing' },
        { name: 'Data Science', path: '/advanced-data-science' },
        { name: 'Cyber Security', path: '/advanced-cyber-security' },
      ]
    },
    { 
      name: 'Pro Packs', 
      hasDropdown: true,
      dropdownItems: [
        { name: 'MBA Lite Pack', path: '/pro/mba-lite' },
        { name: 'Tech Starter Pack', path: '/pro/tech-starter' },
        { name: 'Creator Pack', path: '/pro/creator-pack' },
      ]
    },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-md py-3' : 'bg-white py-5'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/Kelvornex.jpeg" alt="kelvornex" className="h-8 md:h-10" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <div 
              key={link.name} 
              className="relative group"
              onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-sm font-bold text-gray-700 hover:text-brand-purple transition-colors flex items-center gap-1 py-2">
                {link.name}
                {link.hasDropdown && <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />}
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {link.hasDropdown && activeDropdown === link.name && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-2xl p-4 border border-gray-100 overflow-hidden"
                  >
                    {link.dropdownItems.map((item) => (
                      <Link 
                        key={item.name} 
                        to={item.path}
                        className="block px-4 py-3 text-sm font-semibold text-gray-600 hover:text-brand-purple hover:bg-brand-purple/5 rounded-xl transition-all"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Buttons & Cart */}
        <div className="hidden lg:flex items-center gap-4">
          <Link to="/about" className="text-sm font-bold text-gray-700 hover:text-brand-purple transition-colors mr-4">About Us</Link>
          {isAuthenticated ? (
            <Link to={`/profile/${user?.id}`} className="flex items-center mr-2">
              {user?.profilePictureUrl && !user.profilePictureUrl.includes('unsplash') && !user.profilePictureUrl.includes('placeholder') ? (
                <img src={user.profilePictureUrl} referrerPolicy="no-referrer" className="h-9 w-9 rounded-full object-cover border border-slate-200" alt="Profile" />
              ) : (
                <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-slate-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
              )}
            </Link>
          ) : (
            <Link to="/login" className="text-sm font-bold text-gray-700 hover:text-brand-purple transition-colors mr-2">Login</Link>
          )}
          
          <Link to="/contact" className="bg-brand-purple text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-brand-purple-dark transition-all shadow-lg shadow-brand-purple/20">Contact Us</Link>
          
          <button 
            onClick={onCartClick}
            className="relative p-2 text-gray-700 hover:text-brand-purple transition-colors ml-2"
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Toggle */}
        {/* Mobile Toggle & Cart */}
        <div className="flex items-center gap-2 lg:hidden">
          <button 
            onClick={onCartClick}
            className="relative p-2 text-gray-700 hover:text-brand-purple transition-colors"
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
          
          <button 
            className="text-gray-900 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 overflow-hidden shadow-2xl"
          >
            <div className="p-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                    className="w-full flex justify-between items-center py-4 text-lg font-bold text-gray-800 border-b border-gray-50"
                  >
                    {link.name}
                    {link.hasDropdown && <ChevronDown size={20} className={activeDropdown === link.name ? 'rotate-180' : ''} />}
                  </button>
                  
                  {link.hasDropdown && activeDropdown === link.name && (
                    <div className="bg-gray-50 rounded-2xl p-4 mt-2 flex flex-col gap-2">
                      {link.dropdownItems.map((item) => (
                        <Link key={item.name} to={item.path} className="py-3 text-gray-600 font-semibold">{item.name}</Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-6 flex flex-col gap-3">
                {isAuthenticated ? (
                  <>
                    <Link to={`/profile/${user?.id}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                      {user?.profilePictureUrl && !user.profilePictureUrl.includes('unsplash') && !user.profilePictureUrl.includes('placeholder') ? (
                        <img src={user.profilePictureUrl} referrerPolicy="no-referrer" className="h-9 w-9 rounded-full object-cover border border-slate-200" alt="Profile" />
                      ) : (
                        <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-slate-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                          </svg>
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-bold text-gray-800">{user?.name}</div>
                        <div className="text-xs text-gray-500 capitalize">{user?.role?.toLowerCase()} Dashboard</div>
                      </div>
                    </Link>
                  </>
                ) : (
                  <Link to="/login" className="w-full bg-brand-purple text-white py-4 rounded-2xl font-bold text-center block">Login</Link>
                )}
                <Link to="/contact" className="w-full border-2 border-gray-800 text-gray-800 py-4 rounded-2xl font-bold text-center block">Contact Us</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
