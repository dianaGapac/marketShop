import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Product from '../components/Product'


const MenProductsScreen = () => {

    const productList = useSelector(state => state.productList)
    const {loading, error, products } = productList

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <div>
            { loading? <Loader/> : error ? <Message variant = 'danger'> {error} </Message> :
            <div>
                 <h4 className='my-3'>MEN SHOES</h4>
                <Row>
                {products.map((product) => product.category === 'Men' && (
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

export default MenProductsScreen
