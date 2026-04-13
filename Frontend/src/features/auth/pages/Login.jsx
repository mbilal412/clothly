import React from 'react';
import { Link } from 'react-router'; // or react-router-dom depending on setup, but using react-router as in Register
import '../styles/login.scss';
import { useAuth } from '../hooks/useAuth';
import { useSelector } from 'react-redux';


const Login = () => {
  const { error } = useSelector(state => state.auth);
  const { loading } = useSelector(state => state.auth);


  const [formData, setFormData] = React.useState({
    email: "",
    password: ""
  });
  const { handleLogin } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(formData);
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
              verifying your digital identity.
            </p>
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="formContainer">

          <h2 className="heading">Login Account</h2>
          <p className="subHeading">Welcome back to your world of elegance</p>

          <form className="form" onSubmit={handleSubmit}>
            <div className="inputGroup">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email address"
                required
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                value={formData.email}
              />
              {error && error.errors.some(err => err.field === 'email') && (
                <p className="fieldError">{error.errors.find(err => err.field === 'email').message}</p>
              )}

            </div>

            <div className="inputGroup">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                required
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                value={formData.password}
              />
              {error && error.errors.some(err => err.field === 'password') && (
                <p className="fieldError">{error.errors.find(err => err.field === 'password').message}</p>
              )}
            </div>

            <button type="submit" className="submitBtn {loading ? 'loading' : ''}" disabled={loading}>
              LOGIN
            </button>
            
            {error && error.errors.length === 0 && <p className="fieldError">{error.message}</p>}
          </form>

          <div className="footer">
            DON'T HAVE AN ACCOUNT? <Link to="/register">REGISTER</Link>
          </div>

          <div className="disclaimer">
            <p>By logging in, you agree to our Privacy Policy and Terms of Service. Your data is curated and protected within the Atelier framework.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
