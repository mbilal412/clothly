import React from 'react';
import { Link, useNavigate } from 'react-router';
import '../styles/navbar.scss';
import { useSelector } from 'react-redux';

const Navbar = ({ activePage }) => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const navigate = useNavigate();

  const isAuthenticated = Boolean(user);

  const onLogout = () => {
    navigate('/login');
  };

  if (loading) return null;

  return (
    <nav className="topNav">
      <div className="navLeft">
        <span className="brand">CLOTHLY</span>
        <div className="navLinks DesktopOnly">
          <Link to="/" className={`navLink ${activePage === 'dashboard' ? 'active' : ''}`}>Home</Link>
          <Link to="/view-products" className={`navLink ${activePage === 'view-product' ? 'active' : ''}`}>
            View Products
            <span className="sellerBadge">Seller</span>
          </Link>
          <Link to="/add-product" className={`navLink ${activePage === 'add-product' ? 'active' : ''}`}>
            Add Product
            <span className="sellerBadge">Seller</span>
          </Link>
        </div>
      </div>

      <div className="navRight">
        {isAuthenticated ? (
          <>
            <div className="accountInfo">
              <div className="accountText DesktopOnlySm">
                <p className="accountLabel">{user.role} Account</p>
              </div>
            </div>
            <button type="button" className="logoutBtn" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <div className="guestActions">
            <Link to="/login" className="authBtn loginBtn">
              Login
            </Link>
            <Link to="/register" className="authBtn registerBtn">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
