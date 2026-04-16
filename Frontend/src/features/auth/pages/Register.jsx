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

            <a href={`${import.meta.env.VITE_BACKEND_URL}/api/auth/google`} type="button" className="googleBtn">
              <span className="googleIcon" aria-hidden="true">G</span>
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