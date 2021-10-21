import React from 'react'
import {Link} from 'react-router-dom'
import {Container, Navbar, Nav, NavDropdown,Row} from 'react-bootstrap'
import {LinkContainer } from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { logOut } from '../actions/userActions'
import Message from './Message'
import Loader from './Loader'
import Slider from './Slider'
import SearchBar from './SearchBar'


const Header = ({history}) => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state=> state.userLogin)
    const { userInfo } = userLogin

    const logOutHandler =()=>{
        dispatch(logOut())
    }
    

    return (
        <header>

            <Navbar  variant="light" className='nav-border '  style= {{backgroundColor:'white'}}>
                <Container>
                    <LinkContainer to='/'>
                         <Navbar.Brand >SNEAKY | SHOPPY</Navbar.Brand>
                    </LinkContainer>

                    <Nav className="ml-auto">

                    <LinkContainer to ='/productlist'>
                            <Nav.Link >
                              PRODUCTS
                            </Nav.Link>
                        </LinkContainer>

                        <LinkContainer to='/cart/:id'>
                            <Nav.Link >
                                <i className='fa fa-shopping-cart px-2'></i>CART
                            </Nav.Link>
                        </LinkContainer>


                        { userInfo && userInfo.isAdmin === 'true'&& (
                                <NavDropdown title ="ADMIN" id='adminmenu'> 
                                <LinkContainer to='/admin/userList'>
                                    <NavDropdown.Item>
                                       Users
                                    </NavDropdown.Item>
                                 </LinkContainer>

                                 <LinkContainer to='/admin/productList'>
                                    <NavDropdown.Item>
                                       Products
                                    </NavDropdown.Item>
                                 </LinkContainer>

                                 <LinkContainer to='/admin/orderList'>
                                    <NavDropdown.Item>
                                       Orders
                                    </NavDropdown.Item>
                                 </LinkContainer>


                            </NavDropdown>

                            )}
                        { userInfo? (
                            <NavDropdown title ={userInfo.name}  id='username'> 
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>
                                        Profile
                                    </NavDropdown.Item>
                                 </LinkContainer>
                              
                                <NavDropdown.Item onClick={logOutHandler}> 
                                <Link to='/login'>  Log Out </Link>
                                 </NavDropdown.Item>
                                
                               
                            </NavDropdown>

                        ): <LinkContainer to={'/login'} >
                             <Nav.Link>
                             <i className='fa fa-user px-2'></i>LOG IN
                             </Nav.Link>
                          </LinkContainer>}

                     
                        
                    </Nav>
                    </Container>
             </Navbar>

       
         


        </header>
    )
}

export default Header
