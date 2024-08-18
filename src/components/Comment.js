import React, { useState } from 'react';
import '../App.css';
import user from "../assets/imgs/user.jpg";
import { createComment } from '../functions/Comment';

const Comment = ({ comment, onReplySubmit }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReplyClick = () => {
    setShowReplyBox(!showReplyBox);  // Toggle reply box visibility
  };

  const handleReplyChange = (e) => {
    setReplyText(e.target.value);
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    const newComment = await createComment(1, replyText, comment._id);
    console.log(newComment);
    // onReplySubmit(replyText);  
    setReplyText('');  // Clear the input field
    setShowReplyBox(false);  // Hide the reply box after submission
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <p className="card-text">{comment.text}</p>
        <small className="text-muted">
          Posted on {new Date(comment.createdAt).toLocaleString()}
        </small>
        <br />
        <button className="btn btn-link" onClick={handleReplyClick}>
          Reply
        </button>
        
        {/* Reply Box */}
        {showReplyBox && (
          <form onSubmit={handleReplySubmit}>
            <div className="form-group">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Write your reply..."
                value={replyText}
                onChange={handleReplyChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
               Reply
            </button>
          </form>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="replies">
            {comment.replies.map(reply => (
              <Comment key={reply._id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
