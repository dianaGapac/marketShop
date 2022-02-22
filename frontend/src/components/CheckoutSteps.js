import React ,{useEffect,useState} from 'react'
import {Nav} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

 
const CheckoutSteps = ({step1, step2, step3, step4}) => {

    const [isDesktop, setDesktop] = useState(window.innerWidth > 1000);

    const updateMedia = () => {
        setDesktop(window.innerWidth > 1000);
      }

    useEffect (()=>{
        window.addEventListener("resize", updateMedia);
        window.removeEventListener("resize", updateMedia)

        }
    , [])

    return (
        <div>
             {
             isDesktop?(
                <Nav className='justify-content-center mv-4 '>
                    <Nav.Item>
                        {  step1 && !step2? (
                            <LinkContainer to='/login'>
                            <Nav.Link>
                            <h4> SIGN IN  </h4>  
                            </Nav.Link> 
                        </LinkContainer>
                        )
                            : step1? (
                            <LinkContainer to='/login'>
                                <Nav.Link>
                                SIGN IN  
                                </Nav.Link> 
                            </LinkContainer>
                            ): 
                            <Nav.Link disabled>
                                SIGN IN
                            </Nav.Link>
                        }
                    </Nav.Item>
                    <Nav.Item>
                        {
                            step2 && !step3? (<LinkContainer to='/shipping'>
                            <Nav.Link>
                                <h4> SHIPPING </h4>
                            </Nav.Link> 
                        </LinkContainer> ) :
        
                        step2? (
                            <LinkContainer to='/shipping'>
                            <Nav.Link>
                                    SHIPPING   
                            </Nav.Link> 
                            </LinkContainer>
                            ) : 
        
                            <Nav.Link disabled>
                                SHIPPING
                            </Nav.Link>
                        }
                    </Nav.Item>
                    <Nav.Item>
                        {  step3 && !step4? (
                            <LinkContainer to='/payment'>
                                <Nav.Link>
                                <h4>  PAYMENT </h4>
                                </Nav.Link> 
                            </LinkContainer>
                            ):
                        step3? (
                            <LinkContainer to='/payment'>
                                <Nav.Link>
                                    PAYMENT
                                </Nav.Link> 
                            </LinkContainer>
                            ): 
                            <Nav.Link disabled>
                                PAYMENT
                            </Nav.Link>
                        }
                    </Nav.Item>
                    <Nav.Item>
                        {  
                        step4? (
                            <LinkContainer to='/placeorder'>
                                <Nav.Link>
                                <h4>  PLACE ORDER </h4> 
                                </Nav.Link> 
                            </LinkContainer>
                            ):     
                            <Nav.Link disabled>
                                PLACE ORDER
                            </Nav.Link>
                        }
                    </Nav.Item>
        
                </Nav>
                
            ):( <div>
                 {
                     step1 && step2 && step3 && step4 ? (<h5> PLACE ORDER</h5>) :
                     step1 && step2 && step3? (<h5> PAYMENT</h5>):
                     step1 && step2 ? (<h5> SHIPPING</h5>): 
                     step1 && (<h5> SIGN IN</h5>)
                 }

                </div>
            )
        }
        </div>
       
 
    )
}

export default CheckoutSteps
