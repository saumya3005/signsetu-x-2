import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");       // ✅ added
  const [email, setEmail] = useState("");     // ✅ added
  const [password, setPassword] = useState(""); // ✅ added

  const navigate = useNavigate();

  // ✅ FINAL API CONNECTED FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isLogin
        ? "http://127.0.0.1:8000/api/auth/login"
        : "http://127.0.0.1:8000/api/auth/signup";

      const bodyData = isLogin
        ? { email, password }
        : { name, email, password };

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert(data.message);
        navigate("/dashboard");
      } else {
        alert(data.message || "Something went wrong");
      }

    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-shapes">
        <div className="shape-1"></div>
        <div className="shape-1" style={{ top: 'auto', bottom: '-100px', left: 'auto', right: '-100px', background: 'var(--color-primary)' }}></div>
      </div>

      <motion.div 
        className="glass-card auth-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-logo">SignSetu AI</div>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            {isLogin 
              ? 'Sign in to continue your journey.' 
              : 'Create your account to get started.'}
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          
          {/* SIGNUP NAME FIELD */}
          {!isLogin && (
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                className="auth-input"
                placeholder="John Doe"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          {/* EMAIL */}
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              className="auth-input"
              placeholder="you@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                className="auth-input"
                placeholder="••••••••"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  color: 'var(--color-text-muted)'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="btn btn-primary w-100 glow-effect"
            style={{ marginTop: '0.5rem' }}
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>

        </form>

        {/* SWITCH LOGIN/SIGNUP */}
        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: 'var(--color-primary)', fontWeight: '700', background: 'none' }}
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </div>

      </motion.div>
    </div>
  );
}