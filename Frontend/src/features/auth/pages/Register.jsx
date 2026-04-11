import React from 'react';
import { Link } from 'react-router';
import '../styles/register.scss';

const Register = () => {
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
          <p className="membershipLabel">MEMBERSHIP</p>
          <h2 className="heading">Register Account</h2>
          
          <form className="form">
            <div className="inputGroup">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" placeholder="Enter full name" />
            </div>
            
            <div className="inputGroup">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="Enter email address" />
            </div>
            
            <div className="inputGroup">
              <label htmlFor="phone">Contact Number</label>
              <input type="tel" id="phone" placeholder="Enter contact number" />
            </div>
            
            <div className="inputGroup">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter password" />
            </div>
            
            <div className="checkboxGroup">
              <input type="checkbox" id="seller" />
              <label htmlFor="seller">I want to register as a Seller</label>
            </div>
            
            <button type="button" className="submitBtn">
              REGISTER
            </button>
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