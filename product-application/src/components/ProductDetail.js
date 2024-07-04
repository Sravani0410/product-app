import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { selectProduct } from '../actions/productActions';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(selectProduct(parseInt(id)));
}, [dispatch, id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!selectedProduct) return <div>No Product Found</div>;

  return (
    <div>
      <h1>View Details Page</h1>
      <h1>{selectedProduct.name}</h1>
      <p>{selectedProduct.price}</p>
      <p>{selectedProduct.description}</p>
      <Link to="/">Back to List</Link>
    </div>
  );
};

export default ProductDetail;
