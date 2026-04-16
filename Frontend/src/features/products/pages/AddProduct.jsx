import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useProduct } from '../hooks/useProduct';
import '../styles/product.scss';

const MAX_IMAGES = 7;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const AddProduct = () => {
  const navigate = useNavigate();
  const { handleCreateProduct } = useProduct();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const getFileKey = (file) => `${file.name}-${file.size}-${file.lastModified}`;

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onImageChange = (event) => {
    const selected = Array.from(event.target.files || []);

    if (!selected.length) {
      return;
    }

    const oversized = selected.filter((file) => file.size > MAX_FILE_SIZE);
    const eligible = selected.filter((file) => file.size <= MAX_FILE_SIZE);

    setImages((prevImages) => {
      const existingKeys = new Set(prevImages.map((file) => getFileKey(file)));
      const uniqueNew = eligible.filter((file) => !existingKeys.has(getFileKey(file)));
      return [...prevImages, ...uniqueNew].slice(0, MAX_IMAGES);
    });

    const willExceedMax = images.length + eligible.length > MAX_IMAGES;

    if (oversized.length > 0) {
      setStatus({
        type: 'error',
        message: `Ignored ${oversized.length} file(s) over 5MB.${willExceedMax ? ` First ${MAX_IMAGES} images were kept.` : ''}`,
      });
    } else if (willExceedMax) {
      setStatus({
        type: 'success',
        message: `Only first ${MAX_IMAGES} images are kept.`,
      });
    } else {
      setStatus({ type: '', message: '' });
    }

    resetFileInput();
  };

  const removeImage = (indexToRemove) => {
    setImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
    setStatus({ type: '', message: '' });
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setImages([]);
    resetFileInput();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });

    const parsedPrice = Number(price);

    if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      setStatus({ type: 'error', message: 'Listing price must be greater than 0.' });
      return;
    }

    if (images.length === 0) {
      setStatus({ type: 'error', message: 'Upload at least one image.' });
      return;
    }

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('description', description.trim());
    formData.append('price', String(parsedPrice));
    images.forEach((image) => formData.append('images', image));

    setSubmitting(true);

    try {
      const response = await handleCreateProduct(formData);
      setStatus({
        type: 'success',
        message: response?.message || 'Product created successfully.',
      });
      clearForm();
    } catch (error) {
      const firstFieldError = Array.isArray(error?.errors) && error.errors.length > 0
        ? error.errors[0].message
        : '';

      setStatus({
        type: 'error',
        message: firstFieldError || error?.message || 'Failed to create product.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const imageCountLabel = `${images.length} / ${MAX_IMAGES}`;
  const onLogout = () => navigate('/login');

  return (
    <div className="productPage">
      <header className="topNav">
        <h2 className="brand">Clothly</h2>

        <nav className="navLinks">
          <Link to="/" className="navLink">Home</Link>
          <button type="button" className="navLink navButton">View Product</button>
          <Link to="/add-product" className="navLink active">Add Product</Link>
        </nav>

        <button type="button" className="logoutBtn" onClick={onLogout}>Logout</button>
      </header>

      <main className="pageContent">
        <header className="headingBlock">
          <h1>Add Product</h1>
          <p>Fill details to publish your listing.</p>
        </header>

        <form className="formCard" onSubmit={onSubmit}>
          <div className="formBody">
            <section className="inputGrid">
              <div className="inputGroup titleGroup">
                <label htmlFor="title">Product Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="e.g. Silk Draped Midi Dress"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                />
              </div>

              <div className="inputGroup priceGroup">
                <label htmlFor="price">Price</label>
                <div className="priceInputWrap">
                  <span>PKR</span>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder="0"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="inputGroup descriptionGroup">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  placeholder="Describe the craftsmanship, materials, and silhouette..."
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  required
                />
              </div>
            </section>

            <div className="galleryCard">
              <div className="galleryHead">
                <div>
                  <h3>Product Gallery</h3>
                  <p>Maximum {MAX_IMAGES} images allowed</p>
                </div>
                <span>{imageCountLabel}</span>
              </div>

              <label htmlFor="images" className="uploadZone">
                <div className="uploadIcon">+</div>
                <strong>Click to upload or drag and drop</strong>
                <small>PNG, JPG or WEBP up to 5MB</small>
              </label>

              <input
                id="images"
                name="images"
                type="file"
                accept="image/*"
                multiple
                onChange={onImageChange}
                ref={fileInputRef}
              />

              {images.length > 0 ? (
                <ul className="fileList" aria-label="Selected image files">
                  {images.map((file, index) => (
                    <li key={getFileKey(file)} className="fileItem">
                      <span>{file.name}</span>
                      <button
                        type="button"
                        className="removeImageBtn"
                        onClick={() => removeImage(index)}
                        aria-label={`Remove ${file.name}`}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>

          <button type="submit" className="submitBtn" disabled={submitting}>
            {submitting ? 'Adding Product...' : 'Add Product'}
          </button>

          {status.message ? (
            <p className={status.type === 'error' ? 'statusError' : 'statusSuccess'}>{status.message}</p>
          ) : null}
        </form>
      </main>
    </div>
  );
};

export default AddProduct;
