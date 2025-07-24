function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        {/* Brand/Info */}
        <div className="footer-section">
          <h2 className="footer-title">MyShop</h2>
          <p className="footer-text">
            Your one-stop store for quality products. Fast delivery and great service!
          </p>
        </div>

        {/* Links */}
        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/cart">Cart</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3 className="footer-heading">Contact</h3>
          <p className="footer-text">Email: support@myshop.com</p>
          <p className="footer-text">Phone: +92 300 1234567</p>
        </div>

      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} MyShop. Built by Alishba 💻 | All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;