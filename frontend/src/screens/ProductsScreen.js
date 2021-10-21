import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product';
import {listProducts} from '../actions/productActions';

//TODO' Display All Products by Category 
//MEN. WOMEN. KIDS.


const ProductsScreen = () => {

    const dispatch   = useDispatch()
    const productList = useSelector(state => state.productList)
    const {loading, error, products } = productList

    //fetch data from api in backend
    useEffect(()=>{

        dispatch(listProducts())
        
    },[dispatch])
    
    return (
        <div>
            { loading? <Loader/> : error ? <Message variant = 'danger'> {error} </Message> :
            <div>
                 <h4 className='my-3'>LATEST PRODUCTS</h4>
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
    )
}

export default ProductsScreen
