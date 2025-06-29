import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/action/AuthAction";
import '../../App.css';

const Navbar = () => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="logo">Mobzoo</div>

      {/* Toggle Button for small screens */}
      <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </button>

      <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
        
        {!isAuthenticated && (
          <Link to="/register" className="nav-link" onClick={() => setIsMenuOpen(false)}>Register</Link>
        )}

        {isAuthenticated && (
          <>
            <Link to="/dashboard" className="nav-link" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
            <Link to="/Product" className="nav-link" onClick={() => setIsMenuOpen(false)}>Products</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
