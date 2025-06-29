// src/pages/Login.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/action/AuthAction';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, error } = useSelector(state => state.auth);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login(form.email, form.password));
  };

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <>
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Log In</button>
        {error && <p className="auth-error">{error}</p>}
      </form>

      <p>
        Don't have an account? <Link to="/register">Register Here</Link>
      </p>
    </div>
  </>
  );
};


export default Login;
