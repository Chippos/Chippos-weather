import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=298dde8a266bb981b53ffae341d0530d`;

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      // ctns.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  async function showPosition(position) {
    url = await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=298dde8a266bb981b53ffae341d0530d`
      )
      .then((response) => {
        setData(response.data);
      });
  }
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  useEffect(() => {
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      
      <div className="container">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          type="text"
          placeholder="City"
        />
      </div>
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
            {data.sys ? <p>{data.sys.country}</p> : null}
          </div>
          <div className="temperature">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="desc">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.main ? (
          <div className="bottom">
            <div className="bottom-inner feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p className="bottom-desc">Feels Like</p>
            </div>
            <div className="bottom-inner humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p className="bottom-desc">Humidity</p>
            </div>
            <div className="bottom-inner wind">
              {data.wind ? (
                <p className="bold">{(data.wind.speed * 1.6).toFixed()} Kmh</p>
              ) : null}
              <p className="bottom-desc">Wind Speed</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
