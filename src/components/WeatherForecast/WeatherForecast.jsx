// Css, hooks, api_key and components
import "./WeatherForecast.css";
import { useState, useEffect } from "react";
import { API_KEY } from "../../apiKey/ApiKey";
import WeekDay from "./WeekDays/WeekDays";
// From images
import homePageImg from "../../images/homePageImg.png";
import brokenClouds from "../../images/brokenClouds.png";
import clearSky from "../../images/clearSky.png";
import fewClouds from "../../images/fewClouds.png";
import mist from "../../images/mist.png";
import rain from "../../images/rain.png";
import scatteredClouds from "../../images/scatteredClouds.png";
import showerRain from "../../images/showerRain.png";
import snow from "../../images/snow.png";
import thunderstorm from "../../images/thunderstorm.png";
// From utils
import {
  convertKelvin,
  setDate,
  setWeekday,
  minTemp,
  maxTemp,
  descriptionUppercase,
} from "../../utils/utils";
// From mock
import { dayNames, initialDaysData } from "../../mock/mock";

//Default function
export default function WeatherForecast() {
  const [inputValue, setInputValue] = useState("");
  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [daysData, setDaysData] = useState(initialDaysData);

  const weatherDataArray = weatherData?.list;
  const weatherDescription = weatherData?.list[0]?.weather[0]?.description;

  const updatedData = [...daysData];
  updatedData.shift();

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLocation(inputValue);
  }

  useEffect(() => {
    if (!location) return;

    async function getCoords() {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${API_KEY}`
      );
      const result = await response.json();
      if (result.length > 0) {
        setLocationName(result[0].name);
        setCoords([result[0].lat, result[0].lon]);
        setError(null);
      } else {
        setError("Enter correct location name");
      }
    }
    getCoords();
  }, [location]);

  useEffect(() => {
    if (!coords) return;
    const [lat, lon] = coords;
    async function getWeatherData() {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      const result = await response.json();
      setWeatherData(result);
    }
    getWeatherData();
  }, [coords]);

  useEffect(() => {
    if (!weatherDataArray) return;

    const updatedDaysData = Array(5)
      .fill()
      .map(() => ({
        temps: [],
        icon: null,
      }));

    weatherDataArray.forEach((data) => {
      const date = data.dt_txt.split(" ")[0];
      const temp = data.main.temp;
      const icon = data.weather[0].icon.slice(0, -1);

      for (let i = 0; i < 5; i++) {
        if (date === setDate(new Date(), i)) {
          updatedDaysData[i].temps.push(temp);
          updatedDaysData[i].icon = icon;
        }
      }
    });

    setDaysData(updatedDaysData);
  }, [weatherDataArray]);

  function whichSrc(icon) {
    let src = null;
    switch (icon) {
      case "01":
        src = clearSky;
        break;
      case "02":
        src = fewClouds;
        break;
      case "03":
        src = scatteredClouds;
        break;
      case "04":
        src = brokenClouds;
        break;
      case "09":
        src = showerRain;
        break;
      case "10":
        src = rain;
        break;
      case "11":
        src = thunderstorm;
        break;
      case "13":
        src = snow;
        break;
      case "50":
        src = mist;
        break;
      default:
        src = "No src";
    }
    return src;
  }

  return (
    <div className="weatherForecast">
      <div className="imgAndTitle">
        <img
          src={
            weatherData
              ? whichSrc(weatherData?.list[0]?.weather[0]?.icon.slice(0, -1))
              : homePageImg
          }
          alt="cloudy"
          className="img"
        />
        <div className="title">
          {weatherData && <p>Today</p>}
          <h1 className={weatherData ? "h1 changeH1 " : "h1"}>
            {weatherData ? locationName : "Weather Forecast"}
          </h1>
          {weatherData && (
            <p className="description">
              {Math.round(convertKelvin(weatherData?.list[0]?.main?.temp))} °C
            </p>
          )}
          {weatherData && (
            <p className="description">
              {descriptionUppercase(weatherDescription)}
            </p>
          )}
        </div>
      </div>
      <div className={weatherData ? "inputDiv inputDivPosition" : "inputDiv"}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="textInput"
            onChange={handleChange}
            value={inputValue}
            placeholder="Enter a City..."
          />
        </form>
        <p className="error">{error && error}</p>
      </div>
      {weatherData && (
        <div className="weekDays">
          {updatedData.map((day, i) => (
            <WeekDay
              key={i}
              text={dayNames[setWeekday(new Date(), i + 1)]}
              src={whichSrc(day.icon)}
              minTemp={minTemp(day.temps)}
              maxTemp={maxTemp(day.temps)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
