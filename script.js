function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-now");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-now");
  temperatureElement.innerHTML = 19;
}

// Date
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

// Metrics switch
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

//Search form
function search(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchCity.value}`;
  let apiKey = "134c0b4acf34377o900e12t15499b4ba";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchCity.value}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

//Form and city
let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", search);

function showPosition(position) {
  let key = "134c0b4acf34377o900e12t15499b4ba";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${key}&units=metric`;
  let h1 = document.querySelector("#new-city");
  h1.innerHTML = `${position.coords.city}`;
  axios.get(url).then(showTemperature);
}

//Current location
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#position");
button.addEventListener("click", getCurrentPosition);

//Display temperature
function showTemperature(response) {
  let currentTemperature = Math.round(response.data.temperature.current);
  let temperature = document.querySelector("#temperature-now");
  temperature.innerHTML = `${currentTemperature}`;

  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = response.data.city;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;
}

navigator.geolocation.getCurrentPosition(showPosition);
