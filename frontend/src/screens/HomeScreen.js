import React,{useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Col, Row,Card, Container, Form, Button, FormGroup } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Product from '../components/Product'
import Slider from '../components/Slider'
import Categories from '../components/Categories'
import SearchBar from '../components/SearchBar'
import {listProducts} from '../actions/productActions'
import { PRODUCT_DELETE_SUCCESS } from '../constants/productConstants'


///TODO CATEGORIES (When Clicked mareredirect) 
/// Featured Product or LOWEST PRICE or NEW ARRIVAL


const HomeScreen = ({location, history}) => {

    const dispatch   = useDispatch()
    const productList = useSelector(state => state.productList)
    const {loading, error, products } = productList
    const [searchTerm, setSearchTerm] = useState('') 
    const [searchResult, setSearchResult] = useState([])

    const categ = [
        'Men', 'Women', 'Kids'
    ]

    const categoryHandler = (categ) =>{
        history.push(`/products/${categ}`)
    }

    

    //fetch data from api in backend
    useEffect(()=>{
        
        dispatch(listProducts())

    },[dispatch])
    
    return (
          
         <Container className='mt-5' style={{backgroundColor:''}} >
                <Row className='mt-3' style= {{backgroundColor:''}}>
                    <Slider/>
                </Row>

               <Row  className='mx-0 px-0 no-gutters mt-3 '   >
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


              <Row  className='mx-0 px-0 no-gutters mt-3 '   >
                 <h4 className='my-2'> PRODUCTS </h4>
               </Row>
                
                <Row className='mx-3 px-0 no-gutters'>
                    
                <Col lg={11} className='mx-0 px-0 no-gutters'>
                  <FormGroup variant='dark' className='searchBar '>
                     <Form.Control type='text' placeholder='Search...'  onChange={(e) =>{setSearchTerm(e.target.value)}}>  
                     </Form.Control>
                    </FormGroup>
                </Col>

                <Col lg={1}  className='mx-0 px-0 no-gutters'>
                 <Button className='searchIcon' > <i className='fa fa-search'></i> </Button>
                </Col>

                </Row >
            

              
                { loading? <Loader/> : error ? <Message variant = 'danger'> {error} </Message> :

                <Row className='mx-0 px-0 no-gutters mt-3'>
                
                {  
                  products.filter( (product) =>{
                    if(searchTerm ===''){
                      return  product
                    }
                     else if(product.name.toLowerCase().includes(searchTerm.toLowerCase())){
                        return (product)
                      
                    }

                    
                }).map(product =>(

                     (<Col key={product._id} sm={12} md={6} lg={4} xl={3}> 
                        <Product product = {product}/> </Col> )  
                       
                )) 
                

                  
               }          

                </Row> }

             
            
                {/* <Row className='mx-0 px-0 no-gutters mt-3 '>
                    <h4 className='my-2'>  ALL PRODUCTS </h4>
                    <div>
                        { loading? <Loader/> : error ? <Message variant = 'danger'> {error} </Message> :
                            <div>
                                <Row>
                                    {products.map(product =>(
                                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}> 
                                            <Product product = {product}/>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        }
                     </div>

                    </Row> */}

        </Container>
    )
}

export default HomeScreen
