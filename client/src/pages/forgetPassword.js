import { useState } from "react"
import { Link } from "react-router-dom"
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
const ForgetPassword = () => 
{
    const [Email,setEmail] = useState('')
    const navigate = useNavigate()
    const submit = () => 
    {
        if (Email.length === 0) 
        {
          toast.error('please enter email')
        } 
        else 
        {
         toast.success("Password has been sent to your registered email...!")
         navigate('/')
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
    <div style={{ marginTop: 100 }}>
        <div style={styles.container}>
             <div className='mb-3'>
                 <label>Email</label>
                    <input onKeyUp={(event) => {
                        setEmail(event.target.value)  
                            }} className='form-control' type='email'/>
        </div>
      <div className='mb-3' style={{ marginTop: 10 }}>
        <button onClick={submit} style={styles.signinButton}>
          Submit
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
    height: 200,
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
  
export default ForgetPassword