import React, { useEffect} from 'react'
import {Button, Row, Col, Table} from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listOrders,getOrderDetails} from '../actions/orderActions'

const OrderListScreen = ({history, location}) => {
    const dispatch = useDispatch()
    const orderList = useSelector(state => state.orderList)
    const {loading: loadingOrders, error:errorOrders, orders} =  orderList

    //To check if there is someone logged in
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    
    const getOrderHandler =(id)=>{
        dispatch(getOrderDetails(id))
        history.push(`/orders/${id}`)
    }
    useEffect (()=>{

        window.scrollTo(0, 0)
    
        if( userInfo && userInfo.isAdmin === 'true') {
            dispatch(listOrders())
     
        }
        else{
            history.push('/login')
            window.location.reload(false)
        }
    }
    , [dispatch, history,userInfo])

    return (
        <Row className= 'mt-4'> 
            <Col md={9} lg={12}>
                <h4>ORDERS</h4>
                { loadingOrders ? <Loader/>:
                errorOrders? <Message variant='danger'> {errorOrders}</Message> :
                (
                    <Table striped bordered hover reponsive className='table-sm'>
                        <thead>
                            <tr>
                                <th> ID </th>
                                <th> DATE </th>
                                <th> NAME </th>
                                <th> TOTAL </th>
                                <th> PAID </th>
                                <th> DELIVERED </th>
                                <th> RECEIVED</th>
                                <th> </th>
                            </tr>
                        </thead> 
                        {orders? ( <tbody>
                            {orders.map( order =>( 
                                <tr key={order._id}>
                                    <td> {order._id} </td>
                                    <td> {order.createdAt.substring(0,10)} </td>
                                    <td> {order.user.name}</td>
                                    <td>  &#x20B1; {order.totalPrice.toLocaleString()} </td>
                                    <td> {order.isPaid? order.paidAt.substring(0,10):
                                         <i className='fas fa-times' style={{color:'red'}}></i>} 
                                    </td>
                                     <td> {order.isDelivered? order.deliveredAt.substring(0,10):
                                        <i className='fas fa-times' style={{color:'red'}}></i>} 
                                   </td>
                                   <td> {order.isReceived?  <i className='fas fa-check'></i> :
                                        <i className='fas fa-times' style={{color:'red'}}></i>} 
                                   </td>
                                    <td> 
                                         <Button variant='primary' onClick={(e)=> getOrderHandler(order._id)}>
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

export default OrderListScreen
