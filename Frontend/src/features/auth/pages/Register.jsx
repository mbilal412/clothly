import React from 'react';
import { Link } from 'react-router';
import '../styles/auth.scss';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';


const Register = () => {
  const navigate = useNavigate();
  const { error } = useSelector(state => state.auth);
  const { loading } = useSelector(state => state.auth);

  const { handleRegister } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    password: "",
    isSeller: false
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await handleRegister(formData);
      navigate('/');
    } catch (err) {
      console.error('something went wrong');
    }

  }


  return (
    <div className="container">
      <div className="leftSide">
        <div className="brandContent">
          <div className="brand">
            <h1>JOIN THE CIRCLE</h1>
          </div>
          <div className="description">
            <p>
              Step into a world where night defines luxury. Access
              our private collections and curated experiences by
              creating your digital identity.
            </p>
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="formContainer">
          <h2 className="heading">Register Account</h2>
          <p className="subHeading">Join the curated circle of modern elegance</p>

          <form className="form" onSubmit={handleSubmit}>
            <div className="inputGroup">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                placeholder="Enter full name"
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                value={formData.fullName}
                required
              />
              {error && error.errors.some(err => err.field === 'fullName') && (
                <p className="fieldError">{error.errors.find(err => err.field === 'fullName').message}</p>
              )}
            </div>

            <div className="inputGroup">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="Enter email address" onChange={(e) => setFormData({ ...formData, email: e.target.value })} value={formData.email} required />
              {error && error.errors.some(err => err.field === 'email') && (
                <p className="fieldError">{error.errors.find(err => err.field === 'email').message}</p>
              )}
            </div>

            <div className="inputGroup">
              <label htmlFor="contact">Contact Number</label>
              <input type="tel" id="contact" placeholder="Enter contact number" onChange={(e) => setFormData({ ...formData, contact: e.target.value })} value={formData.contact} required />
              {error && error.errors.some(err => err.field === 'contact') && (
                <p className="fieldError">{error.errors.find(err => err.field === 'contact').message}</p>
              )}
            </div>

            <div className="inputGroup">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} value={formData.password} required />
              {error && error.errors.some(err => err.field === 'password') && (
                <p className="fieldError">{error.errors.find(err => err.field === 'password').message}</p>
              )}
            </div>

            <div className="checkboxGroup">
              <input type="checkbox" id="seller" onChange={(e) => setFormData({ ...formData, isSeller: e.target.checked })} value={formData.isSeller} />
              <label htmlFor="seller">I want to register as a Seller</label>
            </div>

            <button type="submit" className="submitBtn {loading ? 'loading' : ''}" disabled={loading}>
              REGISTER
            </button>
            {error && error.errors.length === 0 && <p className="fieldError">{error.message}</p>}

            <div className="authDivider">
              <span>OR</span>
            </div>

            <a href={`${import.meta.env.VITE_BACKEND_URL}/api/auth/google`} className="googleBtn">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="googleIconSvg">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
              Continue with Google
            </a>
          </form>

          <div className="footer">
            ALREADY HAVE AN ACCOUNT? <Link to="/login">LOGIN</Link>
          </div>

          <div className="disclaimer">
            <p>By registering, you agree to our Privacy Policy and Terms of Service. Your data is curated and protected within the Atelier framework.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;