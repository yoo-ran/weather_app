import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faWind, faWater,faDroplet} from '@fortawesome/free-solid-svg-icons';
import './output.css'

const Weather = () => {
    const [location, setLocation] = useState({});
    const [current, setCurrent] = useState({});
    const [condition, setCondition] = useState({});
    const [forecast, setForecast] = useState([])
    useEffect(()=>{
        const fetch = async() =>{
            try{
                const res = await axios.get("http://api.weatherapi.com/v1/forecast.json?key=e6494ccd0346472e95063525241801&q=Vancouver&days=7&aqi=no&alerts=no");
                setLocation(res.data.location);
                setCurrent(res.data.current);
                setCondition(res.data.current.condition);
                setForecast(res.data.forecast.forecastday)
            }catch(e){
                console.log(e);
            }
        };
        fetch();
    },[]);
    const date = new Date();
    const today = `${date.getFullYear()}.${date.getMonth()+1}.${date.getDay()}`;
    return (
        <div style={{backgroundColor: "gray"}} className='static'>
        
            {/* container */}
            <div  className="md:container md:mx-auto"  style={{border:"1px solid red"}}>
                {/* name temp icon */}
                <div>
                    <div>
                        <div>{location.region}</div>
                        <div>{today}</div>
                        <div>{current.temp_c}</div>
                        <div>{condition.text}</div>
                    </div>
                    <div>
                        <img src={condition.icon} alt=''/>
                    </div>
                </div>

                {/* wind */}
                <div>
                    <div>
                        <FontAwesomeIcon icon={faWind} />
                        <p>{current.wind_mph}mph</p>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faWater} />
                        <p>{current.precip_mm}mm</p>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faDroplet} />
                        <p>{current.humidity}</p>
                    </div>
                </div>

                {/* forecast */}
                <div>
                    {forecast.map((day,idx)=>{
                        return <div key={idx}> <p>Mon</p><img src={day.day.condition.icon} alt='weather icon'/><p key={idx}>{day.day.avgtemp_c}&deg;C</p></div>
                    })}
                </div>
            </div>

        </div>
    );
    
}

export default Weather