import React, { useContext } from 'react';
import Website from './Website';
import "./Website.css";
import { movie } from './Fetching';

const Player=()=> {
   const movieurl=useContext(movie);
   console.log(movieurl)
  return (
    <>
    <Website Movie_Content={
        <video width="750" height="500" controls >
        <source src={movieurl} type="video/mp4"/>
       </video>
      
    }/>
      
   </>
  )
}
export default Player;
