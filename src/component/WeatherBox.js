import React from "react";

const WeatherBox = ({ weather }) => {
  return (
    <div className="weather-box">
      <div className="tit">{weather?.name}</div>
      <h2>
        {Math.round(weather?.main.temp)}º<br />
        <span>화씨: {((weather?.main.temp * 9) / 5 + 32).toFixed(2)}℉</span>
      </h2>
      <h3>{weather?.weather[0].description}</h3>
    </div>
  );
};

export default WeatherBox;
