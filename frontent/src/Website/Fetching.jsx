import React, { createContext, useEffect, useState } from 'react'
import Website from './Website';
import Loading from './Loading';
import {Link} from "react-router-dom";

const movie=createContext()

const Fetching=()=> {
  const[Inputvalue,SetinputValue]=useState('')
  const[myloader,SetLoader]=useState(false);
  const[data,setData]=useState([]);
  const[page,SetPage]=useState(1)
  const[limit]=useState(6)
  const[Getmovie,SetGetmovie]=useState([]);
    useEffect(()=>{
        const datafetch=async()=>{
            try{
              SetLoader(true)
              const url=`http://localhost:8000/?page=${page}&limit=${limit}`;
                // const url=`http://localhost:8000/api?page=${page}&limit=${limit}`;
                const response=await fetch(url);
                const result=await response.json();
                console.log(result);
                setData(result.movies)
                SetGetmovie(result.movies)
                SetLoader(false)
            }
            catch(error){
              console.log("this is a error is fetching data");
            }
        }
        datafetch();
            
    },[page,limit])
  const Next=()=>{
    if(page<=3){
      SetPage((inc)=>inc+1);
    }
   
   
  }
  const Preview=async()=>{
    if (page > 1) SetPage((prev) => prev - 1);
  }


  const inputvalue=(e)=>{
    SetinputValue(e.target.value);
    console.log(e.target.value);
  }

   const Filtermovie=()=>{
    if(Inputvalue.trim()==" "){
      SetGetmovie(data);
    }
    else{
      const filteredMovies = data.filter((value) =>
        value.movie.toLowerCase().includes(Inputvalue.toLowerCase())
      );
      SetGetmovie(filteredMovies);
    }
   }
   const Enterval=(e)=>{
    if(e.key==='Enter'){
      Filtermovie();
      console.log("yes")
    }
   }
  return (
    <>
    
  <Website
  Searchbar={inputvalue} 
  state={Inputvalue}  
  filter={Filtermovie} 
  entervalue={Enterval}

  Movie_Content={
      Getmovie.map((value)=>{
        return(
        <movie.Provider value={value.watch}>
         <div className='movie' key={value.id}>
           <div className='movie_image'>
           <img className="movie_poster"  src={value.image ? value.image :"https://i.gifer.com/SVKl.gif"}  alt={`${value.movie} poster`}  />
           </div>
           <div className='movie_heading'>
           <h1 id='movie_heading'>{value.movie}</h1>
           </div>
           <div className='movie_description'>
             <h2 id='movie-Des'>{value.description}</h2>
           </div>
           <div className='movie-Rating'>
             <p>Rating:-{value.rating}/10</p>
           </div>
           <div className='movie_link'>
             <Link to="/player"><button id='link-btn'>Watch</button></Link>
           </div>
         </div>
         </movie.Provider>
        )
         })
        }
        Pre={Preview} next={Next}
        />
  {myloader && <Loading />}
    </>
  )
}
export default Fetching;
export { movie };
