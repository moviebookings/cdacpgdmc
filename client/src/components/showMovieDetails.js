import axios from "axios"
import { useState ,useEffect} from "react"
import config from "../config"
import { useLocation } from 'react-router-dom';
const ShowMovieDetails = (props) => {
    const [movieDetails,setMovieDetails] = useState([])
    const location = useLocation()
    //const {MovieId} = location.state
    //console.log(MovieId)
    useEffect(() => {
        getDetails()
    },[])
    console.log(sessionStorage['MovieId'])
    const getDetails = () => {
        axios.get(config.serverURL + '/movie/' + sessionStorage['MovieId'])
        .then((response) => {
            const result = response.data
            if(result['status'] === 'error')
            {
                console.log(result['error'])
            }
            else
            {
                setMovieDetails(result['data'])
            }
        })
    }
    return ( 
        <div className="container">
            <h2 style={{textAlign:'center',color:'darkblue',marginTop:15}}>Movie Details</h2>
            <hr style={{color:'darkblue',fontWeight:10}}></hr>
            {movieDetails.map((m) => {
                return <div style={{textAlign:'center'}}>
                    <img style={{height:200,width:200}} src="https://m.media-amazon.com/images/M/MV5BYzJkZDIwYTAtMGU4Mi00NzU3LWI1MWItODg0M2Q1NmIxYmNlXkEyXkFqcGdeQXVyMTIyNzY0NTMx._V1_QL75_UY562_CR35,0,380,562_.jpg"></img>
                    <h5 style={{marginTop:15}}><p>Movie Title - {m.MovieTitle}</p></h5>
                    <h5><p>Movie Language - {m.MovieLanguage}</p></h5>
                    <h5><p>Movie Genere - {m.MovieGenre}</p></h5>
                    <h5><p>Movie Relese Date - {m.ReleseDate}</p></h5>
                    <h5><p>Movie Duration - {m.MovieDuration}</p></h5>
                    <h5><p>Movie Certificate - {m.MovieCertificate}</p></h5>
                    <h5><p>Movie Cast - {m.MovieCast}</p></h5>
                    <h5><p>Movie Director - {m.MovieDirector}</p></h5>
                </div>
            })}
        
        </div>
        )
}
export default ShowMovieDetails