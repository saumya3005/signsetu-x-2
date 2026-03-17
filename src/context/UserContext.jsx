import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('signsetu-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem('signsetu-user', JSON.stringify(user));
  }, [user]);

  const login = (userData) => {
    setUser({
      ...user,
      ...userData
    });
  };

  const logout = () => {
    localStorage.removeItem('signsetu-user');
    setUser(null);
  };

  const updateUser = (data) => {
    setUser(prev => ({
      ...prev,
      ...data
    }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
