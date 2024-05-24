// backend/controllers/productController.js
const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice } = req.query;
    let query = {};
    
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    if (category) {
      query.category = category;
    }
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        query.price.$gte = minPrice;
      }
      if (maxPrice) {
        query.price.$lte = maxPrice;
      }
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createProduct = async (req, res) => {
  const { name, description, price, imageUrl, category } = req.body;
  if (!name || !description || !price || !category) {
    return res.status(400).json({ message: 'All fields except imageUrl are required' });
  }
  try {
    const product = new Product({ name, description, price, imageUrl, category });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getProducts, createProduct };
