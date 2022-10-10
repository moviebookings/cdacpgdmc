import { useState} from "react"
import { Link } from "react-router-dom"
import {toast} from 'react-toastify'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import config from './../config';
const Signin = () => 
{

    const [Email,setEmail] = useState("")
    const [Password,setPassword] = useState("")
    const navigate = useNavigate()
    const signin = () => 
    {
      
          console.log(`${Email}`)
          console.log(`${Password}`)
        // check if user has really entered any value
        if (Email.length === 0) 
        {
          
          toast.error('please enter email')
        } else if (Password.length === 0) {
          
          toast.error('please enter password')
        } else 
        {
         
            axios.post(config.serverURL + '/user/login',{
              Email,
              Password
            })
            .then((response) => {
              const result = response.data
              
              //console.log(uid)
              if(result['status'] === 'error')
              {
                toast.error("Invalid email or Password")
               
              }
              else
              {
                sessionStorage['PersonId'] = result['data']['PersonId']
                sessionStorage['token'] = result['data']['token']
                sessionStorage['username'] = result['data']['name']
                console.log(sessionStorage['PersonId'])
                toast.success("Welcome to MovieBooking Application....!!!")
                navigate('/home-page')
              }
            })
            .catch((error) => {
              console.log('error')
              console.log(error)
            })
        }
        
        console.log(`${Email}`)
          console.log(`${Password}`)
    }
    return (
      <div>
       <nav
      style={{ backgroundColor: '#db0f62' }}
      className='navbar navbar-expand-lg navbar-dark'>
        <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          MovieBooking
        </Link>

        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        </div>
    </nav>
    <div style={{ marginTop: 100 }}>
      
    <div style={styles.container}>
      <div className='mb-3'>
        <label>Email</label>
        <input onKeyUp={(event) => {
            setEmail(event.target.value)
            
        }} className='form-control' type='email'
        />
      </div>
      <div className='mb-3'>
        <label>Password</label>
        <input onKeyUp={(event) => {
            setPassword(event.target.value)
        }} className='form-control' type='password'/>
        <Link to='/forget-password'>forget password?</Link>
      </div>
      <div className='mb-3' style={{ marginTop: 40 }}>
        <div>
          Dont have an account? <Link to='/signup'>Signup here</Link>
        </div>
        <button onClick={signin} style={styles.signinButton}>
          Signin
        </button>
        <Link to='/admin/login'>Adimn Login?</Link>
      </div>
    </div>
  </div>
  </div>
    )
}

const styles = {
    container: {
      width: 400,
    height: 350,
      padding: 20,
      position: 'relative',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      margin: 'auto',
      borderColor: '#db0f62',
      borderRadius: 10,
      broderWidth: 1,
      borderStyle: 'solid',
      boxShadow: '1px 1px 20px 5px #C9C9C9',
    },
    signinButton: {
      position: 'relative',
      width: '100%',
      height: 40,
      backgroundColor: '#db0f62',
      color: 'white',
      borderRadius: 5,
      border: 'none',
      marginTop: 10,
    },
  }
  
export default Signin