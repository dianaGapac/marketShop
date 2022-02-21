import React from 'react'
import { Card } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Rating from './Rating'


const Product = ({product}) => {

     return (
        <Card className='my-3 p-3 rounded ' variant='primary'>
            <Link to = {`/product/${product._id}`}>
                <Card.Img src= {product.image} variant= 'top'  /> 
            </Link>

            <Card.Body className='card-body'>
                <Link to= {`/product/${product._id}`} style = {{textDecoration:'none'}} >
                    <Card.Title className='card-title' > <strong > {product.name} </strong> </Card.Title>
                </Link>

                <Rating rating={product.rating} />

                <span>{product.numReviews} reviews </span>

                <h4> <strong> &#x20B1; {`${product.price.toLocaleString()}`} </strong>   </h4> 
            </Card.Body>
        </Card>
    )
}

export default Product
