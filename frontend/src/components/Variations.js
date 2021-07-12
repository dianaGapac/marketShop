import React,{ useEffect } from 'react'
import {Button, ListGroup, Col,Row} from 'react-bootstrap'
import Price from '../components/Price'

const Variations = ({product}) => {
    
  const variations = product.variations
  var sortedPrice = variations
  var selected 
    
  const changePrice = (e)=>{
      selected = e
  }

  useEffect(() =>{

  },[selected])  

    return (
        <> 
            <ListGroup>
                 <ListGroup.Item>
                    <Row>
                        <Col> 
                            <h4>
                             <strong> 
                                <Price variations = {variations} selected= {selected}></Price>                                
                             </strong> 
                            </h4>
                        </Col>
                    </Row>
                </ListGroup.Item>
            </ListGroup> 

           <div>
                <Row> 
                    
                    <Col className='p-2' > Status: </Col>
                    <Col> {/* product.countInstock >0? 'In Stock' : 'Out of Stock' */} </Col>
                </Row>
                 <Row>
                    <Col className='p-2'> Variations: </Col>
                 </Row> 
                <Row>
                  {variations.map( v => (
                    <Button 
                        onClick={e => changePrice(e.target.value)}
                        value = {v.index}
                        key ={v.size} 
                        type = 'button' 
                        variant = 'outline-success' 
                        className = 'my-2 mx-1' 
                        style = {{
                            width: '100px'
                        }}> 
                        {v.size}

                        {console.log(selected)}
                    </Button>
                      ))  }
                 </Row>
            </div>
                    
                       

         
        </>
    )
}

export default Variations

