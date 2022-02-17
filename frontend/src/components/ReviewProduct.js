import React from 'react'
import {Button, Form} from 'react-bootstrap'
import ReviewRating from './ReviewRating'

const ReviewProduct = () => {
  return (
    <div>
        <h5> REVIEW PRODUCT </h5>
        <ReviewRating>
            
        </ReviewRating>
        <Form>
            <input type='text'/>
        </Form>
        
    </div>
    
  )
}

export default ReviewProduct