
import React, { useState, useEffect } from 'react';
import CommentList from './components/CommentList';
import CommentForm from './components/CommentForm';
import axios from 'axios';
import './App.css';
// src/index.js or src/App.js
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const postId = 1; // Assuming postId is known
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/posts/${postId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleNewComment = (newComment) => {
    setComments(prevComments => [newComment, ...prevComments]);
  };

  return (
    <div className="app">
      <h5 >Comments (22) </h5>
      <hr/>
      <CommentList comments={comments} />
      <CommentForm postId={postId} onCommentCreated={handleNewComment} />
      
    </div>
  );
};

export default App;
