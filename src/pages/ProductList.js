// frontend/src/pages/ProductList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Product from '../components/Product';
import "../index.css";
import Button from 'react-bootstrap/Button';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, filterCategory, minPrice, maxPrice]);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/products', {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          search: searchTerm,
          category: filterCategory,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined
        }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/products', newProduct, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts([...products, response.data]);
      setShowForm(false);
      setNewProduct({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        category: ''
      });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  return (
    <div className="container">
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
     
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={handleMinPriceChange}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={handleMaxPriceChange}
        />
      </div>
      <Button className="create-product-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Create Product'}
      </Button>
      {/* Link to the CartView component */}
      <Link to="/cart" className="view-cart-btn">View Cart</Link>
      {showForm && (
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={newProduct.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              id="description"
              name="description"
              type="text"
              value={newProduct.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input
              id="price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="imageUrl">Image URL</label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="text"
              value={newProduct.imageUrl}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <input
              id="category"
              name="category"
              type="text"
              value={newProduct.category}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="submit">Create</Button>
        </form>
      )}
      <div className="product-list">
        {products.map(product => (  
          <div key={product._id} className="product-item">
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
