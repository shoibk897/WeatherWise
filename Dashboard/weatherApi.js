// for main weather show
window.addEventListener('load', async () => {
    const apiKey = '5011ce3a9e2ec87d56592fa5442d01ff';
    const input = document.getElementById("search-weather");
    const searchBtn = document.getElementById("search-weather-input");
    const defaultCity = 'Punjab';

    const fetchWeatherAndUpdateInfo = async (city) => {
        try {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
            const response = await fetch(apiUrl);
            const data = await response.json();

            // Update city name
            const cityNameElement = document.querySelector('.city-name');
            cityNameElement.textContent = data.name;

            // Update temperature
            const temperatureElement = document.querySelector('.weather-info-card-temp');
            temperatureElement.textContent = `${Math.round(data.main.temp - 273.15)}°C`;

            // Update wind speed
            const windSpeedElement = document.querySelector('.wind-speed');
            windSpeedElement.textContent = `${data.wind.speed} m/s`;

            // Update humidity
            const humidityElement = document.querySelector('.humidity-speed');
            humidityElement.textContent = `${data.main.humidity}%`;
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const fetchWeatherData = async (city) => {
        try {
            const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            return null;
        }
    };

    const updateForecastCards = async (city) => {
        const data = await fetchWeatherData(city);
        if (data) {
            const forecastList = data.list;

            for (let i = 0; i <= 6; i++) {
                const forecast = forecastList[i * 8];
                if (!forecast) continue;

                const temperature = Math.round(forecast.main.temp);
                const windSpeed = forecast.wind.speed;
                const humidity = forecast.main.humidity;

                const card = document.getElementById(`forecast-card-${i}`);

                card.querySelector('.forecast-card-temp').textContent = `${temperature}°C`;
                card.querySelector('.forecast-card-wind').textContent = `${windSpeed} m/s`;
                card.querySelector('.forecast-card-hum').textContent = `${humidity}%`;
            }
        }
    };


    searchBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        const city = input.value.trim();
        if (city) {
            await fetchWeatherAndUpdateInfo(city);
            await updateForecastCards(city);
        } else {
            console.log("CITY NOT FOUND!!!! ENTER CORECT CITY")
        }
    });

    input.addEventListener('keypress', async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const city = input.value.trim();
            if (city) {
                await updateForecastCards(city);
                await fetchWeatherAndUpdateInfo(city);
            } else {
                console.log("CITY NOT FOUND!!!! ENTER CORRECT CITY");
            }
        }
    });

    await updateForecastCards(defaultCity);
    await fetchWeatherAndUpdateInfo(defaultCity);

});



const apiKey = '5011ce3a9e2ec87d56592fa5442d01ff'; // Replace with your OpenWeatherMap API key
const weatherCustomCity = document.getElementById('weather-custom-city');
const customCitySearch = document.querySelector('.custom-city-search');
const customBtn = document.getElementById('custom-btn');


function fetchWeatherData(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            const { main, wind } = data;
            const temperature = main.temp;
            const humidity = main.humidity;
            const windSpeed = wind.speed;

            const weatherTemplate = `
                <div class="weather-custom-city container-fluid p-2 d-flex justify-content-between align-items-center mb-2">
                    <div class="container-fluid p-0 d-flex flex-column">
                        <div class="d-flex align-items-center justify-content-center gap-1 ">
                            <img src="icons/location.svg" height="20px" alt="">
                            <span class="custom-city-name container-fluid fw-bold p-0">${cityName}</span>
                        </div>
                        <div class="custom-wind ps-1">
                            <img src="icons/wind.svg" height="20px" alt="">
                            <span class="custom-city-wind">${windSpeed}m/s</span>
                        </div>
                        <div class="custom-hum ps-1">
                            <img src="icons/humidity.svg" height="20px" alt="">
                            <span class="custom-city-hum">${humidity}%</span>
                        </div>
                    </div>
                    <div class="custom-temp fs-2">${temperature}<span>°C</span></div>
                   
                    <button class="remove-custom-city"><img src="icons/cross.svg" height="10px" alt=""></button>
                </div>
            `;
            weatherCustomCity.innerHTML += weatherTemplate;
        })
        .catch(error => console.log('Error fetching weather data:', error));
}

customBtn.addEventListener('click', () => {
    const cityName = customCitySearch.value.trim();
    if (cityName) {
        fetchWeatherData(cityName);
        customCitySearch.value = ''; 
    }
});

customCitySearch.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const cityName = customCitySearch.value.trim();
        if (cityName) {
            fetchWeatherData(cityName);
            customCitySearch.value = ''; 
        }
    }
});

weatherCustomCity.addEventListener('click', event => {
    if (event.target.classList.contains('remove-custom-city')) {
        event.target.closest('.weather-custom-city').remove();
    }
});

