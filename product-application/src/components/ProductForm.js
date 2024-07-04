import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addProduct, updateProduct } from '../actions/productActions';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const history = useNavigate();
  const { id } = useParams();
  const productToEdit = useSelector(state =>
    state.products.products.find(product => product.id === parseInt(id))
  );
console.log("productToEdit",productToEdit)
  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setPrice(productToEdit.price);
      setDescription(productToEdit.description);
    }
  }, [productToEdit]);

  const handleSubmit = e => {
    e.preventDefault();
    const product = { id: productToEdit ? parseInt(productToEdit.id) : Date.now(), name, price, description };
    if (productToEdit) {
      dispatch(updateProduct(product));
    } else {
      dispatch(addProduct(product));
    }
    history('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} required />
      </div>
      <button type="submit">{productToEdit ? 'Update' : 'Add'} Product</button>
    </form>
  );
};

export default ProductForm;
