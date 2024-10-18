import React, { useState, useContext } from "react";
import { ProductContext } from "./ProductContext";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const { addProduct } = useContext(ProductContext);
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });
  const navigate = useNavigate();

  // Function for handle changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Function to Add the Product
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const newProduct = {
        ...product,
        id: Date.now(), // Generate a unique id
      };
      // Get existing products from local storage
      const existingProducts =
        JSON.parse(localStorage.getItem("products")) || [];

      // Add new product to the existing list
      const updatedProducts = [...existingProducts, newProduct];

      // Save the updated list to local storage
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      // Update the context
      addProduct(newProduct);

      // Reset the form
      setProduct({
        title: "",
        price: "",
        category: "",
        description: "",
        image: "",
      });
      navigate('/productlist');
      // Sucess notification through toastyfy
      toast.success("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product.");
    }
  };

  return (
    <div className="mx-auto bg-[#f3d4ba] flex justify-center p-4 sm:p-6">
       {/* Add New Product form */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-100 my-8 sm:my-16 w-full sm:w-5/6 max-w-lg sm:max-w-2xl mx-auto shadow-lg rounded-lg p-4 sm:p-6 font-semibold"
      >
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-600 text-center">
          Add New Product
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-3">
          {/* Title Input */}
          <div className="col-span-1">
            <label className="block text-gray-800 mb-1 sm:mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 sm:p-3 transition focus:border-blue-500 focus:outline-none"
              placeholder="Enter product title"
              required
            />
          </div>

          {/* Price Input */}
          <div className="col-span-1">
            <label className="block text-gray-800 mb-1 sm:mb-2" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 sm:p-3 transition focus:border-blue-500 focus:outline-none"
              placeholder="Enter product price"
              required
            />
          </div>

          {/* Category Input */}
          <div className="col-span-1">
            <label
              className="block text-gray-800 mb-1 sm:mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 sm:p-3 transition focus:border-blue-500 focus:outline-none"
              placeholder="Enter product category"
              required
            />
          </div>

          {/* Image URL Input */}
          <div className="col-span-1">
            <label className="block text-gray-800 mb-1 sm:mb-2" htmlFor="image">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              value={product.image}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 sm:p-3 transition focus:border-blue-500 focus:outline-none"
              placeholder="Enter product image URL"
              required
            />
          </div>
        </div>

        {/* Description Textarea */}
        <div className="mb-3">
          <label
            className="block text-gray-800 mb-1 sm:mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 sm:p-3 transition focus:border-blue-500 focus:outline-none"
            placeholder="Enter product description"
            rows="3"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-400 text-slate-800 mt-5 font-semibold py-2 sm:py-3 rounded-lg shadow hover:bg-orange-300 transition-colors duration-200"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
