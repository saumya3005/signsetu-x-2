import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Menu, X, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';

export default function Navbar() {
  const { user, logout } = useUser();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Live Detection', path: '/detection' },
    { name: 'Learning', path: '/learning' },
    { name: 'Community', path: '/community' },
    { name: 'About Us', path: '/#about' },
    { name: 'Dashboard', path: '/dashboard' }
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="logo">
          <Sparkles color="var(--color-secondary)" />
          SignSetu AI
        </Link>

        {/* Desktop Nav */}
        <ul className="nav-links desktop-only">
          {navLinks.map((link) => (
            <li key={link.name}>
              {link.path.startsWith('/#') ? (
                <a 
                  href={link.path}
                  className={location.hash === link.path.replace('/', '') ? 'active' : ''}
                >
                  {link.name}
                </a>
              ) : (
                <Link 
                  to={link.path}
                  className={location.pathname === link.path ? 'active' : ''}
                >
                  {link.name}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="nav-actions desktop-only">
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Welcome, {user.name.split(' ')[0]}</span>
              <Link to="/profile">
                <img src={user.profileImage || 'https://i.pravatar.cc/150?img=11'} alt="User" style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid var(--color-primary)' }} />
              </Link>
              <button onClick={logout} className="icon-btn" title="Logout"><LogOut size={20} /></button>
            </div>
          ) : (
            <>
              <Link to="/login" state={{ isSignup: false }} className="btn btn-secondary">Login</Link>
              <Link to="/signup" state={{ isSignup: true }} className="btn btn-primary glow-effect">Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <motion.div 
        className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: mobileMenuOpen ? 'auto' : 0, opacity: mobileMenuOpen ? 1 : 0 }}
      >
        <ul className="mobile-nav-links">
          {navLinks.map((link) => (
            <li key={link.name}>
              {link.path.startsWith('/#') ? (
                <a 
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ) : (
                <Link 
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )}
            </li>
          ))}
          {user ? (
            <>
              <li>
                <div style={{ padding: '0.8rem 0', display: 'flex', alignItems: 'center', gap: '0.8rem', borderBottom: '1px solid var(--glass-border)' }}>
                  <img src={user.profileImage || 'https://i.pravatar.cc/150?img=11'} alt="User" style={{ width: 32, height: 32, borderRadius: '50%' }} />
                  <span style={{ fontWeight: 600 }}>{user.name}</span>
                </div>
              </li>
              <li><button onClick={() => { logout(); setMobileMenuOpen(false); }} className="btn btn-secondary w-100 mt-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}><LogOut size={18}/> Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" state={{ isSignup: false }} onClick={() => setMobileMenuOpen(false)} className="btn btn-secondary w-100 mt-3">Login</Link></li>
              <li><Link to="/signup" state={{ isSignup: true }} onClick={() => setMobileMenuOpen(false)} className="btn btn-primary w-100 mt-2">Sign Up</Link></li>
            </>
          )}
        </ul>
      </motion.div>
    </nav>
  );
}
