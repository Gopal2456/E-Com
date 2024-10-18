import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const OrderDetails = () => {
  const location = useLocation();
  const orderData = location.state;

  return (
    <div className="bg-[#f3d4ba] h-screen p-5">
      <div className="max-w-6xl mx-auto p-8 bg-[#ffffff] rounded-lg shadow-lg mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Progress Tracker */}
          <div className="border-r-2 w-[500px] ">
            <div className="border-l-2 border-green-500 h-fit pl-4">
              <div className="flex items-center mb-4">
                <div className="bg-green-500 rounded-full w-4 h-4"></div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-800">Ordered Placed</p>
                  <p className="text-sm text-gray-600">{orderData.orderDate}</p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                <div
                  className={`w-4 h-4 rounded-full ${
                    orderData.packed ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-800">Packed</p>
                  <p className="text-sm text-gray-600">
                    {orderData.packedDate || "Not yet packed"}
                  </p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                <div
                  className={`w-4 h-4 rounded-full ${
                    orderData.shipped ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-800">Shipped</p>
                  <p className="text-sm text-gray-600">
                    {orderData.shippedDate || "Not yet shipped"}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div
                  className={`w-4 h-4 rounded-full ${
                    orderData.delivered ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-800">Delivery</p>
                  <p className="text-sm text-gray-600">
                    {orderData.deliveryDate
                      ? `Expected by ${orderData.deliveryDate}`
                      : "Shipment yet to be delivered"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <p className="font-semibold text-gray-600">Name:</p>
              <p className="text-lg text-gray-800">{orderData.name}</p>
            </div>

            <div>
              <p className="font-semibold text-gray-600">Address:</p>
              <p className="text-lg text-gray-800">{orderData.address}</p>
            </div>

            <div>
              <p className="font-semibold text-gray-600">Phone Number:</p>
              <p className="text-lg text-gray-800">{orderData.phone}</p>
            </div>

            <div>
              <p className="font-semibold text-gray-600">Pincode:</p>
              <p className="text-lg text-gray-800">{orderData.pincode}</p>
            </div>

            <div>
              <p className="font-semibold text-gray-600">City:</p>
              <p className="text-lg text-gray-800">{orderData.city}</p>
            </div>

            <div>
              <p className="font-semibold text-gray-600">State:</p>
              <p className="text-lg text-gray-800">{orderData.state}</p>
            </div>

            <div>
              <p className="font-semibold text-gray-600">Payment Method:</p>
              <p className="text-lg text-gray-800 capitalize">
                {orderData.paymentMethod}
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-600">Order Date:</p>
              <p className="text-lg text-gray-800">{orderData.date}</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end">
          <Link to="/dashboard">
            <button className="px-6 py-3 bg-orange-500 text-white rounded font-semibold shadow-lg hover:bg-orange-600">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
