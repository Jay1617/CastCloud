import React from "react";
import { FaPodcast } from "react-icons/fa"; // Importing the podcast icon
import { UserData } from "../context/User";

function PlayListCard() {
  const { user } = UserData();

  return (
    <div className="flex items-center p-3 rounded-lg shadow-md cursor-pointer hover:bg-[#2a2a2a] transition-all duration-200">
      {/* Icon Section */}
      <div className="w-12 h-12 bg-gray-700 flex items-center justify-center rounded-lg">
        <FaPodcast className="text-white text-2xl" />
      </div>

      {/* Text Section */}
      <div className="ml-4">
        <h2 className="font-semibold text-lg text-white">My Podcast</h2>
        <p className="text-gray-400 text-sm">
          Podcast • <span>{user.name}</span>
        </p>
      </div>
    </div>
  );
}

export default PlayListCard;
