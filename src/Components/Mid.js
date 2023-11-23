import React, { useState, useEffect } from 'react'
import "../global.css"

export default function Mid() {
    const quotes = ["Get the cold shower!", "It's too cold sss!", "Time for some snacks!", "Go out and enjoy the weather!"]
    const [quote, setQuote] = useState("");
    const [city, setCity] = useState("");
    const [time, setTime] = useState("");
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

    let date;
    let hours;
    let minutes;
    let amOrPm;
    let hours12;
    let formattedMinutes;

    const getCity = (e) => {
        // console.log(e.target.value);
        setCity(e.target.value)
        if (e.target.value.length >= 3) {
            findData(e.target.value)
        }
    }

    const findData = async (cityName) => {
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=16845a27af80afb88887289aa22ee715`)
            const data = await res.json()
            // console.log(data);
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

            date = new Date(data.sys.sunset * 1000);
            hours = date.getHours();
            minutes = date.getMinutes();
            amOrPm = hours >= 12 ? 'PM' : 'AM';
            hours12 = hours % 12 || 12;
            formattedMinutes = (minutes < 10 ? '0' : '') + minutes;

            setTime(`${hours12}:${formattedMinutes} ${amOrPm}`)
            if (Number(data.main.temp) - 271 <= 0) {
                console.log("Ohh! ICeee");
                setQuote("Ohh! I Ceee!")
            }
            else if (Number(data.main.temp) - 271 <= 23) {
                console.log("It's cold sss!");
                setQuote("It's cold sss!");
            }
            else if (Number(data.clouds.all) >= 75) {
                setQuote("Time for some snacks!");
                console.log("Time for some snacks!");
            }
            else if (Number(data.main.temp) - 271 >= 37) {
                setQuote("Get the cold shower!");
                console.log("Get the cold shower!");
            }
            else if (Number(data.main.temp) - 271 > 23 && Number(data.temp) < 37) {
                setQuote("Go out and enjoy the weather!");
                console.log("Go out and enjoy the weather!");
            }
            console.log(data.sys.sunset);

        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {


        // console.log(quotes[0]);
    }, []);


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
                        <div className="text text-white p-2 font-thin font-medium">{quote}</div>
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
                        <div className='font-[500] sm:text-lg'>{(Number(data.windSpeed) * 3.6).toFixed(1)} Km/h</div>
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
                        <div className='font-[550] flex justify-center'>{time} (IST)</div>
                    </div>
                </div>
            </div>

            <div></div>
        </>
    )
}
