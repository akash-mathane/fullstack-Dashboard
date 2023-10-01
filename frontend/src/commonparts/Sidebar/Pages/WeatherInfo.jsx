import React, { useState, useEffect } from 'react';

const WeatherInfo = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;


  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}`
      );

      if (!response.ok) {
        throw new Error('Weather data not found');
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError('Error fetching weather data. Please check the city name and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  const formatWeatherData = (weatherData) => {
    if (!weatherData) {
        return null; // Return null if weatherData is null
      }
    const date = new Date();
    const time = date.toLocaleTimeString('en-US','en-IN');

    return {
      city: weatherData.name,
      temperature: (weatherData.main.temp - 273.15).toFixed(1),
      feelsLike: (weatherData.main.feels_like - 273.15).toFixed(1),
      conditions: weatherData.weather[0].description,
      wind: `${weatherData.wind.speed} m/s ${weatherData.wind.deg}`,
      barometricPressure: weatherData.main.pressure,
      humidity: weatherData.main.humidity,
      dewPoint: weatherData.main.dew_point,
      visibility: weatherData.visibility,
      forecastTime: time,
    };
  };

  const weatherInfo = formatWeatherData(weatherData);

  return (
    <div>
      <h2>Weather Information</h2>
      <div>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeatherData}>Search</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weatherInfo && (
        <div>
          <h3>Weather in {weatherInfo.city}, US on {weatherInfo.forecastTime}</h3>
          <p>Temperature: {weatherInfo.temperature} °C</p>
          <p>Feels like: {weatherInfo.feelsLike} °C</p>
          <p>Conditions: {weatherInfo.conditions}</p>
          <p>Wind: {weatherInfo.wind}</p>
          <p>Barometric pressure: {weatherInfo.barometricPressure} hPa</p>
          <p>Humidity: {weatherInfo.humidity} %</p>
          <p>Dew point: {weatherInfo.dewPoint} °C</p>
          <p>Visibility: {weatherInfo.visibility} km</p>
        </div>
      )}
    </div>
  );
};

export default WeatherInfo;
