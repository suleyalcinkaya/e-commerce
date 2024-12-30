export const setCategories = (categories) => ({ type: 'SET_CATEGORIES', payload: categories });
export const setProductList = (productList) => ({ type: 'SET_PRODUCT_LIST', payload: productList });
export const setTotal = (total) => ({ type: 'SET_TOTAL', payload: total });
export const setFetchState = (fetchState) => ({ type: 'SET_FETCH_STATE', payload: fetchState });
export const setLimit = (limit) => ({ type: 'SET_LIMIT', payload: limit });
export const setOffset = (offset) => ({ type: 'SET_OFFSET', payload: offset });
export const setFilter = (filter) => ({ type: 'SET_FILTER', payload: filter });
export const setSelectedProduct = (product) => ({ type: 'SET_SELECTED_PRODUCT', payload: product });


/*
export const fetchCategories = () => {
  return async (dispatch) => {
    dispatch(setFetchState("FETCHING"));
    try {
      const response = await fetch("https://workintech-fe-ecommerce.onrender.com/categories");
      const data = await response.json();
      dispatch(setCategories(data));
      dispatch(setFetchState("FETCHED"));
    } catch (error) {
      console.error("Error fetching categories:", error);
      dispatch(setFetchState("ERROR"));
    }
  };
};*/

export const fetchProduct = (productId) => {
  return async (dispatch) => {
    dispatch(setFetchState("FETCHING"));
    try {
      const response = await fetch(`https://workintech-fe-ecommerce.onrender.com/products/${productId}`);
      const data = await response.json();
      dispatch(setSelectedProduct(data));
      dispatch(setFetchState("FETCHED"));
    } catch (error) {
      console.error("Error fetching single product:", error);
      dispatch(setFetchState("ERROR"));
    }
  };
};

export const fetchProductList = ({ category, sort, filter, limit = 24, offset = 0 } = {}) => {
  return async (dispatch) => {
    dispatch(setFetchState("FETCHING"));
    
    let url = "https://workintech-fe-ecommerce.onrender.com/products";
    const queryParams = [];
    if (category) queryParams.push(`category=${category}`);
    if (sort) queryParams.push(`sort=${sort}`);
    if (filter) queryParams.push(`filter=${filter}`);
    if (limit) queryParams.push(`limit=${limit}`);
    if (offset) queryParams.push(`offset=${offset}`);
    
    if (queryParams.length > 0) {
      url += `?${queryParams.join('&')}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch(setProductList(data.products));
      dispatch(setTotal(data.total));
      dispatch(setFetchState("FETCHED"));
    } catch (error) {
      console.error("Error fetching products:", error);
      dispatch(setFetchState("ERROR"));
    }
  };
};