import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const WeatherButton = ({ cities, setCity, handleCityChange, selectedCity }) => {
  return (
    <div className="btns">
      <Button
        className={`${selectedCity === "" ? "active" : "an-active"}`}
        onClick={() => handleCityChange("current")}
      >
        Current Location
      </Button>
      {cities.map((item, index) => (
        <Button
          key={index}
          className={`${selectedCity === item ? "active" : "an-active"}`}
          onClick={() => setCity(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
