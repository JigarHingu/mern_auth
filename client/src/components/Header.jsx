import React, { useContext } from "react";
import { assets } from "../assets/assets.js";
import { AppContext } from "../context/AppContext.jsx";

const Header = () => {

  const {userData} = useContext(AppContext);

  return (
    <div className="w-full flex flex-col items-center justify-center text-center p-4 sm:p-6 sm:px-24 mt-20">
      <img
        src={assets.header_img}
        alt="header"
        className=" w-36 h-36 rounded-full mb-6 "
      />
      <h1 className=" flex item-center gap-2 text-xl sm:text-3xl font-medium mb-2">
        Heyyy {userData ? userData.name : 'Developer' }!
        <img
          src={assets.hand_wave}
          alt="hand wave"
          className="w-8 aspect-sqaure "
        />
      </h1>
      <h2 className=" text-3xl sm:text-5xl font-semibold mb-4 ">Welcome to our app</h2>
      <p className=" text-gray-600 mb-8 max-w-md">
        Let's start with a quick product tour and we will have you up and
        running in no time!
      </p>
      <button className=" border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all">Get started</button>
    </div>
  );
};
export default Header;

