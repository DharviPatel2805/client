import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './Comment';
import '../App.css';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/${1}/comments`)
      .then(response => setComments(response.data))
      .catch(error => console.error('Error fetching comments:', error));
  }, [postId]);

  return (
    <div className="comment-list">
      {comments.map(comment => (
        !comment.parentCommentId && <Comment key={comment._id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
