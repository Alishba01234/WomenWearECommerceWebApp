import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { cartItems } = useCart();
  const { token, logout, isAdmin } = useAuth();

  return (
    <nav className="header">
      <Link to="/" className="logo">WomenWear</Link>
      
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({cartItems.length})</Link>
        {isAdmin && <Link to="/admin">Admin</Link>}
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button onClick={logout} className="logout-btn">Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Header;