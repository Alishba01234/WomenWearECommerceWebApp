import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function AdminOrders() {
  const { token, isAdmin } = useAuth();
  const [orders, setOrders] = useState([]);

  if (!isAdmin) return <Navigate to="/" />;

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/orders/all/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setOrders(res.data))
    .catch(err => console.error('Error fetching orders', err));
  }, []);

  return (
    <div className="orders-container">
      <h2 className="orders-heading">📦 All Orders</h2>
      {orders.length === 0 ? (
        <p className="no-orders">No orders yet.</p>
      ) : (
        orders.map(order => (
          <div className="order-card" key={order.id}>
            <div className="order-header">
              <h4>Order #{order.id}</h4>
              <span className="order-date">{new Date(order.created_at).toLocaleString()}</span>
            </div>
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Email:</strong> {order.email}</p>
            <p><strong>Total:</strong> <span className="order-total">Rs. {order.total}</span></p>
            <p><strong>Address:</strong> {order.address}</p>
            <ul className="item-list">
              {order.items.map((item, i) => (
                <li key={i}>
                  🛍 Product ID: {item.product} | Quantity: {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminOrders;