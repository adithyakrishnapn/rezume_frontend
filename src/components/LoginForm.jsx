import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import { UserContext } from './UserContext';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

  async function submit(e) {
    e.preventDefault();

    setLoading(true);
        setMessage('');

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, formData);
            if (response.data.success) {
                setMessage("Login successful! Redirecting...");
                setUser(response.data.user.username);
                setFormData({ email: '', password: '' }); // Clear form
                setTimeout(() => {
                    navigate('/home'); // Redirect to homepage
                }, 2000);
            } else {
                setMessage("Incorrect email or password.");
                setFormData({ email: '', password: '' }); // Reset inputs on failure
            }
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message || "Login failed. Please try again.");
                setFormData({ email: '', password: '' }); // Reset inputs on failure
            } else if (error.request) {
                setMessage("No response from the server. Please try again later.");
                setFormData({ email: '', password: '' }); // Reset inputs on failure
            } else {
                setMessage("An unexpected error occurred.");
                setFormData({ email: '', password: '' }); // Reset inputs on failure
            }
        } finally {
            setLoading(false);
        }

  }


  return (
    <div className="form-container">
      <form onSubmit={submit} className="form">
        <h2>Login to Resume Generator</h2>
        <input
          type="email"
          name='email'
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Your Email"
          required
        />
        <input
          type="password"
          name='password'
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <div className="forgot-password">Forgot password?</div>
        <div className="signup">
          <p>New user?</p>
          <button type="button" onClick={() => navigate('/signup')}>Signup Now</button>

        </div>
        <div className="social-signup">
          <p>May also signup with</p>
          <img src="https://static-00.iconduck.com/assets.00/google-icon-512x512-tqc9el3r.png" alt="Google" />
          <img src="https://cdns.iconmonstr.com/wp-content/releases/preview/2012/240/iconmonstr-github-1.png" alt="GitHub" />
          <img src="https://static-00.iconduck.com/assets.00/linkedin-icon-256x256-k7c74t1i.png" alt="LinkedIn" />
        </div>
        <div className="signup">
          <button type="button" onClick={() => navigate('/home')}>Guest User</button>
        </div>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default LoginForm;