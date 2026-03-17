import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, BookOpen, Clock, Heart, Edit3, Camera, Save, X, Users, Star, Shield, Video, Upload, Sparkles as SparklesIcon, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useNotification } from '../context/NotificationContext';

const Sparkles = SparklesIcon;

export default function Profile() {
  const { user, updateUser } = useUser();
  const { showToast } = useNotification();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user ? { ...user } : null);
  const fileInputRef = useRef(null);

  const handleEditToggle = () => {
    if (isEditing) {
      setEditedUser({ ...user }); // Reset on cancel
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    updateUser(editedUser);
    setIsEditing(false);
    showToast('Profile updated successfully!', 'success');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB limit for localStorage
        showToast('Image too large. Please select an image under 1MB.', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        updateUser({ profileImage: base64String });
        setEditedUser(prev => ({ ...prev, profileImage: base64String }));
        showToast('Profile photo updated!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }
  };

  if (!user) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', textAlign: 'center', padding: '2rem' }}>
        <Sparkles size={64} color="var(--color-primary)" style={{ marginBottom: '1.5rem', opacity: 0.5 }} />
        <h2>Profile Not Found</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Please log in to view and manage your profile.</p>
        <Link to="/login" className="btn btn-primary">Go to Login</Link>
      </div>
    );
  }

  return (
    <motion.div 
      className="profile-page" 
      style={{ padding: '1rem', maxWidth: '1000px', margin: '0 auto' }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      
      {/* Top Banner & Header */}
      <motion.div className="glass-card" style={{ padding: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', position: 'relative', overflow: 'hidden' }} variants={containerVariants}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: 'var(--color-primary)', opacity: 0.05, borderRadius: '0 0 0 100%', pointerEvents: 'none' }}></div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', zIndex: 1 }}>
          <div style={{ position: 'relative' }}>
            <motion.img 
              src={user.profileImage} 
              alt="Profile" 
              style={{ width: 120, height: 120, borderRadius: '50%', border: '4px solid var(--color-primary)', objectFit: 'cover', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} 
              whileHover={{ scale: 1.05 }}
            />
            {isEditing && (
              <motion.button 
                className="btn btn-primary"
                style={{ position: 'absolute', bottom: 0, right: 0, width: 36, height: 36, borderRadius: '50%', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onClick={() => fileInputRef.current.click()}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
              >
                <Camera size={18} />
              </motion.button>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept="image/*" 
              onChange={handleImageUpload}
            />
          </div>

          <div style={{ flex: 1 }}>
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: 10 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
                >
                  <input 
                    type="text" 
                    className="auth-input" 
                    value={editedUser.name} 
                    onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                    style={{ fontSize: '1.5rem', fontWeight: 700, padding: '0.5rem 1rem' }}
                    placeholder="Full Name"
                  />
                  <input 
                    type="email" 
                    className="auth-input" 
                    value={editedUser.email} 
                    onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                    style={{ fontSize: '0.9rem' }}
                    placeholder="Email Address"
                  />
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: 10 }}
                >
                  <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem' }}>{user.name}</h2>
                  <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-muted)', fontSize: '1rem' }}>{user.bio}</p>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(79, 62, 52, 0.1)', color: 'var(--color-primary)', padding: '6px 16px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 600 }}>
                    <Sparkles size={14} /> {user.role}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', zIndex: 1 }}>
          {isEditing ? (
            <>
              <motion.button className="btn btn-primary glow-effect" onClick={handleSave} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}><Save size={18}/> Save Changes</motion.button>
              <motion.button className="btn btn-secondary" onClick={handleEditToggle} whileHover={{ y: -2 }}><X size={18}/> Cancel</motion.button>
            </>
          ) : (
            <>
              <motion.button className="btn btn-secondary glow-effect" onClick={handleEditToggle} whileHover={{ y: -2 }}><Edit3 size={18}/> Edit Profile</motion.button>
              <Link to="/community" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Video size={18}/> Community Video
              </Link>
            </>
          )}
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }} variants={containerVariants}>
        <StatCard icon={<BookOpen size={24} color="var(--color-primary)" />} label="Courses Completed" value="12" />
        <StatCard icon={<Heart size={24} color="var(--color-primary)" />} label="Signs Learned" value="840" />
        <StatCard icon={<Clock size={24} color="var(--color-primary)" />} label="Hours Practiced" value="45" />
        <StatCard icon={<Award size={24} color="var(--color-primary)" />} label="Achievements" value="8" />
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
        
        {/* Learning Progress */}
        <motion.div className="glass-card" style={{ padding: '2rem' }} variants={containerVariants}>
          <h3 style={{ margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <TrendingUp size={22} color="var(--color-primary)" /> Learning Progress
          </h3>
          <ProgressRow title="Beginner Sign Course" percent={100} completed />
          <ProgressRow title="Daily Conversations" percent={65} />
          <ProgressRow title="Emergency Signs" percent={10} />
          <ProgressRow title="Advanced Sentence Structures" percent={0} />
        </motion.div>

        {/* Badges / Achievements */}
        <motion.div className="glass-card" style={{ padding: '2rem' }} variants={containerVariants}>
          <h3 style={{ margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Award size={22} color="var(--color-primary)" /> Achievements
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <BadgeCard title="100 Signs" icon={<Award size={32} color="#FFA114"/>} />
            <BadgeCard title="First Room!" icon={<Users size={32} color="var(--color-primary)"/>} />
            <BadgeCard title="Daily Streak" icon={<Star size={32} color="#00FF88"/>} />
            <BadgeCard title="Top Learner" icon={<Shield size={32} color="var(--color-secondary)"/>} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <motion.div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }} whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }} transition={{ type: 'spring', stiffness: 300 }}>
      <div style={{ width: 50, height: 50, background: 'rgba(79,62,52,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{value}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>{label}</div>
      </div>
    </motion.div>
  );
}

function ProgressRow({ title, percent, completed }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.9rem', fontWeight: 600 }}>
        <span>{title}</span>
        <span style={{ color: completed ? '#00D166' : 'var(--color-text-main)' }}>{completed ? 'Completed' : `${percent}%`}</span>
      </div>
      <div className="progress-bar-container" style={{ marginTop: 0, height: '8px', background: 'rgba(0,0,0,0.05)' }}>
        <motion.div 
          className="progress-bar"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
        >
          <motion.div 
            className="progress-fill" 
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ background: completed ? 'linear-gradient(90deg, #00FF88, #00D166)' : 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))', height: '100%', borderRadius: '10px' }}
          ></motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function BadgeCard({ title, icon }) {
  return (
    <motion.div 
      style={{ padding: '1.25rem 1rem', background: 'rgba(255,255,255,0.4)', borderRadius: '16px', textAlign: 'center', border: '1px solid var(--glass-border)' }}
      whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.6)' }}
    >
      <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'center' }}>{icon}</div>
      <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{title}</div>
    </motion.div>
  );
}