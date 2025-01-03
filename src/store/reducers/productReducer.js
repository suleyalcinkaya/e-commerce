import * as actionTypes from '../actions/actionTypes';

const initialState = {
  categories: [],
  productList: [],
  total: 0,
  loading: false,
  error: null,
  sort: '',
  filter: '',
  selectedProduct: null
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PRODUCT_LIST:
      return { ...state, productList: action.payload };
    case actionTypes.SET_TOTAL:
      return { ...state, total: action.payload };
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    case actionTypes.SET_SORT:
      return { ...state, sort: action.payload };
    case actionTypes.SET_FILTER:
      return { ...state, filter: action.payload };
    case actionTypes.FETCH_CATEGORIES_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionTypes.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        loading: false
      };
    case actionTypes.FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case actionTypes.SET_SELECTED_PRODUCT:
      return {
        ...state,
        selectedProduct: action.payload
      };
    // ... existing category cases
    default:
      return state;
  }
};

export default productReducer;