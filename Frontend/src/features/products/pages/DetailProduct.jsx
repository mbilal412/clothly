import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import Navbar from '../../../app/components/Navbar';
import { useProduct } from '../hooks/useProduct';
import '../styles/product.scss';
import '../styles/detailProduct.scss';

const money = new Intl.NumberFormat('en-PK', {
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

  return 'Unable to load product details right now.';
};

const DetailProduct = () => {
  const { id } = useParams();
  const { handleGetAllProducts } = useProduct();
  const { products, loading, error } = useSelector((state) => state.product);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [actionText, setActionText] = useState('');

  useEffect(() => {
    if (products.length === 0) {
      handleGetAllProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products.length]);

  const product = useMemo(
    () => products.find((entry) => entry._id === id),
    [products, id],
  );

  const images = product?.images?.length ? product.images : [];
  const selectedImage = images[selectedImageIndex]?.url || images[0]?.url;
  const price = Number(product?.price) || 0;

  const subTotal = price * quantity;
  const delivery = subTotal > 5000 ? 0 : 250;
  const serviceFee = 99;
  const total = subTotal + delivery + serviceFee;

  const errorMessage = getErrorMessage(error);

  const handleAddToCart = () => {
    setActionText('Added to cart. Cart integration can be connected next.');
  };

  const handleBuyNow = () => {
    setActionText('Buy now started. Checkout flow can be connected next.');
  };

  return (
    <div className="productPage">
      <Navbar activePage="dashboard" />

      <main className="pageContent detailPageContent">
        {loading && !product ? (
          <p className="detailNotice">Loading product details...</p>
        ) : errorMessage && !product ? (
          <p className="detailError">{errorMessage}</p>
        ) : !product ? (
          <section className="detailFallback">
            <h1>Product not found</h1>
            <p>The requested product does not exist or has been removed.</p>
            <Link to="/" className="detailBackLink">Back to all products</Link>
          </section>
        ) : (
          <section className="detailLayout">
            <div className="detailGalleryPanel">
              <img
                src={selectedImage || 'https://via.placeholder.com/960x720?text=No+Image'}
                alt={product.title}
                className="detailMainImage"
              />

              {images.length > 1 && (
                <div className="detailThumbRow">
                  {images.map((image, index) => (
                    <button
                      type="button"
                      key={image._id || `${image.url}-${index}`}
                      className={`detailThumb ${selectedImageIndex === index ? 'active' : ''}`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img src={image.url} alt={`${product.title} ${index + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="detailInfoPanel">
              <div className="detailHead">
                <p className="detailEyebrow">Product Detail</p>
                <h1>{product.title}</h1>
                <p className="detailDescription">{product.description}</p>
              </div>

              <div className="detailPriceRow">
                <p className="detailPrice">{money.format(price)}</p>

                <label htmlFor="quantity" className="quantityField">
                  Quantity
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(event) => setQuantity(Number(event.target.value))}
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <option key={value} value={value}>{value}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="detailActions">
                <button type="button" className="primaryAction" onClick={handleAddToCart}>
                  Add to Cart
                </button>
                <button type="button" className="secondaryAction" onClick={handleBuyNow}>
                  Buy Now
                </button>
              </div>

              {actionText && <p className="detailActionText">{actionText}</p>}

              <section className="billCard">
                <h2>Bill Information</h2>

                <div className="billRow">
                  <span>Subtotal</span>
                  <strong>{money.format(subTotal)}</strong>
                </div>

                <div className="billRow">
                  <span>Delivery</span>
                  <strong>{delivery === 0 ? 'Free' : money.format(delivery)}</strong>
                </div>

                <div className="billRow">
                  <span>Service Fee</span>
                  <strong>{money.format(serviceFee)}</strong>
                </div>

                <div className="billTotal">
                  <span>Total</span>
                  <strong>{money.format(total)}</strong>
                </div>
              </section>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default DetailProduct;