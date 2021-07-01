import React from 'react';
import {Container, Navbar, Nav, Brand} from 'react-bootstrap';
const Header = () => {
    return (
        <header>
            <Navbar bg="primary" variant="dark">
                <Container>
                <Navbar.Brand href="#home">MARKET | SHOP</Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link href="/cart">
                            <i className='fa fa-shopping-cart px-2'></i>CART
                        </Nav.Link>
                        <Nav.Link href="/signin">
                            <i className='fa fa-user px-2'></i>SIGN IN
                        </Nav.Link>
                    </Nav>
                    </Container>
             </Navbar>

   


        </header>
    )
}

export default Header
