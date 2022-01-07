import React from 'react'
import { Button, Card, FormGroup, Row,Col, Form } from 'react-bootstrap'

const SearchBar = () => {
    return (
        <div>
            <Row className='mx-4 px-0 no-gutters'>
                <Col lg={11} className='mx-0 px-0 no-gutters'>
                  <FormGroup variant='dark' className='searchBar '>
                     <Form.Control type='text' placeholder='Search...' >  
                 
                     </Form.Control>
                     
                    </FormGroup>
                </Col>
                <Col lg={1}  className='mx-0 px-0 no-gutters'>
                 <Button className='searchIcon'> <i className='fa fa-search'></i> </Button>
                </Col>

            </Row>
         
        </div>
    )
}

export default SearchBar
