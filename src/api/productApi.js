import axiosInstance from './api';

// GET: 전체 상품 조회
export const fetchProduct = () => axiosInstance.get('/products/');
// GET: 카테고리별 상품조회
export const getPostDetail = (id) => axiosInstance.get(`/products/${id}/`);
// POST: 상품등록
export const createPost = () => axiosInstance.get('/products/');
