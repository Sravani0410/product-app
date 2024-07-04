import axios from 'axios';
const API_URL = 'http://localhost:5000/products';
export const fetchProducts = () => async dispatch => {
  dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
  try {
    const response = await axios.get(API_URL);
    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
  }
};

export const selectProduct = id => async dispatch => {
  dispatch({ type: 'FETCH_PRODUCT_REQUEST' });
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    dispatch({ type: 'FETCH_PRODUCT_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_PRODUCT_FAILURE', payload: error.message });
  }
};

export const addProduct = product => async dispatch => {
  try {
    const response = await axios.post(API_URL, product);
    window.location.reload();
    dispatch({ type: 'ADD_PRODUCT', payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

export const updateProduct = product => async dispatch => {
  try {
    const response = await axios.put(`${API_URL}/${product.id}`, product);
    window.location.reload();
    dispatch({ type: 'UPDATE_PRODUCT', payload: response.data });
  } catch (error) {
    console.error(error);
  }
};
