import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {Container, Navbar, Nav, NavDropdown,Row, Button, Image} from 'react-bootstrap'
import {LinkContainer } from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { logOut } from '../actions/userActions'



const Header = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state=> state.userLogin)
    const { userInfo } = userLogin

    const [clicked,setClicked] = useState(false)
    const [categActive, setCategActive] = useState(false)
    const [profileActive, setProfileActive] = useState(false)
    const [cartActive,setCartActive] = useState(false)

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

    const setActive = (name) =>{
        if(name === 'categ'){
            setCategActive(true)
            setProfileActive(false)
            setCartActive(false)
        }else if( name === 'cart'){
            setCategActive(false)
            setProfileActive(false)
            setCartActive(true)
        } else if(name==='profile' ){
            setCategActive(false)
            setProfileActive(true)
            setCartActive(false)
        } else{
            setCategActive(false)
            setProfileActive(false)
            setCartActive(false)
        }
    }
    return (
        <header>
            <Navbar sticky='top' variant= {clicked?"dark": "light"} className='nav-border' style= {{backgroundColor:'white'}}>
                <Container>
                    <LinkContainer   to='/'>
                          <Navbar.Brand> 
                              <img
                                src="/logo.png"
                                width="115"
                                className="d-inline-block align-top"
                                alt="Sneaky logo"
                            />
                            
                          </Navbar.Brand>
                          
                         
                    </LinkContainer>

                    <div className='menu-icon' onClick={menuClickHandler}>
                        <Button >  
                            <i className ={clicked? 'fas fa-times': 'fas fa-bars' }></i>
                        </Button>
                    </div>

                    <Nav style={{color:'black'}} className={clicked? 'nav-menu-mobile': 'nav-menu'} > 
                            
                        <NavDropdown className={categActive? "nav-item-container active" : "nav-item-container" }  title="CATEGORY" id='category' >
                           <LinkContainer name='categ' onClick={(e)=> setActive('categ')} to ='/productlist'>
                                <NavDropdown.Item >
                                      <p className="nav-item-link" > All Products </p> 
                                 </NavDropdown.Item>
                            </LinkContainer>

                            <LinkContainer  name='categ' onClick={(e)=> setActive('categ')} to ='/products/Men'>
                                <NavDropdown.Item > <p className="nav-item-link" > Men </p> </NavDropdown.Item>
                            </LinkContainer>

                            <LinkContainer name='categ' onClick={(e)=> setActive('categ')} to ='/products/Women'>
                                <NavDropdown.Item >  <p className="nav-item-link" > Women  </p> </NavDropdown.Item>
                            </LinkContainer>

                            <LinkContainer  name='categ' onClick={(e)=> setActive('categ')} to ='/products/Kids'>
                                <NavDropdown.Item >  <p className="nav-item-link" > Kids </p> </NavDropdown.Item>
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
                    
                        <NavDropdown className={clicked?"nav-item-container":''} title ={userInfo.name}  id='username'> 
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
                                <LinkContainer  name='cart' className={cartActive? "nav-item-container active":"nav-item-container"} 
                                  onClick={(e)=> setActive('cart')}
                                     to='/cart/:id'>
                                    <Nav.Link > <i className='fa fa-shopping-cart px-2'></i>  CART </Nav.Link>
                                </LinkContainer>

                          <NavDropdown name = 'profile' className={profileActive?"nav-item-container active":"nav-item-container"}title ={userInfo.name}  id='username'> 
                              <LinkContainer  name= 'profile' onClick={(e)=> setActive('profile')} to='/profile'>
                                    <NavDropdown.Item  >
                                    <p className="nav-item-link" > Profile </p>
                                    </NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer  name= 'profile' onClick={(e)=> setActive('profile')} to='/myorders'>
                                    <NavDropdown.Item>
                                    <p className="nav-item-link" > My Orders </p>
                                    </NavDropdown.Item>
                                </LinkContainer>
                            
                                <NavDropdown.Item onClick={logOutHandler}> 
                                    <Link to='/login'>  <p className="nav-item-link" > Log Out </p> </Link>
                                </NavDropdown.Item>
            
                            </NavDropdown>
                        </>
                        )}

                        { !userInfo && (
                        <>
                            <LinkContainer className={clicked?"nav-item-container":''}  to='/cart/:id'>
                                <Nav.Link >
                                    <i className='fa fa-shopping-cart px-2'></i>  CART
                                </Nav.Link>
                            </LinkContainer>

                            <LinkContainer  className={clicked?"nav-item-container":''}  to={'/login'}  >
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
