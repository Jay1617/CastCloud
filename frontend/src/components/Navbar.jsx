import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/User";

function Navbar() {
  const navigate = useNavigate();
  const { user, logoutUser } = UserData();

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold py-4 px-6 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 shadow-lg">
        <div className="flex items-center gap-4">
          <img
            src={assets.arrow_left}
            className="w-10 h-10 bg-gray-700 p-2 rounded-full cursor-pointer hover:bg-gray-600 transition-all duration-300"
            alt="Go Back"
            onClick={() => navigate(-1)}
          />
          <img
            src={assets.arrow_right}
            className="w-10 h-10 bg-gray-700 p-2 rounded-full cursor-pointer hover:bg-gray-600 transition-all duration-300"
            alt="Go Forward"
            onClick={() => navigate(+1)}
          />
        </div>

        <div className="text-lg text-white animate-fade-in-slide-up">
          Hey, <span className="font-bold">{user.name}</span>
        </div>

        <div className="flex items-center gap-6">
          <button
            className="bg-white text-black text-sm px-6 py-2 rounded-full cursor-pointer hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={logoutUser}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-6 px-6">
        <p className="bg-white text-black text-sm px-5 py-2 rounded-full cursor-pointer shadow-md hover:bg-gray-200 transition-all duration-300">
          All
        </p>
        <p className="bg-gray-900 text-white text-sm px-5 py-2 rounded-full cursor-pointer shadow-md hover:bg-gray-700 transition-all duration-300 hidden md:block">
          Top Rated
        </p>
        <p
          onClick={() => navigate("/playlist")}
          className="bg-white text-black text-sm px-5 py-2 rounded-full cursor-pointer shadow-md hover:bg-gray-700 transition-all duration-300 md:hidden"
        >
          Playlist
        </p>
      </div>
    </>
  );
}

export default Navbar;
