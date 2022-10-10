import axios from 'axios';
import { useEffect, useState } from 'react';
import config from '../config';
import {toast} from 'react-toastify'
const Bookings = () => {

    const [bookings , setBookings] = useState([])
    useEffect(() => {
        getAllBookings()
    } , [])
    const getAllBookings = () => {
        axios.get(config.serverURL + '/booking/history/' + sessionStorage['PersonId'])
        .then((response) => {
            const result = response.data
            if(result['status'] === 'success')
            {
                setBookings(result['data'])
            }
            else{
                toast.error(result['error'])
            }
        })
    }
    return <div style={{textAlign:"center"}} className='container'>
      <h3 style={styles.h3}>Bookings Details</h3>
      <div className='container'>
      <table style={{border:'1'}} className='table table-striped'>
      <thead>
          <tr>
            <th>Booking ID</th>
            <th>Booking Status</th>
            <th>Total Seats</th>
            <th>Booking Date/Time</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => {
            return (
                <tr>
                <td>{booking.BookingId}</td>
                <td>{booking.BookingStatus}</td>
                <td>{booking.TotalSeat}</td>
                <td>{booking.BookingDateandTime}</td>
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
export default Bookings