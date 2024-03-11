// FOR EFFECTS OF SIDEBAR ITEMS
document.addEventListener("DOMContentLoaded", function () {
  const lis = document.querySelectorAll(".side-items ul li");
  let lastClickedTab = localStorage.getItem("lastClickedTab");

  lis.forEach((li) => {
    li.addEventListener("click", function () {
      lis.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");
      localStorage.setItem("lastClickedTab", this.id);
    });
  });

  if (lastClickedTab) {
    document.getElementById(lastClickedTab).click();
  } else {
    document.getElementById("tab1").click();
  }
});

//   FOR TAB FUNCTIONALITY
function openTab(tabName) {
  let tabs = document.querySelectorAll(".tab");
  tabs.forEach(function (tab) {
    tab.style.display = "none";
  });

  let selectedTab = document.querySelector("." + tabName);
  selectedTab.style.display = "block";

  localStorage.setItem("lastTab", tabName);

  document.addEventListener("DOMContentLoaded", function () {
    let lastTab = localStorage.getItem("lastTab");
    if (lastTab) {
      openTab(lastTab);
    } else {
      openTab(".main-dashboard");
    }
  });
}

// TIME FUNCTION
function updateTime() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  let meridiem = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  let currentTime = hours + " : " + minutes + " " + meridiem;

  document
    .querySelectorAll(".current-time")
    .forEach((elem) => (elem.textContent = currentTime));
}

setInterval(updateTime, 60000);
updateTime();

// FOR {WEEK,DATE,MONTH,YEAR}
function updateDateInfo() {
  let now = new Date();
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let weekday = weekdays[now.getDay()];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();

  document
    .querySelectorAll(".weekday")
    .forEach((elem) => (elem.textContent = weekday));
  document
    .querySelectorAll(".date")
    .forEach((elem) => (elem.textContent = date));
  document
    .querySelectorAll(".month")
    .forEach((elem) => (elem.textContent = month));
  document
    .querySelectorAll(".year")
    .forEach((elem) => (elem.textContent = year));

  document
    .querySelectorAll(".date-one")
    .forEach((elem) => (elem.textContent = date + 1));
  document
    .querySelectorAll(".date-two")
    .forEach((elem) => (elem.textContent = date + 2));
  document
    .querySelectorAll(".date-three")
    .forEach((elem) => (elem.textContent = date + 3));
  document
    .querySelectorAll(".date-four")
    .forEach((elem) => (elem.textContent = date + 4));
  document
    .querySelectorAll(".date-five")
    .forEach((elem) => (elem.textContent = date + 5));
  document
    .querySelectorAll(".date-six")
    .forEach((elem) => (elem.textContent = date + 6));
}

updateDateInfo();

// FOR GREETING (GOOD MORINING/AFTERNOON/NIGHT)
document.addEventListener("DOMContentLoaded", function () {
  let now = new Date();
  let hour = now.getHours();

  let images = document.querySelectorAll(".greet-img img");
  let greetingText = document.querySelector(".greet-txt");

  function hideImages() {
    images.forEach(function (image) {
      image.style.display = "none";
    });
  }

  if (hour >= 6 && hour < 12) {
    greetingText.textContent = "Good Morning";
    hideImages();
    images[0].style.display = "inline-block";
  } else if (hour >= 12 && hour < 18) {
    greetingText.textContent = "Good Afternoon";
    hideImages();
    images[1].style.display = "inline-block";
  } else if (hour >= 18 && hour < 22) {
    greetingText.textContent = "Good Evening";
    hideImages();
    images[2].style.display = "inline-block";
  } else {
    greetingText.textContent = "Good Night";
    hideImages();
    images[3].style.display = "inline-block";
  }
});

// WEATHER INFO CARD
let currentTime = new Date().getHours();
let dayFrames = document.querySelectorAll(".weather-info-day");
let nightFrames = document.querySelectorAll(".weather-info-night");

if (currentTime >= 6 && currentTime < 18) {
  dayFrames.forEach(function (frame) {
    frame.style.display = "block";
  });
  nightFrames.forEach(function (frame) {
    frame.style.display = "none";
  });
} else {
  dayFrames.forEach(function (frame) {
    frame.style.display = "none";
  });
  nightFrames.forEach(function (frame) {
    frame.style.display = "block";
  });
}


// window.addEventListener('load', () => {
//   const apiKey = '5011ce3a9e2ec87d56592fa5442d01ff'; // Replace with your actual API key
//   const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=India&appid=' + apiKey;

//   fetch(apiUrl)
//     .then(response => response.json())
//     .then(data => {
//       console.log(data); // Check the console to see the fetched data structure

//       // Update city name
//       const cityNameElement = document.querySelector('.city-name');
//       cityNameElement.textContent = data.name;

//       // Update temperature
//       const temperatureElement = document.querySelector('.weather-info-card-temp');
//       temperatureElement.textContent = Math.round(data.main.temp - 273.15) + '°C';

//       // Update wind speed
//       const windSpeedElement = document.querySelector('.wind-speed');
//       windSpeedElement.textContent = data.wind.speed + ' m/s';

//       // Update humidity
//       const humidityElement = document.querySelector('.Humidity-speed');
//       humidityElement.textContent = data.main.humidity + '%';
//     })
//     .catch(error => {
//       console.error('Error fetching weather data:', error);
//     });
// });






