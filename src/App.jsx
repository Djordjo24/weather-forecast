import "./App.css";

import Background from "./components/Backround/Background.jsx";
import WeatherForecast from "./components/WeatherForecast/WeatherForecast.jsx";

function App() {
  return (
    <div>
      <Background>
        <WeatherForecast />
      </Background>
    </div>
  );
}

export default App;
