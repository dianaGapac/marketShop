import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import {Button, Form, ListGroup, ListGroupItem} from 'react-bootstrap'

import {createReview, getOrderDetails} from '../actions/orderActions'
import { reviewProduct } from '../actions/productActions'



const ReviewProduct = ({setTrigger, trigger, orderId, history, location}) => {

    const dispatch = useDispatch()

    const orderDetails = (useSelector((state) => state.orderDetails))
    const {order,loading, error} = orderDetails

    const [message, setMessage] = useState('')
    const [rating,setRating] = useState(0)
    const [review,setReview] = useState('')
    const [isRated, setIsRated] = useState(false)
    const [productIds,setProductIds] = useState([])
  

    const submitHandler =()=>{
      if(rating === 0){
        setMessage("Fill up the form First")
      }else{
        dispatch(createReview(orderId,review,rating))

         order.orderItems.map((id) =>{
            productIds.push(id.product)
           
         })

         productIds.map((id)=> {
           let productId = id
           dispatch(reviewProduct(productId, rating,review))
           console.log('pID', productIds,rating,review)

         }) 
        setIsRated(true)
      }

    }

    const closeHandler =()=>{
      
      if(isRated){
        window.location.reload()
        
      }
      else{
        setTrigger(false)
      }
    }



    useEffect (()=>{
        if(isRated){
          dispatch(getOrderDetails(orderId))
        }
              
      }
  , [dispatch])


    return  (trigger) ? (
      
    <div className='popUp-outer'>
        <div className='rate-popUp-inner' >
      
          <span  onClick={closeHandler} className='popUp-button'>
           <i className='fa fa-times'> </i> </span>  
          
          
          {!isRated ? (
               <div>
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
                       <input  onChange={(e)=> setReview(e.target.value)}style={{width:'100%',height:'80px',padding:'2px' }} type='text'/>
                    </ListGroup.Item>
                </ListGroup>
                
                <div style={{ height: '50px'}}> 
                  
                    <Button onClick={submitHandler} className='button-lower-right'> RATE </Button>
                    {message && (<p>{message}</p>)}
                 </div>
                   
            </div>
          ): (
            <div>
               <h5>PRODUCT RATED Successfully</h5>
               <p>Thank You, For giving a time to review the product</p>
            </div>
          )
          
          }
          
           


        </div>
    </div> 
       
  ) : "";
}

export default ReviewProduct