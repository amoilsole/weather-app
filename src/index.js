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
    "Saturday"
  ];

  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}
function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=55abca154d60e1171b937b32c74baf87&units=metric`;
  axios.get(url).then(updateWeather);
}

function currentLocationWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "55abca154d60e1171b937b32c74baf87";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(updateWeather);
}

function updateWeather(response) {
  let temp = response.data.main.temp;
  let description = response.data.weather[0].main;
  temp = Math.round(temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = temp;
  let descriptionElement = document.querySelector("#weater-description");
  descriptionElement.innerHTML = description;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let currentLocationButton = document.querySelector("#buttonCurrent");
currentLocationButton.addEventListener("click", currentLocationWeather);
