const key = "17d66de3484c7c276a19fba52f94d56e";
const getLocationForm = document.querySelector("#locationForm");

getLocationForm.addEventListener("submit", function (e) {
  getWeatherData(getLocationForm.locationInput.value);
  e.preventDefault();
});

window.addEventListener("load", function (e) {
  getCoordinates();
  e.preventDefault();
});

async function getCoordinates() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getCityName);
  } else {
    alert("Please enable geolocation");
  }
}

async function getCityName(position) {
  console.log(position.coords);
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;


  let response = await fetch(
    `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${key}`
  ).then((response) => response.json());
    cityName = response[0].name
    console.log(response[0])
    getWeatherData(cityName);
}

async function getWeatherData(city) {
  let response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}`
  ).then((response) => response.json());
  if (response.cod !== 200) {
    console.log("Invalid location"); //Here I should replace the console message for a modal or pop up notification
  } else {
    createWeatherObject(response);
  }

  function createWeatherObject(data) {
    const weatherData = {
      name: data.name,
      timezone: data.timezone,
      main: data.weather[0].main,
      description: data.weather[0].description,
      actual_temp: data.main.temp,
      temp_min: data.main.temp_min,
      temp_max: data.main.temp_max,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
    };

    displayWeatherData(weatherData);
  }

  function displayWeatherData(data) {
    for (const key in data) {
      document.querySelector("." + key).innerText = `${data[key]}`;
    }
  }
}
