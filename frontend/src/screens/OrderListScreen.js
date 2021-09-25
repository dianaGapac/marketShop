import React, { useEffect} from 'react'
import {Button, Row, Col, Table} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails } from '../actions/userActions'
import {listOrders} from '../actions/orderActions'

const OrderListScreen = ({history, location}) => {


    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const {loading: loadingOrders, error:errorOrders, orders} =  orderList

    //To check if there is someone logged in
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    

    useEffect (()=>{

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
        <Row className= 'mt-5'> 
          
            <Col md={9}>
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
                                <th> </th>
                            </tr>
                        </thead> 
                        {orders? ( <tbody>
                            {orders.map( order =>( 
                                <tr key={order._id}>
                                    <td> {order._id} </td>
                                    <td> {order.createdAt.substring(0,10)} </td>
                                    <td> {order.user.name}</td>
                                    <td> {order.totalPrice} </td>
                                    <td> {order.isPaid? order.paidAt.substring(0,10):
                                         <i className='fas fa-times' style={{color:'red'}}></i>} 
                                    </td>
                                     <td> {order.isDelivered? order.deliveredAt.substring(0,10):
                                        <i className='fas fa-times' style={{color:'red'}}></i>} 
                                   </td>
                                    <td> 
                                        <LinkContainer to= {`/orders/${order._id}`}>
                                            <Button variant='light'>
                                                Details
                                            </Button>
                                        </LinkContainer>
                    
                                        
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
