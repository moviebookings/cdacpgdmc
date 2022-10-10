import axios from 'axios';
import { useEffect, useState } from 'react';
import config from '../config';
import {toast} from 'react-toastify'
import { Link } from 'react-router-dom';
const ViewProfile = () => {

    const [users , setUsers] = useState([])
    console.log(users)
    useEffect(() => {
        getUserDetails()
    } , [])
    const getUserDetails = () => {
        axios.get(config.serverURL + '/user/profile/' + sessionStorage['PersonId'])
        .then((response) => {
            const result = response.data
            if(result['status'] === 'success')
            {
                console.log(result)
                setUsers(result['data'])
            }
            else{
                toast.error(result['error'])
            }
        })
    }
    return <div style={{textAlign:"center"}} className='container'>
      <h3 style={styles.h3}>User Details</h3>
      <div className='container'>
      <table style={{border:'1'}} className='table table-striped'>
      <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
                <tr>
                <td>{user.FirstName}</td>
                <td>{user.LastName}</td>
                <td>{user.Email}</td>
                <td>{user.Mobile}</td>
                <td>{user.Age}</td>
                <td>
                <Link style={{color:'green'}} className='nav-link active' aria-current='page' to='/update-profile'>Edit Details</Link>
                </td>
                </tr>
            )
          })}
        </tbody>
      </table>
      </div>
    </div>
  
}

const styles = {
  h3: {
    textAlign: 'center',
    margin: 20,
  },
  button: {
    marginRight: 10,
  },
}
export default ViewProfile