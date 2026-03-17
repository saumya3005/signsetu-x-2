import { motion } from 'framer-motion';
import { Bell, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

const icons = {
  success: <CheckCircle className="text-success" size={20} />,
  info: <Info className="text-info" size={20} />,
  warning: <AlertTriangle className="text-warning" size={20} />,
  error: <X className="text-error" size={20} />,
};

export default function Toast({ message, type = 'info' }) {
  return (
    <motion.div
      className={`toast-item glass-card ${type}`}
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', damping: 25, stiffness: 500 }}
    >
      <div className="toast-icon">
        {icons[type] || icons.info}
      </div>
      <div className="toast-content">
        {message}
      </div>
    </motion.div>
  );
}
