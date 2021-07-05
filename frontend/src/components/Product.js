import React from 'react'
import { Card } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Rating from './Rating';


const Product = ({product}) => {
    //temporary Sorted Price
    var sortedPrice= product.variations
    sortedPrice[1].price = 350

    
    sortedPrice.sort((a, b) => a.price - b.price);
    console.log('SORTED')
    console.log(sortedPrice)

    const minPrice = sortedPrice[0].price
    const maxPrice = sortedPrice[2].price


 

     return (
        <Card className='my-3 p-3 rounded ' variant='primary'>
            <Link to = {`/product/${product._id}`}>
                <Card.Img src= {product.image} variant= 'top' /> 
            </Link>

            <Card.Body className='card-body'>
                <Link to= {`/product/${product._id}`} style = {{textDecoration:'none'}} >
                    <Card.Title className='card-title' > <strong > {product.name} </strong> </Card.Title>
                </Link>

                <Rating rating={product.rating} numReviews={product.numReviews}/>

                <Card.Text as='h4' className='py-2'>
                     <strong>  
                        {`$ ${minPrice}`} 
                        {maxPrice === minPrice?' ': `-${maxPrice}` }
                      
                    </strong>  </Card.Text>

            </Card.Body>
        </Card>
    )
}

export default Product
