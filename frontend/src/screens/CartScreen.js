import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, Card, ListGroup, Image, Form, Button,InputGroup, Table, Navbar, Nav} from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart ,passSelectedItem } from '../actions/cartActions'


//TODO Gawing table ung cart screeen

const CartScreen = ({match, location, history}) => {

    //to trigger addtocart dispatch
    var productId = match.params.id 
    var qty = location.search? Number(location.search.split('=')[1]) : 1 

    var size= location.search? location.search.split('-')[1]: 1 



    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart) //to getthe value of states available
    const { cartItems} = cart //get states needed
    const [selectedItems, setSelectedItems] = useState([])  //temporary state for selected


    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


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
            return ( setSelectedItems( [...selectedItems, item]))
        }

    }
    //deselect from selectedItems
    const removeSelected =(id)=> {
        return(setSelectedItems( selectedItems.filter( x=> x.product !== id) ))
    }
    //handle select and deselect
    const selectHandler =(id, qty,checked)=>{

        if(checked){
            addSelected(id,qty) }
        else
        {
            removeSelected(id)
        }


    }

    // change on quanty input handler 
    const onChangeHandler =(id, qty, stock)=>{
         qty < stock ? dispatch(addToCart(id,qty) 
         ) : dispatch(addToCart(id,stock))
    }
    //delete button handler
    const removeFromCartHandler = (index)=> {
        console.log('index', index)
         dispatch(removeFromCart(index))
    }

    // checkout
    const checkOutHandler =()=>{
        if(userInfo){
            history.push('/shipping')
            dispatch(passSelectedItem(selectedItems))
        }
        else{ 
        history.push('/login?redirect=shipping')
          dispatch(passSelectedItem(selectedItems))
        }
  

    }
    // add and minus button handler
    const addAddToCart =(id,qty,op,size)=>{

        //trigger add to cart first
        dispatch(addToCart(id,qty,size))

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
    
            dispatch(addToCart(productId,qty,size))
            productId = null
            qty =null
            size=null
        }
    }, [dispatch,])

    return (

     <div className='my-5'>
     {cartItems.length === 0? (<Message variant='primary' >
        Your Cart is EMPTY. Click <Link to='/'> here </Link> to SHOP
     </Message>) : 
      (
        <div>
        <Row> 
            <Col lg={12} md={12} sm={12}> 
                <Table >
                    <thead className='nav-border' style={{borderBottom: '1px 50% rgba(255, 0, 0, 0.1)'}}>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th> Size</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th> Subtotal</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                    {cartItems.map( (item, index) => (
                                        <tr key={item.product}>

                                         <td>  <Form.Group>
                                                <Form.Check 
                                                    type='checkbox' 
                                                    onChange={(e) => selectHandler(item.product, item.qty, e.target.checked)}
                                                    >
                                                </Form.Check>

                                            </Form.Group> </td>   
                                        
                                      {/*  <td>  <input type="checkbox" onChange={(e) => selectHandler(item.product, item.qty, e.target.checked)} /> </td>    */}   
                                         <td>   <Image src={item.image} alt={item.name}  fluid style={{height:'80px'}}/> </td>
                                         <td >
                                            <Link to={`/product/${item.product}`}>  {item.name} </Link>
                                         </td>
                                          <td> {item.size} </td>
                                         <td> <strong> $ {item.price.toLocaleString()} </strong> </td>

                                         <td>
                                            <InputGroup  >   
                                                <Row className='p-0 m-0 ' >
                                                
                                                <Col className='p-0 m-0'>
                                                <Button className='btn-block btn-primary p-1 px-2 m-1'
                                                        onClick = {(e) => addAddToCart(item.product, item.qty-1,'sub',item.size)}
                                                        disabled= {item.qty === 1}> 
                                                        <i className = 'fa fa-minus' > </i></Button>
                                                </Col>    
                                                <Col className='p-0 m-0'>
                                                    <Form.Control 
                                                            value={item.qty}
                                                            onChange={(e) => onChangeHandler(item.product, Number(e.target.value),item.countInStock)}
                                                            className="border border-primary p-1 px-2 m-1"
                                                            style ={{width: '50px'}}
                                                            type="text" 
                                                            placeholder={item.qty} />
                                                </Col>  
                                                <Col className='p-0 m-0'>
                                                        <Button className='btn-block btn-primary p-1 px-2 m-1 '
                                                            onClick = {(e) => addAddToCart(item.product, item.qty+1, 'add',item.size)}
                                                            disabled = {item.countInStock === item.qty}> 
                                                            <i className = 'fa fa-plus'> </i></Button>
                                                </Col>
                                                </Row>
                                                </InputGroup>
                                           </td>

                                           <td > <strong className=''> $ { (item.price * item.qty).toLocaleString()} </strong> </td>
                                           
                                           <td >
                                            <Button variant='light' type='button' className=' btn-block '
                                                onClick = {()=> removeFromCartHandler(index)} > 
                                                <i className="far fa-trash-alt"> </i> </Button>
                                            </td>   

                                        </tr>
                                    ))}
                    </tbody>
                    
                </Table>
             </Col>
         </Row>

                <Row className='m-3'>
                <Card className='sticky-bot' style={{backgroundColor:'white', height:'100px', width:'300px'}}> 
                    <ListGroup variant='flush' >
                        <ListGroup.Item>
                            <h5 className=''> <strong> SUBTOTAL: 

                             </strong>
                                  {` (${selectedItems.reduce((acc,item) => acc + item.qty, 0)}) `}
                            Items</h5> 

                            <h5> <strong>$ {selectedItems.reduce( (acc,item)=> acc+item.qty*item.price, 0 ).toLocaleString()} </strong></h5>
                            
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
    

         </div>
      )}
      </div>
       
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
