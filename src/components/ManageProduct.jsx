import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProduct,
  deleteProduct,
  updateProduct,
  fetchProducts,
} from '../redux/action/ProductAction';
import '../App.css';

const ManageProduct = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productState);

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts()); // Fetch all products on component load
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();

    if (form.name && form.description && form.price && form.image) {
      if (isEditing) {
        await dispatch(updateProduct({ ...form, id: editId }));
        setIsEditing(false);
        setEditId(null);
      } else {
        await dispatch(addProduct({ ...form, hidden: false }));
        // Optionally fetch again to reflect backend updates
        dispatch(fetchProducts());
      }

      setForm({ name: '', description: '', price: '', image: '' });
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
    });
    setIsEditing(true);
    setEditId(product.id);
  };

  return (
    <div className="manage-container">
      <h2 className="manage-title">Manage Products</h2>

      <form className="product-form" onSubmit={handleAddOrUpdateProduct}>
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {isEditing ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <p>
              <strong>Price:</strong> Rs {product.price}
            </p>
            <button
            className="delete-btn"
            onClick={() => {
            console.log("Deleting Product ID:", product.id);
            dispatch(deleteProduct(product.id));
            }}
            >
            Delete
            </button>

            <button
              className="edit-btn"
              onClick={() => handleEdit(product)}
              style={{
                marginLeft: '10px',
                backgroundColor: '#ffc107',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProduct;
