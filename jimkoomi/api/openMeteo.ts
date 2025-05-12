import axios from 'axios';
import moment from 'moment';

const url = 'https://api.open-meteo.com/v1/forecast';

export const fetchWeatherData = async (
  lat: number,
  lon: number,
  startDate: string,
  duration: number
) => {
  const endDate = moment(startDate).add(duration, 'days').format('YYYY-MM-DD');
  const maxDate = moment(new Date()).add(15, 'days').format('YYYY-MM-DD');

  if (moment(startDate).isAfter(maxDate)) {
    return null;
  }

  const params = {
    latitude: lat,
    longitude: lon,
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    start_date: startDate,
    end_date: moment(endDate).isAfter(maxDate) ? maxDate : endDate,
  };

  try {
    const responses = await axios.get(url, {
      params,
    });

    const data = responses.data;

    const daily = data.daily;
    if (!daily) {
      return null;
    } else {
      const weatherData = {
        time: Array.isArray(daily.time) ? daily.time : [],
        weatherCode: Array.isArray(daily.weather_code)
          ? daily.weather_code
          : [],
        temperatureMax: Array.isArray(daily.temperature_2m_max)
          ? daily.temperature_2m_max
          : [],
        temperatureMin: Array.isArray(daily.temperature_2m_min)
          ? daily.temperature_2m_min
          : [],
      };
      console.log('weatherData', weatherData);
      return weatherData;
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};
