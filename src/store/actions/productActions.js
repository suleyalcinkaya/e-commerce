import axios from 'axios';
import * as actionTypes from './actionTypes';

export const setProductList = (products) => ({
  type: actionTypes.SET_PRODUCT_LIST,
  payload: products
});

export const setTotal = (total) => ({
  type: actionTypes.SET_TOTAL,
  payload: total
});

export const setLoading = (isLoading) => ({
  type: actionTypes.SET_LOADING,
  payload: isLoading
});

export const setError = (error) => ({
  type: actionTypes.SET_ERROR,
  payload: error
});

export const setSort = (sort) => ({
  type: actionTypes.SET_SORT,
  payload: sort
});

export const setFilter = (filter) => ({
  type: actionTypes.SET_FILTER,
  payload: filter
});

export const setSelectedProduct = (product) => ({
  type: actionTypes.SET_SELECTED_PRODUCT,
  payload: product
});

export const fetchProducts = (params = {}) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const queryParams = new URLSearchParams();
      if (params.category) queryParams.append('category', params.category);
      if (params.sort) queryParams.append('sort', params.sort);
      if (params.filter) queryParams.append('filter', params.filter);

      const url = `https://workintech-fe-ecommerce.onrender.com/products?${queryParams.toString()}`;
      console.log('Fetching from URL:', url); // Debug log

      const response = await axios.get(url);
      console.log('API Response:', response.data); // Debug log
      
      if (!response.data || !response.data.products) {
        throw new Error('Invalid response format');
      }

      dispatch(setProductList(response.data.products));
      dispatch(setTotal(response.data.total));
      dispatch(setError(null));
    } catch (error) {
      console.error('Error fetching products:', error); // Debug log
      dispatch(setError(error.message || 'Failed to fetch products'));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const fetchProduct = (productId) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`https://workintech-fe-ecommerce.onrender.com/products/${productId}`);
      dispatch(setSelectedProduct(response.data));
      dispatch(setError(null));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};