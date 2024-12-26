import { FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE } from './actionTypes';

export const fetchCategories = () => {
    return async (dispatch) => {
        try {
            const response = await fetch('https://workintech-fe-ecommerce.onrender.com/categories');
            const data = await response.json();
            dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: FETCH_CATEGORIES_FAILURE, payload: error.message });
        }
    };
};