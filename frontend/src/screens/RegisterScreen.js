import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer  from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = ({history, location}) => {

      //local state
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message,setMessage] = useState(null)

    const dispatch = useDispatch()
    
    //redux state
    const userRegister = useSelector(state => state.userRegister)
    const {loading, error, userInfo} = userRegister

    const redirect = location.search? location.search.split('=')[1]: '/' 

    const submitHandler =(e)=>{
        e.preventDefault()
      if(password !== confirmPassword)
      {
          setMessage('Passwod not Matched')
      }
      else{
        dispatch(register(name,email,password))
    
      }

    }

    useEffect (()=>{
        window.scrollTo(0, 0)
        
        if(userInfo){
            history.push(redirect)
    }}, [history,userInfo, redirect] )

    return (
        <FormContainer >
           
           <h4 > <strong> SIGN UP </strong></h4>
          

            <Form onSubmit={submitHandler}>

            <Form.Group controlId='name'>
                    <Form.Label className="mt-1"> Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter Name' value= {name} onChange={(e) => setName(e.target.value)}>  
                    </Form.Control>
                </Form.Group>

           
                <Form.Group controlId='email'>
                    <Form.Label className="mt-1"> Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email' value= {email} onChange={(e) => setEmail(e.target.value)}>  
                    </Form.Control>
                </Form.Group>

              
                <Form.Group controlId='password'>
                    <Form.Label className="mt-1"> Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' value= {password} onChange={(e) => setPassword(e.target.value)}>  
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label className="mt-1"> Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Confirm Password' value= {confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>  
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'  className =' my-2'> 
                    Register
                </Button>
            </Form>
            <Row classname='py-3'>
                <Col > Have an account? 
                <Link    to = {redirect? `login?redirect=${redirect}`: '/login' }>
                 Log In </Link>
                </Col>

            </Row>
            {message && <Message variant='danger' > {message} </Message> }
            {error && <Message variant='danger' > {error} </Message> }
            {loading && <Loader/> }
            
        </FormContainer>
    )
}

export default RegisterScreen
