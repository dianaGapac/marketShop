import React from 'react';
import {Link} from 'react-router-dom';
import {Row,Col,Image,ListGroup,Button,Card} from 'react-bootstrap';
import Rating from '../components/Rating';
import products from '../products';

const ProductScreen = (props) => {
    const product = products.find(p=> p._id === props.match.params.id);
    
    return (
        <div>
            <Link className='btn btn-light my-3' to='/'> GO BACK </Link>
            <Row>
                <Col md={6} >
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item> <h4> <strong> {product.name} </strong>  </h4></ListGroup.Item>
                        <ListGroup.Item> 
                            <Rating rating={product.rating} numReviews={product.numReviews}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          Price: <strong> ${product.price} </strong>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                   
                        <ListGroup variant='flush'>
                            <Card>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price: </Col>
                                    <Col> <strong>${product.price}</strong></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                <Col> Status:</Col>
                                <Col>{product.countInstock >0? 'In Stock' : 'Out of Stock'} </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                <Button 
                                className='btn-block btn-success' 
                                type='button' 
                                disabled={product.countInstock === 0}>
                                    ADD TO CART
                                </Button>
                                </Row>

                            </ListGroup.Item>
                            </Card>
                        </ListGroup>
                   
                </Col>
            </Row>
        </div>
    )
}

export default ProductScreen
