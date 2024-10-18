import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import OrderConfirmationModal from "./OrderConfirmationModal";

const Cart = () => {
  const [cart, setCart] = useState([]);
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
  
  // This function retrieves the user's cart data from local storage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Function to open the form
  const handleOpen = () => {
    setOpen(true);
  };

   // Function to close the form
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

 // Function to handle Changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Function to handle Confirm Order
  const handleConfirmOrder = () => {
    console.log("Order confirmed with data:", formData);
    toast.success("Order Confirmed Successfully");
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
  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return; // Prevents quantity from going below 1

    try {
      const updatedItem = {
        ...cart.find((item) => item.id === id),
        quantity,
      };

      await axios.put(`https://fakestoreapi.com/carts/6`, updatedItem);

      const updatedCart = cart.map((item) =>
        item.id === id ? updatedItem : item
      );

      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Quantity updated successfully");
    } catch (error) {
      console.error("Error updating item on the API:", error);
      toast.error("Error updating quantity");
    }
  };

  return (
    <div className="h-auto w-auto bg-[#efd6c2] mx-auto p-4 sm:px-6 md:px-8 lg:px-16 py-6">
      {cart.length === 0 ? (
        <p className="text-lg text-gray-600 text-center">Your cart is empty</p>
      ) : (
        <div className="space-y-8 p-4 rounded-md bg-white">
          
          {/* looping to render products */}
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center md:items-start justify-between border-b pb-6 mb-6 space-y-4 md:space-y-0 md:space-x-6"
            >
              {/* Image Section */}
              <div className="flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg shadow-lg"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 md:mx-4 text-center md:text-left">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h2>
                <p className="text-gray-600 mb-4 sm:mb-5">
                  Price: ₹{item.price}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-1 space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-200"
                    disabled={item.quantity <= 1} // Disable if quantity is 1
                  >
                    -
                  </button>
                  <p className="font-semibold text-green-500">
                    Quantity: {item.quantity}
                  </p>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-200"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Remove Button */}
              <div className="flex items-center space-x-3 justify-center md:justify-end">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white py-1 px-4 rounded shadow-md hover:bg-red-600 transition duration-200"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Checkout Button */}
          {cart.length > 0 && (
            <div className="flex justify-end mt-8">
              <button
                onClick={handleOpen}
                className="bg-green-500 text-white py-2 px-6 rounded shadow-lg text-lg hover:bg-green-600 transition duration-200"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      )}

      {/* Order Confirmation Modal */}
      <OrderConfirmationModal
        open={open}
        handleClose={handleClose}
        handleConfirmOrder={handleConfirmOrder}
        formData={formData}
        handleChange={handleChange}
      />
    </div>
  );
};

export default Cart;
