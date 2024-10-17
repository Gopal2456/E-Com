// OrderModal.js
import React, { useState } from 'react';
import { Modal } from '@mui/material'; // Adjust import based on your Material UI version

const OrderModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    pincode: '',
    city: '',
    state: '',
    paymentMethod: '',
  });

  // Function to handle modal open
  const handleOpen = () => {
    setOpen(true);
  };

  // Function to handle modal close
  const handleClose = () => {
    setOpen(false);
  };


  // Function to handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Function to handle form submission
  const handleConfirmOrder = () => {
    // Add logic here to handle order submission (e.g., API call)
    console.log("Order confirmed with data:", formData);
    onClose(); // Close modal after confirming
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg pt-8 p-8 shadow-lg w-full max-w-4xl">
          <h1 className="text-xl font-bold mb-8 text-center">Confirm Your Order</h1>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Form Fields */}
            {Object.keys(formData).map((key) => (
              <div key={key}>
                <label
                  htmlFor={key}
                  className="block text-sm mb-2 font-medium text-gray-700"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  type={key === 'email' ? 'email' : key === 'phone' || key === 'pincode' ? 'tel' : 'text'}
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  placeholder={`Enter Your ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                />
              </div>
            ))}
            {/* Payment Method */}
            {/* <div>
              <label className="block text-sm mb-2 font-medium text-gray-700">Payment Method</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              >
                <option value="">Select Payment Method</option>
                <option value="COD">Cash on Delivery</option>
                <option value="UPI">UPI</option>
                <option value="Card">Credit/Debit Card</option>
              </select>
            </div> */}

            {/* Buttons - Confirm & Close */}
            <div className="sm:col-span-2 mt-5 mb-2 flex justify-between">
              <button
                type="button"
                className="bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600 w-1/2 mr-2"
                onClick={handleConfirmOrder}
              >
                Confirm Order
              </button>
              <button
                type="button"
                className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-400 w-1/2 ml-2"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default OrderModal;
