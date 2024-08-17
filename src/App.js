import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";

// 1. 앱이 실행되자마자 현재 위치기반의 날씨가 보인다.
// 2. 날씨정보에는 도시,섭씨,화씨,날씨상태 정보
// 3. 5개의 버튼이 있다(현재위치,4개는 다른도시)
// 4. 도시버튼을 클릭할때마다 그 도시별 날씨가 나온다
// 5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다
// 6. 데이터를 들고오는동안 로딩 스피너가 돈다

function App() {
  const [weather, setWeather] = useState(null);
  const cities = ["Paris", "New York", "London", "Busan"];
  const getCureentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };
  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e6165bd32260da75dd9ce4c32685bf52&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    //console.log(data);
    setWeather(data);
  };
  useEffect(() => {
    getCureentLocation();
  }, []);
  return (
    <div>
      <div className="container">
        <div class="inWrap">
          <WeatherBox weather={weather} />
          <WeatherButton cities={cities} />
        </div>
      </div>
    </div>
  );
}

export default App;
