import React, { useState } from 'react';
import { createComment } from '../functions/Comment';
import '../App.css';

const CommentForm = ({ postId, parentCommentId, onCommentCreated }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newComment = await createComment(postId, text, parentCommentId);
      onCommentCreated(newComment); // Update the parent component with the new comment
      setText(''); // Clear the form after submission
    } catch (err) {
      setError('Failed to post the comment. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
      className='mt-2'
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your comment here..."
        required
      />
      <button type="submit">Send</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default CommentForm;
