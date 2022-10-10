import axios from 'axios';
import config from '../config';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const [cities,setCities] = useState([])
    const [cityId ,setCityId] = useState({})
    sessionStorage['CityId'] = cityId
    useEffect((() => {
        GetCtyList()
    }),[])
    const GetCtyList = () =>{
        axios.get(config.serverURL + '/city')
    .then((response) => {
        const result = response.data
        if(result['error'] === 'error')
        {
            console.log(result['error'])

        }
        else{
            setCities(result['data'])
        }
    })
    }
    const navigate = useNavigate()
    const selected = () => {
        
        navigate('/display-shows',{ state: { idOfCity: cityId } })
        //console.log(cityid)
    }
    return (
<div>
    <div style={{ marginTop: 100 }}>
        <div style={styles.container}>
             <div className='mb-3'>
                 <label style={{marginBottom:25,color:'gray'}}>Select An City</label>
              
<select onClick={(event) => {
    setCityId(event.target.value)
}} className="form-select" aria-label="Default select example">
    {cities.map((city) => {
        
        return <option onClick={selected}  selected value={city.CityId}>{city.CityName}</option>
    })}
</select>   
<div className='mb-3' style={{ marginTop: 10 }}>
        <button onClick={selected} style={styles.signinButton}>
          Select
        </button>
      </div> 
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

export default Home