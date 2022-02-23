import React from 'react'
import Rating from './Rating'
import {Row,Col} from 'react-bootstrap'

const DisplayReview = ({product}) => {
  return (
    <div>
         {product.review.map((r) =>(
            <div className='my-2'style={{padding:'10px', border:'1px solid gray',  borderRadius: '5px'}}> 
            <Row >
                
                <Col lg={5} className='mx-2' >

                      <span   className='px-0 mx-0 ' >
                             <i class="fa fa-user-circle fa-3x" ></i>
                              <span  className='mx-2' style={{position:'absolute',top:'10', left:'2'}}> {r.name}   </span> 
                              <span className='mx-2' >{r.createdAt? r.createdAt: (<span> 2022-02-23T08:18:20.442Z </span>)} </span>
                     </span>
                </Col>

            </Row>

            <Row className='mx-5'>
                      <Rating  rating={r.rating}></Rating> 
                      <p>{r.comment}</p>
            </Row>

            </div>
        ))}


    </div>
  )
}

export default DisplayReview