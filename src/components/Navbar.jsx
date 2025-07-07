import React from "react";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      
      <h1 className="text-2xl font-bold">
 Spotify Clone</h1>
      <nav className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/search" className="hover:underline">Search</Link>
      </nav>
    </header>
  );
};

export default Navbar;
