import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useProduct } from '../hooks/useProduct';
import Navbar from '../../../app/components/Navbar';
import '../styles/product.scss';
import { useSelector } from 'react-redux';

const MAX_IMAGES = 7;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const getFileKey = (file) => `${file.name}-${file.size}-${file.lastModified}`;

const AddProduct = () => {
  const { error } = useSelector(state => state.product);
  const {products} = useSelector(state => state.product);
  const navigate = useNavigate();
  const { handleCreateProduct } = useProduct();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const processSelectedFiles = (selectedFiles) => {
    if (!selectedFiles.length) {
      return;
    }

    const imageFiles = selectedFiles.filter((file) => file.type.startsWith('image/'));
    const nonImageCount = selectedFiles.length - imageFiles.length;
    const oversized = imageFiles.filter((file) => file.size > MAX_FILE_SIZE);
    const eligible = imageFiles.filter((file) => file.size <= MAX_FILE_SIZE);

    const existingKeys = new Set(images.map((file) => getFileKey(file)));
    const uniqueNew = eligible.filter((file) => !existingKeys.has(getFileKey(file)));
    const willExceedMax = images.length + uniqueNew.length > MAX_IMAGES;

    setImages([...images, ...uniqueNew].slice(0, MAX_IMAGES));

    const notices = [];
    if (nonImageCount > 0) {
      notices.push(`Ignored ${nonImageCount} non-image file(s).`);
    }
    if (oversized.length > 0) {
      notices.push(`Ignored ${oversized.length} file(s) over 5MB.`);
    }
    if (willExceedMax) {
      notices.push(`Only first ${MAX_IMAGES} images are kept.`);
    }

    if (notices.length > 0) {
      setStatus({
        type: nonImageCount > 0 || oversized.length > 0 ? 'error' : 'success',
        message: notices.join(' '),
      });
    } else {
      setStatus({ type: '', message: '' });
    }

    resetFileInput();
  };

  const onImageChange = (event) => {
    const selected = Array.from(event.target.files || []);
    processSelectedFiles(selected);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsDragging(false);
    }
  };

  const onDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(event.dataTransfer.files || []);
    processSelectedFiles(droppedFiles);
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

    console.log('hello')
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
      await handleCreateProduct(formData);
      setStatus({ type: 'success', message: 'Product added successfully!' });
      clearForm();
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to add product.' });
    } finally {
      setSubmitting(false);
    }
  };

  const imagePreviews = useMemo(
    () => images.map((file) => ({
      key: getFileKey(file),
      name: file.name,
      url: URL.createObjectURL(file),
    })),
    [images],
  );

  useEffect(() => () => {
    imagePreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
  }, [imagePreviews]);
  


  const imageCountLabel = `${images.length} / ${MAX_IMAGES}`;

  return (
    <div className="productPage">
      <Navbar activePage="add-product" />

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
                {error && error.errors.some((err) => err.field === 'title') && (
                  <p className="fieldError">{error.errors.find((err) => err.field === 'title').message}</p>
                )}
              </div>

              <div className="inputGroup priceGroup">
                <label htmlFor="price">Price</label>
                <div className="priceInputWrap">
                  <span>PKR</span>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="1"
                    step="1"
                    placeholder="0"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    required
                  />
                </div>
                {error && error.errors.some((err) => err.field === 'price') && (
                  <p className="fieldError">{error.errors.find((err) => err.field === 'price').message}</p>
                )}
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
                {error && error.errors.some((err) => err.field === 'description') && (
                  <p className="fieldError">{error.errors.find((err) => err.field === 'description').message}</p>
                )}
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

              <label
                htmlFor="images"
                className={`uploadZone ${isDragging ? 'dragActive' : ''}`}
                onDragEnter={onDragOver}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
              >
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

              {error && error.errors.some((err) => err.field === 'images') && (
                <p className="fieldError">{error.errors.find((err) => err.field === 'images').message}</p>
              )}

              {imagePreviews.length > 0 ? (
                <ul className="fileList" aria-label="Selected image files">
                  {imagePreviews.map((preview, index) => (
                    <li key={preview.key} className="fileItem">
                      <img className="filePreview" src={preview.url} alt={preview.name} />

                      <button
                        type="button"
                        className="removeImageBtn"
                        onClick={() => removeImage(index)}
                        aria-label={`Remove ${preview.name}`}
                        title={`Remove ${preview.name}`}
                      >
                        &#10005;
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
