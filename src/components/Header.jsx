import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { FaUserAlt, FaShoppingCart } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { AiFillProduct } from "react-icons/ai";
import { MdUpcoming } from "react-icons/md";
import { ImCart } from "react-icons/im";
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";
import { ImProfile } from "react-icons/im";
import { TiHome } from "react-icons/ti";
import { MdManageAccounts } from "react-icons/md";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
          <div className="relative w-[374px]">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 ml-14 pr-4 py-1 border font-normal placeholder:text-gray-700 text-[18px] text-gray-800 border-[#e9e3de77] bg-[#e9e3de77] rounded focus:outline-none"
            />
            <button
              type="submit"
              className="absolute left-16 top-0 mt-2 rounded"
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
              <button
                className={`${
                  location.pathname === "/productlist"
                    ? "bg-highlight text-white"
                    : "text-gray-800"
                } px-2 py-3 rounded w-full`}
              >
                Upcoming Products
              </button>
            </Link>
          </div>

          {/* Add New Product button */}
          <div className="flex items-center space-x-2 cursor-pointer">
            <AiFillProduct className="h-6 w-6" />
            <Link to="/addproduct">
              <button
                className={`${
                  location.pathname === "/addproduct"
                    ? "bg-highlight text-white"
                    : "text-gray-800"
                } px-2 py-3 rounded w-full`}
              >
                Add New Product
              </button>
            </Link>
          </div>

          {/* Shopping cart button */}
          <div className="relative flex items-center cursor-pointer">
            <FaShoppingCart className="h-5 w-5" />
            <Link to="/cart">
              <button
                className={`${
                  location.pathname === "/cart"
                    ? "bg-highlight text-white"
                    : "text-gray-800"
                } px-2 py-3 rounded w-full`}
              >
                Cart
              </button>
            </Link>
          </div>

          <div className="relative">
            {/* Account button */}
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={toggleSidebar} // Toggle the sidebar instead of dropdown
            >
              <FaUserAlt />
              <span className="text-gray-800">Account</span>
            </div>

            {/* Sidebar */}
            {isSidebarOpen && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-20">
                <div className="absolute right-0 top-0 w-64 h-full bg-[#f5d0b0] shadow-md z-30">
                  <div className="flex justify-between bg-[#ecaf79] border-b-0 border-gray-200 shadow-md items-center p-4">
                    <span className="text-gray-800 text-xl">Account</span>
                    <button onClick={toggleSidebar} className="text-black">
                      <RxHamburgerMenu className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="p-2">
                    <a
                      href="/dashboard"
                      className="flex items-center px-3 py-2 my-3 rounded text-gray-800  hover:bg-[#f7be8b] transition-colors"
                    >
                      <TiHome className="w-6 h-6 mr-3"/>
                      Home
                    </a>
                    <a
                      href="/myprofile"
                      className="flex items-center px-3 py-2 my-3 rounded text-gray-800  hover:bg-[#f7be8b] transition-colors"
                    >
                      <MdManageAccounts className="w-6 h-6 mr-3"/>
                      My Profile
                    </a>
                    <a
                      href="/logout"
                      className="flex items-center px-2 py-2 rounded text-gray-800 hover:bg-[#f7be8b] transition-colors"
                    >
                      <BiLogOutCircle className="w-6 h-6 mr-3"/>
                      Logout
                    </a>
                  </div>
                </div>
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
