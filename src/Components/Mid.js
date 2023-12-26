import React, { useState, useEffect } from 'react'
import "../global.css"

export default function Mid() {
    const [city, setCity] = useState("");
    const [time, setTime] = useState("");
    const [data, setData] = useState({
        temp: "298",
        clouds: "",
        humidity: "",
        windSpeed: "",
        feels: "271",
        intensity: '',
        pressure: '',
        sunset: ''
    })
    const [show, setShow] = useState('');

    let date;
    let hours;
    let minutes;
    let amOrPm;
    let hours12;
    let formattedMinutes;

    const getCity = (e) => {
        setCity(e.target.value)
        console.log("Show",show, e.target.value.length);

        if (e.target.value.length >= 3) {
            findData(e.target.value)
        }
        else {
            setData({
                temp: "298",
                clouds: "",
                humidity: "",
                windSpeed: "",
                feels: "271",
                intensity: "",
                pressure: "",
                sunset: ""
            })
        }
    }

    const findData = async (cityName) => {
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=16845a27af80afb88887289aa22ee715`)
            const data = await res.json();
            console.log("Data", data.cod);
            if (data.cod === 200 ) {
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

                console.log(show, data.main.temp);
                setShow(`${(Number(data.main.temp) - 271).toFixed(0)}°`)

                date = new Date(data.sys.sunset * 1000);
                hours = date.getHours();
                minutes = date.getMinutes();
                amOrPm = hours >= 12 ? 'PM' : 'AM';
                hours12 = hours % 12 || 12;
                formattedMinutes = (minutes < 10 ? '0' : '') + minutes;

                setTime(`${hours12}:${formattedMinutes} ${amOrPm}`)
                if (Number(data.main.temp) - 271 <= 0) {
                    console.log("Ohh! ICeee");
                }
                else if (Number(data.main.temp) - 271 <= 23) {
                    console.log("It's cold sss!");
                }
                else if (Number(data.clouds.all) >= 75) {
                    console.log("Time for some snacks!");
                }
                else if (Number(data.main.temp) - 271 >= 37) {
                    console.log("Get the cold shower!");
                }
                else if (Number(data.main.temp) - 271 > 23 && Number(data.temp) < 37) {
                    console.log("Go out and enjoy the weather!");
                }
                console.log(data.sys.sunset);
            }
            else {
                setShow(100)
                setData({
                    temp: "",
                    clouds: "",
                    humidity: "",
                    windSpeed: "",
                    feels: "271",
                    intensity: "",
                    pressure: "",
                    sunset: ""
                })
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    

    return (
        <>
            <div className="wrapper font-sans flex justify-center h-96 bg-[#53c8ef]">
                <div className="wrap py-16">
                    <div className="top">
                        <input
                            className="search rounded-3xl sm:w-[450px] w-[300px] px-4 py-1.5 border-2  outline-none border-transparent"
                            type='search'
                            value={city}
                            onChange={getCity}
                            placeholder='Search location'
                        />
                    </div>
                    <div className="temp my-10">
                        {show.length < 4 ? (
                            <div className="temp  text-white font-base text-9xl"> {show}</div>
                        ) : (
                            <div className="text-white text-center font-medium">no city found!</div>
                        )}
                    </div>

                </div>
            </div>

            <div className='mid py-8 -mt-10 bg-white rounded-t-[50px]'>
                <div className='footer flex flex-wrap justify-center md:space-x-32 sm:space-x-20 space-x-12 py-8'>
                    <div className='item my-8'>
                        <div className='h sm:text-lg px-2 font-[600]'>Real Feel</div>
                        <div className='font-[300] sm:text-lg text-center text-gray-600'>{(Number(data.feels) - 271).toFixed(0)}°</div>
                    </div>

                    <div className='item my-8'>
                        <div className='h sm:text-lg px-2 font-[600]'>Wind</div>
                        <div className='font-[300] text-center text-gray-600 sm:text-lg'>{(Number(data.windSpeed) * 3.6).toFixed(1)} Km/h</div>
                    </div>

                    <div className='item my-8'>
                        <div className='h font-[600] px-2 sm:text-lg'>Humidity</div>
                        <div className='font-[300] sm:text-lg text-center text-gray-600'>{data.humidity} %</div>
                    </div>
                </div>

                <div className='footer flex flex-wrap justify-center md:space-x-36 sm:space-x-24 space-x-12 py-8'>

                    <divs className='item my-8'>
                        <div className='h font-[600] px-2 sm:text-lg'>Cloudy</div>
                        <div className='font-[300] sm:text-lg text-center text-gray-600'>{data.clouds}%</div>
                    </divs>

                    <div className='item my-8'>
                        <div className='h font-[600] px-2 sm:text-lg'>Pressure</div>
                        <div className='font-[300] sm:text-lg text-center text-gray-600'>{data.pressure} hPa</div>
                    </div>


                    <div className='item my-8'>
                        <div className='h px-2 font-[600]'>Sunset</div>
                        <div className='font-[300] flex justify-center text-center text-gray-600'>{time} (IST)</div>
                    </div>
                </div>
            </div>
        </>
    )
}
