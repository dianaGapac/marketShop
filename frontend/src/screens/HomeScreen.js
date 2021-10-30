import React,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Col, Row,Card, Container } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Product from '../components/Product'
import Slider from '../components/Slider'
import Categories from '../components/Categories'
import SearchBar from '../components/SearchBar'

import {listProducts} from '../actions/productActions'


///TODO CATEGORIES (When Clicked mareredirect) 
/// Featured Product or LOWEST PRICE or NEW ARRIVAL


const HomeScreen = (location) => {

    const dispatch   = useDispatch()
   
    const productList = useSelector(state => state.productList)
    const {loading, error, products } = productList

    const categ = [
        'Men', 'Women', 'Kids'
    ]



    //fetch data from api in backend
    useEffect(()=>{

        dispatch(listProducts())
    
        
    },[dispatch])
    
    return (

        <div >
                   
        <Container className='mt-5' style={{backgroundColor:''}} >

            <Row className='mt-3' style= {{backgroundColor:''}}>
                 <Slider/>
            
            </Row>
            <Row  className='mt-3 mx-o px-0'>
              <SearchBar/>
            </Row>

            <Row  className='mx-0 px-0 no-gutters mt-3 '   >
             <h4 className='my-2'>  CATEGORIES </h4>
                { categ.map((c) => (
                    <Col lg={4} className='item-center mt-3'>
                         <Categories category = {c} />
                    </Col>
                ))
                }
            </Row>

            <Row className='mt-4'>
                <h4> FEATURED PRODUCTS </h4>
                <Col>

                </Col>
            

            </Row>

        </Container>
        
        </div>
    )
}

export default HomeScreen
