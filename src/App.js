import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  getSizes,
  getSize,
  getProducts,
  getProduct,
  getProductColor,
} from "./services/api";

import Header from "./components/Header/Header.jsx";
import Cart from "./pages/CartPage/CartPageElement.jsx";
import ShopPageElement from "./pages/ShopPageElement/ShopPageElement.jsx";
import Product from "./pages/Product/ProductPageElement.jsx";

export default function App() {
  const [productsState, setProductsState] = useState({
    sizes: [],
    products: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataProducts = await getProducts();
        const dataSizes = await getSizes();
        setProductsState((prevState) => {
          return { ...prevState, products: dataProducts, sizes: dataSizes };
        });
      } catch (error) {
        setProductsState((prevState) => {
          return { ...prevState, error: error, loading: false };
        });
      } finally {
        setProductsState((prevState) => {
          return { ...prevState, loading: false };
        });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              productsState.loading ? (
                <div>Загрузка...</div>
              ) : (
                <ShopPageElement products={productsState.products} />
              )
            }
          />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </div>
  );
}
