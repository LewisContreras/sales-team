import { FETCH_ALL, CREATE, UPDATE, DELETE, FIND_PRODUCT } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchProducts();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = (post) => async (dispatch) => {
  try {
    const { data } = await api.createProduct(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const findProduct = (post) => async (dispatch) => {
  try {
    const { data } = await api.findProduct(post);
    dispatch({ type: FIND_PRODUCT, payload: data.searched });
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updateProduct(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await await api.deleteProduct(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
