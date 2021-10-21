import React, {  } from 'react'
import {Container, Row, Col} from 'react-bootstrap'

const FormContainer = ({children}) => {
    return (
        <Container>
            <Row className='justify-content-center my-3'>
                <Col xs={12} md={6} className=''  >
                       {children}
                </Col>
            </Row>
            
        </Container>
    )
}

export default FormContainer
