import axios from 'axios';
import { useEffect, useState } from 'react';
import config from '../config';
import {toast} from 'react-toastify'
const Payments = () => {

    const [payments , setPayments] = useState([])
    console.log()
    useEffect(() => {
        getAllPayments()
    } , [])
    const getAllPayments =  () => {
        axios.get(config.serverURL + '/booking/history/' + sessionStorage['PersonId'])
        .then((response) => {
            const result = response.data
            if(result === 0)
            {
                toast.error(result['error'])
                
            }
            else{
                console.log(result['data'])
                setPayments(result['data'])
            }
        })
    }
    return <div style={{textAlign:"center"}} className='container'>
      <h3 style={styles.h3}>Payments Details</h3>
      <div className='container'>
      <table style={{border:'1'}} className='table table-striped'>
      <thead>
          <tr>
            <th>Payment ID</th>
            <th>Booking ID</th>
            <th>Payment Status</th>
            <th>Payment Amount</th>
            <th>Tax Percent</th>
            <th>Movie ID</th>
            <th>Screen ID</th>
            <th>Theatre ID</th>
            <th>Date And Time</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((pay) => {       
            return (
                <tr>
                <td>{pay.PaymentId}</td>
                <td>{pay.BookingId}</td>
                <td>{pay.PaymentStatus}</td>
                <td>{pay.PaymentAmount} Rs</td>
                <td>{pay.Taxes} %</td>
                <td>{pay.MovieId}</td>
                <td>{pay.ScreenId}</td>
                <td>{pay.TheatreId}</td>
                <td>{pay.DateAndTime}</td>
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
export default Payments