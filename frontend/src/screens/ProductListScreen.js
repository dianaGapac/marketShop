import React, { useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts, deleteProduct, createProduct} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'



const ProductListScreen = ({history}) => {
    const dispatch = useDispatch()

    const productDelete = useSelector(state => state.productDelete)
    const {loading: loadingDelete, error:errorDelete, success: successDelete} = productDelete

    const productList = useSelector(state => state.productList)
    const {loading, error, products} = productList

    const productCreate = useSelector(state => state.productCreate)
    const {loading: loadingCreate, error: errorCreate, success: successCreate, product} = productCreate

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin


    const deleteHandler =(id)=>{ 
        if(window.confirm('Are you sure to delete this User?')){
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler =()=>{
        dispatch(createProduct())
    }
    useEffect(()=>{
        window.scrollTo(0, 0)
        if( userInfo && userInfo.isAdmin === 'true') {
            dispatch(listProducts())

                if(product) {
                    history.push(`/admin/product/${product._id}/edit`)

                    if(successCreate){
                    dispatch({type: PRODUCT_CREATE_RESET}) }
                }
        }
        else{
            history.push('/login')
            window.location.reload(false)
        }

       

    }, [dispatch, history, userInfo, successDelete, successCreate, product])
        return ( 

        <div className='mt-0'>

        <Row className='align-items-center'>
            <Col>
                <h4> PRODUCTS </h4>
            </Col>
            <Col> </Col>
            <Col> </Col>
            <Col> </Col>

            <Col className='mr-0'>
            <Button className='my-3' onClick={createProductHandler}> 
                <i className='fas fa-plus' ></i> CREATE PRODUCT
            </Button>
            </Col> 
        </Row>
        {loadingDelete && <Loader/>} 
        {errorDelete && <Message variant='danger'> {errorDelete} </Message>}

             {loading? <Loader/> : error? <Message variant='danger'> {error} </Message>
             :( 
                 <Table striped bordered hover responsive className='table-sm'> 
                    <thead>
                        <tr>
                            <th> ID </th>
                            <th> NAME</th>
                            <th> PRICE </th>
                            <th> CATEGORY</th>
                            <th> BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key= {product._id}>
                                <td> {product._id} </td>
                                <td> {product.name} </td>
                                <td>  &#x20B1; {product.price.toLocaleString()}</td>
                                <td> {product.category}</td>
                                <td> {product.brand}</td>
                                <td>
                                 <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                     <Button variant='light' className='btn-sm' alt='Edit'> 
                                      <i className= 'fas fa-edit'> </i>
                                     </Button>
                                </LinkContainer> 

                                    <Button variant='dark' className='btn-sm mx-2' onClick={()=> deleteHandler(product._id)}>  
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>   
                        ))}
                    </tbody>

                 </Table>
             )

             }   
        </div>
    )
}

export default ProductListScreen
