import React,{ useState,useEffect } from 'react';
import {Link} from 'react-router-dom';
import {Row,Col,Image,ListGroup,Button,Form} from 'react-bootstrap';
import Rating from '../components/Rating';
import { useDispatch,useSelector} from 'react-redux'
import {listProductDetails} from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
//import Variations from '../components/Variations'

const ProductScreen = ({match, history}) => {

    const [qty, setQty] = useState(1)
    //product state
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product } = productDetails    
    //fetch data from api in backend
    useEffect(() =>{

      dispatch( listProductDetails (match.params.id)) 

    },[dispatch,match])  
    
    const addToCartHandler =()=>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)

    } 
    
    const onChangeHandler =(value)=>{
       value < product.countInStock ? setQty(value)
         : setQty(product.countInStock)
   }
    

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
                               <h4> {`Price: $${product.price}`} </h4> 
                               
                        {/* <Variations product = {product}>  </Variations> */} 

                           </ListGroup.Item>
                           <ListGroup.Item>
                            <span> Stock: {product.countInStock>0 ? product.countInStock : 'Out of Stock' }</span>
                           </ListGroup.Item>
                                    <ListGroup.Item>
                                       {/*  <Form>
                                            <Button className='btn-block btn-success'> <i className = 'fa fa-minus'> </i></Button>
                                                <input type='number' className='p-3 border border-succes'> {qty} </input>
                                            <Button className='btn-block btn-success'> <i className = 'fa fa-plus'> </i></Button>
                                        </Form> */}
                                        <Form.Group  >
                                        <Row >
                                            <Col md={1}>
                                                <Button className='btn-block btn-success '
                                                disabled={qty===1}
                                                onClick = {(e) => setQty(qty>1? qty-1 : qty)}> 
                                                <i className = 'fa fa-minus' > </i></Button>
                                            </Col>
                                            <Col md={1}>
                                                <Form.Control 
                                                    value={qty}
                                                    onChange ={(e) => onChangeHandler(Number(e.target.value))}
                                                    className="border border-success mx-1"
                                                    style ={{width: '55px'}}
                                                    type="text" 
                                                    placeholder={qty} />
                                            </Col>
                                            <Col md={2}> 
                                                <Button className='btn-block btn-success mx-4'
                                                disabled={product.countInStock === qty}
                                                onClick = {(e) =>  setQty( qty < product.countInStock? qty+1 : product.countInStock)}> 
                                                <i className = 'fa fa-plus'> </i></Button>
                                            </Col>
                                        </Row>
                                        </Form.Group>

                                    </ListGroup.Item> 
                        

                           <ListGroup.Item>
                               <Row>
                                <Button 
                                    onClick = {addToCartHandler}
                                    className=' btn-success text-center' 
                                    type='button' 
                                    disabled={product.countInStock === 0}
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

//todo limit plus button on coutInStock DONE
/// Buy Now Button 