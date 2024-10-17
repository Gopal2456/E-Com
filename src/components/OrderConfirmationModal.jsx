import React from "react";
import Modal from "@mui/material/Modal";

const OrderConfirmationModal = ({
  open,
  handleClose,
  formData,
  handleChange,
  handleConfirmOrder,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg pt-8 p-8 shadow-lg w-full max-w-4xl">
          <h1 className="text-xl font-bold mb-8 text-center">
            Confirm Your Order
          </h1>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm mb-2 font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Your Name"
                className={`mt-2 block w-full px-3 py-2 border ${
                  formData.name ? "border-gray-300" : "border-red-500"
                } rounded shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm`}
                required
              />
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm mb-2 font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter Your Address"
                className={`mt-1 block w-full px-3 py-2 border ${
                  formData.address ? "border-gray-300" : "border-red-500"
                } rounded shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm`}
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm mb-2 font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter Your Phone Number"
                className={`mt-1 block w-full px-3 py-2 border ${
                  formData.phone ? "border-gray-300" : "border-red-500"
                } rounded shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm`}
                required
              />
            </div>

            {/* Pincode */}
            <div>
              <label
                htmlFor="pincode"
                className="block text-sm mb-2 font-medium text-gray-700"
              >
                Pincode
              </label>
              <input
                type="number"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Enter Your Pincode"
                className={`mt-1 block w-full px-3 py-2 border ${
                  formData.pincode ? "border-gray-300" : "border-red-500"
                } rounded shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm`}
                required
              />
            </div>

            {/* City */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm mb-2 font-medium text-gray-700"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter Your City"
                className={`mt-1 block w-full px-3 py-2 border ${
                  formData.city ? "border-gray-300" : "border-red-500"
                } rounded shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm`}
                required
              />
            </div>

            {/* State */}
            <div>
              <label
                htmlFor="state"
                className="block text-sm mb-2 font-medium text-gray-700"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter Your State"
                className={`mt-1 block w-full px-3 py-2 border ${
                  formData.state ? "border-gray-300" : "border-red-500"
                } rounded shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm`}
                required
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm mb-2 font-medium text-gray-700">
                Payment Method
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              >
                <option value="credit">Cash on delivery</option>
                <option value="debit">Debit Card</option>
                <option value="paypal">UPI</option>
                <option value="netbanking">Net Banking</option>
              </select>
            </div>

            {/* Confirm and Cancel Buttons */}
            <div className="col-span-2 mt-4 gap-y-4">
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleConfirmOrder}
                  disabled={
                    !formData.name ||
                    !formData.address ||
                    !formData.phone ||
                    !formData.pincode ||
                    !formData.city ||
                    !formData.state
                  }
                  className={`w-full py-2 font-bold rounded ${
                    !formData.name ||
                    !formData.address ||
                    !formData.phone ||
                    !formData.pincode ||
                    !formData.city ||
                    !formData.state
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-orange-500 text-white hover:bg-orange-600"
                  }`}
                >
                  Confirm Order
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full py-2 bg-rose-600 text-white font-bold rounded hover:bg-rose-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default OrderConfirmationModal;
