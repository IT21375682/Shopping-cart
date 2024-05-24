import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = ({ navigateToCheckout }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/cart', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCart(response.data.products);
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleRemove = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
        data: { productId }
      });
      setCart(cart.filter(item => item.product._id !== productId));
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  const handleQuantityChange = async (productId, quantity) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/cart', { productId, quantity }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(cart.map(item => 
        item.product._id === productId ? { ...item, quantity } : item
      ));
    } catch (error) {
      console.error('Error updating product quantity:', error);
    }
  };

  // Calculate total amount
  const totalAmount = cart.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);

  const handleCheckout = () => {
    // Extract the IDs of cart items
    const cartIds = cart.map(item => item.product._id);
    // Pass the cart IDs to the navigateToCheckout function
    navigateToCheckout(cartIds);
  };
  

  if (loading) return <div>Loading...</div>;

  return (
    <div className="cart-container">
      {cart.length === 0 ? (
        <div>Your cart is empty</div>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.product._id} className="cart-item">
              <h3>{item.product.name}</h3>
              <p>Quantity: 
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => handleQuantityChange(item.product._id, parseInt(e.target.value))}
                />
              </p>
              <button onClick={() => handleRemove(item.product._id)}>Remove</button>
            </div>
          ))}
          <div>Total Amount: ${totalAmount.toFixed(2)}</div>
          <button onClick={handleCheckout}>Checkout</button>
        </>
      )}
    </div>
  );
};

export default Cart;
