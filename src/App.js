import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [temp, setTemp] = useState('');
  const [desc, setDesc] = useState('');
  const [icon, setIcon] = useState('');
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
  const [city, setCity] = useState('');
  const [isReady, setReady] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [searchCity, setSearchCity] = useState('');

  useEffect(() => { 
    if (!latitude || !longitude) return; 
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=20b987d5a3a8f6a7a0445e53be60c108&units=metric`)
      .then(result => result.json())
      .then(jsonresult => {
        setTemp(jsonresult.main.temp);
        setDesc(jsonresult.weather[0].main);
        setIcon(jsonresult.weather[0].icon);
        setSunrise(new Date(jsonresult.sys.sunrise * 1000).toLocaleTimeString());
        setSunset(new Date(jsonresult.sys.sunset * 1000).toLocaleTimeString());
        setCity(jsonresult.name); 
        setReady(true);
      })
      .catch(err => console.error(err));
  }, [latitude, longitude]);

  useEffect(() => { 
    if (!searchCity) return; 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=26d300ac267851f2af3e1cbf5e194266&units=metric`)
      .then(result => result.json())
      .then(jsonresult => {
        setTemp(jsonresult.main.temp);
        setDesc(jsonresult.weather[0].main);
        setIcon(jsonresult.weather[0].icon);
        setSunrise(new Date(jsonresult.sys.sunrise * 1000).toLocaleTimeString());
        setSunset(new Date(jsonresult.sys.sunset * 1000).toLocaleTimeString());
        setCity(jsonresult.name); 
        setReady(true);
      })
      .catch(err => console.error(err));
  }, [searchCity]);

  const handleLatitudeChange = (event) => {
    setLatitude(event.target.value);
  };

  const handleLongitudeChange = (event) => {
    setLongitude(event.target.value);
  };

  const handleSearchCityChange = (event) => {
    setSearchCity(event.target.value);
  };

  const handleSubmit = () => {
    setReady(false); 
  };

  const temperatureColor = temp < 15 ? 'alert-primary' : temp < 25 ? 'alert-warning' : 'alert-danger';

  return (
    <div className="container mt-5">
      <div className="bg-dark text-white">
        <h1 className="text-center mb-4">DALAL AK JAME SY APPLI METEO DE KHADIJA</h1>
      </div>
      <div className="row justify-content-center">
        <div align="center">
          <div className="col-lg-6">
            <div align="center">
              <div className="form-group">
                <h2 className="text-primary">RECHERCHE PAR VILLE</h2>
                <label htmlFor="searchCity">City:</label>
                <input type="text" className="form-control" id="searchCity" value={searchCity} onChange={handleSearchCityChange} />
              </div>
              <div className="form-group">
                <h2 className="text-primary">Put coordinates</h2>
                <label htmlFor="latitude">Latitude:</label>
                <input type="text" className="form-control" id="latitude" value={latitude} onChange={handleLatitudeChange} />
              </div>
              <div className="form-group">
                <label htmlFor="longitude">Longitude:</label>
                <input type="text" className="form-control" id="longitude" value={longitude} onChange={handleLongitudeChange} />
              </div>
        
              <br/><br/>
              {isReady ? (
                <div className={`alert ${temperatureColor}`} role="alert">
                  <h4 className="alert-heading">Ville: {city}</h4>
                  <p className="mb-1">Temperature: {temp} °C</p>
                  <p className="mb-1">Main: {desc}</p>
                  <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather icon" className="mb-3" />
                  <p className="mb-1">Sunrise: {sunrise}</p>
                  <p className="mb-0">Sunset: {sunset}</p>
                </div>
              ) : (
                <div className="text-center">Loading...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
