import axios from 'axios';

const API = axios.create({ baseURL: 'https://app-sales-980472.herokuapp.com' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const findPost = (post) => API.post('/posts/search', post);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const fetchProducts = () => API.get('/products');
export const createProduct = (newProduct) => API.post('/products', newProduct);
export const findProduct = (product) => API.post('/products/search', product);
export const updateProduct = (id, updatedProduct) => API.patch(`/products/${id}`, updatedProduct);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

export const fetchUsers = () => API.get('/user');
export const createUser = (newUser) => API.post('/user', newUser);
export const updateUser = (id, updatedUser) => API.patch(`/user/${id}`, updatedUser);
export const deleteUser = (id) => API.delete(`/user/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
