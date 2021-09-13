import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer  from '../components/FormContainer'
import { getUserDetails, updateUser} from '../actions/userActions' 
import {USER_UPDATE_RESET} from '../constants/userConstants'


const UserEditScreen = ({match,history}) => {
    const userId = match.params.id
    
    const userDetails = useSelector(state=> state.userDetails)
    const {loading, error, user} = userDetails

    const userUpdate = useSelector(state=> state.userUpdate)
    const {loading:loadingUpdate, error:errorUpdate, success:successUpdate} = userUpdate

      //local state
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)  


    const dispatch = useDispatch()

    const submitHandler =(e)=>{
        e.preventDefault()
        dispatch(updateUser({_id: userId, name, email, isAdmin: isAdmin === true? 'true' : 'false'}))
    }

    useEffect (()=>{

        if(successUpdate){

            dispatch({type: USER_UPDATE_RESET})
            history.push('/admin/userList')

        } 
        else{
            
            if(!user.name || user._id !== userId){
                dispatch(getUserDetails(userId))
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin === 'true'? true: false)  
                    }
                else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin === 'true'? true: false) 
                }

        }


    }, [user,userId, successUpdate,history])

    return (
        <>
         <Link to="/admin/userList" className='btn btn-light my-3'>  GO BACK</Link>
            
         <FormContainer >
           <h4 > <strong> EDIT USER </strong></h4>
           {loadingUpdate && <Loader/>}
           {errorUpdate && <Message variant='danger'> {errorUpdate} </Message>}
           {}

           {loading? <Loader/> : error? <Message variant='danger'> {error} </Message> :
            (
                <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                        <Form.Label> Name</Form.Label>
                        <Form.Control type='text' placeholder={name} value= {name} onChange={(e) => setName(e.target.value)}>  
                        </Form.Control>
                    </Form.Group>
    
               
                    <Form.Group controlId='email'> 
                        <Form.Label> Email Address</Form.Label>
                        <Form.Control type='email' placeholder={email} value= {email} onChange={(e) => setEmail(e.target.value)}>  
                        </Form.Control>
                    </Form.Group>
                    
                    
                    <Form.Group controlId='isAdmin'>
                        <Form.Check type='checkbox' label= 'Is Admin' checked= {isAdmin} onChange={(e) => setIsAdmin(e.target.checked )}>  
                        </Form.Check>
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


export default UserEditScreen
