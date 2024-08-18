import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

// 1. 앱이 실행되자마자 현재 위치기반의 날씨가 보인다.
// 2. 날씨정보에는 도시,섭씨,화씨,날씨상태 정보
// 3. 5개의 버튼이 있다(현재위치,4개는 다른도시)
// 4. 도시버튼을 클릭할때마다 그 도시별 날씨가 나온다
// 5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다
// 6. 데이터를 들고오는동안 로딩 스피너가 돈다

function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const cities = ["Paris", "New York", "London", "Busan"];
  const getCureentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };
  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setApiError(err.message);
      setLoading(false);
    }
  };
  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setApiError(err.message);
      setLoading(false);
    }
  };
  const handleCityChange = (city) => {
    if (city === "current") {
      setCity("");
    } else {
      setCity(city);
    }
  };
  useEffect(() => {
    if (city === "") {
      setLoading(true);
      getCureentLocation();
    } else {
      setLoading(true);
      getWeatherByCity();
    }
  }, [city]);
  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader
            color="#f88c6b"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : !apiError ? (
        <div className="container">
          <div className="inWrap">
            <WeatherBox weather={weather} />
            <WeatherButton
              cities={cities}
              setCity={setCity}
              handleCityChange={handleCityChange}
              selectedCity={city}
            />
          </div>
        </div>
      ) : (
        apiError
      )}
    </div>
  );
}

export default App;
