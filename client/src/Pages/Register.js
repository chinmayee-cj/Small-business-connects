import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logo } from "../Assets/index";

// Same background used in Login.js
const backgroundImage =
  "https://www.housedigest.com/img/gallery/5-reasons-why-you-wont-regret-that-open-floor-plan/open-plans-offer-a-wealth-of-natural-lighting-1667812668.jpg";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyID, setcompanyID] = useState("");
  const [role, setDomain] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const registerUser = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          role,
          password,
          companyID,
        }),
      });

      const data = await response.json();
      console.log("Response JSON:", data);

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.data.user));
        localStorage.setItem("userId", data.data.user._id);
        localStorage.setItem("token", data.data.token);
        setTimeout(() => navigate("/"), 100);
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
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
      {/* Glass-style form container */}
      <div className="backdrop-blur-md bg-white/70 max-w-lg w-full rounded-xl shadow-xl p-8">
        <div className="text-center mb-6">
          <img
            src={logo}
            alt="Logo"
            className="w-24 h-24 mx-auto object-contain mb-4"
          />
          <h1 className="text-3xl font-semibold text-gray-700">Register</h1>
          <p className="text-sm text-gray-500 mt-1">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-lime-600 font-medium cursor-pointer hover:underline"
            >
              Sign In
            </span>
          </p>
        </div>

        <form onSubmit={registerUser} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Company Name
            </label>
            <input
              type="text"
              placeholder="Company Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-lime-400 focus:outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-lime-400 focus:outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Company ID
            </label>
            <input
              type="text"
              placeholder="Company Registration ID"
              value={companyID}
              onChange={(e) => setcompanyID(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-lime-400 focus:outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Domain
            </label>
            <input
              type="text"
              placeholder="Business Domain (e.g. Healthcare, HR)"
              value={role}
              onChange={(e) => setDomain(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-lime-400 focus:outline-none text-sm"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-lime-400 focus:outline-none text-sm"
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-lime-500 hover:bg-lime-600 text-white px-6 py-3 rounded-md text-sm font-medium transition"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
