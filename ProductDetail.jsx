import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/products/${id}/`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error('Error loading product:', err);
      });
  }, [id]);

  if (!product) return <p className="loading">Loading...</p>;

  return (
    <div className="product-detail-container">
      <div className="product-card">
        {/* Add image if available */}
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
        )}
        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="price">Rs. {product.price}</p>
          <p className="description">{product.description}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;