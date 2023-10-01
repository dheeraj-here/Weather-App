import React, { useState } from 'react'
import "../global.css"

export default function Mid() {
    const [city, setCity] = useState("");
    const [data, setData] = useState({
        temp: "298",
        clouds: "-",
        humidity: "-",
        windSpeed: "-",
        feels: "-",
        intensity: '-',
        pressure: '-',
        sunset: '-'
    })

    const getCity = (e) => {
        console.log(e.target.value);
        setCity(e.target.value)
        findData(e.target.value)
    }

    const findData = async (cityName) => {
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=16845a27af80afb88887289aa22ee715`)
            const data = await res.json()
            console.log(data);
            setData({
                temp: data.main.temp,
                clouds: data.clouds.all,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                feels: data.main.feels_like,
                intensity: data.weather.description,
                pressure: data.main.pressure,
                sunset: data.sys.sunset
            })
        }
        catch (err) {
            console.log(err);
        }
    }


    return (
        <>
            <div className="wrapper flex justify-center h-96 bg-[#53c8ef]">
                <div className="wrap  py-16">
                    <div className="top">
                        <input
                            className="search rounded-3xl sm:w-[450px] w-[300px] px-4 py-1.5 border-2"
                            type='search'
                            value={city}
                            onChange={getCity}
                            placeholder='Search location'
                        />
                    </div>
                    <div className="temp my-10">
                        <div className="temp  text-white font-base text-8xl">{(Number(data.temp) - 271).toFixed(0)}°</div>
                        <div className="text text-white p-2 font-thin font-medium">Get the cold shower!</div>
                    </div>

                </div>
            </div>

            <div className='mid py-8 -mt-10 bg-white rounded-t-[50px]'>
                <div className='footer flex flex-wrap justify-center md:space-x-32 sm:space-x-20 space-x-16 py-8'>
                    <div className='item my-8'>
                        <div className='h sm:text-lg font-[300]'>Feels like</div>
                        <div className='font-[550] sm:text-lg'>{(Number(data.feels) - 271).toFixed(0)}°</div>
                    </div>

                    <div className='item my-8'>
                        <div className='h sm:text-lg font-[300]'>Wind</div>
                        <div className='font-[500] sm:text-lg'>{Number(data.windSpeed)*3.6} Km/h</div>
                    </div>

                    <div className='item my-8'>
                        <div className='h font-[300] sm:text-lg'>Humidity</div>
                        <div className='font-[500] sm:text-lg'>{data.humidity} %</div>
                    </div>


                </div>

                <div className='footer flex flex-wrap justify-center md:space-x-32 sm:space-x-20 space-x-16 py-8'>

                    <divs className='item my-8'>
                        <div className='h font-[300] sm:text-lg'>Cloudy</div>
                        <div className='font-[550] sm:text-lg'>{data.clouds}%</div>
                    </divs>

                    <div className='item my-8'>
                        <div className='h font-[300] sm:text-lg'>Pressure</div>
                        <div className='font-[500] sm:text-lg'>{data.pressure} hPa</div>
                    </div>


                    <div className='item my-8'>
                        <div className='h font-[300]'>Sunset</div>
                        <div className='font-[550] flex justify-center'>6:12</div>
                    </div>
                </div>
            </div>

            <div></div>
        </>
    )
}
