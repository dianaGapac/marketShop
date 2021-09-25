import React, {useState, useEffect} from 'react'
import {Form, Button, Row, Col, Table} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import {listMyOrders, getOrderDetails} from '../actions/orderActions'

const ProfileScreen = ({history, location}) => {

      //local state
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message,setMessage] = useState(null)



    const dispatch = useDispatch()
    
    //redux state
    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const myOrderList = useSelector(state => state.myOrderList)
    const {loading: loadingOrders, error:errorOrders, orders} =  myOrderList

    //To check if there is someone logged in
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const {success} = userUpdateProfile 

    const submitHandler =(e)=>{
        e.preventDefault()
      if(password !== confirmPassword)
      {
          setMessage('Passwod not Matched') 
      }
      else{
        //DISPATCh UPDATE  PROFILE
        dispatch(updateUserProfile({ id: user.id, name, email,password}))
    
      }
        
    
    }
    const getOrderHandler =(id)=>{
        dispatch(getOrderDetails(id))
        history.push(`/orders/${id}`)
    }

    useEffect (()=>{
        if(!userInfo){
            history.push('/login') 
        }
         else{
                if(!user.name){
                  dispatch(getUserDetails('profile'))
                  dispatch(listMyOrders())
                }
                 else{
         
                     setName(user.name)
                     setEmail(user.email)
                    }
            }
        }
    , [dispatch, history,userInfo, user,orders])

    return (
        <Row className= 'mt-5'> 
            <Col md={3}>
            <h4 > MY PROFILE  </h4>

            {message && <Message variant='danger' > {message} </Message> }
            {error && <Message variant='danger' > {error} </Message> }
            {success && <Message variant='success' > {"SUCCESSFULLY UPDATED PROFILE"} </Message> }
            {loading && <Loader/> }
            <Form onSubmit={submitHandler}>

            <Form.Group controlId='name'>
                    <Form.Label> Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter Name' value= {name} onChange={(e) => setName(e.target.value)}>  
                    </Form.Control>
                </Form.Group>

           
                <Form.Group controlId='email'>
                    <Form.Label> Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email' value= {email} onChange={(e) => setEmail(e.target.value)}>  
                    </Form.Control>
                </Form.Group>

              
                <Form.Group controlId='password'>
                    <Form.Label> Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' value= {password} onChange={(e) => setPassword(e.target.value)}>  
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label> Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Confirm Password' value= {confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>  
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'  className =' my-2'> 
                    UPDATE
                </Button>
            </Form>

            </Col>
            <Col md={9}>
                <h4> MY ORDERS</h4>
                { loadingOrders ? <Loader/>:
                errorOrders? <Message variant='danger'> {errorOrders}</Message> :
                (
                    <Table striped bordered hover reponsive className='table-sm'>
                        <thead>
                            <tr>
                                <th> ID </th>
                                <th> DATE </th>
                                <th> TOTAL </th>
                                <th> PAID </th>
                                <th> DELIVERED </th>
                                <th> </th>
                            </tr>
                        </thead> 
                        {orders? ( <tbody>
                            {orders.map( order =>( 
                                <tr key={order._id}>
                                    <td> {order._id} </td>
                                    <td> {order.createdAt.substring(0,10)} </td>
                                    <td> {order.totalPrice} </td>
                                    <td> {order.isPaid? order.paidAt.substring(0,10):
                                         <i className='fas fa-times' style={{color:'red'}}></i>} 
                                    </td>
                                     <td> {order.isDelivered? order.deliveredAt.substring(0,10):
                                        <i className='fas fa-times' style={{color:'red'}}></i>} 
                                   </td>
                                    <td> 
                                        
                                            <Button variant='light'  onClick={(e)=> getOrderHandler(order._id)}>
                                                Details
                                            </Button>
                    
                                        
                                    </td>

                                </tr>
                            ))}
                        </tbody>): <Message> NO ORDERS</Message>}
           
                     </Table>
                )
                 }
            </Col>
        </Row>
    )
}

export default ProfileScreen
