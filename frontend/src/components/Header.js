import React from 'react';
import {Container, Navbar, Nav, Brand} from 'react-bootstrap';
import {LinkContainer } from 'react-router-bootstrap';
const Header = () => {
    return (
        <header>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <LinkContainer to='/'>
                         <Navbar.Brand >MARKET | SHOP</Navbar.Brand>
                    </LinkContainer>

                    <Nav className="ml-auto">
                        <LinkContainer to='/cart'>
                            <Nav.Link>
                                <i className='fa fa-shopping-cart px-2'></i>CART
                            </Nav.Link>
                        </LinkContainer>
                        
                        <LinkContainer to='/login'>
                            <Nav.Link>
                                <i className='fa fa-user px-2'></i>LOG IN
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                    </Container>
             </Navbar>

   


        </header>
    )
}

export default Header
