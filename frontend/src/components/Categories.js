import React from 'react'
import {Button, Card,Col,Row} from 'react-bootstrap'

const Categories = ({category}) => {

   
    return (
        <>
            <button type="button" class="btn btn-outline-primary" style={{width:'150px'}}>
              {category}
            </button>
            
         </>
   
    )
}

export default Categories
{/*  

</Card>  */}
