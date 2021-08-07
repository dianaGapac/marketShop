import React, {  } from 'react'
import {Container, Row, Col} from 'react-bootstrap'

const FormContainer = ({children}) => {
    return (
        <Container>
            <Row className='justify-content-md-float-right my-5'>
                <Col xs={12} md={6}  >
                       {children}
                </Col>
            </Row>
            
        </Container>
    )
}

export default FormContainer
