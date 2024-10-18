import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Logout from "./components/Logout";
import { useState } from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import OrderDetails from "./components/Orderdetails";
import { ProductProvider } from "./components/ProductContext";
import ProductList from "./components/ProductList";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ fetchCarts, showCarts, carts }) => (
  <>
    <Header fetchCarts={fetchCarts} showCarts={showCarts} carts={carts} />
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="product/:id" element={<Products />} />
      <Route path="addproduct" element={<AddProduct />} />
      <Route path="productlist" element={<ProductList />} />
      <Route path="orderdetails" element={<OrderDetails />} />
      <Route path="cart" element={<Cart fetchCarts={fetchCarts} carts={carts} showCarts={showCarts} />} />
      <Route path="logout" element={<Logout />} />
    </Routes>
  </>
);

function App() {
  const [carts, setCarts] = useState([]);
  const [showCarts, setShowCarts] = useState(false);

  // Function to fetch carts
  const fetchCarts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/carts");
      const data = await response.json();
      setCarts(data);
      setShowCarts(true);
    } catch (error) {
      console.error("Error fetching carts:", error);
    }
  };

  return (
    <ProductProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/*"
            element={<Layout fetchCarts={fetchCarts} showCarts={showCarts} carts={carts} />}
          />
        </Routes>
      </Router>
      <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
    </ProductProvider>
  );
}

export default App;
