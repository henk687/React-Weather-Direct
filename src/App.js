import React, { useState } from 'react';

const api = {
  key: "39f28224114a2e41a1c95073190c06ee",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];  
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp < 0) ? 'app cold' : (weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>  
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="weathervalues">
              <div className="temp">
                {Math.round(weather.main.temp)}°c
              </div>
              <div className="temp">
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}/>
              </div>
            </div>
            <div className="weather">
              {weather.weather[0].description}
            </div>
            <div className="weathervalues2">
              <div className="weathercard">
                <span class="weathercardspan"><p class="alignleft">Feels Like </p><p class="alignright">{Math.round(weather.main.feels_like)} °c</p></span>
                <span class="weathercardspan"><p class="alignleft">High / Low</p><p class="alignright">{Math.round(weather.main.temp_max)} °c /{" "}{Math.round(weather.main.temp_min)} °c</p></span>
                <span class="weathercardspan"><p class="alignleft">Wind </p><p class="alignright">{weather.wind.speed} m/s</p></span>
              </div>
              <div className="weathercard">
                <span class="weathercardspan"><p class="alignleft">Humidity </p><p class="alignright">{weather.main.humidity} %</p></span>
                <span class="weathercardspan"><p class="alignleft">Pressure </p><p class="alignright">{weather.main.pressure} hPa</p></span>
                <span class="weathercardspan"><p class="alignleft">Visibility </p><p class="alignright">{weather.visibility / 1000} Km</p></span>
                
              </div>
            </div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
