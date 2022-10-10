import {toast} from 'react-toastify'
import { useState } from 'react';
import axios from 'axios'
import config from '../config';
import {useNavigate} from 'react-router-dom'
const UpdateProfile = () => {

    const [FirstName , setFirstName] = useState('')
    const [LastName,setlastName] = useState('')
    const [Email , setEmail] = useState('')
    const [Mobile,setMobile] = useState('')
    const [Age , setAge] = useState('')
    const navigate = useNavigate()

    const updateDetails = (props) => {
        if(FirstName.length === 0)
        {
            toast.error("First Name can not be enmpty?")
        }
        else if (LastName.length === 0)
        {
            toast.error("Last Name can not be empty?")
        }
        else if (Email.length === 0)
        {
            toast.error("Email can not be empty?")
        }
        else if (Mobile.length === 0)
        {
            toast.error("Mobile can not be empty?")
        }
        else if (Age.length === 0)
        {
            toast.error("Age can not be empty?")
        }
        else
        {
            console.log(`${config.serverURL}/user/update/${sessionStorage['PersonId']}`)
            axios.put(config.serverURL + '/user/update/'+ sessionStorage['PersonId'],{
                FirstName,LastName,Email,Mobile,Age
            })
            .then((response) => {
                const result = response.data
                if(result === 0)
                {
                    toast.error("Details Not Updated???")
                }
                else
                {
                    toast.success("User Details Updated Successfully...!!!")
                    navigate('/home-page')
                }
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }
    return (
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

        <div className='mb-3' style={{ marginTop: 20 }}>
          <button onClick={updateDetails} style={styles.signinButton}>
            Update Details
          </button>
        </div>
      </div>
    </div>
    )
}
const styles = {
    container: {
      width: 400,
      height: 500,
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
export default UpdateProfile