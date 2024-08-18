import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Replace with your backend URL

export const createComment = async (postId, text, parentCommentId = null) => {
  const response = await axios.post(`${API_BASE_URL}/posts/${postId}/comments`, {
    text,
    parentCommentId,
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you're using JWT tokens for authentication
    }
  });
  return response.data;
};
