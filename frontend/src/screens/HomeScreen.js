import React,{useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Col, Row, Form, Button, FormGroup } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Product from '../components/Product'
import Slider from '../components/Slider'
import {listProducts} from '../actions/productActions'

///TODO CATEGORIES (When Clicked mareredirect) 
/// Featured Product or LOWEST PRICE or NEW ARRIVAL

const HomeScreen = ({history}) => {
    const dispatch   = useDispatch()
    const productList = useSelector(state => state.productList)
    const {loading, error, products } = productList
    const [searchTerm, setSearchTerm] = useState('') 

    const categ = [
        'Men', 'Women', 'Kids'
    ]

    const categoryHandler = (categ) =>{
        history.push(`/products/${categ}`)
    }
    
    //fetch data from api in backend
    useEffect(()=>{
        window.scrollTo(0, 0)
        dispatch(listProducts())
    },[dispatch])
    
    return (
         <div  className='mt-4' >
                <Row >
                    <Slider/>
                </Row>

               <Row  className='mx-0 px-0 no-gutters mt-3 '>
                   <Col lg={12} md={12} sm={12} xs={12}>
                       <Row>
                            <h4 className='my-2'>  CATEGORIES </h4>
                                { categ.map((c) => (
                                    <Col lg={4} className='item-center mt-3'>
                                        <button type="button" class="btn btn-outline-primary" value={c} style={{width:'150px'}} 
                                        onClick={(e) => categoryHandler(e.target.value)}>
                                            {c}
                                        </button>
                                    </Col>
                                ))
                                }
                       </Row>
                    </Col>
                </Row> 


                <Row  className='mx-0 px-0 no-gutters mt-3 '   >
                    <h4 className='my-2'> PRODUCTS </h4>
                </Row>
                
                
                <Row className='mx-0 px-0 no-gutters mt-3'>    
                        <Col lg={12} md={12} sm={12} xs={12}>
                            <Row>
                                <Col lg={11} md={11} sm={10} xs={10} className='mx-0 px-0 no-gutters'>
                                <FormGroup variant='dark' className='searchBar '>
                                    <Form.Control type='text' placeholder='Search...'  onChange={(e) =>{setSearchTerm(e.target.value)}}>  
                                    </Form.Control>
                                </FormGroup>
                                </Col>

                                <Col lg={1} md={1} sm={2} xs={2} className='mx-0 px-0 no-gutters'>
                                <Button className='searchIcon' > <i className='fa fa-search'></i> </Button>
                                </Col>
                            </Row>
                    </Col>
                </Row > 
           
                { loading? <Loader/> : error ? <Message variant = 'danger'> {error} </Message> :

                    <Row className='mx-0 px-0 no-gutters mt-3'>
                        
                        {   products.filter( (product) =>{
                                if(searchTerm ===''){
                                return  product
                                } else if(product.name.toLowerCase().includes(searchTerm.toLowerCase())){
                                    return (product)
                                }
                            }).map(product =>(
                                (<Col key={product._id} lg={4} xl={3} xs={12} sm={12} md={6} > 
                                    <Product product = {product}/> </Col> )  
                            )) 
                        }  
                    </Row> }
        </div>
        
    )
}

export default HomeScreen
