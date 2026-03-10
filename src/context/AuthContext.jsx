import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
  updateUser: (updates) => {}, // Tell TS this function exists
});

export function AuthProvider({ children }) {
  //initiliazed state from localstorage to survive refresh
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('auth_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    const newUser = userData ?? { name: 'Creator', hasCompletedOnboarding: false };
    setUser(newUser);
    localStorage.setItem('auth_user', JSON.stringify(newUser));
  };

  const updateUser = (updates) => {
    setUser((prev) => {
      const updated = prev ? { ...prev, ...updates } : null;
      if (updated) localStorage.setItem('auth_user', JSON.stringify(updated));
      return updated;
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
