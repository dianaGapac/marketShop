import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, Card, ListGroup, Image, Form, Button} from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart} from '../actions/cartActions'

const CartScreen = ({match, location, history}) => {
    const productId = match.params.id
    const qty = location.search? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const onChangeHandler =(id, qty, stock)=>{
         qty < stock ? dispatch(addToCart(id,qty) 
         ) : dispatch(addToCart(id,stock))
    }

    const removeFromCartHandler = (id)=> {
        
    }
   

    useEffect(() =>{
        if(productId){
            dispatch(addToCart(productId,qty))
        }
    }, [dispatch,productId,qty])

    return (
        <Row>
            <Col md={10}>
                <h4 className= 'my-3'> SHOPPING CART</h4>
                {cartItems.length === 0? (<Message>
                    Your Cart is EMPTY. Click <Link to='/'> here </Link> to GO BACk
                </Message>) : 
                (
                    <ListGroup variant = 'flush'>
                        {cartItems.map( item => (
                            <ListGroup.Item key ={item.product}> 
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name}  fluid rounded/>
                                    </Col>

                                    <Col md={2}>
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>
                                    </Col>

                                    <Col md={1}>
                                       $ {item.price}
                                    </Col>
                                    
                                    <Col >
                                      <Form.Group  >
                                        <Row >
                                            <Col md={1}>
                                                <Button className='btn-block btn-success '
                                                 onClick = {(e) => dispatch(addToCart(item.product, item.qty-1))}
                                                  disabled= {item.qty === 1}> 
                                                
                                                <i className = 'fa fa-minus' > </i></Button>
                                            </Col>
                                            <Col md={1}>
                                                <Form.Control 
                                                    value={item.qty}
                                                    onChange={(e) => onChangeHandler(item.product, Number(e.target.value),item.countInStock)}
                                                    className="border border-success mx-1"
                                                    style ={{width: '55px'}}
                                                    type="text" 
                                                    placeholder={item.qty} />
                                            </Col>
                                            <Col md={2}> 
                                                <Button className='btn-block btn-success mx-4'
                                                 onClick = {(e) => dispatch(addToCart(item.product, item.qty+1))}
                                                 disabled = {item.countInStock === item.qty}> 
                                                <i className = 'fa fa-plus'> </i></Button>
                                            </Col>
                                            <Col md={1}>
                                                <Button variant='light' type='button' className=' btn-block'
                                                onClick = {()=> removeFromCartHandler(item.product)}
                                                > 
                                                <i class="far fa-trash-alt"> </i> </Button>
                                    </Col>
                                          
                                        </Row>
                                        </Form.Group>

                                    
                                    </Col>

                                  
  
                                </Row>


                            </ListGroup.Item>
                       
                        ))}
                    </ListGroup>
                )
                }
            </Col>

            <Col md={2}>
            </Col>

            <Col md={2}>
            </Col>

        </Row>
    )
}

export default CartScreen

//TO DO
// cartItems don't add up DONE
// local strorage issue. what if i restart the browser will my cartItems be empty?  nah
// duplicate item dont add up. (existing item on shop) just replacing it DONE
// Cart wont show when cart icon is clicked DONE

// inactive button when out of stock. DONE
// restrictions DONE
//minus button DONE
//delete button

//header title (Qunatity, Name etc)