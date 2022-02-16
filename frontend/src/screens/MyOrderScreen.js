import React, {useState, useEffect} from 'react'
import { Button, Row, Col, Table} from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import {listMyOrders, getOrderDetails} from '../actions/orderActions'

const MyOrderScreen = ({history, location}) => {

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
        <div>

             <Row>
                    <h4 className='mt-4'> MY ORDERS</h4>
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
                                    <th> RECEIVED </th>
                                    <th> </th>
                                </tr>
                            </thead> 
                            {orders? ( <tbody>
                                {orders.map( order =>( 
                                    <tr key={order._id}>
                                        <td> {order._id} </td>
                                        <td> {order.createdAt.substring(0,10)} </td>
                                        <td >&#x20B1; {order.totalPrice.toLocaleString()} </td>
                                        <td> {order.isPaid? order.paidAt.substring(0,10):
                                             <i className='fas fa-times' style={{color:'red'}}></i>} 
                                        </td>
                                         <td> {order.isDelivered? order.deliveredAt.substring(0,10):
                                            <i className='fas fa-times' style={{color:'red'}}></i>} 
                                       </td>
                                       <td> {order.isReceived? <ic className= 'fas fa-check' > </ic>:
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
                </Row>
 
        </div>
    )
}

export default MyOrderScreen
