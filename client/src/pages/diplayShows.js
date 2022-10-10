import axios from "axios"
import config from "../config"
import { useState,useEffect } from "react"
import { useLocation} from "react-router-dom"
import { Link } from "react-router-dom"
const DisplayShows = () => {
    const [shows,setShows] = useState([])
    const location = useLocation()
    const { idOfCity } = location.state
    const imageURL  = 'https://m.media-amazon.com/images/M/MV5BYzJkZDIwYTAtMGU4Mi00NzU3LWI1MWItODg0M2Q1NmIxYmNlXkEyXkFqcGdeQXVyMTIyNzY0NTMx._V1_QL75_UY562_CR35,0,380,562_.jpg'
    useEffect(() => {
        displayShowOfCity()
    } , [])
    const displayShowOfCity = () => {
        axios.get(config.serverURL + '/shows/' + idOfCity)
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
    }
        //navigate({ state: { id: Movieid } })
   return  (
    <div >
    <div  style={{
    }} className='row'>
        {shows.map((show) => {
          //const imageUrl = config.serverURL + '/' + listing.image
          return (
            
            <div
              className='col-3'
              style={{
                position: 'relative',
                padding: 20,
                display: 'inline-block',
                cursor: 'pointer',
              }}>
                
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
              
              <div  style={{ marginTop: 20 }}>
                <h5 className='card-title'>Title - {show.MovieTitle}</h5>
                
                <p  className="h5">
                  Theater Name - {show.TheatreName} <br />
                  Movie Language - {show.MovieLanguage} <br />
                  Movie Genre - {show.MovieGenre} <br />
                  Movie Certificate - {show.MovieCertificate} <br />
                  Movie Duration - {show.MovieDuration} Hour <br />
                  Movie Start Time - {show.StartTime} 
                  <Link onClick={(event) => {
                    sessionStorage['MovieId'] = show.MovieId
                    sessionStorage['ShowId'] = show.ShowId
                    sessionStorage['TheatreId'] = show.TheatreId
                    sessionStorage['ScreenId'] = show.ScreenId
                  }} value={show.MovieId}  style={{color:'white',border:1,backgroundColor:'#db0f62',textAlign:'center',marginTop:10}} className='nav-link active' aria-current='page' to="/movie-details">Show Movie Details</Link>
                  <Link style={{color:'white',border:1,backgroundColor:'#db0f62',textAlign:'center',marginTop:10}} className='nav-link active' aria-current='page' to="/book-show">Book A Show</Link>
                </p> 
                  
              </div>
            </div>
            
          )
        })}
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
export default DisplayShows