// for main weather show
document.addEventListener('DOMContentLoaded', async () => {
    const apiKey = '5011ce3a9e2ec87d56592fa5442d01ff';
    const defaultCity = 'Punjab';

    const input = document.getElementById('search-weather');
    const searchBtn = document.getElementById('search-weather-input');
    const weatherCustomCity = document.getElementById('weather-custom-city');
    const customCitySearch = document.querySelector('.custom-city-search');
    const customBtn = document.getElementById('custom-btn');

    const fetchWeatherAndUpdateInfo = async (city) => {
        try {
            const data = await fetchData(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
            if (!data) return;

            updateWeatherInfo(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            return response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    };

    const updateWeatherInfo = (data) => {
        const { name, main, wind } = data;
        document.querySelector('.city-name').textContent = name;
        document.querySelector('.weather-info-card-temp').textContent = `${Math.round(main.temp - 273.15)}°C`;
        document.querySelector('.wind-speed').textContent = `${wind.speed} m/s`;
        document.querySelector('.humidity-speed').textContent = `${main.humidity}%`;
    };

    const updateForecastCards = async (city) => {
        try {
            const data = await fetchData(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
            if (!data) return;

            const forecastList = data.list.slice(0, 7);

            forecastList.forEach((forecast, i) => {
                const card = document.getElementById(`forecast-card-${i}`);
                if (!card) return;

                const { main, wind } = forecast;
                card.querySelector('.forecast-card-temp').textContent = `${Math.round(main.temp)}°C`;
                card.querySelector('.forecast-card-wind').textContent = `${wind.speed} m/s`;
                card.querySelector('.forecast-card-hum').textContent = `${main.humidity}%`;
            });
        } catch (error) {
            console.error('Error updating forecast cards:', error);
        }
    };

    searchBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        const city = input.value.trim();
        if (city) {
            await fetchWeatherAndUpdateInfo(city);
            await updateForecastCards(city);
        } else {
            console.log("CITY NOT FOUND!!!! ENTER CORRECT CITY");
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
    
    let arr = [1,2,3,4];
    arr.forEach()

    const addCustomWeatherCard = (cityName, temperature, windSpeed, humidity) => {
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
    };

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

    const fetchWeatherData = (cityName) => {
        fetchData(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
            .then(data => {
                if (data) {
                    const { main, wind } = data;
                    const temperature = main.temp;
                    const humidity = main.humidity;
                    const windSpeed = wind.speed;

                    addCustomWeatherCard(cityName, temperature, windSpeed, humidity);
                }
            })
            .catch(error => console.log('Error fetching weather data:', error));
    };

    // Initial fetch for default city
    await fetchWeatherAndUpdateInfo(defaultCity);
    await updateForecastCards(defaultCity);
});

