import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function AdminDashboard() {
  const { isAdmin } = useAuth();

  if (!isAdmin) return <Navigate to="/" />;

  return (
    <div className="admin-container">
      <h2 className="admin-heading">Welcome, Admin</h2>
      <p className="admin-subtext">Manage your store efficiently from here.</p>

      <div className="admin-grid">
        <a href="/admin/products" className="admin-card">
          <span className="admin-icon">🛍</span>
          <h3>Manage Products</h3>
          <p>Add, edit, or delete store items.</p>
        </a>

        <a href="/admin/orders" className="admin-card">
          <span className="admin-icon">📦</span>
          <h3>View Orders</h3>
          <p>Track and manage customer orders.</p>
        </a>
      </div>
    </div>
  );
}

export default AdminDashboard;