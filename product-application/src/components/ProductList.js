import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../actions/productActions';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Product List</h1>
      <Link to="/add">Add Product</Link>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.price}</p>
            <p>{product.description}</p>
            <Link to={`/products/${product.id}`}>View Details</Link>
            {' '}
            <Link to={`/edit/${product.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
