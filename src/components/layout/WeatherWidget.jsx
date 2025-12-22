import { useState, useEffect } from 'react';

function WeatherWidget() {
  const [weather, setWeather] = useState({
    temp: 'Loading...',
    icon: 'wi wi-day-sunny',
    colorClass: 'default'
  });

  const getWeatherIcon = (code) => {
    const weatherIcons = {
      0: 'wi wi-day-sunny',
      1: 'wi wi-day-sunny-overcast',
      2: 'wi wi-day-cloudy',
      3: 'wi wi-cloudy',
      45: 'wi wi-fog',
      48: 'wi wi-fog',
      51: 'wi wi-sprinkle',
      53: 'wi wi-sprinkle',
      55: 'wi wi-sprinkle',
      61: 'wi wi-rain',
      63: 'wi wi-rain',
      65: 'wi wi-rain',
      71: 'wi wi-snow',
      73: 'wi wi-snow',
      75: 'wi wi-snow',
      77: 'wi wi-snow',
      80: 'wi wi-showers',
      81: 'wi wi-showers',
      82: 'wi wi-showers',
      85: 'wi wi-snow',
      86: 'wi wi-snow',
      95: 'wi wi-thunderstorm',
      96: 'wi wi-thunderstorm',
      99: 'wi wi-thunderstorm'
    };
    return weatherIcons[code] || 'wi wi-day-sunny';
  };

  const getWeatherColor = (weatherCode) => {
    if (weatherCode === 0) return 'sunny';
    if (weatherCode === 1 || weatherCode === 2) return 'partly-cloudy';
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(weatherCode)) return 'rainy';
    return 'default';
  };

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=38.6270&longitude=-90.1994&current_weather=true&temperature_unit=fahrenheit'
      );
      const data = await response.json();
      
      const temp = Math.round(data.current_weather.temperature);
      const weatherCode = data.current_weather.weathercode;
      
      setWeather({
        temp: `${temp}° F`,
        icon: getWeatherIcon(weatherCode),
        colorClass: getWeatherColor(weatherCode)
      });
    } catch (error) {
      console.error('Error fetching weather:', error);
      setWeather({
        temp: 'No Data',
        icon: 'wi wi-day-sunny',
        colorClass: 'default'
      });
    }
  };

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 600000); // Update every 10 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="weather-info">
      <a 
        href="https://weather.com/weather/today/l/Saint+Louis+MO+USMO0787:1:US" 
        target="_blank" 
        rel="noopener noreferrer"
        id="weather-container"
      >
        <span id="weather-location">St. Louis</span>
        <span id="weather-temp">{weather.temp}</span>
        <i id="weather-icon" className={`${weather.icon} ${weather.colorClass}`}></i>
      </a>
    </div>
  );
}

export default WeatherWidget;