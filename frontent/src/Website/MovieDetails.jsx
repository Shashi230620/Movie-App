import React from 'react'
import "./MovieDetails.css";
import CommentBox from './CommentBox';
const MovieDetails=()=> {
  return (
    <div>
        <div className='Movie_Details'>
            <div className='Movie_Details_img'></div>
            <div className='Movie_Details_Summary'></div>
            <div className='Movie_Cast'></div>
            <div className='Comment_Box'>
              <CommentBox />
            </div>
        </div>
      
    </div>
  )
}
export default MovieDetails;
