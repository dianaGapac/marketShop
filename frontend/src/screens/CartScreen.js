import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, Card, ListGroup, Image, Form, Button, ListGroupItem,InputGroup} from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart ,passSelectedItem } from '../actions/cartActions'

const CartScreen = ({match, location, history}) => {

    //to trigger addtocart dispatch
    var productId = match.params.id 
    var qty = location.search? Number(location.search.split('=')[1]) : 1 

    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart) //to getthe value of states available
    const { cartItems} = cart //get states needed
    const [selectedItems, setSelectedItems] = useState([])  //temporary state for selected


    //add selected item to selectedItems
    const addSelected =(id,op)=>{

        const item = cartItems.find( x => x.product === id)
        const alreadySelectedItem =  selectedItems.find((x) => x.product === id) 

        if(alreadySelectedItem )
        {
            if(  op ==='add')
                 { item.qty = item.qty+1 }
            else
                 { item.qty = item.qty-1 }

            return ( setSelectedItems( selectedItems.map( (x) => x.product === alreadySelectedItem.product ?item: x ))
             )

        }else{
            console.log('new select')
            return ( setSelectedItems( [...selectedItems, item]))
        }

    }
    //deselect from selectedItems
    const removeSelected =(id)=> {
        return(setSelectedItems( selectedItems.filter( x=> x.product != id) ))
    }
    //handle select and deselect
    const selectHandler =(id, qty,checked)=>{

        if(checked){
            addSelected(id,qty) }
        else
        {  console.log('deselect')
            removeSelected(id)
        }


    }

    // change on quanty input handler 
    const onChangeHandler =(id, qty, stock)=>{
         qty < stock ? dispatch(addToCart(id,qty) 
         ) : dispatch(addToCart(id,stock))
    }
    //delete button handler
    const removeFromCartHandler = (id)=> {
        console.log('REMOVE')
         dispatch(removeFromCart(id))
    }

    // checkout
    const checkOutHandler =()=>{
        history.push('/login?redirect=shipping')
          dispatch(passSelectedItem(selectedItems))

          console.log('trigger passed')
          console.log(selectedItems)
          

    }
    // add and minus button handler
    const addAddToCart =(id,qty,op)=>{

        //trigger add to cart first
        dispatch(addToCart(id,qty))

        var checked = false

        //check if item selected already
        const selected = selectedItems.find(x => x.product === id)
        //if selected pass on the operation
        if(selected){
            checked = true
         return(addSelected(id,op)) 
             
        }
    }

   
    useEffect(() =>{
        if(productId){
            dispatch(addToCart(productId,qty))
            productId = null
            qty =null
        }
    }, [dispatch])

    return (
        <Row className='my-3'>
            <Col md={9}>
                <h4 className= 'my-3'> SHOPPING CART</h4>
                {cartItems.length === 0? (<Message variant='primary'>
                    Your Cart is EMPTY. Click <Link to='/'> here </Link> to SHOP
                </Message>) : 
                (
                <div>
                    <Row className='cartHeader '>
                        <Col md={1}>
                        </Col>
                        <Col md={2}>
                        </Col>
                        <Col md={2}> 
                             Name 
                        </Col>
                        <Col md={1}> 
                            Price
                        </Col>
                        <Col md={3}> 
                             Quantity
                        </Col>
                        <Col md={2}> 
                           Subtotal
                         </Col>
                        <Col md={1}> 
                          Delete
                        </Col>
                    </Row>

                    <Row className='my-3'>
                    <Col>
                    <ListGroup variant = 'flush'>
                        {cartItems.map( item => (
                            <ListGroup.Item key ={item.product}> 
                                <Row className='text-center'>
                                    <Col md={1}> 
                                     <input type="checkbox" onChange={(e) => selectHandler(item.product, item.qty, e.target.checked)} /> 
                                     </Col>
                                     
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name}  fluid rounded height={100}/>
                                    </Col>

                                    <Col md={2}>
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>
                                    </Col>

                                    <Col md={1}>
                                     <strong> $ {item.price} </strong> 
                                    </Col>
                                    
                                    <Col md={3} >
                                      <InputGroup  >   
                                        <Row className='p-0 m-0 '>
                                         
                                        <Col className='p-0 m-0'>
                                          <Button className='btn-block btn-success p-1 px-2 m-1'
                                                 onClick = {(e) => addAddToCart(item.product, item.qty-1,'sub')}
                                                  disabled= {item.qty === 1}> 
                                                <i className = 'fa fa-minus' > </i></Button>
                                         </Col>    
                                         <Col className='p-0 m-0'>
                                            <Form.Control 
                                                    value={item.qty}
                                                    onChange={(e) => onChangeHandler(item.product, Number(e.target.value),item.countInStock)}
                                                    className="border border-success p-1 px-2 m-1"
                                                    style ={{width: '50px'}}
                                                    type="text" 
                                                    placeholder={item.qty} />
                                         </Col>  
                                         <Col className='p-0 m-0'>
                                                <Button className='btn-block btn-success p-1 px-2 m-1 '
                                                    onClick = {(e) => addAddToCart(item.product, item.qty+1, 'add')}
                                                    disabled = {item.countInStock === item.qty}> 
                                                    <i className = 'fa fa-plus'> </i></Button>
                                         </Col>
                                         </Row>
                                        </InputGroup>
                                    </Col>

                                    <Col md={2}> 
                                      <strong className=''> $ { (item.price * item.qty).toFixed(2)} </strong>
                                    </Col>
                                    
                                    <Col md={1}>
                                       <Button variant='light' type='button' className=' btn-block '
                                         onClick = {()=> removeFromCartHandler(item.product)} > 
                                         <i className="far fa-trash-alt"> </i> </Button>
                                    </Col>         
                               </Row>
                            </ListGroup.Item>
                       
                        ))}
                        
                    </ListGroup>
                    </Col>
                    </Row>
                    </div>
                )
                }
              
            </Col>
         

            < Col md={3} >
                <Row className='m-3'>
                <Card className='position-sticky'> 
                    <ListGroup variant='flush' >
                        <ListGroup.Item>
                            <h6 className=''> <strong> SUBTOTAL:

                             </strong>
                                  {` (${selectedItems.reduce((acc,item) => acc + item.qty, 0)}) `}
                            Items</h6> 

                            <h5> <strong>$ {selectedItems.reduce( (acc,item)=> acc+item.qty*item.price, 0 ).toFixed(2)} </strong></h5>
                            
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                            <Button type='button' 
                            className='btn-block btn-primary'
                            disabled={selectedItems.length === 0}
                            onClick={checkOutHandler}>
                                 CHECKOUT
                            </Button>

                            </Row>
                           
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
                </Row>
            
            </Col>

        </Row>
    )
}

export default CartScreen

//TO DO
// cartItems don't add up DONE
// local strorage issue. what if i restart the browser will my cartItems be empty?  nah
// duplicate item dont add up. (existing item on shop) just replacing it DONE
// Cart wont show when cart icon is clicked DONE

// inactive button when out of stock. DONE
// restrictions DONE
//minus button DONE
//delete button

//header title (Qunatity, Name etc)
//SELECT ITEM BEFORE PLACING ORDER or CHECKOUT
// cart notif (item count)

//deselect DONE
//selectAll 
//Subtotal of selected rerender when quanty increments
//PROBLEM  nauuna select ITEM chuchu

// select ALL
