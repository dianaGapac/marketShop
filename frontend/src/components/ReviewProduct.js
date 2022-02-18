import React, {useState} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import {Button, Form, ListGroup, ListGroupItem} from 'react-bootstrap'

import {createReview} from '../actions/orderActions'



const ReviewProduct = ({setTrigger, trigger, orderId}) => {

    const dispatch = useDispatch()

    const [rating,setRating] = useState(0)
    const [review,setReview] = useState('')
    const orderCreateReview = (useSelector((state) => state.orderCreateReview))
    const {order,loading, error , success} = orderCreateReview

    const submitHandler =()=>{
      console.log('rating:',rating, 'review:', review)
      dispatch(createReview(orderId,review,rating))
    }


    return  (trigger) ? (
      
    <div className='popUp-outer'>
        <div className='rate-popUp-inner' >
      
          <span  onClick={()=> setTrigger(false)} className='popUp-button'>
           <i className='fa fa-times'> </i> </span>  
          
            <Form>
                 <h5>PRODUCT REVIEW</h5>
                <ListGroup variant = 'flush'>
                    <ListGroup.Item className='center rating'>
                          <span  onClick={(e)=> setRating(1)}>
                              <i className={rating >= 1? 'fas fa-star fa-2x' : 'far fa-star fa-2x' }> </i>
                          </span>
                          <span onClick={(e)=> setRating(2)}>
                              <i className={rating >= 2? 'fas fa-star fa-2x' : 'far fa-star fa-2x' }> </i>
                          </span>
                          <span onClick={(e)=> setRating(3)}>
                              <i className={rating>= 3? 'fas fa-star fa-2x' : 'far fa-star fa-2x' }> </i>
                          </span>
                          <span onClick={(e)=> setRating(4)}>
                              <i className={rating >= 4? 'fas fa-star fa-2x' : 'far fa-star fa-2x' }> </i>
                          </span>
                          <span onClick={(e)=> setRating(5)}>
                              <i className={rating>= 5? 'fas fa-star fa-2x' : 'far fa-star fa-2x' }> </i>
                          </span>
                    </ListGroup.Item>

                    <ListGroup.Item>

                    <label>Comment:</label>
                       <input  onChange={(e)=> setReview(e.target.value)}style={{width:'100%', height:'100px',padding:'2px' }} type='text'/>
                    </ListGroup.Item>

                </ListGroup>
                <Button onClick={submitHandler} className='button-lower-right'> RATE </Button>
              
               
            </Form>
           


        </div>
    </div> 
       
  ) : "";
}

export default ReviewProduct