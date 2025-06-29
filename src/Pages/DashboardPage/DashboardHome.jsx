// src/DashboardPages/DashboardHome.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const DashboardHome = () => {
  const { user } = useSelector(state => state.auth);
  const { products } = useSelector(state => state.productState);

  return (
    <div style={styles.container}>
      <h1>Welcome {user?.username || 'Admin'}!</h1>
      <p>This is your admin dashboard.</p>

      <div style={styles.stats}>
        <div style={styles.card}>
          <h3>Total Products</h3>
          <p>{products.length}</p>
        </div>
        <div style={styles.card}>
          <h3>Visible Products</h3>
          <p>{products.filter(p => !p.hidden).length}</p>
        </div>
        <div style={styles.card}>
          <h3>Hidden Products</h3>
          <p>{products.filter(p => p.hidden).length}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    fontFamily: 'Arial, sans-serif',
  },
  stats: {
    display: 'flex',
    gap: '30px',
    marginTop: '30px',
    flexWrap: 'wrap',
  },
  card: {
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#f1f5f9',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    flex: '1 1 200px',
    textAlign: 'center',
  },
};

export default DashboardHome;
