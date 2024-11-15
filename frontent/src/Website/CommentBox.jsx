import React, { useEffect, useState } from 'react';
import './MovieDetails.css';
import logoimage from "../aessest/UserPNG.png";

const CommentBox = () => {
  const [commentValue, setCommentValue] = useState('');
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const url = "http://localhost:8000/comments";
        const response = await fetch(url);
        const data = await response.json();
        setComments(data); 
        console.log(data); 
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    };
    fetchComments();
  },[]); 

  const handleCommentChange = (e) => {
    setCommentValue(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!commentValue.trim()) {
      alert("Please enter a valid comment");
      return;
    }
    try {
      const url = "http://localhost:8000/comments";
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({
          comment: commentValue,
        }),
      });

      setComments([...comments, commentValue]); 
      setCommentValue(''); 
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("Failed to post your comment. Please try again.");
    }
  };

  return (
    <div className="Comments">
      <div className="Comment_Heading">
        <h2>Comments Below</h2>
      </div>
      <div className="Comment_Section">
        <textarea
          id="comment_Area"
          onChange={handleCommentChange}
          value={commentValue}
          placeholder="Write your comment..."
        />
        <button onClick={handleCommentSubmit}>Add</button>

        <div className="comments-section">
          {comments.length > 0 ? (
            comments.map((commentObj, index) => (
              <div key={index} className="commentline">
                <div className="User_Info">
                  <div className="User_logo">
                    <img src={logoimage} alt="User logo" id="user_logo" />
                  </div>
                  <div className="User_Name">
                    <span>Anonymous</span>
                  </div>
                </div>
                <div className="User_Comment">
                  <div id="comment_linee">{commentObj.comment}</div>
                </div>
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
