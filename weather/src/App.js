import React, { useState , useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [countryFlag , setCountryFlag] = useState('');

  // country flag based on the code
  useEffect(() => {
    if(data.sys && data.sys.country){
      fetch(`https://restcountries.com/v2/alpha/${data.sys.country}`)
      .then(res => res.json())
      .then(data =>{
        if(data.flags){
          setCountryFlag(data.flags.png)
        }
      })
      .catch(error => {
        console.log('Error fetching flag','error')
      });
    }
  },[data]);



var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var currentTime = today.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' });


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=bf2bc6bbcd70057a1882c61b48d7ca4c`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder='Enter Location'
          type="text"
        />
      </div>
      <br></br>
      
      <div className="container">
        <div className="top">
          <br></br>
            <div className="location">
                {data.name ? <h2>{data.name}, {data.sys.country}</h2> : null}
            </div>
            <br></br>
            <div className="flag">
              {countryFlag ? <img src={countryFlag} alt="country flag" /> : null}
            </div>

            <br></br>
            <div className = "currentTime">
                <p>Current Time: {currentTime}</p>
            </div>
            <div className= "date">
                <p>Date: {date}</p>
            </div>
            <br></br>
          <p>Temperature is as follows:</p>
          <div className="temp">
            <p>Celsius</p>
            {data.main ? <h2>{Math.round(data.main.temp)}°C</h2> : null}
          </div>
          <p>Fahren</p>
          <div className="temp">
            {data.main ? <h2>{Math.round(data.main.temp * 9/5 + 32)}°F</h2> : null}
          </div>
          
        <div className="description">
            <p>Weather Condition: </p>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
          {/* is it possible to display an image(icon) for the description */}
          <div className="icon">
            {data.weather ? <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="weather icon"/> : null}
          </div>
          <br></br>
        <div className="sunrise">
            {data.sys ? <p>{new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p> : null}
            <p>Sunrise</p>
        </div>
            <div className="sunset">
            {data.sys ? <p>{new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p> : null}
            <p>Sunset</p>
        </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels-like">
              {data.main ? <p className='bold'>{Math.round(data.main.feels_like)}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
            <div className="pressure">
              {data.main ? <p className='bold'>{data.main.pressure} hPa</p> : null}
              <p>Pressure</p>
            </div>
            <div className="visibility">
              {data.visibility ? <p className='bold'>{data.visibility / 1000} km</p> : null}
              <p>Visibility</p>
            </div>
            <div className="min-temp">
              {data.main ? <p className='bold'>{Math.round(data.main.temp_min)}°C</p> : null}
              <p>Min Temp</p>
            </div>
            <div className="max-temp">
              {data.main ? <p className='bold'>{Math.round(data.main.temp_max)}°C</p> : null}
              <p>Max Temp</p>
            </div>
          </div>
        )}
        {/* Table to display forecast for following days */}
        <div className="forecast">
          <table className="fore">
          <tbody>
      <tr>
        <td>{date}</td>
        <td>{data.main ? <p className='bold'>{Math.round(data.main.temp)}°C</p> : null}</td>
        <td>
          {data.weather ? <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="weather icon"/> : null}
        </td>
      </tr>
      <tr>
        <td>{date}</td>
        <td>{data.main ? <p className='bold'>{Math.round(data.main.temp)}°C</p> : null}</td>
        <td>
          {data.weather ? <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="weather icon"/> : null}
        </td>
      </tr>
      <tr>
        <td>{date}</td>
        <td>{data.main ? <p className='bold'>{Math.round(data.main.temp)}°C</p> : null}</td>
        <td>
          {data.weather ? <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="weather icon"/> : null}
        </td>
      </tr>
      <tr>
        <td>{date}</td>
        <td>{data.main ? <p className='bold'>{Math.round(data.main.temp)}°C</p> : null}</td>       
        <td>
          {data.weather ? <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="weather icon"/> : null}
        </td>
      </tr>
    </tbody>
  </table>
</div>
</div>
</div>

  );
}

export default App;