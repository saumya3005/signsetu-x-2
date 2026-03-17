import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try{

      const url = isLogin
        ? "http://localhost:3001/api/auth/login"
        : "http://localhost:3001/api/auth/signup";

      const bodyData = isLogin
        ? { email, password }
        : { name, email, password };

      const response = await fetch(url,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(bodyData)
      });

      const data = await response.json();

      if(response.ok){

        alert(data.message);

        if(isLogin){
          localStorage.setItem("token",data.token);
          navigate("/dashboard");
        }

      }else{
        alert(data.message);
      }

    }catch(error){
      alert("Server error");
    }

  };

  return (
    <div className="auth-page">

      <motion.div 
        className="glass-card auth-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >

        <div className="auth-logo">SignSetu AI</div>

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>

          {!isLogin && (
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                className="auth-input"
                placeholder="John Doe"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              className="auth-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <div style={{ position: "relative" }}>

              <input
                type={showPassword ? "text" : "password"}
                className="auth-input"
                placeholder="••••••••"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
                style={{ width: "100%" }}
              />

              <button
                type="button"
                onClick={()=>setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none"
                }}
              >
                {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>

            </div>

          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 glow-effect"
            style={{ marginTop: "1rem" }}
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>

        </form>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>

          {isLogin
            ? "Don't have an account? "
            : "Already have an account? "}

          <button
            type="button"
            onClick={()=>setIsLogin(!isLogin)}
            style={{
              color:"var(--color-primary)",
              fontWeight:"700",
              background:"none"
            }}
          >

            {isLogin ? "Sign Up" : "Log In"}

          </button>

        </div>

      </motion.div>

    </div>
  );
}