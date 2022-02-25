import React, {useState, useEffect} from 'react'
import { Button, Row, Col, Table, ListGroup, Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails } from '../actions/userActions'
import {listMyOrders, getOrderDetails} from '../actions/orderActions'

const MyOrderScreen = ({history}) => {

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

    const [isDesktop, setDesktop] = useState(window.innerWidth > 1000);

    const updateMedia = () => {
        setDesktop(window.innerWidth > 1000);
      };
    
        
    const getOrderHandler =(id)=>{
        dispatch(getOrderDetails(id))
        history.push(`/orders/${id}`)
    }

    useEffect (()=>{
        window.scrollTo(0, 0)
        window.addEventListener("resize", updateMedia);
        window.removeEventListener("resize", updateMedia)

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
                <div>
                    {isDesktop ? (
                        <div>
                            {orders?
                            (<div> 
                                {orders.length === 0?  (<Message variant='primary' >
                                 No ORDERS YET. CLICK<Link to='/'> here </Link> TO SHOP
                            </Message>): 
                                (
                                 <Row>
                                    <h4 className='mt-2'> MY ORDERS</h4>
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
                                                            <Button variant='dark'  onClick={(e)=> getOrderHandler(order._id)}>
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
                                )}
                            </div>): <Loader/>
                          }

                        </div>
                    ) : 
                    (
                        <div>
                            {orders?(
                                <div> 
                                {orders.length === 0?  (<Message variant='primary' >
                                    No ORDERS YET. CLICK<Link to='/'> here </Link> TO SHOP
                                </Message>): (
                                    <div>
                                        <h4 className='mt-2 '> MY ORDERS</h4>
                                        { loadingOrders ? <Loader/>:
                                            errorOrders? <Message variant='danger'> {errorOrders}</Message> :
                                            (
                                                <Row className='mx-auto'>
                                                    {orders? (
                                                        orders.map(order=>(
                                                            <ListGroup  variant='flush' key={order._id}> 
                                                                <ListGroup.Item>
                                                                    <Row>
                                                                        <p>{order.orderItems[0]._id} </p>
                                                                    </Row>
                                                                <Row>
                                                                    <Col xs={3} sm={3} md={1}>
                                                                        <Image src={order.orderItems[0].image} alt={order.orderItems[0].name} fluid rounded />
                                                                    </Col>
                                                                    <Col>
                                                                        <Link to={`/product/${order.orderItems[0].product}`} >
                                                                            {order.orderItems[0].name}
                                                                        </Link>
                                                                        <p>x{order.orderItems[0].qty}</p>
                                                                    </Col>
                                                                </Row>
                                                            
                                                                </ListGroup.Item>
                
                                                                <ListGroup.Item>
                                                                    <Row>
                                                                        <Col sm={8} xs={8} >
                                                                            {order.orderItems.length>1 && (
                                                                                <div>
                                                                                    <p>{order.orderItems.length - 1} more product/s</p>
                                                                                </div>
                                                                            )}
                                                                        </Col>
                                                                        <Col sm={4} xs={4}>
                                                                            <Button variant='dark'  onClick={(e)=> getOrderHandler(order._id)}>
                                                                                    Details
                                                                            </Button>
                                                                        </Col>
                                                                    </Row>
                                                                </ListGroup.Item>
                                                            </ListGroup>
                
                                                        ))
                                                    )
                                                    
                                                    : ''}    
                                                    
                                                </Row>
                                            )
                                        }

                                    </div>
                                    
                                ) }
                                </div>
                            ): <Loader/> }
                        </div>
                    )
                 }

              </div>
        </div>
    )}
                                    

export default MyOrderScreen
