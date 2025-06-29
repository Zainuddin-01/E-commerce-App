// src/pages/Register.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/action/AuthAction';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, error } = useSelector(state => state.auth);

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    country: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(register(form));
  };

  // Redirect on successful registration
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <>  
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
        <input name="country" placeholder="Country" value={form.country} onChange={handleChange} required />

        <button type="submit">Sign Up</button>
        {error && <p className="auth-error">{error}</p>}
      </form>

      <p>
        Do you have an account? <Link to='/login'>Login Here</Link>
      </p>
    </div>
  </>
  );
};

export default Register;
