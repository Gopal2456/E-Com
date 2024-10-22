import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import BuyNowButton from "./BuyNowButton";
import OrderConfirmationModal from "./OrderConfirmationModal";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';

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
    paymentMethod: "Cash on delivery",
  });

  const navigate = useNavigate(); // Initialize navigate

  const handleRedirect = () => {
    navigate('/dashboard'); // Redirect to /dashboard
  };

  // Function to handle Add To Cart
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
    console.log("Order confirmed with data:", formData);
    toast.success("Order Confirmed Sucessfully");
    handleClose();
  };

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
      paymentMethod: "Cash on delivery",
    });
  };
  // Function to fetch the Product by their ID
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
              <RxCross1
                className="flex ml-[365px] w-5 h-5 cursor-pointer"
                onClick={handleRedirect} // Add the onClick event
              />
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
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-yellow-500 text-white font-bold px-6 py-3 rounded hover:bg-yellow-600 w-full h-12"
                >
                  Add to Cart
                </button>

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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
