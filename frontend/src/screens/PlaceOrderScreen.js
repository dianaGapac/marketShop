import React, {useState } from 'react'
import {Link} from 'react-router-dom'
import { Button, Row,Col, ListGroup, Card, Image } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'


const PlaceOrderScreen = () => {
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)

    //Calculate Total Prices
    const addDecimal = (num) =>{
        return (Math.round(num*100/100)).toFixed(2)
    }

    cart.itemsPrice = addDecimal(cart.selectedItemsState.reduce( (acc,item) => acc + item.price*item.qty,0))
    cart.shippingPrice = addDecimal(cart.itemsPrice> 100? 0: 100 )

    cart.taxPrice = addDecimal(Number((0.15* cart.itemsPrice).toFixed(2)))

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    const placeOrderHandler =() =>{ 
        console.log('place order')
    }
     
    return (
        <>
        <CheckoutSteps step1 step2 step3 step4/>
        <Row>
            <Col md={8}>
                <ListGroup variant= 'flush'>
                    <ListGroup.Item>
                        <h4> SHIPPING </h4>
                        <p> <strong> Address</strong></p>
                        {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
                        {cart.shippingAddress.country}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h6> PAYMEMT METHOD</h6>
                        <strong> METHOD</strong>
                        {cart.paymentMethod}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h6>ORDER ITEMS</h6>
                        {cart.cartItems.length===0? <Message> Your Cart is Empty</Message> : 
                        (
                            <ListGroup variant='flush'>
                                 {cart.selectedItemsState.map((item, index) => (
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
                            <Col> ${cart.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col> SHIPPING</Col>
                            <Col> ${cart.shippingPrice} </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col> TAX </Col>
                            <Col>${cart.taxPrice} </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col> TOTAL</Col>
                            <Col>${cart.totalPrice} </Col>
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
        </>
    )
}

export default PlaceOrderScreen
