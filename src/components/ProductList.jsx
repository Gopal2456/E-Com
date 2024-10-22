import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products from local storage when the component mounts
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  // Handle editing the product
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsEditing(true);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Update product in the API and local storage
  const handleUpdateProduct = async () => {
    if (!editingProduct) return;

    try {
      // Send PUT request to the API
      await axios.put(
        `https://fakestoreapi.com/products/${editingProduct.id}`,
        editingProduct
      );

      // Update the product in local storage
      const updatedProducts = products.map((product) =>
        product.id === editingProduct.id ? editingProduct : product
      );
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      // Reset form
      setEditingProduct(null);
      setIsEditing(false);
      toast.success("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Handle deleting a product
  const handleDeleteProduct = async (productId) => {
    try {
      // Send DELETE request to the API
      await axios.delete(`https://fakestoreapi.com/products/${productId}`);

      // Remove the product from local storage and state
      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="bg-[#ecc9ad] h-auto">
      <div className="grid grid-cols-1 w-6/7 mt-6 pb-32 p-6 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* All the products are displayed here */}
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-[#fefefeae] rounded-lg shadow-lg p-6 flex flex-col items-center"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-80 h-72 object-cover hover:drop-shadow-xl mb-4 rounded-lg"
              />
              <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
                {product.title}
              </h3>
              <p className="text-lg font-semibold text-green-500 mb-2">
                ₹{product.price}
              </p>
              <p className="text-sm text-gray-600 mb-4">{product.category}</p>
              <p className="text-sm text-gray-600 text-center">
                {product.description}
              </p>

              {/* Edit and delete button */}
              <div className="flex justify-between gap-4 mt-4">
                <button
                  onClick={() => handleEditClick(product)}
                  className="bg-orange-500 text-white py-2 px-4 w-28 rounded shadow hover:bg-orange-600 transition duration-200"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-gray-400 text-white py-2 px-4 w-28 rounded shadow hover:bg-gray-500 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No products available.
          </p>
        )}
      </div>

      {/* Edit Modal */}
      {isEditing && editingProduct && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-slate-100 p-8 rounded-lg shadow-lg max-w-2xl w-full">
            <h2 className="text-2xl mb-4">Edit Product</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title Field */}
              <div>
                <label className="block mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={editingProduct.title}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              {/* Price Field */}
              <div>
                <label className="block mb-2">Price</label>
                <input
                  type="number"
                  name="price"
                  value={editingProduct.price}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              {/* Category Field */}
              <div>
                <label className="block mb-2">Category</label>
                <input
                  type="text"
                  name="category"
                  value={editingProduct.category}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              {/* Description Field */}
              <div className="md:col-span-2">
                <label className="block mb-2">Description</label>
                <textarea
                  name="description"
                  value={editingProduct.description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
            </div>
            {/* Update and cancel buttons */}
            <div className="flex justify-end">
              <button
                onClick={handleUpdateProduct}
                className="bg-orange-500 text-white py-2 px-4 rounded shadow hover:bg-orange-600 mt-4"
              >
                Update Product
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="bg-red-500 text-white py-2 px-4 rounded shadow hover:bg-red-600 transition duration-200 mt-4 ml-4"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
