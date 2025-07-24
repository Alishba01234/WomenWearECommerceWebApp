import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('is_admin') === 'true');

  const login = (tokenValue, adminStatus) => {
    setToken(tokenValue);
    setIsAdmin(adminStatus);
    localStorage.setItem('token', tokenValue);
    localStorage.setItem('is_admin', adminStatus);
    };

  const logout = () => {
    setToken('');
    setIsAdmin(false);
    localStorage.removeItem('token');
    localStorage.removeItem('is_admin');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);