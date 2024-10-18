import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { FaUserAlt, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiFillProduct } from "react-icons/ai";
import { MdUpcoming } from "react-icons/md";
import { ImCart } from "react-icons/im";
import { CiSearch } from "react-icons/ci";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className="mt-16">
      {/* This is the header of the page */}
      <header className="bg-[#e3a776] fixed top-0 left-0 right-0 z-50 text-gray-800 shadow-lg p-2 px-8 flex justify-between items-center">
        <h1 className="text-gray-800 flex items-center space-x-2 text-2xl font-semibold">
          <a href="/dashboard" className="flex items-center space-x-2">
            <h1 className="text-gray-800 text-2xl font-semibold">
              My<span className="text-white">Kart</span>
            </h1>
            <ImCart className="text-gray-800 w-6 h-6" />
          </a>
          <div class="relative w-[374px]">
            <input
              type="text"
              placeholder="Search..."
              class="w-full pl-10 ml-14 pr-4 py-1 border placeholder:text-gray-700 text-[18px] text-gray-800 border-[#e9e3de77] bg-[#e9e3de77] rounded focus:outline-none"
            />
            <button
              type="submit"
              class="absolute left-16 top-0 mt-2 rounded"
            >
              <CiSearch />
            </button>
          </div>
        </h1>
        <div className="flex items-center space-x-10">
          {/* Upcoming Products button */}
          <div className="flex items-center space-x-2 cursor-pointer">
            <MdUpcoming className="h-6 w-6" />
            <Link to="/productlist">
              <button className="text-gray-800 px-2 py-3 rounded w-full">
                Upcoming Products
              </button>
            </Link>
          </div>

          {/* Add New Product button */}
          <div className="flex items-center space-x-2 cursor-pointer">
            <AiFillProduct className="h-6 w-6" />
            <Link to="/addproduct">
              <button className="text-gray-800 px-2 py-3 rounded w-full">
                Add New Product
              </button>
            </Link>
          </div>

          {/* Shopping cart button */}
          <div className="relative flex items-center cursor-pointer">
            <FaShoppingCart className="h-5 w-5" />
            <Link to="/cart">
              <button className="text-gray-800 px-2 py-3 rounded w-full">
                Cart
              </button>
            </Link>
          </div>

          <div className="relative">
            {/* Account button */}
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={toggleDropdown}
            >
              <FaUserAlt />
              <span className="text-gray-800">Account</span>
            </div>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-orange-100 shadow-md rounded py-2 z-10">
                <a
                  href="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-orange-200 hover:text-black transition-colors"
                >
                  Profile
                </a>
                <a
                  href="/logout"
                  className="w-full text-left block px-4 py-2 text-gray-800 hover:bg-orange-200 hover:text-black transition-colors"
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default Header;
