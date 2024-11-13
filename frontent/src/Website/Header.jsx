import React from 'react'
const Header=({Searchbar,state,filter,entervalue})=> {
  return (
    <>
        <div className='header_context'>
            <h1 id='header_line'>
              M<img src='https://i.gifer.com/SVKl.gif' id='heading_img' />VIECLUB.COM</h1>
        </div>
        <div className='Search_Field'>
          <input type='text' onChange={Searchbar} value={state} onKeypress={entervalue}/>
          <button onClick={filter} id='searbtn'>Filter</button>
        </div>
    </>
  )
}
export default Header;