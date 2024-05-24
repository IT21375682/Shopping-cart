import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import ProductList from './pages/ProductList';
import Cart from './components/Cart';
import Checkout from './pages/Checkout';
import Button from 'react-bootstrap/Button';

const App = () => {
  // Define navigateToCheckout function to navigate to the checkout page with cart items
  const navigateToCheckout = (cartIds) => {
    // Redirect to the checkout page with cart items as query parameter
    window.location.href = `/checkout?cartIds=${cartIds.join(',')}`;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm type="login" />} />
        <Route path="/signup" element={<AuthForm type="signup" />} />
        <Route path="/products" element={<ProductList />} />
        {/* Pass navigateToCheckout function as a prop to the Cart component */}
        <Route path="/cart" element={<Cart navigateToCheckout={navigateToCheckout} />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
};

export default App;
