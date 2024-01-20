import React, {useEffect} from 'react';
import axios from 'axios';

const Weather = () => {
    // const [weather, setWeather] = useState([]);

    useEffect(()=>{
        const fetch = async() =>{
            try{
                const res = await axios.get(
                    "http://api.weatherapi.com/v1/current.json?key=e6494ccd0346472e95063525241801&q=Vancouver&aqi=no"
                );
                sessionStorage.setItem("weather",JSON.stringify(res.data))
            }catch(e){
                console.log(e);
            }
        };
        fetch();
    },[]);

    let weatherSession = JSON.parse(sessionStorage.getItem("weather"))
    let location = weatherSession.location;
    let current = weatherSession.current;
    return (
        <>
            <p>Hello</p>
       
            {location.region}
            {current.temp_c}
        </>
    );
    
}

export default Weather