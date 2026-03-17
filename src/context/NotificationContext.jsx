import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import Toast from '../components/ui/Toast';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showToast = useCallback((message, type = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications((prev) => [...prev, { id, message, type }]);
    
    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <div className="toast-container">
        <AnimatePresence>
          {notifications.map((n) => (
            <Toast key={n.id} message={n.message} type={n.type} />
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};
