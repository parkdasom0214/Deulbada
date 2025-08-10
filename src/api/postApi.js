import axiosInstance from './api';

// GET: 전체 게시물 조회
export const fetchPosts = () => axiosInstance.get('/posts');
// POST: 게시물 작성
export const createPost = (postData) => axiosInstance.post('/posts/', postData);
// GET: 게시물 상세 조회
export const getPostDetail = (id) => axiosInstance.get(`/posts/${id}/`);

//좋아요수
export const fetchLike = (id) => axiosInstance.get(`/posts/${id}/like/`);
