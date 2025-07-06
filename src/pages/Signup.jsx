import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/signup", { email, password });
      setMessage(res.data.message);
      navigate("/");
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-cyan-400">
      <form onSubmit={handleSignup} className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4">Signup</h2>
        <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn">Signup</button>
        {message && <p className="text-red-400 mt-2">{message}</p>}
        <p className="mt-2">Already have an account? <a href="/" className="text-blue-400">Login</a></p>
      </form>
    </div>
  );
}

export default Signup;
