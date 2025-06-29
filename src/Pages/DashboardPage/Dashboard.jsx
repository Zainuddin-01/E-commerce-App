// src/layouts/DashboardLayout.jsx
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/action/AuthAction';
import '../../App.css';

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      <div className="dashboard-container" style={{ display: 'flex' }}>
        {/* Sidebar */}
        <aside
          className="sidebar"
          style={{
            width: '250px',
            background: '#4f46e5',
            color: '#fff',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100vh',
          }}
        >
          <div>
            <h2>Admin Dashboard</h2>
            <nav
              className="sidebar-nav"
              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              <NavLink
                to="/dashboard"
                end
                style={({ isActive }) => ({
                  color: '#fff',
                  fontWeight: isActive ? 'bold' : 'normal',
                  background: isActive ? '#3730a3' : 'transparent',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                })}
              >
                Overview
              </NavLink>
              <NavLink to="/dashboard/profile" style={{ color: '#fff' }}>
                User Profile
              </NavLink>
              <NavLink to="/dashboard/products" style={{ color: '#fff' }}>
                Manage Products
              </NavLink>
              <NavLink to="/dashboard/users" style={{ color: '#fff' }}>
                Manage Users
              </NavLink>
              <NavLink to="/dashboard/orders" style={{ color: '#fff' }}>
                Manage Orders
              </NavLink>
            </nav>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            style={{
              marginTop: '20px',
              padding: '10px 15px',
              backgroundColor: '#ef4444',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </aside>

        {/* Main content area */}
        <main className="main-content" style={{ flex: 1, padding: '20px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
