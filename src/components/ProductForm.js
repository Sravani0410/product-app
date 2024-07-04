import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";  
import {
  selectProduct,
  addProduct,
  updateProduct,
} from "../actions/productActions";

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
  }, [productToEdit,isEditMode]);

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

  if (!productToEdit && id) {
    return <p>Loading product...</p>;
  }

  return (
    <div>
      <h1>{isEditMode ? "Edit Product" : "Add Product"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">
          {isEditMode ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
