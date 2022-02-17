import React from 'react'

const PopUp = (props) => {
    
  return  (props.trigger) ? (
      
        <div className='popUp-outer'>
        <div className='popUp-inner' >
          <span  onClick={()=> props.setTrigger(false)} className='popUp-button'> <i className='fa fa-times'> </i> </span>  
            <div className='popUp-child'>
              {props.children}
            </div>
        </div>
    </div> 
       
  ) : "";
}

export default PopUp