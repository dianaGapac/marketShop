import React, {useState } from 'react'
import {Form, Button, Row, Container} from 'react-bootstrap'
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

        <Container className='mt-5' >
            <CheckoutSteps step1 step2 step3/>
           
        <FormContainer > 
        <Form  onSubmit={submitHandler}  > 
   
              <Form.Group>
                  <Form.Label as='legend' className='h5 text-center' >  Select Payment Method</Form.Label>

                <Row className='mt-10'> 
         
                        <Form.Check 
                        type='radio' 
                        label='PayPal or Credit Card'
                        id='PayPal'  
                        name='paymentMethod' 
                        value='PayPal' 
                        checked 
                        onChange={(e)=> setPaymentMethod(e.target.value)}
                        className='mt-3'>
                        </Form.Check>
                </Row>
                <Row className='mt-10'> 
                        <Form.Check 
                        type='radio' 
                        label='Stripe'
                        id='Stripe'  
                        name='paymentMethod' 
                        value='Stripe' 
                        className='mt-3'
                        onChange={(e)=> setPaymentMethod(e.target.value)}
                        >    
                        </Form.Check>
                </Row>

                <Button type= 'submit' variant='primary' className='my-3 mx-0'>
                 Continue
                </Button>
    
              </Form.Group>
        
              </Form>

        </FormContainer>
     
        </Container>
    )
}

export default PaymentScreen
