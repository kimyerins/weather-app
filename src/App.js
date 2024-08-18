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
  const [nowTime, setNowTime] = useState("");
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const cities = ["Paris", "New York", "Canada", "Harbin"];
  const getCureentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };
  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=kr`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      const localSunriseTime = calcUnixToLocalTime(data.sys.sunrise);
      setSunrise(localSunriseTime);
      const localSunsetTime = calcUnixToLocalTime(data.sys.sunset);
      setSunset(localSunsetTime);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=kr`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      // 상태가 설정된 후에 sunrise와 sunset 시간을 계산
      const localSunriseTime = calcUnixToLocalTime(data.sys.sunrise);
      setSunrise(localSunriseTime);
      const localSunsetTime = calcUnixToLocalTime(data.sys.sunset);
      setSunset(localSunsetTime);
    } catch (err) {
      setApiError(err.message);
    } finally {
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
  const calcUnixToLocalTime = (unix) => {
    const date = new Date(unix * 1000);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;

    return formattedTime;
  };

  const getCurrentDateTime = () => {
    const now = new Date();

    const month = String(now.getMonth() + 1);
    const day = String(now.getDate()).padStart(2, "0");

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    const formattedTime = `${month}/${day} ${hours}:${minutes}`;

    return formattedTime;
  };
  useEffect(() => {
    if (city === "") {
      setLoading(true);
      getCureentLocation();
      setNowTime(getCurrentDateTime());
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
            <WeatherButton
              cities={cities}
              setCity={setCity}
              handleCityChange={handleCityChange}
              selectedCity={city}
            />
            <WeatherBox
              weather={weather}
              nowTime={nowTime}
              sunrise={sunrise}
              sunset={sunset}
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
