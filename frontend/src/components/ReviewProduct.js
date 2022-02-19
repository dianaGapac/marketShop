import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import {Button, Form, ListGroup, ListGroupItem,Row, Col, Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {createReview, getOrderDetails} from '../actions/orderActions'
import { reviewProduct } from '../actions/productActions'



const ReviewProduct = ({setTrigger, trigger, orderId, history, location}) => {

    const dispatch = useDispatch()

    const orderDetails = (useSelector((state) => state.orderDetails))
    const {order,loading, error} = orderDetails

    const [message, setMessage] = useState('')
    const [rating,setRating] = useState([])
    //const [review,setReview] = useState('')
    const [isRated, setIsRated] = useState(false)

    const [review, setReview] = useState([{
      rating: 0,
      comment: ''
    }])

   
   

    //PRODUCT IDS FOR REVIEW
    var productIds = [];
    order.orderItems.map((id) =>{
       productIds.push(id.product)
      
    })
   // console.log(productIds)
  
   //initiate rating to 5
   productIds.map((id, index)=>{
    let newRev = review
    newRev[index].rating = 5

    setReview(newRev)
  })

 

   
    


    const submitHandler =()=>{
      if(rating === 0){
        setMessage("Fill up the form First")
      }else{

        
        dispatch(createReview(orderId,review,rating))

        const productId = order.orderItems[0].product
        console.log('pID', productId)
        dispatch(reviewProduct(productId, rating,review))
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

    const setStar = (index, val) =>{

     let newArr = [...review]
     newArr[index].rating = val
     setReview(newArr)
    }



    useEffect (()=>{
        if(isRated){
          dispatch(getOrderDetails(orderId))
        }
              
      }
  , [dispatch])


    return  (trigger) ? (
      
    <div className='rate-popUp-outer'>
        <div className='rate-popUp-inner' >
      
          <span  onClick={closeHandler} className='popUp-button'>
           <i className='fa fa-times'> </i> </span>  
          
          
          {!isRated? (
               <div>
                 <h5>PRODUCT REVIEW</h5>

                 <ListGroup variant='flush'>
                                {order.orderItems.map((item, index) => (
                                    <ListGroup.Item key={index}> 
                                        <Row>
                                            <Col lg={2} md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`} >
                                                    {item.name}
                                                </Link>
                                            </Col>
                                        </Row>
                                        <Row>
                                        <ListGroup variant = 'flush'>
                                                  <ListGroup.Item className='center rating'>
                                                    
                                                        <span  onClick={setStar(index,1)}>
                                                            <i className={ review.rating[index]>= 1? 'fas fa-star fa-2x' : 'far fa-star fa-2x' }> </i>
                                                        </span>
                                                        <span onClick={(e)=> setStar(index,2)}>
                                                            <i className={review.rating[index] >= 2? 'fas fa-star fa-2x' : 'far fa-star fa-2x' }> </i>
                                                        </span>
                                                        <span onClick={(e)=> setStar(index,3)}>
                                                            <i className={ review.rating[index]>= 3? 'fas fa-star fa-2x' : 'far fa-star fa-2x' }> </i>
                                                        </span>
                                                        <span onClick={(e)=> setStar(index,4)}>
                                                            <i className={ review.rating[index] >= 4? 'fas fa-star fa-2x' : 'far fa-star fa-2x' }> </i>
                                                        </span>
                                                        <span onClick={(e)=> setStar(index,5)}>
                                                            <i className={review.rating[index]>= 5? 'fas fa-star fa-2x' : 'far fa-star fa-2x' }> </i>
                                                        </span>
                                                  </ListGroup.Item>

                                                  <ListGroup.Item>

                                                  <label>Comment:</label>
                                                    <input  onChange={(e)=> setReview(e.target.value)}style={{width:'100%',height:'80px',padding:'2px' }} type='text'/>
                                                  </ListGroup.Item>

                                                   <div style={{ height: '70px'}}> 
                                                      <Button onClick={submitHandler} className='button-lower-right'> RATE </Button>
                                                      {message && (<p>{message}</p>)}
                                                  </div>
                                          </ListGroup>                                         
                                           </Row>

                                                              </ListGroup.Item>
                                                          ))}
                                            </ListGroup>

               
                
               
                   
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