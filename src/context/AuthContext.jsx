/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('auth_user');
    const authStatus = localStorage.getItem('authenticated');
    if (storedUser && authStatus === 'true') {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed && typeof parsed === 'object') {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse auth_user from localStorage', e);
        localStorage.removeItem('auth_user');
        localStorage.removeItem('authenticated');
      }
    }
    return null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedUser = localStorage.getItem('auth_user');
    const authStatus = localStorage.getItem('authenticated');
    if (!storedUser || authStatus !== 'true') return false;
    try {
      const parsed = JSON.parse(storedUser);
      return !!(parsed && typeof parsed === 'object');
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const verifySession = async () => {
      if (user && isAuthenticated) {
        try {
          const response = await fetch(`/api/users/profile/${user.id}`);
          if (!response.ok) {
            if (response.status === 404 || response.status === 401) {
              console.warn('Stale session detected: user not found on backend. Clearing local session.');
              // Clear session synchronously to update UI instantly without loop
              setUser(null);
              setIsAuthenticated(false);
              localStorage.removeItem('auth_user');
              localStorage.removeItem('authenticated');
            }
          }
        } catch (e) {
          console.error('Failed to verify session with backend', e);
        }
      }
    };
    
    verifySession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = (userData) => {
    // userData expects: { authenticated: true, user: { id, name, role, profileLink, profilePictureUrl } }
    const userProfile = userData.user;
    
    setUser(userProfile);
    setIsAuthenticated(true);
    
    localStorage.setItem('auth_user', JSON.stringify(userProfile));
    localStorage.setItem('authenticated', 'true');

    // Redirect to profile dashboard
    window.location.href = userProfile.profileLink;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    
    localStorage.removeItem('auth_user');
    localStorage.removeItem('authenticated');
    
    // Redirect to login page
    window.location.href = '/login';
  };

  const updateUser = (updatedFields) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      const newUser = { ...prevUser, ...updatedFields };
      localStorage.setItem('auth_user', JSON.stringify(newUser));
      return newUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
