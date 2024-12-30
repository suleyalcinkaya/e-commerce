import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchCategoriesStart = () => ({
  type: actionTypes.FETCH_CATEGORIES_START
});

export const fetchCategoriesSuccess = (categories) => ({
  type: actionTypes.FETCH_CATEGORIES_SUCCESS,
  payload: categories
});

export const fetchCategoriesFailure = (error) => ({
  type: actionTypes.FETCH_CATEGORIES_FAILURE,
  payload: error
});

export const fetchCategories = () => {
  return async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
      const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/categories');
      dispatch(fetchCategoriesSuccess(response.data));
    } catch (error) {
      console.error("Error fetching categories:", error);
      dispatch(fetchCategoriesFailure(error.message));
    }
  };
};