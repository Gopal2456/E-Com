import React, { useState } from "react";
import Logo from "../assets/images/prologo.png";

const MyProfile = () => {
  // State to hold user info
  const [userInfo, setUserInfo] = useState({
    name: "Gopal Mahajan",
    email: "gopalmjn@gmail.com",
    phone: "8329222629",
  });

  // State to track editing mode
  const [isEditing, setIsEditing] = useState(false);

  // Handler to track form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // Handler to save info
  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="bg-[#f3d4ba]">
      <div className="container mx-auto p-4">
        <div className="flex items-center mb-8">
          <div
            className="w-24 h-24 rounded-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${Logo})` }}
            alt="Profile Picture"
          ></div>
          <div className="ml-6">
            <h2 className="text-2xl font-semibold">{userInfo.name}</h2>
            <p className="text-gray-600">{userInfo.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Account Overview</h3>
            {isEditing ? (
              <div>
                <p className="mb-2">
                  <span className="font-bold">Name:</span>
                  <input
                    type="text"
                    name="name"
                    value={userInfo.name}
                    onChange={handleInputChange}
                    className="border-b-2 outline-none border-gray-300 px-2 py-1"
                  />
                </p>
                <p className="mb-2">
                  <span className="font-bold">Email:</span>
                  <input
                    type="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleInputChange}
                    className="border-b-2 outline-none border-gray-300 px-2 py-1"
                  />
                </p>
                <p className="mb-2">
                  <span className="font-bold">Phone:</span>
                  <input
                    type="text"
                    name="phone"
                    value={userInfo.phone}
                    onChange={handleInputChange}
                    className="border-b-2 outline-none border-gray-300 px-2 py-1"
                  />
                </p>
                <button
                  onClick={handleSave}
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                <p className="mb-2">
                  <span className="font-bold">Name:</span> {userInfo.name}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Email:</span> {userInfo.email}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Phone:</span> {userInfo.phone}
                </p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                >
                  Edit Info
                </button>
              </div>
            )}
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
            <ul className="space-y-3">
              <li className="p-4 border rounded-lg flex justify-between">
                <div>
                  <p>
                    <span className="font-bold">Order #12345</span> - ₹99.99
                  </p>
                  <p className="text-gray-600">Placed on Oct 15, 2024</p>
                </div>
                <span className="text-green-500">Delivered</span>
              </li>
            </ul>
            <a href="/cart" className="block text-orange-500 mt-4">
              View All Orders
            </a>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Saved Addresses</h3>
            <div>
              <p>
                <span className="font-bold">Home:</span> 123 Main St, City,
                State, 12345
              </p>
              <button className="mt-5 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                Edit Address
              </button>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Payment Methods</h3>
            <div>
              <p>
                <span className="font-bold">Debit:</span> **** **** **** 1234
              </p>
              <button className="mt-5 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                Edit Payment Method
              </button>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
