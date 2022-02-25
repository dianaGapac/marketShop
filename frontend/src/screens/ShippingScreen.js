import React, {useState,useEffect} from 'react'
import {Form, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import FormContainer  from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import {saveShippingAddress} from '../actions/cartActions'



const ShippingScreen = ({history}) => {

    const dispatch = useDispatch()
    const cart =useSelector(state=> state.cart)
    const {shippingAddress} = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler =(e)=>{ 
        e.preventDefault()
        //Dispatch save shipping address
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        history.push('/payment')
   
    }
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])


    return (
        <Container  className='mt-5' > 
            <CheckoutSteps  className='text-center' step1 step2/>
            <FormContainer >
                   
                        <Form  onSubmit={submitHandler}> 
                            <Form.Group controlId='address'>
                                    <Form.Label> Address </Form.Label>
                                    <Form.Control type='text' placeholder='Enter Address' value= {address} required onChange={(e) => setAddress(e.target.value)}>  
                                    </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='city'>
                                    <Form.Label> City </Form.Label>
                                    <Form.Control type='text' placeholder='Enter City' value= {city} required onChange={(e) => setCity(e.target.value)}>  
                                    </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='postalCode'>
                                    <Form.Label> Postal Code </Form.Label>
                                    <Form.Control type='text' placeholder='Enter PostalCode' value= {postalCode} required onChange={(e) => setPostalCode(e.target.value)}>  
                                    </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='country'>
                                    <Form.Label> Country </Form.Label>
                                    <Form.Control type='text' placeholder='Enter Country' value= {country} required onChange={(e) => setCountry(e.target.value)}>  
                                    </Form.Control>
                            </Form.Group>

                            <Button type= 'submit' variant='primary' className='my-3'>
                                Continue
                            </Button>
                        </Form>
                    
            </FormContainer>

        </Container>

    )
}

export default ShippingScreen
