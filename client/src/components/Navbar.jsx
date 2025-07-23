import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sendVerificationOtp = async () => {
  try {
    axios.defaults.withCredentials = true;

    const { data } = await axios.post(
      backendUrl + '/api/auth/send-verify-otp',
      { userId: userData._id }
    );

    if (data.success) {
      navigate('/email-verify');
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
}

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/logout');
      data.success && setIsLoggedin(false);
      data.success && setUserData(null);
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0 ">
      <img src={assets.logo} alt="Logo" className="w-28 sm:w-32" />

      {userData ? (
        <div ref={dropdownRef} className="relative cursor-pointer">
          {/* Avatar Circle */}
          <div
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-10 h-10 flex justify-center items-center rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 text-white text-lg font-bold shadow-[0_0_15px_rgba(255,0,255,0.5)] animate-pulse transition-transform duration-300"
          >
            {userData?.name?.[0]?.toUpperCase()}
          </div>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl transform transition-all duration-300 z-50">
              <div className="px-4 py-2 border-b text-sm font-medium text-gray-700 text-center">
                {userData.name}
              </div>
              <ul className="py-2 text-sm text-gray-700">
                {!userData.isAccountVerified && (
                  <li
                    onClick={() => {
                      sendVerificationOtp();
                      setIsOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-purple-100 hover:text-purple-700 cursor-pointer transition duration-200 rounded"
                  >
                    ✉️ Verify Email
                  </li>
                )}
                <li
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-red-100 hover:text-red-600 cursor-pointer transition duration-200 rounded"
                >
                  🔓 Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex item-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
        >
          Login <img src={assets.arrow_icon} alt="" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
