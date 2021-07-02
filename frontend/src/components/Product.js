import React from 'react'
import { Card } from 'react-bootstrap';
import Rating from './Rating';


const Product = ({product}) => {
    return (
        <Card className='my-3 p-3 rounded ' variant='primary'>
            <a href= {`/products/${product._id}`}>
                <Card.Img src= {product.image} variant= 'top' /> 
            </a>

            <Card.Body className='card-body'>
                <a href= {`/products/${product._id}`} style = {{textDecoration:'none'}} >
                    <Card.Title className='card-title' > <strong > {product.name} </strong> </Card.Title>
                </a>

                 <Rating rating={product.rating} numReviews={product.numReviews}/>

                <Card.Text as='h3' className='py-2'> <strong> ${product.price} </strong>  </Card.Text>

            </Card.Body>
        </Card>
    )
}

export default Product
