import axios from "axios"
import config from "../config"
import { useState ,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
const BookShow = (props) => {
    const [MovieDetails,setMovieDetails] = useState([])
    const [shows,setShows] = useState([])
    const navigate = useNavigate()
    const price = 150
    const [seat,setSeat] = useState(1)
    const imageURL  = 'https://m.media-amazon.com/images/M/MV5BYzJkZDIwYTAtMGU4Mi00NzU3LWI1MWItODg0M2Q1NmIxYmNlXkEyXkFqcGdeQXVyMTIyNzY0NTMx._V1_QL75_UY562_CR35,0,380,562_.jpg'
    const getMovieDetails = () => {
        axios.get(config.serverURL + '/movie/' + sessionStorage['MovieId'])
        .then(((response) => {
            const result = response.data
            if(result['status'] === 'error')
            {
                console.log(result['error'])
            }
            else
            {
                setMovieDetails(result['data'])
            }

        }))
    }
    const TotalSeat = seat
    const BookingStatus = 'SUCCESS'
    const PersonId = sessionStorage['PersonId']
    const ShowId = sessionStorage['ShowId']           
    const TheatreId = sessionStorage['TheatreId']
    const book = () => {
        axios.post(config.serverURL + '/book/show',{
            TotalSeat,BookingStatus,PersonId,ShowId,TheatreId
        })
        .then((response) => {
            const result = response.data
            if(result['status'] === 'error')
            {
                console.log(result['error'])
            }
            else{
                toast.success("Ticket Booked SuccessFully!")
                navigate('/home-page')
            }
        })
    }
    useEffect(() => {
        getMovieDetails()
    },[])
    console.log(" sss  "+sessionStorage['CityId'])
    const getBookedDetails = () => {
        axios.get(config.serverURL + '/shows/' + sessionStorage['CityId'])
    .then((response) => {
        const result = response.data
        
        if(result['status'] === 'error')
        {
            console.log(result['error'])
        }
        else
        {
            setShows(result['data'])
        }
    })
    const movie = () => {
        MovieDetails.map((m1) => {
            return movie
        })
    }

    }
    return <div className="container">
        <table style={{border:1 , textAlign:'center'}} >
            <tr>
                <td>
                    <div className="container">
                        <h3 style={{textAlign: 'center',color:'green'}}>Movie Details</h3>
                        <img 
                alt='home'
                style={{
                  height: 250,
                  width: '100%',
                  display: 'block',
                  borderRadius: 10,
                }}
                src={imageURL}
              />
                        {MovieDetails.map((m) => {
                            return (
                                <div>
                                    <h5 style={{marginTop:10}}><p>Movie Title - {m.MovieTitle}</p></h5>
                    <h5><p>Movie Language - {m.MovieLanguage}</p></h5>
                    <h5><p>Movie Genere - {m.MovieGenre}</p></h5>
                    <h5><p>Movie Duration - {m.MovieDuration}</p></h5>
                    <h5><p>Movie Cast - {m.MovieCast}</p></h5>
                    <h5><p>Movie Director - {m.MovieDirector}</p></h5>
                                </div>
                            )
                        })}
                    </div>
                </td>
                
                <td>
                <div className="container">
                <h3 style={{textAlign: 'center',color:'green'}}>Choose No of Seat</h3>
                <input onChange={(event) => {
                    setSeat(event.target.value)
                }} style={{marginTop:25}} type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="chosee no of seats"/>
                <button onClick={getBookedDetails} style={{marginTop:25}} type="submit" class="btn btn-primary">Select </button>
                </div>
                </td>
                <td>
                <div className="container">
                <h3 style={{textAlign: 'center',color:'green'}}>Booking Details</h3>
                {shows.map((s) => {
                    return <div>
                        <h5>Theater Name - {s.TheatreName}</h5>
                        <h5>Screen Number - {s.ScreenId}</h5>
                        <h5>Movie Duration - {s.MovieDuration} Hour</h5>
                        <h5>Total No of Seats - {seat}</h5>
                        <h5>Price Per Seat - Rs {price} </h5>
                        <h5>Total Amount - Rs {price * seat}</h5>
                        <h5>Tax Percent - {10} %</h5>
                        <h5>Tax Amount - Rs {(price * seat) * 10 /100} </h5>
                        <h5>Final Payble Amount - Rs {((price * seat) * 10 /100) + (price * seat)} </h5>
                        <h5>Movie Start Time - {s.StartTime}</h5>
                        <button onClick={book} style={{marginTop:25}} type="submit" class="btn btn-primary">Book And Pay </button>
                    </div>
                })}
                </div>
                </td>
            </tr>
        </table>
    </div>
}
export default BookShow