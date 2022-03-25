// Search Bar and Button
var searchBtn = document.getElementById('searchBtn');
let temperature = document.querySelector('.temperature');
let sum = document.querySelector('.sum');
let loc = document.querySelector('.location');
let icon = document.querySelector('.icon');
let windSpeed = document.querySelector('.wind-speed');
let humidity = document.querySelector('.humidity');
let UVI = document.querySelector('.UVI');

const weekdayWeatherDisplay = document.querySelector('weekdayWeatherDisplay');
console.log(searchBtn);
const currentWeather = (cityName) => {
    console.log(cityName)
    // CAN I DRY THIS UP BY ASSIGNING VARIABLE NAMES TO API ID? CAN THIS HAVE HTTPS?
    const getCurrentWeatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=01491020703a0729a1904f9d2453e6f1'
    console.log(getCurrentWeatherAPI);

    fetch(getCurrentWeatherAPI)
        .then(function (response) {
            //  console.log(response);
            return response.json()
        }).then(function (data) {
            console.log(data)
            lat = data.coord.lat;
            lon = data.coord.lon;
            console.log('cityName');
            getFullForecast();
        })


}

searchBtn.addEventListener('click', function () {
    var input = document.getElementById('locationSearch')
    currentWeather(input.value);
});

// CURRENT LOCATION WEATHER DISPLAY VARIABLES AND API


let lon;
let lat;



// CURRENT LOCATION WEATHER ICON ON HOMEPAGE. USE LOAD METHOD TO PUT RETURNED DATA INTO WINDOW. 
// .coods- .coords returns value of coords attribute. attribute specifies the x & y coordinates of an area


window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            getFullForecast();




            // CALLING API


        });
    }
});

const getFullForecast = () => {
    const currentLocationWeatherAPI = `http://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=${lat}&` +
        `lon=${lon}&appid=6d055e39ee237af35ca066f35474e9df`;

    fetch(currentLocationWeatherAPI)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            temperature.textContent = data.current.temp + '°F';
            sum.textContent = data.current.weather[0].description;
            // loc.textContent = data. + "," + data.sys.country;
            windSpeed.textContent = data.current.wind_speed + 'mph';
            humidity.textContent = data.current.humidity + '%';
            UVI.textContent = data.current.uvi;
            let icon1 = data.current.weather[0].icon;
            icon.innerHTML =
                `<img src="http://openweathermap.org/img/wn/${icon1}@2x.png" />`;
        });
}