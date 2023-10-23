function formatDate() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let date = now.getDate();

  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} <br/> 
Last update at: ${hour}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
//Calling for format date function
let nows = document.querySelector("#today");
nows.innerHTML = formatDate();
// forcast
function showForcast(response) {
  console.log(response);
  let forcastday = response.data.daily;
  console.log(forcastday);
  let forcast = document.querySelector("#forcast");

  let forcastHTML = `<div class="row">`;

  forcastday.forEach(function (forcastdays, index) {
    if (index > 0 && index < 7) {
      forcastHTML =
        forcastHTML +
        `
            <div class="col-2 each-day">
              <div class="forcast-date">${formatDay(forcastdays.time)}</div>
              
              <img
                src="${forcastdays.condition.icon_url}"
                alt=""
                width="50px"
              />
              <div class="forcast-temprature">
                <span class="max">${Math.round(
                  forcastdays.temperature.maximum
                )}°</span>
                <span class="min">${Math.round(
                  forcastdays.temperature.minimum
                )}°</span>
              </div>
            </div>
          `;
    }
  });
  forcastHTML = forcastHTML + `</div>`;
  forcast.innerHTML = forcastHTML;
}

function getForcast(coordinates) {}
//search box
function showTemprature(response) {
  let tempreture = document.querySelector("#tempreture");
  let iconElement = document.querySelector("#icon");
  let weatherDescription = document.querySelector("#weatherDescription");
  let humidty = document.querySelector("#humidty");
  let wind = document.querySelector("#wind");
  let app = document.querySelector("#myapp");
  let descriptionIcon = response.data.condition.icon;
  let locationhere = document.querySelector("#city-location");
  tempretureC = response.data.temperature.current;
  locationhere.innerHTML = response.data.city;
  tempreture.innerHTML = Math.round(response.data.temperature.current);
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.icon);
  weatherDescription.innerHTML = response.data.condition.description;
  humidty.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed * 3.6)}km/h`;
  //call for forcast function
  let apiKeyF = "7513b452c09o45a7101tdb174f808e29";
  let urlForcast = `https://api.shecodes.io/weather/v1/forecast?query=${response.data.city}&key=${apiKeyF}&units=metric`;
  axios.get(urlForcast).then(showForcast);
  // to change backgrounds and font color based on day/night and weather on that city
  if (
    descriptionIcon === "clear-sky-night" ||
    descriptionIcon === "few-clouds-night" ||
    descriptionIcon === "scattered-clouds-night" ||
    descriptionIcon === "broken-clouds-night" ||
    descriptionIcon === "shower-rain-nighty" ||
    descriptionIcon === "rain-night" ||
    descriptionIcon === "thunderstorm-night" ||
    descriptionIcon === "snow-night" ||
    descriptionIcon === "mist-night"
  ) {
    app.style.color = "white";
    document.body.style.backgroundImage =
      "url('https://wallpapers.com/images/hd/starry-night-sky-with-moon-hd-wallpaper-background-image-u1qhinntfbrnwtnq.webp')";
  } else {
    app.style.color = "black";
    document.body.style.backgroundImage =
      "url('https://wallpapers.com/images/high/sunny-sky-view-frrv352r9lj73oxb.webp')";
  }
  if (descriptionIcon === "clear-sky-day") {
    app.style.background =
      "linear-gradient(70deg, rgb(233, 240, 158) 35.6%, rgb(168, 231, 240) 99.2%)";
  }
  if (descriptionIcon === "clear-sky-night") {
    app.style.background =
      "linear-gradient(109.6deg, rgb(18, 22, 77) 13.4%, rgb(7, 104, 168) 100.2%)";
  }
  if (
    descriptionIcon === "few-clouds-day" ||
    descriptionIcon === "scattered-clouds-day"
  ) {
    app.style.background = "linear-gradient(to right, #83a4d4, #b6fbff)";
  }
  if (
    descriptionIcon === "few-clouds-night" ||
    descriptionIcon === "scattered-clouds-night"
  ) {
    app.style.background =
      "linear-gradient(89.7deg, rgb(60, 59, 77) -10.7%, rgb(38, 96, 145) 88.8%)";
  }
  if (descriptionIcon === "broken-clouds-day") {
    app.style.background =
      "linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898";
  }
  if (descriptionIcon === "broken-clouds-night") {
    app.style.background =
      "radial-gradient(590px at 8.2% 13.8%, rgb(18, 35, 60) 0%, rgb(187, 187, 187) 90%)rgb(246, 253, 143)";
  }
  if (descriptionIcon === "shower-rain-day") {
    app.style.background =
      "linear-gradient(104.3deg, rgb(253, 243, 243) 10.9%, rgb(248, 231, 231) 27.8%, rgb(160, 112, 161) 101.7%)";
  }
  if (descriptionIcon === "shower-rain-nighty") {
    app.style.background =
      "linear-gradient(109.6deg, rgb(9, 9, 121) 11.2%, rgb(144, 6, 161) 53.7%, rgb(0, 212, 255) 100.2%)";
  }
  if (descriptionIcon === "rain-day)") {
    app.style.background = "linear-gradient(-225deg, #CBBACC 0%, #2580B3 100%)";
  }
  if (descriptionIcon === "rain-night") {
    app.style.background =
      "rgblinear-gradient(181deg, rgb(2, 0, 97) 15%, rgb(97, 149, 219) 158.5%)";
  }
  if (descriptionIcon === "thunderstorm-day") {
    app.style.background =
      "linear-gradient(87.4deg, rgb(255, 241, 165) 1.9%, rgb(200, 125, 76) 49.7%, rgb(83, 54, 54) 100.5%)";
  }
  if (descriptionIcon === "thunderstorm-night") {
    app.style.background =
      "linear-gradient(110.6deg, rgb(156, 116, 129) -18.3%, rgb(67, 54, 74) 16.4%, rgb(47, 48, 67) 68.2%, rgb(27, 23, 36) 99.1%)";
  }
  if (descriptionIcon === "snow-day") {
    app.style.background =
      "radial-gradient(253px at 12.6% 77.9%, rgb(221, 255, 214) 0.3%, rgb(214, 254, 254) 90.5%)";
  }
  if (descriptionIcon === "snow-night") {
    app.style.background =
      "linear-gradient(111.1deg, rgb(0, 40, 70) -4.8%, rgb(255, 115, 115) 82.7%, rgb(255, 175, 123) 97.2%)";
  }
  if (descriptionIcon === "mist-day") {
    app.style.background =
      "linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)";
  }
  if (descriptionIcon === "mist-night") {
    app.style.background =
      "linear-gradient(to right, #868f96 0%, #596164 100%)";
  }
}
function search(city) {
  /// call api for temprature
  let apiKey = "7513b452c09o45a7101tdb174f808e29";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(showTemprature);
}
function submitButton(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#seach-text-input");
  search(searchInput.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", submitButton);

//Celcius to Farenheit and vice verca

function showFarenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let temperatureValue = document.querySelector("#tempreture");
  let fahrenheitValue = (tempretureC * 9) / 5 + 32;
  temperatureValue.innerHTML = Math.round(fahrenheitValue);
  console.log(temperatureValue);
}

function showCelcius(event) {
  event.preventDefault();
  farenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureValue = document.querySelector("#tempreture");
  temperatureValue.innerHTML = Math.round(tempretureC);
}

let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", showFarenheit);

let celsiusLink = document.querySelector("#celcius");
celsiusLink.addEventListener("click", showCelcius);

search("Tehran");
