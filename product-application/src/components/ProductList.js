import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../actions/productActions';
import './ProductList.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  const loading = useSelector(state => state.products.loading);
  const error = useSelector(state => state.products.error);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='product-list-container'>
      <div className="product-list-header">
        <h1>Product List</h1>
        <div className="product-list-header-links">
          <Link to="/add">Add New Product</Link>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <ul className='product-list'>
        {filteredProducts.map(product => (
          <li key={product.id} className='product-item'>
            <h2>{product.name}</h2>
            <p>Price: ${product.price}</p>
            <p>{product.description}</p>
            <Link to={`/product/${product.id}`}>View Details</Link>
            <Link to={`/edit/${product.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default ProductList;

