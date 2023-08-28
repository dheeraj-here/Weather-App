import React, { useState } from 'react'
import './mid.css'

export default function Mid() {
    const [city, setCity] = useState("");
    const [data, setData] =useState({
        current: "",
        temp :"",
        clouds:"",
        humidity:"",
        windSpeed:""
    })

    const getCity = (e) => {
        console.log(e.target.value);
        setCity(e.target.value)
        findData(e.target.value)
    }

    const findData = async (cityName) => {
        try{
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=16845a27af80afb88887289aa22ee715`)
        const data = await res.json()
                    setData({
                        current: data.weather.main,
                        temp :data.main.temp,
                        clouds:data.clouds.all,
                        humidity:data.main.humidity,
                        windSpeed:data.wind.speed
                    })
                }
                catch(err){
                    console.log(err);
                }
    }
    

  return (
    
    
    <div className='mid'>
        <span><i class='far fa-eye'></i></span>
    <div className='inp'>
        <input
        name=''
        className='input'
        type='search'
        placeholder='City Name'
        value={city}
        onChange={getCity} 
        />
    </div>

    <div className='content'>
        <div className='item'><span className='h'>Current Weather</span> {data.current}</div>
        <div className='item'><span className='h'>Current Temperature:</span> {data.temp}</div>
        <div className='item'><span className='h'>Cloudy:</span> {data.clouds+"%"} </div>
        <div className='item'><span className='h'>Precipitaion:</span> {data.humidity+"%"} </div>
        <div className='item'><span className='h'>Wind Speed:</span> {data.windSpeed}</div>

    </div>
    </div>
    
  )
}
