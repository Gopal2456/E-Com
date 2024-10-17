import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "./Slider";
import homeImage from "../assets/images/Home.jpg";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories.");
      }
    };
    fetchCategories();
  }, []);

  // Fetch products for the selected category
  useEffect(() => {
    if (!selectedCategory) return;

    const fetchProductsByCategory = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/category/${selectedCategory}`
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [selectedCategory]);

  if (error) {
    return <div className="text-center py-10">{error}</div>;
  }

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <div className="bg-[#f6c49b]">
        <div
          className="relative w-full h-[665px] bg-cover bg-center"
          style={{ backgroundImage: `url(${homeImage})` }}
        >
          {/* Overlay with slight opacity */}
          <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center">
            {/* Welcome Text */}
            <h1 className="text-5xl md:text-6xl text-slate-200 font-bold mb-10 text-center drop-shadow-md">
              Welcome to Our Store
            </h1>

            {/* Category Selection Section */}
            <div className="flex flex-col items-center w-full">
              <h2 className="text-3x my-8 text-white text-2xl font-semibold">
                Explore Our Categories. . .
              </h2>

              {/* Category Buttons */}
              <div className="flex flex-wrap font-serif mt-8 gap-16 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-6 py-3 text-lg rounded font-medium border-b-2 transition-colors duration-300 ${
                      selectedCategory === category
                        ? "text-white"
                        : "text-white hover:bg-[#c19876]"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Slider />
        </div>
        <div className="container mx-auto p-6">
          {/* Display selected category */}
          {selectedCategory && (
            <h2 className="text-2xl font-bold text-center mb-6">
              Showing products in "{selectedCategory}"
            </h2>
          )}

          {/* Loading Spinner */}
          {loading && (
            <div className="text-center bg-transparent py-10">
              Loading products...
            </div>
          )}
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <div
                  key={product.id}
                  className="border rounded p-4 shadow bg-[#F9E7DA] hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-96 relative"
                >
                  {/* Product image */}
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full bg-white rounded h-52 object-contain mb-4"
                  />

                  {/* Product title */}
                  <h2 className="text-lg font-semibold mb-2 text-center">
                    {product.title}
                  </h2>

                  {/* Product price */}
                  <p className="text-gray-900 font-bold text-center mb-2">
                    ₹{product.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <footer className="bg-gray-900 mt-12 w-fit text-gray-300 py-12">
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="ps-4">
              <h2 className="text-lg font-semibold text-white mb-4">
                About Us
              </h2>
              <p className="text-gray-400">
                We are committed to delivering the best products to our
                customers, ensuring quality and service excellence.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">
                Quick Links
              </h2>
              <ul className="space-y-2">
                <li>
                  <a href="/dashboard" className="hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Shop
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">
                Customer Support
              </h2>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Returns & Refunds
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Shipping Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-8 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Techriigour IT Solutions. All
              rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
