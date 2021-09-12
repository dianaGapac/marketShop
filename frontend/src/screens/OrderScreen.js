import React, {useState, useEffect} from 'react'
import {PayPalButton} from 'react-paypal-button-v2'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Button, Row,Col, ListGroup, Image } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import  {getOrderDetails, payOrder} from '../actions/orderActions'
import {ORDER_PAY_RESET,} from '../constants/orderConstants'



const OrderScreen = ({match,history}) => {
    const orderId = match.params.id
    
    const [sdkReady,setSdkReady] = useState(false)

    const dispatch = useDispatch()

    const orderDetails = (useSelector((state) => state.orderDetails))
    const {order,loading, error} = orderDetails

    const orderPay = (useSelector((state) => state.orderPay)) 
    const {loading: loadingPay, success:successPay } = orderPay

    const addDecimal = (num) =>{
        return (Math.round(num*100/100)).toFixed(2)
    }
    if(!loading){
       
        order.itemsPrice = addDecimal(order.orderItems.reduce( (acc,item) => acc + item.price*item.qty,0))

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
    


    useEffect(()=>{
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
        if(!order || successPay){
            dispatch({type: ORDER_PAY_RESET})
            dispatch(getOrderDetails(orderId))
        } else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }
            else{
                setSdkReady(true) 
            }
        }
   

       
    },[dispatch, orderId, successPay, order, history])
     
    return loading? <Loader/>:error? <Message variant='danger'> {error} </Message>:
    <>
        <h4>ORDER {order._id} </h4>
        <div>
    
        <Row>
            <Col md={8}>
                <ListGroup variant= 'flush'>
                    <ListGroup.Item>
                       <h5>SHIPPING</h5>
                       <p> Name: {order.user.name} </p>
                       <p> Email: <a href={`mailto:${order.user.email}`}>{order.user.email}</a> </p> 
                        <p>Address:
                        {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode},
                        {order.shippingAddress.country}  </p>
                  
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h5> PAYMENT METHOD</h5>
                      <p>  Method:
                        {order.paymentMethod} </p>
                       <p>
                    {order.isPaid? (<Message variant='success'> Paid on {order.paidAt}</Message>) :
                    (<Message variant='danger'> Not Paid</Message>)} </p> 
                       <p>
                    {order.isDelivered? (<Message variant='success'> Delivered on {order.delivereddAt}</Message>) :
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
                                              ${addDecimal(item.price)} x  {item.qty} = ${addDecimal(item.qty*item.price)}
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
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h6> ORDER SUMMARY </h6>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col> ITEMS </Col>
                            <Col> ${order.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col> SHIPPING</Col>
                            <Col> ${order.shippingPrice} </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col> TAX </Col>
                            <Col>${order.taxPrice} </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col> TOTAL</Col>
                            <Col>${order.totalPrice} </Col>
                        </Row>
                    </ListGroup.Item>
                    {!order.isPaid && (
                         <ListGroup.Item>
                            {loadingPay && <Loader/>}
                            {!sdkReady ? <Loader/> :
                                <PayPalButton  
                                    amount={order.totalPrice} 
                                    onSuccess={successPaymentHandler} /> }
                         </ListGroup.Item> 
                    )}
                    {order.isPaid && 
                    (<ListGroup.Item> 
                        <Button variant='success' type='submit' onClick={proceedHandler}> PROCEED </Button>
                    </ListGroup.Item>)}
                  
                </ListGroup>

            </Col>
        </Row>
        </div>
    </>
}

export default OrderScreen
