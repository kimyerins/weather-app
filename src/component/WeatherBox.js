import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWind,
  faGlassWater,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";

const WeatherBox = ({ weather, nowTime, sunrise, sunset }) => {
  //const dateOptions = { weekday: "long", month: "long", day: "numeric" };
  //const date = new Date().toLocaleDateString(undefined, dateOptions);
  return (
    <div className="weather-box">
      <p className="date">{nowTime}</p>
      <div className="tit">{weather?.name}</div>
      <div className="imgbox">
        <img
          src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
          alt=""
        />
        <span>{weather?.weather[0].description}</span>
      </div>
      <h2>
        {Math.round(weather?.main.temp)}℃
        <span>( {((weather?.main.temp * 9) / 5 + 32).toFixed(2)}℉ )</span>
      </h2>
      <p>체감온도 : {Math.round(weather?.main.feels_like)}℃</p>
      <section className="sub-weather">
        <div className="wind-info infobox">
          <div className="sub-icon">
            <FontAwesomeIcon icon={faWind} size="2x" />
          </div>
          <div className="wind-direction info-title">
            풍향 : {weather?.wind.deg}°
          </div>
          <div className="wind-velocity info-value">
            {Math.floor(weather?.wind.speed * 10) / 10}m/s
          </div>
        </div>
        <div className="humidity-info infobox">
          <div className="sub-icon">
            <FontAwesomeIcon icon={faGlassWater} size="2x" />
          </div>
          <div className="humidity-title info-title">습도</div>
          <div className="humidity-value info-value">
            {weather?.main.humidity}%
          </div>
        </div>
        <div className="rain-info infobox">
          <div className="sub-icon">
            <FontAwesomeIcon icon={faSun} size="2x" />
          </div>
          <div className="rain-title info-title">일출시간</div>
          <div className="rain-value info-value">{sunrise}</div>
        </div>
        <div className="rain-info infobox">
          <div className="sub-icon">
            <FontAwesomeIcon icon={faMoon} size="2x" />
          </div>
          <div className="rain-title info-title">일몰시간</div>
          <div className="rain-value info-value">{sunset}</div>
        </div>
      </section>
    </div>
  );
};

export default WeatherBox;
