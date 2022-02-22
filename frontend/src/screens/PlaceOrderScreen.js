import React, { useEffect} from 'react'
import {Link} from 'react-router-dom'
import { Button, Row,Col, ListGroup, Image, Container } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import  {createOrder, getOrderDetails} from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'


const PlaceOrderScreen = ({history}) => {
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)

    //Calculate Total Prices
    const addDecimal = (num) =>{
        return (Math.round(num*100/100)).toFixed(2)
    }

    cart.itemsPrice = cart.selectedItems.reduce( (acc,item) => acc + item.price*item.qty,0)
    cart.shippingPrice = cart.itemsPrice> 100? 0: 100 
    cart.taxPrice = Number((0.15* cart.itemsPrice).toFixed(2))
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice))

    const itemsPrice = cart.itemsPrice
    const shippingPrice = cart.shippingPrice
    const taxPrice = cart.taxPrice
    const totalPrice = cart.totalPrice

    const orderCreate= useSelector((state) => state.orderCreate)
    const {order,success, error,reset} = orderCreate

    const placeOrderHandler =() =>{ 
      
        dispatch(createOrder({
            orderItems: cart.selectedItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
   
   
       

    }
    
    useEffect(()=>{
        if(success){
            
            dispatch(getOrderDetails(order._id))
            history.push(`/orders/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET})
        }
      
    },[history,success])
     
    return (
        <Container className='mt-5'>

        <CheckoutSteps step1 step2 step3 step4/>

        <Container className='mt-4'>
        <Row>
            <Col md={8} lg={8}>
                <ListGroup variant= 'flush'>
                    <ListGroup.Item>
                       <h5> ADDRESS  </h5>
                        {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
                        {cart.shippingAddress.country}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h5> PAYMENT METHOD</h5>
                        {cart.paymentMethod}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h5> ORDER ITEMS</h5>
                        {cart.cartItems.length===0? <Message> Your Cart is Empty</Message> : 
                        (
                            <ListGroup variant='flush'>
                                 {cart.selectedItems.map((item, index) => (
                                     <ListGroup.Item key={index}> 
                                        <Row>
                                            <Col md={1} lg={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col lg={3}>
                                                <Link to={`/product/${item.product}`} >
                                                     {item.name}
                                                 </Link>
                                            </Col>
                                            <Col lg={2}>
                                                     {item.size}
                                            </Col>
                                            <Col md={4} lg={5}>
                                            &#x20B1; {item.price.toLocaleString()} x  {item.qty} = &#x20B1; {(item.qty*item.price).toLocaleString()}
                                            </Col>
                                        </Row>

                                     </ListGroup.Item>
                                 ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>

                </ListGroup>
            </Col>

            <Col md={4} lg={4}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h5> ORDER SUMMARY </h5>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col> ITEMS </Col>
                            <Col> &#x20B1; {itemsPrice.toLocaleString()}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col> SHIPPING</Col>
                            <Col> &#x20B1; {shippingPrice.toLocaleString()} </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col> TAX </Col>
                            <Col>&#x20B1;{taxPrice.toLocaleString()} </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col> TOTAL</Col>
                            <Col>&#x20B1;{totalPrice.toLocaleString()} </Col>
                        </Row>
                    </ListGroup.Item>

                

                    <ListGroup.Item>
                        <Button type='button' className='btn-block' disable = {cart.items ===0} onClick={placeOrderHandler}>
                           PLACE ORDER 
                        </Button>
                    </ListGroup.Item>
                </ListGroup>

            </Col>
        </Row>

      </Container>

        </Container>
    )
}

export default PlaceOrderScreen
