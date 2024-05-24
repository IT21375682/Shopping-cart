import React from 'react';
import axios from 'axios';
import '../index.css';

const Product = ({ product }) => {
  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/cart', { productId: product._id, quantity: 1 }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding product to cart:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="product-item">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;
