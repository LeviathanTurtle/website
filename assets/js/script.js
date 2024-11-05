'use strict';

/* ------ */

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}


/* --- API STUFF --- */
// dog api stuff
document.getElementById('fetch-dog-fact').addEventListener('click', fetchDogFact);
function fetchDogFact() {
  const factPromise = fetch('https://dog-api.kinduff.com/api/facts')
    .then(response => response.json())
    .then(data => {
      const fact = data.facts[0]; // get fact from response
      document.getElementById('dog-fact').textContent = fact;
    })
    .catch(error => {
      console.error('Error fetching dog fact:', error);
      document.getElementById('dog-fact').textContent = 'Failed to load a dog fact!';
    });

    // get dog image
    const imagePromise = fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(data => {
        const imageUrl = data.message;
        const dogImageElement = document.getElementById('dog-image');
        dogImageElement.src = imageUrl;
        dogImageElement.style.display = 'flex';
      })
      .catch(error => {
        console.error('Error fetching dog image:', error);
      });

  // wait for both API requests to complete
  Promise.all([factPromise, imagePromise]);
}

// cat api stuff
document.getElementById('fetch-cat-fact').addEventListener('click', fetchCatFact);
function fetchCatFact() {
  const factPromise = fetch('https://catfact.ninja/fact')
    .then(response => response.json())
    .then(data => {
      const fact = data.fact; // get fact from response
      document.getElementById('cat-fact').textContent = fact; // update HTML text
    })
    .catch(error => {
      console.error('Error fetching cat fact:', error);
      document.getElementById('cat-fact').textContent = 'Failed to load a cat fact!';
    });

  // get cat image
  const catImageElement = document.getElementById('cat-image');
  // direct link to image, uses timestamp to prevent caching
  catImageElement.src = `https://cataas.com/cat?${new Date().getTime()}`;
  catImageElement.style.display = 'flex';
}

// fox api stuff
document.getElementById('fetch-fox-fact').addEventListener('click', fetchFoxImg);
function fetchFoxImg() {
  const imagePromise = fetch('https://randomfox.ca/floof/')
    .then(response => response.json())
    .then(data => {
      const foxImageElement = document.getElementById('fox-image');
      foxImageElement.src = data.image;
      foxImageElement.style.display = 'flex';
    })
    .catch(error => console.error(error));
}

// bear api stuff
document.getElementById('fetch-bear-fact').addEventListener('click', fetchBearImg);
function fetchBearImg() {
  const bearImageElement = document.getElementById('bear-image');
  bearImageElement.src = `https://placebear.com/400/300?${new Date().getTime()}`;
  bearImageElement.style.display = 'block';
}

// weather api stuff
// Check if Geolocation is supported
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
function successCallback(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  getWeatherData(latitude, longitude);
}
function errorCallback(error) {
  console.error("Error getting location:", error);
  alert("Unable to retrieve location. Please enable location access to view weather.");
}
// get the weather info
async function getWeatherData(latitude, longitude) {
  const pointUrl = `https://api.weather.gov/points/${latitude},${longitude}`;
  
  try {
      const response = await fetch(pointUrl);
      const data = await response.json();
      const forecastUrl = data.properties.forecast;
      
      // Fetch the actual weather forecast data
      try {
          const response = await fetch(forecastUrl);
          const data = await response.json();
          
          // Display the forecast in your UI
          displayWeatherData(data.properties.periods);
      } catch (error) {
          console.error("Error fetching forecast data:", error);
      }
  } catch (error) {
      console.error("Error fetching grid point data:", error);
  }
}

function displayWeatherData(periods) {
  const forecastContainer = document.getElementById("forecast");
  forecastContainer.innerHTML = "";  // Clear any previous data

  if (periods && periods.length > 0) {
    const currentPeriod = periods[0]; // Get the current forecast period

    const periodElement = document.createElement("div");
    periodElement.classList.add("forecast-period");
    periodElement.innerHTML = `
        <h3 class="h3 service-title>${currentPeriod.name}</h3>
        <p class="weather-text">${currentPeriod.temperature}°${currentPeriod.temperatureUnit}</p>
        <p class="weather-text">${currentPeriod.shortForecast}</p>
    `; // <img src="${currentPeriod.icon}" alt="${currentPeriod.shortForecast}">
    forecastContainer.appendChild(periodElement);
  }
}
window.onload = getUserLocation;
