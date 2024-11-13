import React from 'react'

const PageBtn=({pre,next})=> {
  return (
    <div>
        <div className='Operating_Buttons'>
        <div className='Preview_Button'>
            <button onClick={pre} id='Prebtn'><i class="fa-sharp fa-solid fa-arrow-left"></i></button>
        </div>
        <div className='Next_Button'>
          <button onClick={next} id='Nextbtn'><i class="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>
      
    </div>
  )
}
export default PageBtn;
