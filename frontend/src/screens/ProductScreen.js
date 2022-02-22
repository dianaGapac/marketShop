import React,{ useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import {Row,Col,Image,ListGroup,Button,Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import { useDispatch,useSelector} from 'react-redux'
import {listProductDetails} from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import DisplayReview from '../components/DisplayReview'

const ProductScreen = ({match, history}) => {
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product } = productDetails    

    const [qty, setQty] = useState(1)
    const [size, setSize] = useState ('')

    useEffect(() =>{
      dispatch( listProductDetails (match.params.id)) 

    },[dispatch,match])  
    
    const addToCartHandler =()=>{
        history.push(`/cart/${match.params.id}?size-${size}-?qty=${qty}`)
    } 
    
    const onChangeHandler =(value)=>{
       value < product.countInStock ? setQty(value)
         : setQty(product.countInStock)
   }
    
    return (
        <div>
            { product._id === match.params.id? ( 
            <div className='mt-4'> 
                { loading? <Loader/> : error ? <Message variant = 'danger'> {error} </Message> : 
                 (
                    <>          
                        <Row> 
                            <Col lg={6} md={12} sm={12} xs={12} >
                                <Image src={product.image} alt={product.name} fluid/>
                            </Col>

                            <Col lg={6}  md={12}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item> <h4> <strong> {product.name} </strong>  </h4></ListGroup.Item>
                                
                                    <ListGroup.Item> 
                                        <Rating rating={product.rating} />
                                        <span>{product.numReviews} reviews </span>
                                    </ListGroup.Item>
                                
                                </ListGroup>

                                <ListGroup variant='flush'>
                                <ListGroup.Item>
                                        <Row>
                                            <Col className='p-2' >
                                                { product.price &&   <h5> Price: &#x20B1; {` ${product.price.toLocaleString()}`} </h5> }
                                            </Col>
                                        </Row>
                                        <Row>
                                             <Col className='p-2' > <h5>CATEGORY: {product.category} </h5> </Col>
                                        </Row>
                                        <Row>
                                             <Col className='p-2' > <h5> BRAND: {product.brand}</h5>  </Col>
                                        </Row>
                                </ListGroup.Item>

                                
                                <ListGroup.Item >
                                     <Row>
                                        <Col  className='p-2' >
                                            <h5>STOCK: {product.countInStock>0 ? product.countInStock : 'Out of Stock' } </h5>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={12} md={12} sm={12} xs={12}>
                                            <Row>
                                                <Col lg={2} md={2} sm={3} xs={3} className='item-center' >
                                                    <Button className='btn-block btn-primary' 
                                                    disabled={qty===1}
                                                    onClick = {(e) => setQty(qty>1? qty-1 : qty)} > 
                                                         <i className = 'fa fa-minus' > </i>
                                                    </Button>
                                                </Col>

                                                <Col lg={3}  md={3} sm={4} xs={4} className='item-center' >
                                                    <Form.Control
                                                        style={{width:'100px'}}
                                                        value={qty}
                                                        onChange ={(e) => onChangeHandler(Number(e.target.value))}
                                                        className="border border-primary"
                                                        type="text" 
                                                        placeholder={qty} />
                                                </Col>

                                                <Col lg={2} md={2} sm={3} xs={3}className='item-center' > 
                                                    <Button className='btn-block btn-primary mx-4'
                                                    disabled={product.countInStock === qty || product.countInStock === 0}
                                                    onClick = {(e) =>  setQty( qty < product.countInStock? qty+1 : product.countInStock)}> 
                                                          <i className = 'fa fa-plus'> </i>
                                                    </Button>
                                                </Col>
                                            </Row>

                                            <Row>
                                                {product.variations.map( v => (
                                                    <Button 
                                                        onClick={e => setSize(v.size)}
                                                        key ={v.size} 
                                                        type = 'button' 
                                                        variant = 'outline-primary' 
                                                        className = 'my-2 mx-1' 
                                                        style = {{
                                                            width: '100px'
                                                        }}> 
                                                        {v.size}
                                                    </Button>
                                                    ))  }
                                            </Row>

                                        </Col>
                                    </Row>
                                </ListGroup.Item> 
                                

                                <ListGroup.Item>
                                    <Row>
                                        <Button 
                                            onClick = {addToCartHandler}
                                            className=' btn-primary text-center' 
                                            type='button' 
                                            disabled={product.countInStock === 0|| qty === 0 || size === ''}
                                            >
                                            ADD TO CART
                                        </Button>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h5>PRODUCT DESCRIPTION</h5>
                                    <p style={{textIndent:'10%'}}>  {product.description} </p>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>

                        <Row className='mt-3 '>
                        <h5> PRODUCT REVIEWS</h5>
                            {product.review.length === 0? 
                                (<p> No product review yet.</p>): (
                                     <DisplayReview product={product}></DisplayReview>
                                )
                            }
                        </Row>
                    </>
                )}   
        </div>

        ): <Loader></Loader>}

        </div>
    )
}

export default ProductScreen
