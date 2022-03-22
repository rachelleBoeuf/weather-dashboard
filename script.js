var searchBtn = document.getElementById('searchBtn');
console.log(searchBtn);
const currentWeather = (cityName) => {
    console.log(cityName)
    var getCurrentWeatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=01491020703a0729a1904f9d2453e6f1'
    console.log(getCurrentWeatherAPI);
    fetch(getCurrentWeatherAPI)
        .then(function (response) {
          //  console.log(response);
          return response.json()
        }).then(function(data){
console.log(data)
        })
}


searchBtn.addEventListener('click', function () {
    var input = document.getElementById('locationSearch')
    currentWeather(input.value);
})
