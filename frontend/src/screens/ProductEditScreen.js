import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer  from '../components/FormContainer'
import {listProductDetails} from '../actions/productActions' 



const ProductEditScreen = ({match,history}) => {
    const productId = match.params.id
    

      //local state
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image,setImage] = useState('')
    const [brand,setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock,setCountInStock] = useState(0)
    const [description,setDescription] = useState('')
    

    const productDetails = useSelector(state=> state.productDetails)
    const {loading, error, product} = productDetails

   // const userUpdate = useSelector(state=> state.userUpdate)
    //const {loading:loadingUpdate, error:errorUpdate, success:successUpdate} = userUpdate



    const dispatch = useDispatch()

    const submitHandler =(e)=>{
        e.preventDefault()
        //upadteProduct
    }

    useEffect (()=>{

            if(!product.name || product._id !== productId){
                dispatch(listProductDetails(productId))
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
            else{
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
                }

    }, [dispatch, product,productId,history])

    return (
        <>
         <Link to="/admin/productlist" className='btn btn-light my-3'>  GO BACK</Link>
            
         <FormContainer >
           <h4 > <strong> EDIT PRODUCT </strong></h4>

           {loading? <Loader/> : error? <Message variant='danger'> {error} </Message> :
            (
                <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                        <Form.Label> Name</Form.Label>
                        <Form.Control type='text' placeholder={name} value= {name} onChange={(e) => setName(e.target.value)}>  
                        </Form.Control>
                    </Form.Group>
    
               
                    <Form.Group controlId='price'> 
                        <Form.Label> Price</Form.Label>
                        <Form.Control type='number' placeholder={price} value= {price} onChange={(e) => setPrice(e.target.value)}>  
                        </Form.Control>
                    </Form.Group>

                    
                    <Form.Group controlId='price'> 
                        <Form.Label> Price</Form.Label>
                        <Form.Control type='number' placeholder={price} value= {price} onChange={(e) => setPrice(e.target.value)}>  
                        </Form.Control>
                    </Form.Group>
                    
                    
                    <Form.Group controlId='image'> 
                        <Form.Label> Image</Form.Label>
                        <Form.Control type='text' placeholder={image} value= {image} onChange={(e) => setImage(e.target.value)}>  
                        </Form.Control>
                    </Form.Group>

                    
                    <Form.Group controlId='brand'> 
                        <Form.Label> Brand</Form.Label>
                        <Form.Control type='text' placeholder={brand} value= {brand} onChange={(e) => setBrand(e.target.value)}>  
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='countInStock'> 
                        <Form.Label> Count In Stock</Form.Label>
                        <Form.Control type='number' placeholder={countInStock} value= {countInStock} onChange={(e) => setCountInStock(e.target.value)}>  
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='category'> 
                        <Form.Label> Category</Form.Label>
                        <Form.Control type='text' placeholder={category} value= {category} onChange={(e) => setCategory(e.target.value)}>  
                        </Form.Control>
                    </Form.Group>

                     
                    <Form.Group controlId='description'> 
                        <Form.Label> Description</Form.Label>
                        <Form.Control type='text' placeholder={description} value= {description} onChange={(e) => setDescription(e.target.value)}>  
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'  className =' my-2'> 
                        Update
                    </Button>
                </Form>
                
            )}
            
        </FormContainer>

        </>

       
    )
}


export default ProductEditScreen
