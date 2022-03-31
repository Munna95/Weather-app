const key = "17d66de3484c7c276a19fba52f94d56e";
const getLocationForm = document.querySelector("#locationForm");

window.addEventListener("load", function (e) {
  console.log("loaded");
  getCoordinates();
  e.preventDefault();
});

getLocationForm.addEventListener("submit", function (e) {
  getWeatherData(getLocationForm.locationInput.value);
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
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  let response = await fetch(
    `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${key}`
  ).then((response) => response.json());
  cityName = response[0].name;
  getWeatherData(cityName);
}

async function getWeatherData(city) {
  let response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&humidity=humidity.unit&pressure=pressure.unit&APPID=${key}`
  ).then((response) => response.json());
  if (response.cod !== 200) {
    console.log("Invalid location"); //Here I should replace the console message for a modal or pop up notification
  } else {
    createWeatherObject(response);
  }

  function createWeatherObject(data) {
    const weatherData = {
      name: data.name,
      timezone: "GMT" + data.timezone / 3600,
      main: data.weather[0].main,
      actual_temp: data.main.temp.toFixed(1) + "°",
      temp_min: data.main.temp_min.toFixed(1) + "°",
      temp_max: data.main.temp_max.toFixed(1) + "°",
      pressure: data.main.pressure + " hPa",
      humidity: data.main.humidity + "%"
    };
    const weatherIcon = data.weather[0].icon;
    displayWeatherData(weatherData, weatherIcon);
  }

  function displayWeatherData(data, icon) {
    document.getElementById(
      "weatherImg"
    ).src = `https://openweathermap.org/img/wn/${icon}@4x.png`;
    for (const key in data) {
      document.querySelector("." + key).innerText = `${data[key]}`;
    }
  }
}
