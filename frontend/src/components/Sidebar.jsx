import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/User";
import PlayListCard from "./PlayListCard";

function Sidebar() {
  const navigate = useNavigate();
  const { user } = UserData();

  return (
    <div className="w-[25%] h-full p-4 flex-col gap-4 text-white hidden lg:flex bg-[#0e0e0e]">
    
      <div className="h-[15%] bg-[#1a1a1a] rounded-lg flex flex-col justify-around">
        <div
          className="flex items-center gap-3 pl-6 cursor-pointer hover:bg-[#2a2a2a] py-2 rounded transition-all duration-200"
          onClick={() => navigate("/")}
        >
          <img src={assets.home_icon} className="w-6" alt="Home" />
          <p className="font-bold text-lg">Home</p>
        </div>
        <div
          className="flex items-center gap-3 pl-6 cursor-pointer hover:bg-[#2a2a2a] py-2 rounded transition-all duration-200"
          onClick={() => navigate("/search")}
        >
          <img src={assets.search_icon} className="w-6" alt="Search" />
          <p className="font-bold text-lg">Search Podcast</p>
        </div>
      </div>

      <div className="h-[85%] bg-[#1a1a1a] rounded-lg flex flex-col justify-between overflow-hidden">
        <div>
          <div className="p-4 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center gap-3">
              <img src={assets.stack_icon} className="w-6" alt="Library" />
              <p className="font-semibold text-lg">Your Podcast</p>
            </div>
            <div className="flex items-center gap-3">
              <img
                src={assets.arrow_icon}
                className="w-4 cursor-pointer hover:scale-110 transition-all duration-200"
                alt="Arrow"
              />
              <img
                src={assets.plus_icon}
                className="w-4 cursor-pointer hover:scale-110 transition-all duration-200"
                alt="Add"
              />
            </div>
          </div>

          <div onClick={() => navigate("/playlist")}>
            <PlayListCard />
          </div>

          <div className="p-4 bg-[#121212] rounded-lg mt-4 text-left">
            <h1 className="font-semibold">Let's find some podcasts to follow</h1>
            <p className="font-light text-sm mt-1">
              We'll keep you updated on new episodes
            </p>

            <button className="px-4 py-2 mt-4 bg-white text-black text-sm font-medium rounded-full transition-transform transform hover:scale-105"
            onClick={() => navigate("/search")}
            >
              Browse Podcasts
            </button>
          </div>
        </div>

        {user && user.role === "admin" && (
          <button
            className="px-4 py-2 bg-white text-black text-sm font-medium rounded-full m-4 self-end hover:bg-[#EDEAE0] transition transform hover:scale-105"
            onClick={() => navigate("/admin")}
          >
            Admin Dashboard
          </button>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
