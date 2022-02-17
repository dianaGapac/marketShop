import React, {useState} from 'react'



const ReviewRating = ({rating}) => {
    
    
    const [rate, setRate] = useState(rating)


    const ratingHandler = (r)=>{
        setRate(r)
    }
 
  return (
    <div className='rating my-10' >
    
           
            <span  onClick={(e)=> ratingHandler(1)}>
                <i className={rate >= 1? 'fas fa-star fa-2x' : 'far fa-star fa-2x' }> </i>
            </span>
            <span onClick={(e)=> ratingHandler(2)}>
                <i className={rate >= 2? 'fas fa-star fa-2x' : 'far fa-star fa-2x' }> </i>
            </span>
            <span onClick={(e)=> ratingHandler(3)}>
                <i className={rate>= 3? 'fas fa-star fa-2x' : 'far fa-star fa-2x' }> </i>
            </span>
            <span onClick={(e)=> ratingHandler(4)}>
                <i className={rate >= 4? 'fas fa-star fa-2x' : 'far fa-star fa-2x' }> </i>
            </span>
            <span onClick={(e)=> ratingHandler(5)}>
                <i className={rate>= 5? 'fas fa-star fa-2x' : 'far fa-star fa-2x' }> </i>
            </span>
            
           
    </div>
     
  )
}

export default ReviewRating