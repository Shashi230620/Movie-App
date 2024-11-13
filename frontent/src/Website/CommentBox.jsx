import React, { useState } from 'react';
import './MovieDetails.css';
import logoimage from "../aessest/user.png"

const CommentBox = () => {
  const [commentvalue, setCommentvalue] = useState('');
  const [commentline, setCommentline] = useState(false);
  const[Array,setArray]=useState([])

  const comment = (e) => {
    setCommentvalue(e.target.value);
  };

  const handlecommentvalue = () => {
    setCommentline(true);
    setCommentvalue('')
    setArray([...Array,commentvalue])
  };

  return (
    <div>
      <textarea
        id="comment_Area"
        onChange={comment}
        value={commentvalue}
        placeholder="Write your comment..."
      />
      <button onClick={handlecommentvalue}>Add</button>

      {commentline && (
        <div className="comments-section">
          {Array.map((comment, index) => (
            <div key={index} className="commentline">
              <div className="User_logo">
                <img src={logoimage} alt="User logo" id="user_logo" />
                <span>Anonymous</span>
              </div>
              <div className="User_Comment">
                <div id='comment_linee'>{comment}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentBox;
