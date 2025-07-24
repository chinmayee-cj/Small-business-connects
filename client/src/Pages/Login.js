import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logo } from "../Assets/index";

// Background image
const backgroundImage =
  "https://www.housedigest.com/img/gallery/5-reasons-why-you-wont-regret-that-open-floor-plan/open-plans-offer-a-wealth-of-natural-lighting-1667812668.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("Response JSON:", data);

    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data.data.user));
      localStorage.setItem("userId", data.data.user._id);
      localStorage.setItem("token", data.data.token);
      setTimeout(() => navigate("/Dashboard"), 100);
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center px-4"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Glassmorphic Card */}
      <div className="backdrop-blur-md bg-white/70 max-w-md w-full rounded-xl shadow-xl p-8">
        <div className="text-center mb-6">
          <img
            src={logo}
            alt="Logo"
            className="w-24 h-24 mx-auto object-contain mb-4"
          />
          <h1 className="text-3xl font-semibold text-gray-700">Login</h1>
          <p className="text-sm text-gray-500 mt-1">
            Need an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-lime-600 font-medium cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>
        </div>

        <form onSubmit={loginUser} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-lime-400 focus:outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-lime-400 focus:outline-none text-sm"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-lime-500 hover:bg-lime-600 text-white px-6 py-2 rounded-md text-sm font-medium transition"
            >
              Login
            </button>
            <span className="text-sm text-gray-500 hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
