import React from "react";
import { Link } from "react-router-dom";
import { FaBook, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-800 p-4 flex justify-between items-center sticky top-0 z-10 mb-6">
      <div>
        <Link to="/" className="flex items-center cursor-pointer text-white font-bold text-xl">
          <FaBook className="text-white text-2xl mr-2" />
          Readora
        </Link>
      </div>
      <div className="flex space-x-4 items-center">
        <Link to="/signup" className="cursor-pointer text-white">Signup</Link>
        <Link to="/login" className="cursor-pointer text-white">Login</Link>
        <Link to="/profile" aria-label="Profile">
          <FaUserCircle className="cursor-pointer text-white text-2xl" />
        </Link>
        <Link to="/book" className="cursor-pointer text-white">Books</Link>
        <Link to="/issuance" className="cursor-pointer text-white">Issuance</Link>
      </div>
    </nav>
  );
};

export default Navbar;
