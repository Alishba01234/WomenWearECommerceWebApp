import { useCart } from '../context/CartContext';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Cart() {
  const { cartItems, removeFromCart } = useCart();

  useEffect(() => {
    console.log('Cart Items:', cartItems);
  }, [cartItems]);

  return (
    <div className="cart-body">
    <div className="cart-container">
      <h2>Your Shopping Cart 🛒</h2>
      {cartItems.length === 0 ? (
        <p className="empty-message">Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-info">
              <h3>{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Total: Rs. {item.quantity * item.price}</p>
            </div>
            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>
        ))
      )}

      {cartItems.length > 0 && (
        <Link className='cart-a' to="/checkout">
          <button className="checkout-btn">Proceed to Checkout</button>
        </Link>
      )}
    </div>
    </div>
  );
}

export default Cart;