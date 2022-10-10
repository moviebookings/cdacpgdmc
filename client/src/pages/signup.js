import { Link } from "react-router-dom"
import { useState } from 'react';
import {toast} from 'react-toastify'
import axios from 'axios'
import config from "../config";
import {useNavigate} from 'react-router-dom'
const Signup = () => {
  const [FirstName,setFirstName] = useState('')
  const [LastName,setlastName] = useState('')
  const [Email,setEmail] = useState('')
  const [Mobile,setMobile] = useState('')
  const [Age,setAge] = useState('')
  const [Password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const signup = () => {
    if(FirstName.length === 0)
    {
      toast.error("Please enter First Name..?")
    }
    else if(LastName.length === 0)
    {
      toast.error("Please enter Last Name..?")
    }
    else if(Email.length === 0)
    {
      toast.error("Please enter email..?")
    }
    else if(Mobile.length === 0)
    {
      toast.error("Please enter Mobile Number..?")
    }
    else if(Age.length === 0)
    {
      toast.error("Please enter Age..?")
    }
    else if(Password.length === 0)
    {
      toast.error("Please enter Password..?")
    }
    else if(confirmPassword.length === 0)
    {
      toast.error("Please enter Confirm Password..?")
    }
    else if(Password !== confirmPassword)
    {
      toast.error("Password and Confirm Password must be same..?")
    }
    else
    {
      axios.post(config.serverURL + '/user/signup',{
        FirstName,LastName,Email,Mobile,Age,Password
      })
      .then((response) => {
        const result = response.data
        if(result['status'] === 'success')
        {
          toast.success("Registration Sussess..!!")
          navigate("/")
        }
        else
        {
          toast.error("Registration Failed..?")
        }
      })
      .catch((error) => {
        console.log('error')
        console.log(error)
      })
    }
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
        <div style={{ marginTop: 25 }}>
      <div style={styles.container}>
        <div className='mb-3'>
          <label>First Name</label>
          <input onChange={(event) => (
            setFirstName(event.target.value)
          )}
            className='form-control'
            type='text'
          />
        </div>

        <div className='mb-3'>
          <label>Last Name</label>
          <input onChange={(event) => (
            setlastName(event.target.value)
          )}
            className='form-control'
            type='text'
          />
        </div>

        

        <div className='mb-3'>
          <label>Email</label>
          <input onChange={(event) => (
            setEmail(event.target.value)
          )}
            className='form-control'
            type='email'
          />
        </div>
        <div className='mb-3'>
          <label>Mobile Number</label>
          <input onChange={(event) => (
            setMobile(event.target.value)
          )}
            className='form-control'
            type='tel'
          />
        </div>
        <div className='mb-3'>
          <label>Age</label>
          <input onChange={(event) => (
            setAge(event.target.value)
          )}
            className='form-control'
            type='number'
          />
        </div>

        <div className='mb-3'>
          <label>Password</label>
          <input onChange={(event) => (
            setPassword(event.target.value)
          )}
            className='form-control'
            type='password'
          />
        </div>

        <div className='mb-3'>
          <label>Confirm Password</label>
          <input onChange={(event) => (
            setConfirmPassword(event.target.value)
          )}
            className='form-control'
            type='password'
          />
        </div>

        <div className='mb-3' style={{ marginTop: 20 }}>
          <div>
            Already have an account? <Link to='/'>Signin here</Link>
          </div>
          <button onClick={signup} style={styles.signinButton}>
            Signup
          </button>
        </div>
      </div>
    </div>
    </div>
    )
}
const styles = {
    container: {
      width: 400,
      height: 700,
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
export default Signup