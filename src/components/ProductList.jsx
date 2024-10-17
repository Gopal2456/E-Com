import React, { useContext } from "react";
import { ProductContext } from "./ProductContext";

const ProductList = () => {
  const { products } = useContext(ProductContext);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product List</h2>
      <ul>
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product.id} className="bg-white p-4 mb-3 shadow rounded">
              <h3 className="text-lg font-bold">{product.title}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
              <img src={product.image} alt={product.title} className="w-32" />
            </li>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </ul>
    </div>
  );
};

export default ProductList;
