import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy, Download, X, Loader2, CreditCard, QrCode, Building2 } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

export default function PaymentModal({ isOpen, onClose, plan, onClearPlan }) {
  const { showToast } = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState('payment'); // 'payment' or 'success'

  const handleCopyUPI = () => {
    navigator.clipboard.writeText('signsetuaichat@upi');
    showToast('UPI ID copied to clipboard!', 'success');
  };

  const handlePayment = () => {
    setIsLoading(true);
    showToast('Verifying payment...', 'info');
    
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
      localStorage.setItem('signsetu-subscription', JSON.stringify({
        active: true,
        planName: plan.name,
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // Placeholder 30 days
      }));
      showToast('Payment Successful 🎉', 'success');
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <motion.div 
        className="modal-content glass-card gradient-border"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
      >
        <button className="close-modal" onClick={onClose}><X size={20} /></button>

        {step === 'payment' ? (
          <div className="payment-flow">
            <h2 className="modal-title">Secure Payment</h2>
            <p className="modal-subtitle">Follow the steps below to complete your subscription for <strong>{plan.name}</strong>.</p>
            
            <div className="payment-grid">
              <div className="qr-section">
                <div className="qr-container glass-card">
                  {/* Placeholder QR */}
                  <div className="qr-placeholder">
                    <QrCode size={120} color="var(--color-primary)" />
                    <span>Scan to Pay</span>
                  </div>
                </div>
                <button className="btn btn-secondary btn-sm w-100 mt-3">
                  <Download size={16} /> Download QR
                </button>
              </div>

              <div className="details-section">
                <div className="payment-method glass-card mb-3">
                  <div className="method-header">
                    <Building2 size={18} />
                    <span>Bank Details</span>
                  </div>
                  <div className="method-body">
                    <p><strong>A/C:</strong> 987654321012</p>
                    <p><strong>IFSC:</strong> SBIN0001234</p>
                    <p><strong>Name:</strong> SIGNSETU AI SOLUTIONS</p>
                  </div>
                </div>

                <div className="payment-method glass-card">
                  <div className="method-header">
                    <CreditCard size={18} />
                    <span>UPI Details</span>
                  </div>
                  <div className="method-body">
                    <div className="upi-id">
                      <span>signsetuaichat@upi</span>
                      <button className="icon-btn" onClick={handleCopyUPI}><Copy size={16} /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer mt-4">
              <button 
                className="btn btn-primary w-100 glow-effect" 
                onClick={handlePayment}
                disabled={isLoading}
              >
                {isLoading ? <><Loader2 className="animate-spin" size={20} /> Processing...</> : 'I Have Paid'}
              </button>
            </div>
          </div>
        ) : (
          <div className="success-flow text-center py-4">
            <div className="success-icon mb-4">
              <Check size={60} color="var(--color-success)" />
            </div>
            <h2 className="modal-title">Payment Successful 🎉</h2>
            <p className="modal-subtitle">Your subscription for <strong>{plan.name}</strong> is now active. Enjoy premium features!</p>
            <button className="btn btn-primary mt-4" onClick={() => { onClose(); onClearPlan(); }}>Go to Dashboard</button>
          </div>
        )}
      </motion.div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(8px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        .modal-content {
          width: 100%;
          max-width: 600px;
          padding: 2.5rem;
          position: relative;
        }
        .close-modal {
          position: absolute;
          top: 1.5rem; right: 1.5rem;
          background: none; border: none;
          color: var(--color-text-muted);
          cursor: pointer;
        }
        .modal-title { font-size: 1.75rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--color-primary); }
        .modal-subtitle { color: var(--color-text-muted); margin-bottom: 2rem; }
        .payment-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 2rem; }
        .qr-section { display: flex; flex-direction: column; align-items: center; }
        .qr-container { padding: 1.5rem; background: #FFF; width: 100%; display: flex; justify-content: center; }
        .qr-placeholder { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; color: var(--color-text-muted); font-size: 0.8rem; }
        .method-header { display: flex; align-items: center; gap: 0.5rem; font-weight: 700; color: var(--color-primary); margin-bottom: 0.5rem; }
        .method-body { font-size: 0.9rem; line-height: 1.5; color: var(--color-text-muted); }
        .upi-id { display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.05); padding: 0.5rem 0.75rem; border-radius: 8px; margin-top: 0.5rem; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 600px) {
          .payment-grid { grid-template-columns: 1fr; }
          .modal-content { padding: 1.5rem; }
        }
      `}</style>
    </div>
  );
}
