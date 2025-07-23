import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);

  const [state, setState] = useState("Sign Up");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePassword = () => setShowPassword((prev) => !prev);

  const onSubmitHandler = async (e) => {
  e.preventDefault();
  axios.defaults.withCredentials = true;

  try {
    if (state === "Sign Up") {
      // 🔹 Call register API
      const { data } = await axios.post(backendUrl + "/api/auth/register", {
        name,
        email,
        password,
      });

      console.log("REGISTER RESPONSE:", data);

      if (data.success) {
        // ✅ Only store if userId exists
        if (data.userId) {
          localStorage.setItem("userId", data.userId);
        } else {
          console.warn("⚠️ No userId returned from backend");
        }

        setIsLoggedin(true);
        await getUserData();
        navigate("/");
      } else {
        toast.error(data.message || "Registration failed");
      }

    } else {
      // 🔹 Call login API
      const { data } = await axios.post(backendUrl + "/api/auth/login", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", data);

      if (data.success) {
        if (data.userId) {
          localStorage.setItem("userId", data.userId);
        } else {
          console.warn("⚠️ No userId returned from backend");
        }

        setIsLoggedin(true);
        await getUserData();
        navigate("/");
      } else {
        toast.error(data.message || "Login failed");
      }
    }
  } catch (error) {
    console.error("❌ Auth Error:", error);
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 relative">
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="absolute top-6 left-6 sm:top-8 sm:left-10 w-24 sm:w-28 cursor-pointer"
      />

      <div className="bg-[#1F1F47]/100 backdrop-blur-lg p-8 rounded-3xl shadow-xl w-full max-w-sm text-center">
        <h2 className="text-3xl font-bold text-white mb-1">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-sm text-gray-300 mb-6">
          {state === "Sign Up"
            ? "Create your account"
            : "Login to your account"}
        </p>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          {state === "Sign Up" && (
            <div className="flex items-center gap-3 w-full px-5 py-3 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="" className="w-5 h-5" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Full Name"
                required
                className="bg-transparent outline-none text-white placeholder-gray-300 w-full"
              />
            </div>
          )}

          <div className="flex items-center gap-3 w-full px-5 py-3 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="" className="w-5 h-5" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email id"
              required
              className="bg-transparent outline-none text-white placeholder-gray-300 w-full"
            />
          </div>

          <div className="flex items-center gap-3 w-full px-5 py-3 rounded-full bg-[#333A5C] relative">
            <img src={assets.lock_icon} alt="" className="w-5 h-5" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="bg-transparent outline-none text-white placeholder-gray-300 w-full pr-10"
            />
            <div
              className="absolute right-5 text-white cursor-pointer"
              onClick={togglePassword}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </div>
          </div>

          {state === "Login" && (
            <p
              onClick={() => navigate("/reset-password")}
              className="text-sm text-indigo-400 hover:text-indigo-300 text-left pl-2 cursor-pointer transition"
            >
              Forgot password?
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-full hover:opacity-90 transition"
          >
            {state}
          </button>
        </form>

        <div className="mt-4 text-sm text-indigo-400 text-center space-y-1">
          {state === "Sign Up" ? (
            <p
              onClick={() => setState("Login")}
              className="hover:text-indigo-300 cursor-pointer transition "
            >
              Already have an account?{" "}
              <span className="hover:text-white underline">Login here</span>
            </p>
          ) : (
            <p
              onClick={() => setState("Sign Up")}
              className="hover:text-indigo-300 cursor-pointer transition"
            >
              Don't have an account?{" "}
              <span className="hover:text-white underline">Sign Up</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;