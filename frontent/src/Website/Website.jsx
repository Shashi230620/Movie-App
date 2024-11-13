import React from 'react'
import "./Website.css";
import Header from './Header';
import PageBtn from './PageBtn';
const Website=({Searchbar,state,entervalue,filter,Movie_Content,Pre,next})=> {
  return (
    <>
      <div className='MovieFlix_Website'>
      <div className='MovieFlix_Header'>
        <Header Searchbar={Searchbar} 
        state={state} 
        entervalue={entervalue} 
        filter={filter}/>
      </div>
      <div className='MovieFlix_Content'>
      {Movie_Content}
      </div>
      <PageBtn pre={Pre} next={next}/>
      </div>
    </>
  )
}
export default Website;
