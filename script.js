// Search Bar and Button
var searchBtn = document.getElementById('searchBtn');
const weatherApiKey = '01491020703a0729a1904f9d2453e6f1';
const weatherTemplate = document.getElementById('weatherTemplate');
const weatherCurrent = document.getElementById('weatherCurrent');
const weatherFiveDay = document.getElementById('weatherFiveDay');
const weatherDaysToForcast = 5;

console.log(searchBtn);
const currentWeather = (cityName) => {
    console.log(cityName)
    updateCityHistory(cityName);

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

window.addEventListener('load', function() {
    renderSearchHistoryButtons();
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
            weatherCurrent.innerHTML = '';  //delete previous current forcast
            renderWeatherTemplate(data.current, weatherCurrent);

            //second we need to output the 5 day forcast
            weatherFiveDay.innerHTML = '';  //delete previous 5 day forcast
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
    //the current day data and forcast data are different... check to see which one is correct
    if (typeof data.temp == 'object') {
        template.querySelector('.temperature').textContent = data.temp.day + '°F';
    } else {
        template.querySelector('.temperature').textContent = data.temp + '°F';
    }

    template.querySelector('.sum').textContent = data.weather[0].description;
    template.querySelector('.windSpeed').textContent = data.wind_speed + 'mph';
    template.querySelector('.humidity').textContent = data.humidity + '%';
    template.querySelector('.UVI').textContent = data.uvi;
    template.querySelector('.icon').innerHTML = '<img src="http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png" />';

    //third: we need to copy our temlpate into our target
    target.appendChild(template);
}

/**
 * This function will take a city name and 
 * @param string city - This should be a city name we searched for
 */
function updateCityHistory(city) {
    //first: we want to see if this city is already in the local storage
    let history = readCityHistory();

    //second: if its not part of the local storage add it :)
    if (history.indexOf(city) >= 0)
        return; //do not add as the city is inside of the local storage

    //third: its missing so we need to add it
    history.push(city);
    saveCityHistory(history);
}

/**
 * Save this array as the local storage
 * @param array history - an array of city names to store in the history for local storage
 */
function saveCityHistory(history) {
    localStorage.setItem('history', history.join(','));
    renderSearchHistoryButtons();
}

/**
 * This will return an Array of all the previously searched cities
 * @returns array - array of cities names from the search history
 */
function readCityHistory() {
    //first: we want to get the history from local storage
    //if no history stored as of yet then we need to make an empty history
    let history = localStorage.getItem('history');
    if (history === null) {
        history = [];
    } else {
        //second: we want to turn this history into a readable array
        history = history.split(',');
    }

    return history;
}

/**
 * 
 * @param string city - This should be a city name we searched for
 */
function deleteCityFromHistory(city) {
    //first: we want to get the list of cities in localstorage

    //second: we should remove this city if it exists

    //third: save back to localstorage

}

/**
 * This function will render search history buttons 
 */
function renderSearchHistoryButtons() {
    //first: get access to our button history
    let searchButtonHistory = document.getElementById('searchButtonHistory');

    //second: clear all html nodes inside of the history container
    searchButtonHistory.innerHTML = '';

    //third: generate all buttons for each history item
    let history = readCityHistory();
    for(x = 0; x < history.length; x++) {    
        searchButtonHistory.innerHTML += '<button value="' + history[x] +'" onclick="currentWeather(\'' + history[x] +'\')">' + history[x] +'</button>';
    }
}





