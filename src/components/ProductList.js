import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../actions/productActions';
import './ProductList.css';
// import image from "../../public/image.jpg"

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  const loading = useSelector(state => state.products.loading);
  const error = useSelector(state => state.products.error);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredProducts.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }
console.log("currentProducts",currentProducts)
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
      <div className='product-container'>
        <div className='product-list-container'>
        <ul className='product-list'>
        {currentProducts.map(product => (
          <li key={product.id} className='product-item'>
            <img className='product-image' src="./image.jpg" alt="dummy-image" />
            <div className='product-details'>
            <h2 className='product-name'>{product.name}</h2>
            </div>
            <p className='product-price'>Price: ${product.price}</p>
            <p className='product-description'>{product.description}</p>
            <div className='product-links'>
            <Link to={`/product/${product.id}`} className='view-details'>View Details</Link>
            <Link to={`/edit/${product.id}`} className='edit'>Edit</Link>
            </div>
            
          </li>
        ))}
      </ul>
        </div>
      </div>
      
      <div>
        {pageNumbers.map(number => (
          <button key={number} onClick={() => handlePageChange(number)}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

