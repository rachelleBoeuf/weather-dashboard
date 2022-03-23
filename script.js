// Search Bar and Button
var searchBtn = document.getElementById('searchBtn');
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
        })

    searchBtn.addEventListener('click', function () {
        var input = document.getElementById('locationSearch')
        currentWeather(input.value);
    })


    // CURRENT LOCATION WEATHER DISPLAY VARIABLES AND API


    let lon;
    let lat;
    let temperature = document.querySelector('.temperature');
    let sum = document.querySelector('.sum');
    let location = document.querySelector('.location');
    let icon = document.querySelector('.icon');
    const kelvin = 273;
}
// CURRENT LOCATION WEATHER ICON ON HOMEPAGE. USE LOAD METHOD TO PUT RETURNED DATA INTO WINDOW. 
// .coods- .coords returns value of coords attribute. attribute specifies the x & y coordinates of an area


window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            lon = position.coords.lon;
            lat = position.coords.lat;

            const currentLocationWeatherAPI = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
                `lon=${lon}&appid=6d055e39ee237af35ca066f35474e9df`;

            const idAPI = '&appid=01491020703a0729a1904f9d2453e6f1';



            // CALLING API

            fetch(currentLocationWeatherAPI + idAPI)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(temperature);
                    '.temperature'.textContent =
                        Math.floor(data.main.temperature - kelvin) + '°C';
                    sum.textContent = data.weather[0].description;
                    location.textContent = data.name + "," + data.sys.country;
                    let icon1 = data.weather[0].icon;
                    icon.innerHTML =
                        `<img src="icon/${icon1}.svg" style= 'height:10rem'/>`;
                });
        });
    }
});


