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
import { convertKelvin } from "../../utils/utils";
import { setDate } from "../../utils/utils";
import { setWeekday } from "../../utils/utils";
import { minTemp } from "../../utils/utils";
import { maxTemp } from "../../utils/utils";
import { descriptionUppercase } from "../../utils/utils";
// From mock
import { dayNames } from "../../mock/mock";
import { daysTempAndIcon } from "../../mock/mock";

//Default function
export default function WeatherForecast() {
  const [inputValue, setInputValue] = useState("");
  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [enterPressed, setEnterPressed] = useState(false);
  const [error, setError] = useState(null);

  const weatherDataArray = weatherData?.list;
  const weatherDescription = weatherData?.list[0]?.weather[0]?.description;

  function handleChange(e) {
    const value = e.target.value;
    setInputValue(value);
  }

  function handleOnKeyDown(e) {
    if (inputValue && e.keyCode === 13) {
      setEnterPressed(true);
      setLocation(inputValue);
    }
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

  for (let i = 0; i < weatherDataArray?.length; i++) {
    const todayDataString = weatherData?.list[i]?.dt_txt.split(" ")[0];

    switch (todayDataString) {
      case setDate(new Date()):
        daysTempAndIcon[0] = {
          ...daysTempAndIcon[0],
          todayTemp: [
            ...daysTempAndIcon[0].todayTemp,
            weatherData?.list[i]?.main?.temp,
          ],
          todayIcon: weatherData?.list[i]?.weather[0]?.icon.slice(0, -1),
        };
        break;
      case setDate(new Date(), 1):
        daysTempAndIcon[1] = {
          ...daysTempAndIcon[1],
          tomorowTemp: [
            ...daysTempAndIcon[1].tomorowTemp,
            weatherData?.list[i]?.main?.temp,
          ],
          tomorowIcon: weatherData?.list[i]?.weather[0]?.icon.slice(0, -1),
        };

        break;
      case setDate(new Date(), 2):
        daysTempAndIcon[2] = {
          ...daysTempAndIcon[2],
          twoDaysAfterTemp: [
            ...daysTempAndIcon[2].twoDaysAfterTemp,
            weatherData?.list[i]?.main?.temp,
          ],
          twoDaysAfterIcon: weatherData?.list[i]?.weather[0]?.icon.slice(0, -1),
        };
        break;
      case setDate(new Date(), 3):
        daysTempAndIcon[3] = {
          ...daysTempAndIcon[3],
          threeDaysAfterTemp: [
            ...daysTempAndIcon[3].threeDaysAfterTemp,
            weatherData?.list[i]?.main?.temp,
          ],
          threeDaysAfterIcon: weatherData?.list[i]?.weather[0]?.icon.slice(
            0,
            -1
          ),
        };
        break;
      case setDate(new Date(), 4):
        daysTempAndIcon[4] = {
          ...daysTempAndIcon[4],
          fourDaysAfterTemp: [
            ...daysTempAndIcon[4].fourDaysAfterTemp,
            weatherData?.list[i]?.main?.temp,
          ],
          fourDaysAfterIcon: weatherData?.list[i]?.weather[0]?.icon.slice(
            0,
            -1
          ),
        };
        break;
      default:
        daysTempAndIcon[5] = {
          ...daysTempAndIcon[5],
          fiveDaysAfterTemp: [
            ...daysTempAndIcon[5].fiveDaysAfterTemp,
            weatherData?.list[i]?.main?.temp,
          ],
          fiveDaysAfterIcon: weatherData?.list[i]?.weather[0]?.icon.slice(
            0,
            -1
          ),
        };
        break;
    }
  }
  
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
            enterPressed && weatherData
              ? whichSrc(weatherData?.list[0]?.weather[0]?.icon.slice(0, -1))
              : homePageImg
          }
          alt="cloudy"
          className="img"
        />
        <div className="title">
          {enterPressed && weatherData && <p>Today</p>}
          <h1 className={enterPressed && weatherData ? "h1 changeH1 " : "h1"}>
            {enterPressed && weatherData ? locationName : "Weather Forecast"}
          </h1>
          {enterPressed && weatherData && (
            <p className="description">
              {Math.round(convertKelvin(weatherData?.list[0]?.main?.temp))} °C
            </p>
          )}
          {enterPressed && weatherData && (
            <p className="description">
              {descriptionUppercase(weatherDescription)}
            </p>
          )}
        </div>
      </div>
      <div
        className={
          enterPressed && weatherData ? "inputDiv inputDivPosition" : "inputDiv"
        }
      >
        <input
          type="text"
          className="textInput"
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => handleOnKeyDown(e)}
          value={inputValue}
          placeholder="Enter a City..."
        />
        <p className="error">{error && error}</p>
      </div>
      {enterPressed && weatherData && (
        <div className="weekDays">
          <WeekDay
            text={dayNames[setWeekday(new Date(), 1)]}
            src={whichSrc(daysTempAndIcon[1].tomorowIcon)}
            minTemp={minTemp(daysTempAndIcon[1].tomorowTemp)}
            maxTemp={maxTemp(daysTempAndIcon[1].tomorowTemp)}
          />
          <WeekDay
            text={dayNames[setWeekday(new Date(), 2)]}
            src={whichSrc(daysTempAndIcon[2].twoDaysAfterIcon)}
            minTemp={minTemp(daysTempAndIcon[2].twoDaysAfterTemp)}
            maxTemp={maxTemp(daysTempAndIcon[2].twoDaysAfterTemp)}
          />
          <WeekDay
            text={dayNames[setWeekday(new Date(), 3)]}
            src={whichSrc(daysTempAndIcon[3].threeDaysAfterIcon)}
            minTemp={minTemp(daysTempAndIcon[3].threeDaysAfterTemp)}
            maxTemp={maxTemp(daysTempAndIcon[3].threeDaysAfterTemp)}
          />
          <WeekDay
            text={dayNames[setWeekday(new Date(), 4)]}
            src={whichSrc(daysTempAndIcon[4].fourDaysAfterIcon)}
            minTemp={minTemp(daysTempAndIcon[4].fourDaysAfterTemp)}
            maxTemp={maxTemp(daysTempAndIcon[4].fourDaysAfterTemp)}
          />
        </div>
      )}
    </div>
  );
}
