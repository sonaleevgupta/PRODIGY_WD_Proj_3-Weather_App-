const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');

async function checkWeather(city){
    const api_key = "5407086f09feaeb4d51276c8c627d764";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    console.log(weather_data); // Log the entire API response

    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

    const weatherCondition = weather_data.weather[0].main;
    console.log(weatherCondition); // Log the weather condition

    switch(weatherCondition){
        case 'Clouds':
            weather_img.src = "assets/cloud.png";
            console.log("Clouds image set");
            break;
        case 'Clear':
            weather_img.src = "assets/clear.png";
            console.log("Clear image set");
            break;
        case 'Rain':
            weather_img.src = "assets/rain.png";
            console.log("Rain image set");
            break;
        case 'Mist':
            weather_img.src = "assets/mist.png";
            console.log("Mist image set");
            break;
        case 'Snow':
            weather_img.src = "assets/snow.png";
            console.log("Snow image set");
            break;
        default:
            console.log("Weather condition not recognized");
    }

    console.log(weather_img.src); // Log the image source to ensure it's being set
}

searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
});
