import axios from "axios"
import config from "../config"
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
const DeleteAccount = () => {
    const navigate = useNavigate()
    const Delete = () => {
        axios.delete(config.serverURL + '/user/account/delete/' + sessionStorage['PersonId'])
        .then((response) => {
            const result = response.data
            if(result === 0)
            {
                toast.error("Account Can Not Be Deleted?")
            }
            else
            {
                toast.success('Account Deleted Permanentely...!!!')
                navigate("/")
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }
    return <div style={{ marginTop: 100 }}>
    <div style={styles.container}>
         <div className='mb-3'>
             <label style={{color:'red'}}>Confirmation Message</label>
            <h3>Are you sure to delete this Account?</h3>
    </div>
  <div className='mb-3' style={{ marginTop: 10 }}>
    <button onClick={Delete} style={styles.signinButton}>
      Submit
    </button>
  </div>
    </div>
</div>
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

export default DeleteAccount