import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Zap, Trophy, Bot, BookOpen, Star } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import PaymentModal from '../components/subscription/PaymentModal';

const plans = [
  {
    id: 'monthly',
    name: '1 Month Plan',
    price: '$12',
    period: '/mo',
    description: 'Perfect for beginners starting their journey.',
    features: ['Full Access to Live Detection', 'Premium Learning Content', 'Basic AI Practice Support', 'Community Membership'],
    icon: <Zap size={24} className="text-warning" />
  },
  {
    id: 'yearly',
    name: '1 Year Plan',
    price: '$99',
    period: '/yr',
    description: 'Best value for dedicated learners.',
    features: ['Unlimited Live Detection', 'All Course Certifications', 'Priority AI Access', 'Exclusive Mentorship', 'Offline Downloadable Content'],
    icon: <Trophy size={24} className="text-primary" />,
    highlight: true,
    badge: 'BEST VALUE'
  },
  {
    id: 'semi-annual',
    name: '6 Month Plan',
    price: '$59',
    period: '/6mo',
    description: 'Great for steady improvement.',
    features: ['Full Access to Live Detection', 'Premium Learning Content', 'Advanced AI Exercises', 'Progress Analytics'],
    icon: <Star size={24} className="text-secondary" />
  }
];

export default function SubscriptionPlans() {
  const { showToast } = useNotification();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuy = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
    showToast(`Initiating purchase for ${plan.name}`, 'info');
  };

  return (
    <div className="subscription-page p-4">
      <div className="hero-section text-center mb-5">
        <h1 className="text-gradient mb-3">Elevate Your Signing Experience</h1>
        <p className="subtitle mx-auto" style={{ maxWidth: '600px' }}>
          Choose a plan that fits your learning pace and unlock the full power of SignSetu AI.
        </p>
      </div>

      <div className="plans-grid mb-5">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            className={`plan-card glass-card hover-lift ${plan.highlight ? 'highlight gradient-border' : ''}`}
            whileHover={{ y: -10, scale: 1.02 }}
          >
            {plan.badge && <span className="plan-badge">{plan.badge}</span>}
            <div className="plan-header">
              <div className="plan-icon">{plan.icon}</div>
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-price">
                <span className="price">{plan.price}</span>
                <span className="period">{plan.period}</span>
              </div>
              <p className="plan-desc">{plan.description}</p>
            </div>
            
            <ul className="plan-features">
              {plan.features.map((feature, i) => (
                <li key={i}><Check size={16} className="feature-check" /> {feature}</li>
              ))}
            </ul>

            <button 
              className={`btn w-100 mt-auto ${plan.highlight ? 'btn-primary glow-effect' : 'btn-secondary'}`}
              onClick={() => handleBuy(plan)}
            >
              Buy Now
            </button>
          </motion.div>
        ))}
      </div>

      <div className="additional-purchases row g-4 mt-5">
        <div className="col-md-6">
          <motion.div className="purchase-card glass-card h-100 p-4" whileHover={{ scale: 1.02 }}>
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="p-icon bg-soft-primary"><Bot size={24} /></div>
              <h4 className="m-0">Purchase Training Model</h4>
            </div>
            <p className="text-muted small mb-4">Get the full desktop training model for offline processing and research based data analysis.</p>
            <div className="d-flex justify-content-between align-items-center">
              <span className="h4 m-0">$199.00</span>
              <button className="btn btn-secondary px-4" onClick={() => handleBuy({ name: 'AI Training Model', price: '$199' })}>Buy Model</button>
            </div>
          </motion.div>
        </div>
        <div className="col-md-6">
          <motion.div className="purchase-card glass-card h-100 p-4" whileHover={{ scale: 1.02 }}>
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="p-icon bg-soft-secondary"><BookOpen size={24} /></div>
              <h4 className="m-0">Courses & Certifications</h4>
            </div>
            <p className="text-muted small mb-4">Complete professional curriculum with certificates accepted by international sign language boards.</p>
            <div className="d-flex justify-content-between align-items-center">
              <span className="h4 m-0">$49.00</span>
              <button className="btn btn-secondary px-4" onClick={() => handleBuy({ name: 'Professional Courses', price: '$49' })}>Buy Courses</button>
            </div>
          </motion.div>
        </div>
      </div>

      {isModalOpen && (
        <PaymentModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          plan={selectedPlan}
          onClearPlan={() => setSelectedPlan(null)}
        />
      )}

      <style jsx>{`
        .plans-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .plan-card {
          display: flex;
          flex-direction: column;
          padding: 2.5rem;
          height: 100%;
          position: relative;
        }
        .plan-badge {
          position: absolute;
          top: -12px; left: 50%;
          transform: translateX(-50%);
          background: #FFA114;
          color: #000;
          padding: 4px 16px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.5px;
        }
        .plan-icon { margin-bottom: 1.5rem; }
        .plan-name { font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; }
        .plan-price { font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; }
        .plan-price .period { font-size: 1rem; font-weight: 500; color: var(--color-text-muted); }
        .plan-desc { color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: 2rem; }
        .plan-features { list-style: none; padding: 0; margin-bottom: 2.5rem; display: flex; flex-direction: column; gap: 0.75rem; }
        .plan-features li { display: flex; align-items: center; gap: 0.75rem; font-size: 0.95rem; color: var(--color-text-main); }
        .feature-check { color: var(--color-success); }
        .p-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.05); }
        @media (max-width: 768px) {
          .plans-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
