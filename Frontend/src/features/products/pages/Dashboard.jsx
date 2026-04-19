import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../../app/components/Navbar';
import { useProduct } from '../hooks/useProduct';
import '../styles/product.scss';
import '../styles/dashboard.scss';
import { Link } from 'react-router';
import { Navigate } from 'react-router';

const currencyFormatter = new Intl.NumberFormat('en-PK', {
  style: 'currency',
  currency: 'PKR',
  maximumFractionDigits: 0,
});

const getErrorMessage = (error) => {
  if (!error) {
    return '';
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error.message) {
    return error.message;
  }

  if (Array.isArray(error.errors) && error.errors.length > 0) {
    return error.errors.map((entry) => entry.message).join(', ');
  }

  return 'Failed to load products.';
};

const Dashboard = () => {
  const authLoading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);
  const products = useSelector((state) => state.product.products);
  const { handleGetAllProducts } = useProduct();
  
  useEffect(() => {
    if (!authLoading && user?.role !== 'seller') {
      handleGetAllProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, user?.role]);

  if (authLoading) {
    return null;
  }

  if (user?.role === 'seller') {
    return <Navigate to="/view-products" replace />;
  }

  const errorMessage = getErrorMessage(error);

  return (
    <div className="productPage">
      <Navbar activePage="dashboard" />

      <main className="pageContent">
        <header className="headingBlock">
          <h1>All Products</h1>
          <p>Browse products listed by all sellers.</p>
        </header>

        {loading ? (
          <p className="dashboardNotice">Loading products...</p>
        ) : errorMessage ? (
          <p className="dashboardError">{errorMessage}</p>
        ) : products.length === 0 ? (
          <p className="dashboardNotice">No products available right now.</p>
        ) : (
          <section className="dashboardGrid">
            {products.map((product) => {
              const imageUrl = product.images?.[0]?.url;

              return (
                <Link to={`/product/${product._id}`} key={product._id} className="dashboardCard">
                  {imageUrl ? (
                    <img src={imageUrl} alt={product.title} className="dashboardImage" />
                  ) : (
                    <div className="dashboardImagePlaceholder">No Image</div>
                  )}

                  <div className="dashboardCardBody">
                    <div className="dashboardCardHeader">
                      <h2>{product.title}</h2>
                      <p>{currencyFormatter.format(Number(product.price) || 0)}</p>
                    </div>

                    <p className="dashboardDescription">{product.description || 'No description available.'}</p>
                  </div>
                </Link>
              );
            })}
          </section>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
