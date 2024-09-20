import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Layout from '../components/Layout';

function Search() {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();

    console.log("Searching for:", query);
  };

  return (

    <div className="flex items-center justify-center mt-10">
      <form onSubmit={handleSearch} className="flex w-full max-w-md">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="p-3 bg-black text-white rounded-r-lg hover:bg-indigo-600 transition duration-200"
        >
          <FaSearch />
        </button>
      </form>
    </div>
  );
}

export default Search;
