import { Routes, Route } from 'react-router-dom';
import Register from './AuthPages/register';
import Login from './AuthPages/login';
import DashboardLayout from './Pages/DashboardPage/Dashboard';
import DashboardHome from './Pages/DashboardPage/DashboardHome';
import UserProfile from './Pages/UserProfile/UserProfile'; // import the profile page
import Home from './Pages/HomePage/Home';
import ManageProduct from './components/ManageProduct';
import Product from './Pages/ProductPage/Product';
import ProductCart from './components/ProductCart';
import SearchProduct from './Pages/SearchBar/SearchBar';
import ManageUser from './components/ManageUser';
import Navbar from './Pages/Navbar/Navbar';
import './App.css';


function App() {
  return (
    <>
  <Navbar/>
    <Routes>
       {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/Product" element={<Product />} />
      <Route path="/product/:id" element={<ProductCart />} /> {/* <- NEW ROUTE */}
      <Route path='search' element={<SearchProduct/>}/>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      {/* Dashboard Layout with Nested Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path='products' element={<ManageProduct/>}/>
        <Route path='users' element={<ManageUser/>}/>
      </Route>
    </Routes>
    </>
  );
}

export default App;
