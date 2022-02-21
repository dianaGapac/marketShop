import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {Container, Navbar, Nav, NavDropdown,Row, Button} from 'react-bootstrap'
import {LinkContainer } from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { logOut } from '../actions/userActions'


const Header = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state=> state.userLogin)
    const { userInfo } = userLogin

    const [clicked,setClicked] = useState(false)

    const logOutHandler =()=>{
        dispatch(logOut())
        window.location.reload()
    }
    
    const menuClickHandler =()=> {
        if(!clicked){
            setClicked(true)
        }
        else{
            setClicked(false)
        }
    }
    return (
        <header>
        
            <Navbar sticky='top' variant="light" className='nav-border ' style= {{backgroundColor:'white'}}>
                <Container>
                    <LinkContainer to='/'>
                         <Navbar.Brand >SNEAKY | SHOPPY</Navbar.Brand>
                    </LinkContainer>

                    <div className='menu-icon' onClick={menuClickHandler}>
                        <Button >  
                            <i className ={clicked? 'fas fa-times': 'fas fa-bars' }></i>
                        </Button>
                    </div>

                    <Nav className={clicked? 'nav-menu-mobile': 'nav-menu'} >
                            
                        <NavDropdown className='nav-item' title="CATEGORY" id='category' >
                            <LinkContainer to ='/productlist'>
                                <NavDropdown.Item > All Products </NavDropdown.Item>
                            </LinkContainer>

                            <LinkContainer to ='/products/Men'>
                                <NavDropdown.Item > Men </NavDropdown.Item>
                            </LinkContainer>

                            <LinkContainer to ='/products/Women'>
                                <NavDropdown.Item > Women </NavDropdown.Item>
                            </LinkContainer>

                            <LinkContainer to ='/products/Kids'>
                                <NavDropdown.Item > Kids </NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>

                   { userInfo && userInfo.isAdmin === 'true'&& (
                            <>
                        <NavDropdown  className='nav-item' title ="ADMIN" id='adminmenu'> 
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
                    
                        <NavDropdown className='nav-item'  title ={userInfo.name}  id='username'> 
                            <LinkContainer to='/profile'>
                                <NavDropdown.Item>
                                    Profile
                                </NavDropdown.Item>
                            </LinkContainer>
                            
                                <NavDropdown.Item onClick={logOutHandler}> 
                                    <Link to='/login'>  Log Out </Link>
                                </NavDropdown.Item>
                            
                          </NavDropdown>
                        </>
                        )}

                    { userInfo  && userInfo.isAdmin === 'false' && (
                        <>
                                <LinkContainer className='nav-item' to='/cart/:id'>
                                    <Nav.Link > <i className='fa fa-shopping-cart px-2'></i>  CART </Nav.Link>
                                </LinkContainer>

                          <NavDropdown className='nav-item' title ={userInfo.name}  id='username'> 
                              <LinkContainer to='/profile'>
                                    <NavDropdown.Item>
                                        Profile
                                    </NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to='/myorders'>
                                    <NavDropdown.Item>
                                        My Orders
                                    </NavDropdown.Item>
                                </LinkContainer>
                            
                                <NavDropdown.Item onClick={logOutHandler}> 
                                    <Link to='/login'>  Log Out </Link>
                                </NavDropdown.Item>
            
                            </NavDropdown>
                        </>
                        )}

                        { !userInfo && (
                        <>
                            <LinkContainer className='nav-item'  to='/cart/:id'>
                                <Nav.Link >
                                    <i className='fa fa-shopping-cart px-2'></i>  CART
                                </Nav.Link>
                            </LinkContainer>

                            <LinkContainer  className='nav-item'  to={'/login'}  >
                                <Nav.Link >
                                    <i className='fa fa-user px-2'></i>LOG IN
                                </Nav.Link>
                            </LinkContainer>
                        </> )}
                    </Nav>
              

                </Container>
         </Navbar>

       
      </header>
    )
}

export default Header
