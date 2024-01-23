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
        <div style={{backgroundColor: "whitesmoke"}} className='h-screen grid place-items-center'>
        
            {/* container */}
            <div  className="flex flex-col justify-between gap-2 h-3/6 w-5/12  "  style={{border:"1px solid red"}}>
                {/* name temp icon */}
                <div className='grid grid-cols-2 h-full' style={{border:"1px solid red"}}>
                    <div className='grid grid-rows-5'>
                        <div className='md:text-3xl row-span-1 flex items-center font-Rampart '>{location.region}</div>
                        <div className='row-span-1 flex items-center'>{today}</div>
                        <div className='md:text-7xl row-span-2 flex items-center'>{current.temp_c}&deg;C</div>
                        <div className='flex items-center'>{condition.text}</div>
                    </div>
                    <div className='grid place-items-center' style={{border:"1px solid red"}}>
                        <img src={condition.icon} alt={condition.text}/>
                    </div>
                </div>

                {/* wind */}
                <div className='grid grid-cols-3 w-6/12' style={{border:"1px solid red"}}>
                    <div className='grid place-items-center gap-2'>
                        <FontAwesomeIcon icon={faWind} />
                        <p>{current.wind_mph}mph</p>
                    </div>
                    <div className='grid place-items-center gap-2'>
                        <FontAwesomeIcon icon={faWater} />
                        <p>{current.precip_mm}mm</p>
                    </div>
                    <div className='grid place-items-center gap-2'> 
                        <FontAwesomeIcon icon={faDroplet} />
                        <p>{current.humidity}</p>
                    </div>
                </div>

                {/* forecast */}
                <div className='grid grid-cols-7 ' style={{border:"1px solid red"}}>
                    {forecast.map((day,idx)=>{
                        return <div className='grid place-items-center' key={idx}> 
                        <p>Mon</p>
                        <img src={day.day.condition.icon} alt='weather icon'/>
                        <p key={idx}>{day.day.avgtemp_c}&deg;C</p></div>
                    })}
                </div>
            </div>

        </div>
    );
    
}

export default Weather