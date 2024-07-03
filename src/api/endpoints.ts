export const API_URLS = {
  postUserList: () => `/users`,
  getUserList: (page: number) => `/users?page=${page}&per_page=30`,
  getUser: (id: number) => `/users/${id}`,
  updateUserList: (id: number) => `/users/${id}`,
  deleteUserList: (id: number) => `/users/${id}`,
  getUserPost: () => `/posts`,
  createPostComment: (id: number) => `/posts/${id}/comments`,
  getPostComment: (id: number) => `/posts/${id}/comments`,
  deleteUserComment: (id: number) => `/comments/${id}`,
};
