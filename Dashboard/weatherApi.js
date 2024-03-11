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

            console.log(data); 

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


    searchBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        const city = input.value.trim();
        if (city) {
            await fetchWeatherAndUpdateInfo(city);
        } else {
            console.log("CITY NOT FOUND!!!! ENTER CORECT CITY")
        }
    });

    input.addEventListener('keypress', async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const city = input.value.trim();
            if (city) {
                await fetchWeatherAndUpdateInfo(city);
            } else {
                console.log("CITY NOT FOUND!!!! ENTER CORRECT CITY");
            }
        }
    });
    
    await fetchWeatherAndUpdateInfo(defaultCity);
    
});

