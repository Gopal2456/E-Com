import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import OrderConfirmationModal from "./OrderConfirmationModal";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    paymentMethod: "credit",
  });

  // Fetch cart items from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      name: "",
      address: "",
      phone: "",
      pincode: "",
      city: "",
      state: "",
      paymentMethod: "credit",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmOrder = () => {
    // Add your order submission logic here (e.g., API call)
    console.log("Order confirmed with data:", formData);
    toast.success("Order Confirmed Sucessfully");
    handleClose();
  };

  // Function to remove an item from the cart
  const removeFromCart = async (id) => {
    try {
      await axios.delete(`https://fakestoreapi.com/carts/6`);
      const updatedCart = cart.filter((item) => item.id !== id);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      console.log("Item removed successfully from the API");
      toast.success("Item removed successfully from the cart");
    } catch (error) {
      console.error("Error removing item from the API:", error);
    }
  };

  // Function to update item quantity
  const updateQuantity = (id, quantity) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Modal component for updating quantity
  const UpdateQuantityModal = ({ isOpen, onClose, item, onUpdate }) => {
    const [quantity, setQuantity] = useState(item ? item.quantity : 1);

    const handleUpdate = () => {
      onUpdate(item.id, quantity);
      onClose();
    };

    if (!isOpen) return null; // Don't render anything if the modal is closed

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg p-6 shadow-lg w-11/12 md:w-1/3">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Update Quantity
          </h2>
          <p className="mb-4 text-center text-gray-600">
            Update the quantity for{" "}
            <span className="font-semibold">{item.title}</span>:
          </p>

          <div className="flex justify-center mb-4">
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded p-2 w-24 text-center"
            />
          </div>

          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={onClose}
              className="bg-gray-400 text-white py-2 px-6 rounded hover:bg-gray-500 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition-colors duration-200"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container h-screen bg-[#f3d4ba] mx-auto p-6">
      <h2 className="text-3xl justify-center flex font-bold mb-6 text-gray-800">
        MY Cart
      </h2>
      {cart.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="rounded-lg p-4 shadow bg-[#efe4dc] hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-full relative"
            >
              {/* Product image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full bg-white h-52 object-contain mb-4"
              />

              {/* Product title */}
              <h2 className="text-lg font-semibold mb-2 text-center">
                {item.title}
              </h2>

              {/* Product price */}
              <p className="text-gray-900 font-bold text-center mb-2">
                ₹{item.price}
              </p>

              {/* Quantity */}
              <p className="text-lg text-gray-600 mb-2 text-center">
                Quantity: {item.quantity}
              </p>

              <div className="mt-auto flex justify-between items-center space-x-4">
                {/* Update Button */}
                <button
                  onClick={() => {
                    setSelectedItem(item);
                    setModalOpen(true); // Open the modal
                  }}
                  className="w-full md:w-36  text-orange-500 font-semibold py-2 rounded transition-colors duration-200"
                >
                  Update
                </button>

                {/* Buy Now Button */}
                <div className="w-full md:w-36">   
                  <button
                  onClick={() => removeFromCart(item.id)}
                  className="w-full text-rose-700 font-semibold py-2 rounded transition-colors duration-200"
                >
                  Remove
                </button>
                </div>
                <button
                  onClick={handleOpen}
                  className="w-full h-10 bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600 transition-colors duration-200">
                    Buy Now
                  </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
      )}
      {/* Modal for updating quantity */}
      <UpdateQuantityModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        item={selectedItem}
        onUpdate={updateQuantity}
      />
      <OrderConfirmationModal
        open={open}
        handleClose={handleClose}
        formData={formData}
        handleChange={handleChange}
        handleConfirmOrder={handleConfirmOrder}
      />
    </div>
  );
};

export default Cart;
