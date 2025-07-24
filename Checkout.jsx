import { useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Checkout() {
  const { cartItems, setCartItems } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();

  if (!token) {
    return <Navigate to="/login" />;
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ).toFixed(2);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = { ...formData, total };

    try {
      const res = await axios.post(
        'http://127.0.0.1:8000/api/orders/',
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201) {
        alert('Order placed successfully!');
        setCartItems([]);
        navigate('/');
      } else {
        alert('Something went wrong.');
      }
    } catch (error) {
      alert('Failed to place order');
    }
  };

  return (
    <div className="checkout-body">
    <div className="checkout-container">
      <h2>Checkout</h2>
      <p className="total-amount">Total: Rs. {total}</p>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="address"
          placeholder="Full Delivery Address"
          value={formData.address}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Place Order</button>
      </form>
    </div>
    </div>
  );
}

export default Checkout;