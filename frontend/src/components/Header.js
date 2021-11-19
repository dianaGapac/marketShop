import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {Container, Navbar, Nav, NavDropdown,Row, Button} from 'react-bootstrap'
import {LinkContainer } from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { logOut } from '../actions/userActions'
import Message from './Message'
import Loader from './Loader'
import Slider from './Slider'
import SearchBar from './SearchBar'


const Header = ({history, location}) => {
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

            <Navbar  variant="light" className='nav-border '  style= {{backgroundColor:'white'}}>
                <Container>
                    <LinkContainer to='/'>
                         <Navbar.Brand >SNEAKY | SHOPPY</Navbar.Brand>
                    </LinkContainer>

                    <Button className='menu-icon' onClick={menuClickHandler}>  
                        <i className ={clicked? 'fas fa-times': 'fas fa-bars' }></i>
                    </Button>

                    {console.log(clicked)}

                    <Nav className="ml-auto">

 
                   <NavDropdown title="CATEGORY" id='category' >
                   <LinkContainer to ='/productlist'>
                            <NavDropdown.Item >
                              ALL PRODUCTS
                            </NavDropdown.Item>
                    </LinkContainer>
                   <LinkContainer to ='/products/Men'>
                            <NavDropdown.Item >
                              MEN
                            </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to ='/products/Women'>
                            <NavDropdown.Item >
                              WOMEN
                            </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to ='/products/Kids'>
                            <NavDropdown.Item >
                              KIDS
                            </NavDropdown.Item>
                    </LinkContainer>

                    </NavDropdown>

                   

                        { userInfo && userInfo.isAdmin === 'true'&& (
                            <>
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
                            </>
                            )}
                        { userInfo  && userInfo.isAdmin === 'false' && (
                            <>
                                <LinkContainer to='/cart/:id'>
                                <Nav.Link >
                                    <i className='fa fa-shopping-cart px-2'></i>CART
                                </Nav.Link>
                                 </LinkContainer>

                            <NavDropdown title ={userInfo.name}  id='username'> 
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
                        <LinkContainer to='/cart/:id'>
                            <Nav.Link >
                                <i className='fa fa-shopping-cart px-2'></i>CART
                            </Nav.Link>
                         </LinkContainer>

                        <LinkContainer to={'/login'}  >
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
