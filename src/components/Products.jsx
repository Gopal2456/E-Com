import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import BuyNowButton from "./BuyNowButton";
import { Link } from "react-router-dom";
import OrderConfirmationModal from "./OrderConfirmationModal";

const Products = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    paymentMethod: "credit", // Default payment method
  });

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = cart.findIndex((item) => item.id === product.id);

    if (productIndex === -1) {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
      toast.success("Product added to cart!");
    } else {
      cart[productIndex].quantity += 1;
      toast.success("Product quantity increased in cart!");
    }

    // Update localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  // Function to handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Function to handle form submission
  const handleConfirmOrder = () => {
    // Add your order submission logic here (e.g., API call)
    console.log("Order confirmed with data:", formData);
    toast.success("Order Confirmed Sucessfully");
    handleClose();
  };

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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">Loading product...</div>;
  }

  if (error) {
    return <div className="text-center py-10">{error}</div>;
  }

  return (
    <div className="bg-[#f3d4ba] h-screen">
      <div className="max-w-4xl mx-auto p-6">
        {product && (
          <div className="grid grid-cols-1 rounded-lg bg-white p-6 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-96 object-contain"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-gray-800">
                  {product.title}
                </h2>
                <h2 className="text-3xl font-bold mb-4 text-gray-800">
                  {product.category}
                </h2>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500 font-semibold text-lg">
                    {product.rating.rate} / 5
                  </span>
                  <span className="ml-2 text-gray-500 text-sm">
                    ({product.rating.count} reviews)
                  </span>
                </div>
              </div>

              {/* Pricing */}
              <div className="mb-4">
                <p className="text-2xl font-bold text-green-600">
                  ₹{product.price}
                </p>
                <p className="text-sm line-through text-gray-500">₹39,999</p>
                <p className="text-sm text-gray-500">(49% off)</p>
              </div>

              {/* Offers Section */}
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Available offers
                </h3>
                <ul className="text-sm text-gray-700">
                  <li>
                    Bank Offer: 5% Unlimited Cashback on Flipkart Axis Bank Card
                  </li>
                  <li>
                    Bank Offer: 10% off up to ₹1,500 on Axis Bank Credit Card
                  </li>
                  <li>Special Price: Get extra 49% off</li>
                  <li>View 21 more offers</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Link to="/cart" className="w-full">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-yellow-500 text-white font-bold px-6 py-3 rounded hover:bg-yellow-600 w-full h-12"
                  >
                    Add to Cart
                  </button>
                </Link>

                <div className="w-full">
                  <BuyNowButton onClick={handleOpen} className="w-full h-12" />
                </div>
              </div>
              {/* Material UI Modal */}

              <OrderConfirmationModal
                open={open}
                handleClose={handleClose}
                formData={formData}
                handleChange={handleChange}
                handleConfirmOrder={handleConfirmOrder}
              />
              {/* <Modal open={open} onClose={handleClose}>
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg pt-8 p-8 shadow-lg w-full max-w-4xl">
                    <h1 className="text-xl font-bold mb-8 text-center">
                      Confirm Your Order
                    </h1>
                    <form className="grid grid-cols-1 sm:grid-cols-2  gap-6">
                    
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
                          required
                          className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        />
                      </div>

                     
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
                          required
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        />
                      </div>

                    
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
                          required
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        />
                      </div>

                     
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
                          required
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        />
                      </div>

                    
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
                          required
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        />
                      </div>

                   
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
                          required
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        />
                      </div>

                      <div className="">
                        <label className="block text-sm mb-2 font-medium text-gray-700">
                          Payment Method
                        </label>
                        <select
                          name="paymentMethod"
                          value={formData.paymentMethod}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        >
                          <option value="credit">Credit Card</option>
                          <option value="debit">Debit Card</option>
                          <option value="paypal">PayPal</option>
                          <option value="netbanking">Net Banking</option>
                        </select>
                      </div>

                     
                      <div className="col-span-2 mt-4  my-3 gap-y-4">
                        <div className="flex space-x-4">
                          <button
                            type="button"
                            onClick={handleConfirmOrder}
                            className="w-full py-2 bg-orange-500 text-white font-bold rounded hover:bg-orange-600"
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
              </Modal> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
