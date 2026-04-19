import React, { useEffect } from 'react';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import Navbar from '../../../app/components/Navbar';
import { useProduct } from '../hooks/useProduct';
import '../styles/viewProduct.scss';

const ViewProduct = () => {
  const { handleGetProducts } = useProduct();
  const products = useSelector((state) => state.product.products);
  const loading = useSelector((state) => state.product.loading);

  useEffect(() => {
    handleGetProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar activePage="view-product" />
      <main className="pageWrapper" style={{ flex: 1, width: '100%', boxSizing: 'border-box' }}>
        <header className="headerSection">
          <div style={{ maxWidth: '42rem' }}>
            <p className="sectionPretitle">Inventory Management</p>
            <h1 className="sectionTitle">Your Curated Collection</h1>
            <p className="sectionDesc">
              Manage your atelier's digital presence. Every piece is a statement of craftsmanship and timeless elegance.
            </p>
          </div>
          <div className="actions">
            <Link to="/add-product" className="btnNew">
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>add</span>
              New Listing
            </Link>
          </div>
        </header>

        {loading ? (
          <p style={{ color: '#d1c5b4', fontFamily: 'Inter' }}>Loading collection...</p>
        ) : (
          <div className="productGrid">
            {products && products.length > 0 ? (
              products.map((product, index) => (
                <div 
                  key={product._id} 
                  className="productCard"
                >
                  <div className="imageContainer">
                    <img 
                      className="productImage" 
                      src={product.images?.[0]?.url || 'https://via.placeholder.com/300x400?text=No+Image'} 
                      alt={product.title} 
                    />
                    <div className="imageOverlay">
                      <button className="btnQuickEdit">Quick Edit</button>
                    </div>
                  </div>
                  <div className="cardFooter">
                    <div>
                      <h3 className="productTitle">{product.title}</h3>
                      <p className="productMeta">Collection • {product.price > 0 ? 'In Stock' : 'Out of Stock'}</p>
                    </div>
                    <p className="productPrice">PKR {product.price.toLocaleString()}</p>
                  </div>
                </div>
              ))
            ) : (
              // Empty State (Zero Products)
              <div style={{ display: 'contents' }}>
                <Link to="/add-product" className="emptyStateCard">
                  <span className="material-symbols-outlined">add_circle</span>
                  <h3 className="emptyTitle">Expand Collection</h3>
                  <p className="emptyDesc">Create a new listing for your atelier</p>
                </Link>
              </div>
            )}
            
            {/* Always provide empty state card at the end if we already have products, mapping the gap translation */}
            {products && products.length > 0 && (
                <Link to="/add-product" className="emptyStateCard">
                  <span className="material-symbols-outlined">add_circle</span>
                  <h3 className="emptyTitle">Expand Collection</h3>
                  <p className="emptyDesc">Create a new listing for your atelier</p>
                </Link>
            )}
          </div>
        )}


      </main>
    </div>
  );
};

export default ViewProduct;
