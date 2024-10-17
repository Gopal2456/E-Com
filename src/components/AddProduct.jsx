import React, { useState, useContext } from "react";
import { ProductContext } from "./ProductContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


const AddProduct = () => {
  const { addProduct } = useContext(ProductContext);
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const newProduct = {
        ...product,
        id: Date.now(), // Generate a unique id
      };
      // Get existing products from local storage
      const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

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

      toast.success("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product.");
    }
  };

  return (
    <div className="container mx-auto bg-[#f3d4ba] flex justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-100 my-16  font-semibold w-5/6 max-w-2xl mx-auto shadow-lg rounded-lg p-6"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-600 text-center">
          Add New Product
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
          <div className="col-span-1">
            <label className="block text-gray-800 mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-3 transition focus:border-blue-500 focus:outline-none"
              placeholder="Enter product title"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="block text-gray-800 mb-2" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-3 transition focus:border-blue-500 focus:outline-none"
              placeholder="Enter product price"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="block text-gray-800 mb-2" htmlFor="category">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-3 transition focus:border-blue-500 focus:outline-none"
              placeholder="Enter product category"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="block text-gray-800 mb-2" htmlFor="image">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              value={product.image}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-3 transition focus:border-blue-500 focus:outline-none"
              placeholder="Enter product image URL"
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="block text-gray-800 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-3 transition focus:border-blue-500 focus:outline-none"
            placeholder="Enter product description"
            rows="3"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-400 text-slate-800 mt-5 font-semibold py-3 rounded-lg shadow hover:bg-orange-300 transition-colors duration-200"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
