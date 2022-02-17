import React from 'react'
import {Button, Form, ListGroup, ListGroupItem} from 'react-bootstrap'
import ReviewRating from './ReviewRating'

const ReviewProduct = (props) => {

    return  (props.trigger) ? (
      
    <div className='popUp-outer'>
        <div className='rate-popUp-inner' >
      
          <span  onClick={()=> props.setTrigger(false)} className='popUp-button'>
           <i className='fa fa-times'> </i> </span>  
          
            <Form>
                 <h5>PRODUCT REVIEW</h5>

                <ListGroup variant = 'flush'>
                    <ListGroup.Item className='center'>
                      <ReviewRating ></ReviewRating>
                    </ListGroup.Item>

                    <ListGroup.Item>

                    <label>Comment:</label>
                     <input style={{width:'100%', height:'100px',padding:'2px' }} type='text'/>
                    </ListGroup.Item>

                </ListGroup>
                <Button className='button-lower-right'> RATE </Button>
              
               
            </Form>
           


        </div>
    </div> 
       
  ) : "";
}

export default ReviewProduct