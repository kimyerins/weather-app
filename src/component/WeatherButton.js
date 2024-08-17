import React from "react";
import Button from "react-bootstrap/Button";

const WeatherButton = ({ cities }) => {
  console.log("cities", cities);
  return (
    <div className="btns">
      <Button>Current Location</Button>
      {cities.map((item) => (
        <Button>{item}</Button>
      ))}
    </div>
  );
};

export default WeatherButton;
