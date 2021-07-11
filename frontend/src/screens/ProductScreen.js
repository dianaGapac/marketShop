import React,{ useEffect } from 'react';
import {Link} from 'react-router-dom';
import {Row,Col,Image,ListGroup,Button,Card} from 'react-bootstrap';
import Rating from '../components/Rating';
import { useDispatch,useSelector} from 'react-redux'
import {listProductDetails} from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProductScreen = (props) => {
    //product state
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product } = productDetails    

    \

    //fetch data from api in backend
    useEffect(() =>{
      dispatch( listProductDetails (props.match.params.id)) 
    },[dispatch, props.match])
\

    
    

    return (
        <div>
            <Link className='btn btn-light my-3' to='/'> GO BACK </Link>
            { loading? <Loader/> : error ? <Message variant = 'danger'> {error} </Message> : (
                <Row>
                    <Col md={6} >
                    <Image src={product.image} alt={product.name} fluid/>
                     </Col>
                     <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item> <h4> <strong> {product.name} </strong>  </h4></ListGroup.Item>
                           
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>

                            <ListGroup.Item> 
                                <Rating rating={product.rating} numReviews={product.numReviews}/>
                            </ListGroup.Item>
                           
                        </ListGroup>
                        
                     </Col>
                     <Col md={3}>
                    
                        <ListGroup variant='flush'>
                            <Card>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price: $  </Col>
                                    <Col> <strong> </strong></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                <Col> Status:</Col>
                                <Col> {/* product.countInstock >0? 'In Stock' : 'Out of Stock' */} </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                <Button 
                                className='btn-block btn-success' 
                                type='button' 
                               /// disabled={product.countInstock === 0}
                               >
                                    ADD TO CART
                                </Button>
                                </Row>
                            </ListGroup.Item>
                            </Card>

                            <ListGroup.Item>
                           
                            
                            </ListGroup.Item> 
                         </ListGroup>
                    
                      </Col>
                </Row>
            )}   
        </div>
    )
}

export default ProductScreen
