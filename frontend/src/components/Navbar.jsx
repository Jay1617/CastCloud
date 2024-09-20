import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/User";

function Navbar() {
  const navigate = useNavigate();
  const { logoutUser } = UserData();

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold py-4 px-6 bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg">
        {/* Navigation Arrows */}
        <div className="flex items-center gap-4">
          <img
            src={assets.arrow_left}
            className="w-10 bg-gray-700 p-2 rounded-full cursor-pointer hover:bg-gray-600 transition"
            alt="Go Back"
            onClick={() => navigate(-1)}
          />
          <img
            src={assets.arrow_right}
            className="w-10 bg-gray-700 p-2 rounded-full cursor-pointer hover:bg-gray-600 transition"
            alt="Go Forward"
            onClick={() => navigate(+1)}
          />
        </div>

        {/* Logout Button */}
        <div className="flex items-center gap-6">
          <p
            className="bg-white text-black text-sm px-6 py-2 rounded-full cursor-pointer hover:bg-[#EDEAE0] transition transform hover:scale-105"
            onClick={logoutUser}
          >
            Logout
          </p>
        </div>
      </div>

      {/* Filter Options */}
      <div className="flex items-center gap-4 mt-6 px-6">
        <p className="bg-white text-black text-sm px-5 py-2 rounded-full cursor-pointer shadow-lg hover:bg-gray-200 transition">
          All
        </p>
        <p className="bg-gray-900 text-white text-sm px-5 py-2 rounded-full cursor-pointer shadow-lg hover:bg-gray-700 transition hidden md:block">
          Top Rated
        </p>
        <p
          onClick={() => navigate("/playlist")}
          className="bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm px-5 py-2 rounded-full cursor-pointer shadow-lg hover:from-purple-700 hover:to-blue-600 transition md:hidden"
        >
          Playlist
        </p>
      </div>
    </>
  );
}

export default Navbar;
