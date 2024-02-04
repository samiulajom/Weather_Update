const condition = document.getElementById(`condition`);
const city = document.getElementById(`city`);
const country = document.getElementById(`country`);
const mainTaxt = document.getElementById(`main`);
const description = document.getElementById(`description`);
const temp = document.getElementById(`temp`);
const pressure = document.getElementById(`pressure`);
const humidity = document.getElementById(`humidity`);
const cityInput = document.getElementById(`city-input`);
const history = document.getElementById(`history`);
const API_KEY = "35cd73b5e1d07819e13570bddc14bf7a";
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;
const ICON_URL = `https://openweathermap.org/img/wn/`;
const DEFULT_CITY = `pabna,bd`;

window.onload = function () {
  navigator.geolocation.getCurrentPosition(
    (s) => {
      //console.log(s.coords);
      getWeatherData(null, s.coords);
    },
    (err) => {
      // console.log(e);
      getWeatherData();
    }
  );
};

//Search by input field
cityInput.addEventListener(`keypress`, function (e) {
  if (e.key === `Enter`) {
    if (e.target.value) {
      getWeatherData(e.target.value);
      e.target.value = ``;
    } else {
      alert(`Enter a valid city name`);
    }
  }
});

function getWeatherData(city = DEFULT_CITY, coords) {
  let url = BASE_URL;
  city === null
    ? (url = `${url}&lat=${coords.latitude}&lon=${coords.longitude}`)
    : (url = `${url}&q=${city}`);
  //request create
  axios
    .get(url)
    .then(({ data }) => {
      // console.log(data.data);
      const weather = {
        icon: data.weather[0].icon,
        city: data.name,
        country: data.sys.country,
        main: data.weather[0].main,
        temp: data.main.temp,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        description: data.weather[0].description,
      };
      setWeather(weather);
    })
    .catch((err) => {
      console.log(err);
      alert(`city is not found`);
      if (err !== null) {
        console.clear();
      }
    });
}

//kelvin to celcious
function kelvinToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(2).slice(0, 4);
}

//innerHTML A INFORMATION ADD
function setWeather(weather) {
  condition.src = `${ICON_URL}${weather.icon}.png`;
  city.innerHTML = weather.city;
  country.innerHTML = weather.country;
  mainTaxt.innerHTML = weather.main;
  pressure.innerHTML = weather.pressure;
  humidity.innerHTML = weather.humidity;
  description.innerHTML = weather.description;
  //temparature convert
  const tempStore = weather.temp;
  const celsiusTemperature = kelvinToCelsius(tempStore);
  temp.innerHTML = celsiusTemperature + `°C ,`;
}
