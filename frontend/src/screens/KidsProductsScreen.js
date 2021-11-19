import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Product from '../components/Product'
import {listProducts} from '../actions/productActions'

const KidsProductsScreen = () => {

    const productList = useSelector(state => state.productList)
    const {loading, error, products } = productList

    return (
        <div>
              { loading? <Loader/> : error ? <Message variant = 'danger'> {error} </Message> :
            <div>
                 <h4 className='my-3'>KIDS SHOES</h4>
                <Row>
                {products.map((product) => product.category === 'Kids' && (
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

export default KidsProductsScreen
