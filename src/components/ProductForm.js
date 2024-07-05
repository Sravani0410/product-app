import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  selectProduct,
  addProduct,
  updateProduct,
} from "../actions/productActions";
import "./ProductForm.css";
import "./ProductDetail.css";

const ProductForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const dispatch = useDispatch();
  const history = useNavigate();
  const { id } = useParams();
  const productToEdit = useSelector((state) => state.products.selectedProduct);

  useEffect(() => {
    if (id) {
      dispatch(selectProduct(parseInt(id)));
      setIsEditMode(true);
    } else {
      resetForm();
      setIsEditMode(false);
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (productToEdit && isEditMode) {
      setName(productToEdit.name);
      setPrice(productToEdit.price);
      setDescription(productToEdit.description);
    }
  }, [productToEdit, isEditMode]);

  const resetForm = () => {
    setName("");
    setPrice("");
    setDescription("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      id: isEditMode ? parseInt(productToEdit.id) : Date.now(),
      name,
      price,
      description,
    };
    if (isEditMode) {
      // window.location.reload();
      dispatch(updateProduct(product));
    } else {
      // window.location.reload();
      dispatch(addProduct(product));
    }
    history("/");
  };

  if (!productToEdit && isEditMode) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container-form">
      <div className="form-container">
        <h1 className="form-title">
          {isEditMode ? "Edit Product" : "Add Product"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="form-label">Name:</label>
            <input
              className="form-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="form-label">Price:</label>
            <input
              className="form-input"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="form-label">Description:</label>
            <textarea
              className="form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="form-button">
            {isEditMode ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
