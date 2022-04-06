// Search Bar and Button
var searchBtn = document.getElementById('searchBtn');
const weatherApiKey = '01491020703a0729a1904f9d2453e6f1';
const weatherTemplate = document.getElementById('weatherTemplate');
const weatherCurrent = document.getElementById('weatherCurrent');
const weatherFiveDay = document.getElementById('weatherFiveDay');
const weatherDaysToForcast = 5;

//let temperature = document.querySelector('.temperature');
//let sum = document.querySelector('.sum');
//let loc = document.querySelector('.location');
//let icon = document.querySelector('.icon');
//let windSpeed = document.querySelector('.wind-speed');
//let humidity = document.querySelector('.humidity');
//let UVI = document.querySelector('.UVI');
//let weekdayWeatherDisplay = document.querySelector('weekdayWeatherDisplay');


console.log(searchBtn);
const currentWeather = (cityName) => {
    console.log(cityName)
    // CAN I DRY THIS UP BY ASSIGNING VARIABLE NAMES TO API ID? CAN THIS HAVE HTTPS?
    let getCurrentWeatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + weatherApiKey;
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
    let currentLocationWeatherAPI = `http://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=${lat}&` +
        `lon=${lon}&appid=${weatherApiKey}`;

    fetch(currentLocationWeatherAPI)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            //first: we need to output the current weather
            renderWeatherTemplate(data.current, weatherCurrent);

            //second we need to output the 5 day forcast
            for (let day = 0; day < data.daily.length; day++) {
                renderWeatherTemplate(data.daily[day], weatherFiveDay);

                //if more days available then we want break out
                if (day > weatherDaysToForcast)
                    break;
            }

            //third we need to save the city into local storage


        });
}

/**
 * This will render the weather data into the targets weather container
 * @param {*} data      weather API d+ata object containing any daily info
 * @param {*} target    this is the HTML object that should be rendered into (ie: weather container)
 */
function renderWeatherTemplate(data, target) {
    console.log('renderWeatherTemplate');
    console.log(data);

    //first make a clone of our template
    let template = weatherTemplate.cloneNode(true);

    //second: assign our data into our template
    template.querySelector('.temperature').textContent = data.temp + '°F';
    template.querySelector('.sum').textContent = data.weather[0].description;
    template.querySelector('.windSpeed').textContent = data.wind_speed + 'mph';
    template.querySelector('.humidity').textContent = data.humidity + '%';
    template.querySelector('.UVI').textContent = data.uvi;
    template.querySelector('.icon').innerHTML = '<img src="http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png" />';

    //third: we need to copy our temlpate into our target
    target.appendChild(template);
}
