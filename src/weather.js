import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faWind, faWater,faDroplet} from '@fortawesome/free-solid-svg-icons';
import './output.css'

// e8f2f8 저녁
// #e8eaf8 밤
// #f8eee8 오후

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
    const today = `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`;
    const weekConst = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const week = [];
    for (let i = 0; i < 7; i++) {
        week[i] = (date.getDay()+i>=7) ?  weekConst[(date.getDay()+i)-7] :weekConst[date.getDay()+i];
    }
    
    return (
        <div className='h-screen w-full flex flex-col justify-center items-center gap-y-10 bg-gray-100'>
            {/* <h1 className='text-5xl font-bold font-Bebas text-slate-50 drop-shadow-[2px_2px_2px_rgba(0,0,0,1)]'>Weather forecast</h1> */}
            {/* container */}
            <div  className='flex flex-col justify-center gap-y-10 p-8 h-4/6 max-w-80 md:w-96 md:max-h-100 lg:max-h-128 rounded-xl shadow-2xl bg-indigo-100'>
                {/* name temp icon */}
                <div className='grid grid-cols-2 h-full place-items-end'>

                    <div className='flex flex-col justify-between h-full'>
                        <div>
                            <p className='text-lg font-medium md:text-2xl'>{location.region}</p>
                            <p className='text-sm md:text-base text-neutral-500'>{today}</p>
                        </div>

                        <div>
                            <p className=' flex inline-start' >
                                <span className='text-7xl md:text-9xl'>{current.temp_c}</span><span className='text-xl'>&deg;C</span>
                            </p>
                            <p className='flex items-center text-neutral-500'>
                                <img className='w-1/6' src={condition.icon} alt={condition.text}/>
                                {condition.text}
                            </p>
                        </div>
                    </div>

                    <div className='grid grid-rows-3 gap-y-5 h-4/6 md:h-5/6 text-neutral-500'>
                        <div className='grid place-items-center gap-y-1'>
                            <FontAwesomeIcon icon={faWind} className='text-m md:text-lg'/>
                            <p>
                                <span className='text-sm md:text-m '>{current.wind_mph}</span>   
                                <span className='text-xs'>mph</span> 
                            </p>
                        </div>
                        <div className='grid place-items-center gap-y-1'>
                            <FontAwesomeIcon icon={faWater} className='text-m md:text-lg'/>
                            <p>
                                <span className='text-sm md:text-m'>{current.precip_mm}</span>
                                <span className='text-xs'>mm</span>
                                
                            </p>
                        </div>
                        <div className='grid place-items-center gap-y-1'> 
                            <FontAwesomeIcon icon={faDroplet} className='text-m md:text-lg' />
                            <p>
                                <span className='text-sm md:text-m'>{current.humidity}</span>
                                <span className='text-xs'>%</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* wind */}
               

                {/* forecast */}
                <div className='grid grid-cols-7 gap-x-3'>
                    {forecast.map((day,idx)=>{
                        return <div className='grid place-items-center' key={idx}> 
                        <p className='text-xs text-neutral-500'>{week[idx]}</p>
                        <img className='w-8' src={day.day.condition.icon} alt='weather icon'/>
                        <p key={idx} className='text-xs text-neutral-900'>{day.day.avgtemp_c}&deg;C</p></div>
                    })}
                </div>
            </div>

        </div>
    );
    
}

export default Weather