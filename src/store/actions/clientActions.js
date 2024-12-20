import * as types from './actionTypes';

// Action Creators
export const setUser = (user) => ({
  type: types.SET_USER,
  payload: user
});

export const setRoles = (roles) => ({
  type: types.SET_ROLES,
  payload: roles
});

export const setTheme = (theme) => ({
  type: types.SET_THEME,
  payload: theme
});

export const setLanguage = (language) => ({
  type: types.SET_LANGUAGE,
  payload: language
});

// Thunk Action Creator for Roles
export const fetchRoles = () => {
  return (dispatch, getState) => {
    const { client } = getState();
    // Only fetch if roles are not already present
    if (!client.roles || client.roles.length === 0) {
      // Simulated API call - replace with your actual API
      return fetch('/api/roles')
        .then(response => response.json())
        .then(roles => dispatch(setRoles(roles)))
        .catch(error => console.error('Error fetching roles:', error));
    }
  };
};
