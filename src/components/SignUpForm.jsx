import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const SignUpForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function submit(e) {
    e.preventDefault();

    setLoading(true); // Indicate loading
    setMessage(""); // Clear previous messages

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/signup`,
        formData
      );
      if (response.data.success) {
        setMessage("Signup successful! You can now log in.");
        setFormData({ email: "", password: "" }); // Clear form
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        setMessage(
          error.response.data.message || "Error occurred during signup."
        );
      } else if (error.request) {
        setMessage("No response from the server. Please try again later.");
      } else {
        setMessage("An unexpected error occurred.");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={submit} className="form">
        <h2>Sign Up to Resume Generator</h2>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <div className="social-signup">
          <p>May also signup with</p>
          <img
            src="https://static-00.iconduck.com/assets.00/google-icon-512x512-tqc9el3r.png"
            alt="Google"
          />
          <img
            src="https://cdns.iconmonstr.com/wp-content/releases/preview/2012/240/iconmonstr-github-1.png"
            alt="GitHub"
          />
          <img
            src="https://static-00.iconduck.com/assets.00/linkedin-icon-256x256-k7c74t1i.png"
            alt="LinkedIn"
          />
        </div>

        <div className="login">
          <p>Already have an account?</p>
          <button type="button" onClick={() => navigate("/login")}>
            Login Now
          </button>
        </div>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default SignUpForm;
