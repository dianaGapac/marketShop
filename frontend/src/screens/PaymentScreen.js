import React, {useState } from 'react'
import {Form, Button, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import FormContainer  from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod} from '../actions/cartActions'



const PaymentScreen = ({history}) => {

    const dispatch = useDispatch()
    const cart = useSelector(state=> state.cart)
    const {shippingAddress} = cart

    if(!shippingAddress){
        history.push('/shipping')
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    

    const submitHandler =(e)=>{ 
        e.preventDefault()
       
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
   
    }


    return (
        <>
        <Row className='d-flex justify-content-center'>
        <FormContainer className='d-flex justify-content-center' > 
            <CheckoutSteps step1 step2 step3/>
            <h4 className='text-center mt-3'>PAYMENT METHOD</h4>
            <Form  onSubmit={submitHandler}> 
              <Form.Group>
                  <Form.Label as='legend' className='h5' >  Select Method</Form.Label>

              <Col>
                <Form.Check 
                type='radio' 
                label='PayPal or Credit Card'
                id='PayPal'  
                name='paymentMethod' 
                value='PayPal' 
                checked 
                onChange={(e)=> setPaymentMethod(e.target.value)}
                >    
                </Form.Check>
              </Col> 

              <Col>
                <Form.Check 
                type='radio' 
                label='Stripe'
                id='Stripe'  
                name='paymentMethod' 
                value='Stripe' 
               
                onChange={(e)=> setPaymentMethod(e.target.value)}
                >    
                </Form.Check>
              </Col> 
              </Form.Group>




             <Button type= 'submit' variant='primary' className='my-3'>
                 Continue
             </Button>
            </Form>
        </FormContainer>
        </Row>
        </>
    )
}

export default PaymentScreen
