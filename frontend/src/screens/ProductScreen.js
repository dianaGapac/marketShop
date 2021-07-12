import React,{ useEffect } from 'react';
import {Link} from 'react-router-dom';
import {Row,Col,Image,ListGroup,Button} from 'react-bootstrap';
import Rating from '../components/Rating';
import { useDispatch,useSelector} from 'react-redux'
import {listProductDetails} from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Variations from '../components/Variations'

const ProductScreen = (props) => {
    //product state
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product } = productDetails    
    //fetch data from api in backend
    useEffect(() =>{

      dispatch( listProductDetails (props.match.params.id)) 

    },[dispatch,props.match])  
    
    
    console.log(product)

    

    return (
        <div>
            <Link className='btn btn-light my-3' to='/'> GO BACK </Link>
            { loading? <Loader/> : error ? <Message variant = 'danger'> {error} </Message> : (
                <Row>
                    <Col md={6} >
                        <Image src={product.image} alt={product.name} fluid/>
                     </Col>

                     <Col md={6}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item> <h4> <strong> {product.name} </strong>  </h4></ListGroup.Item>
                        
                            <ListGroup.Item> 
                                <Rating rating={product.rating} numReviews={product.numReviews}/>
                            </ListGroup.Item>
                           
                        </ListGroup>

                        <ListGroup variant='flush'>
                           
                           <ListGroup.Item>
                           <Variations product = {product}>  </Variations>

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

                           <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                        
                
                      </Col>
                </Row>
            )}   
        </div>
    )
}

export default ProductScreen
