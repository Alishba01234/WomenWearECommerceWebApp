import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function AdminProducts() {
  const { token, isAdmin } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', description: '', stock: '', image: null });

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };


  if (!isAdmin) return <Navigate to="/" />;

  const fetchProducts = () => {
    axios.get('http://127.0.0.1:8000/api/products/')
      .then(res => setProducts(res.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('description', form.description);
    formData.append('stock', form.stock);
    if (form.image) formData.append('image', form.image);

    axios.post('http://127.0.0.1:8000/api/products/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    }).then(() => {
      fetchProducts();
      setForm({ name: '', price: '', description: '', stock: '', image: null });
    });
  };


  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/products/${id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(fetchProducts);
  };

  return (
    <div className="admin-products-container">
      <h2 className="admin-products-header">Manage Products</h2>

      <div className="product-form">
        <h4 className="section-title">Add Product</h4>
        <div className="form-grid">
          <input
            className="form-input"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            className="form-input"
            name="price"
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={handleChange}
          />
          <input
            className="form-input"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
          <input
            className="form-input"
            name="stock"
            placeholder="Stock Quantity"
            type="number"
            value={form.stock}
            onChange={handleChange}
          />
          <input
            className="form-input"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button className="add-product-btn" onClick={handleAdd}>
          <span>+</span> Add Product
        </button>
      </div>

      <h4 className="section-title">All Products</h4>
      <div className="admin-products-list">
        {products.map(p => (
          <div key={p.id} className="admin-product-card">
            {p.image && <img src={p.image} alt={p.name} className="product-image" />}
            <h3 className="product-name">{p.name}</h3>
            <p className="product-price">{p.price}</p>
            <span className="product-stock">Stock: {p.stock}</span>
            <p className="product-description">{p.description}</p>
            <button className="delete-btn" onClick={() => handleDelete(p.id)}>
              <span>🗑️</span> Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProducts;