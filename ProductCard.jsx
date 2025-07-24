import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-info">
        <img src={product.image} alt={product.name} className="product-image" />
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">Rs. {product.price}</p>
        {/* <p className="product-description">{product.description}</p> */}
        <p className="product-stock">
          {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
        </p>
      </div>
      <Link to={`/product/${product.id}`} className="view-details">
        View Details 
      </Link>
    </div>
  );
}

export default ProductCard;