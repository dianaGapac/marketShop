import React, {useState, useEffect} from 'react'
import {PayPalButton} from 'react-paypal-button-v2'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Button, Row,Col, ListGroup, Image, Form, InputGroup, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import PopUp from '../components/PopUp'
import ReviewProduct from '../components/ReviewProduct'
import Rating from '../components/Rating'
import  {getOrderDetails, payOrder, deliverOrder, receiveOrder} from '../actions/orderActions'
import {ORDER_PAY_RESET, ORDER_DELIVER_RESET, ORDER_DETAILS_RESET} from '../constants/orderConstants'
import { LinkContainer } from 'react-router-bootstrap'



const OrderScreen = ({match,history}) => {
    const orderId = match.params.id
    
    const [sdkReady,setSdkReady] = useState(false)

    const dispatch = useDispatch()

    const userLogin = (useSelector((state) => state.userLogin))
    const {userInfo} = userLogin

    const orderDetails = (useSelector((state) => state.orderDetails))
    const {order,loading, error} = orderDetails

    const orderPay = (useSelector((state) => state.orderPay)) 
    const {loading: loadingPay, success:successPay } = orderPay
    
    const orderDeliver= (useSelector((state) => state.orderDeliver)) 
    const {loading: loadingDeliver, success:successDeliver } = orderDeliver

    const orderReceived= (useSelector((state) => state.orderReceived)) 
    const {loading: loadingReceive, success:successReceive } = orderReceived

   const orderCreateReview = (useSelector((state) => state.orderCreateReview))
   const {order: orderReview ,loading: loadingReview, error:errorReview , success: successReview} = orderCreateReview

    const [rating, setRating] = useState(0)
    const [orderIsReceived, setOrderIsReceived] = useState(false)
    const [popUpButton, setPopUpButton] = useState(false)
    const [popUpRate, setPopUpRate] = useState(false)
    const [isRated, setIsRated] = useState(false)



    const addDecimal = (num) =>{
        return (Math.round(num*100/100)).toFixed(2)
    }

    if(!loading){
       
        order.itemsPrice = order.orderItems.reduce( (acc,item) => acc + item.price*item.qty,0)

    }

    
    const successPaymentHandler = (paymentResult)=>{
        console.log(paymentResult)
        dispatch(payOrder(orderId,paymentResult)) 
     }
     const proceedHandler = (paymentResult)=>{
        paymentResult = {}
        history.push('/')
        window.location.reload(false);

     }

     const deliverHandler = ()=>{
         dispatch(deliverOrder(orderId))
     }
    
     const goBackHandler = ()=>{
         dispatch({ type: ORDER_DETAILS_RESET})
     }

     const orderReceivedHandler = ()=>{
         dispatch(receiveOrder(orderId))
         setOrderIsReceived(true)
     } 
     const popUpRatepHandler =()=>{
         setPopUpRate(true)
         //setPopUpButton(false)
     }

     const submitRating = ()=>{
         setIsRated(true)
         setPopUpRate(false)
     }


    useEffect(()=>{

        if(!userInfo){
            history.push('/login')
        }

        const addPayPalScript= async() =>{
            const {data: clientId} = await axios.get('/api/config/paypal') 
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src= `https://www.paypal.com/sdk/js?client-id=${clientId}` 
            script.async = true
            script.onload = () =>{
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        if(!order || successPay || successDeliver){
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId))
        } else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }
            else{
                setSdkReady(true) 
            }
        }

   
    },[dispatch, orderId, successPay,successDeliver,order, history, userInfo,orderDetails])
     
    return loading? <Loader/>:error? <Message variant='danger'> {error} </Message>:
    <>
    { loading && <Loader/> }

    <h5 className='mt-4'>ORDER ID: {order._id} </h5>

    { orderDetails && (   


        <div>
        <Row>
            <Col md={8}>
                <ListGroup variant= 'flush'>

                    <ListGroup.Item>
                    <h5>SHIPPING</h5>
                    <p> NAME: {order.user.name} </p>
                    <p> EMAIL: <a href={`mailto:${order.user.email}`}>{order.user.email}</a> </p> 
                        <p>ADDRESS: 
                        {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode},
                        {order.shippingAddress.country}  </p>
                
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h5> PAYMENT METHOD</h5>
                    <p>  METHOD:
                        {order.paymentMethod} </p>
                    <p>
                    {order.isPaid? (<Message variant='success'> Paid on {order.paidAt}</Message>) :
                    (<Message variant='danger'> Not Paid</Message>)} </p> 
                    <p>
                    {order.isDelivered? (<Message variant='success'> Delivered on {order.deliveredAt}</Message>) :
                    (<Message variant='danger'> Not Delivered</Message>)} </p> 

                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h5>ORDER ITEMS</h5>
                        {order.orderItems.length===0? <Message> Your Cart is Empty</Message> : 
                        (
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item, index) => (
                                    <ListGroup.Item key={index}> 
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`} >
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                             &#x20B1; {  item.price.toLocaleString() } x  {item.qty}   =   &#x20B1; {(item.qty*item.price).toLocaleString()}
                                            </Col>
                                        </Row>

                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>

                </ListGroup>
            </Col>

            <Col md={4}>
                <Row> 
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h5> ORDER SUMMARY </h5>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col> ITEMS </Col>
                            <Col> &#x20B1; {order.itemsPrice.toLocaleString()}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col> SHIPPING</Col>
                            <Col> &#x20B1; {order.shippingPrice.toLocaleString()} </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col> TAX </Col>
                            <Col>&#x20B1;{order.taxPrice.toLocaleString()} </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col> TOTAL</Col>
                            <Col>&#x20B1;{order.totalPrice.toLocaleString()} </Col>
                        </Row>
            
                    </ListGroup.Item>
                    </ListGroup>
                </Row>

                <Row > 
                    {!order.isPaid && userInfo.isAdmin === 'false' && (
                        <ListGroup.Item>
                            {loadingPay && <Loader/>}
                            {!sdkReady ? <Loader/> :
                                <PayPalButton  
                                    amount={order.totalPrice} 
                                    onSuccess={successPaymentHandler} /> }
                        </ListGroup.Item> 
                    ) }

                    
                    { // conditional rendering for order received button 
                    order.isPaid && !order.isDelivered && userInfo.isAdmin === 'false'?
                    (<ListGroup.Item> 
                        <Button type='submit' disabled> ORDER RECEIVED</Button>
                    </ListGroup.Item>) 

                    : order.isDelivered && order.isReceived && order.isRated && userInfo.isAdmin === 'false' ?
                     (
                         <ListGroup >
                             <ListGroup variant='flush' className='py-3'>
                                <ListGroup.Item >
                                    <h5> PRODUCT REVIEW</h5>
                                </ListGroup.Item>

                                <ListGroup.Item >
                                    <Rating rating={order.review.rating}> </Rating>
                                    <p> {order.review.review} </p>

                                </ListGroup.Item>
                                <ListGroup.Item className='py-2' >
                                        <div >
                                        <LinkContainer to='/myorders'>
                                            <Button onClick={goBackHandler}>
                                                GO BACK
                                                </Button>
                                        </LinkContainer>
                                    </div>
                                </ListGroup.Item>


                                 <ListGroup.Item >  
                                    <Button disabled> ORDER RECEIVED </Button>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Button onClick={popUpRatepHandler}> RATE NOW</Button>
                                </ListGroup.Item>
                                
                              </ListGroup>
                         </ListGroup>
                        
                     )

                    : order.isDelivered && !order.isReceived && userInfo.isAdmin === 'false'? 
                    (
                        <ListGroup.Item>
                            <Button type='submit' alt= 'Click if order is received'
                            onClick={(e) => orderReceivedHandler(orderId)}> ORDER RECEIVED </Button>
                         
                            <PopUp trigger={orderIsReceived} setTrigger={setOrderIsReceived}>
                                { !order.isRated? (
                                    <>
                                        <h5>Order Received Successfully!</h5>
                                        <p>Rate the product now</p>
                                        <Button onClick={popUpRatepHandler}> RATE NOW</Button> 
                                    </>): (
                                    <>
                                        <h5>PRODUCT RATED Successfully</h5>
                                        <p>Thank You, For giving a time to review the product</p>
                                    </>
                                    )
                                }
                                
                          </PopUp>
                          <ReviewProduct className='my-10' trigger={popUpRate} setTrigger={setPopUpRate} > 
                     </ReviewProduct>         
                        </ListGroup.Item>
                    )
                  :  order.isDelivered && order.isReceived && userInfo.isAdmin === 'false' ?
                     (
                        <>
                         <ListGroup.Item >  
                            <Button disabled> ORDER RECEIVED </Button>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button onClick={popUpRatepHandler}> RATE NOW</Button>
                        </ListGroup.Item>
                        </>
                     )  : ''
                       
                    }

                     <ReviewProduct className='my-10' trigger={popUpRate} setTrigger={setPopUpRate}  orderId= {orderId} orderDetails userLogin> 
                     </ReviewProduct>

                    
                
                {userInfo && userInfo.isAdmin === 'true' && order.isPaid && !order.isDelivered &&  (

                        (<ListGroup.Item> 

                            <Button type='button' className='btn-btn-block' onClick={(e)=> deliverHandler(orderId)}> 
                               MARK AS DELIVERED
                            </Button>
                        </ListGroup.Item>
                        
                        )
                    )}

                    { userInfo.isAdmin === 'true' && (

                        (<ListGroup.Item> 

                            <LinkContainer to='/admin/orderList'>
                                    <Button onClick={goBackHandler}>
                                    GO BACK
                                    </Button>
                                </LinkContainer>
                        </ListGroup.Item>
                        
                        )
                    )}
                
                
                </Row>
            </Col>
        </Row>
        </div>

        
    )}
        
    </>
}

export default OrderScreen


/// RATE BOOLEAN
/// REVIEW FEATRUE
// AFTER ORDER RECEIVED, POP-UP ng Successfuky received the Rate now. ///
///REDUX STATE OF REVIEW TO GET THE INPUT
/// IS RATED REDUX
///ADD REVIEW TO PRODUCT STATE





 {/* Normal PopUP
                     
                     <Button onClick={()=> setPopUpButton(true)} >PopUp Sample</Button>
                        <PopUp trigger={popUpButton} setTrigger={setPopUpButton}>
                           
                         </PopUp>
                      */}
                    