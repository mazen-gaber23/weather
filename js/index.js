let gps = [];
async function getApi(location = '07112') {
    let myData = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=8670091aa47e45be82e152958242006&q=${location}&days=3`);
    let response = await myData.json();
    gps = response;
    displayDays();
    displayCity();
    
}

function displayDays() {
    let day1 = `<p>${gps.forecast.forecastday[0].date}</p>`;
    let day2 = `<p>${gps.forecast.forecastday[1].date}</p>`;
    let day3 = `<p>${gps.forecast.forecastday[2].date}</p>`;
    
    document.getElementById('day1').innerHTML = day1;
    document.getElementById('day2').innerHTML = day2;
    document.getElementById('day3').innerHTML = day3;
}

function displayCity() {
    let iconUrlDay1 = "http:" + gps.current.condition.icon;
    let iconUrlDay2 = "http:" + gps.forecast.forecastday[1].day.condition.icon;
    let iconUrlDay3 = "http:" + gps.forecast.forecastday[2].day.condition.icon;

    let cityDay1 = `
        <p class="text-white fs-3">${gps.location.name}</p>
        <p class="text-white deg">${gps.current.temp_c}°C</p>
        <img class="w-25" src="${iconUrlDay1}" alt="">
        <p class="text-primary">${gps.current.condition.text}</p>`;

    let cityDay2 = `
        <img class="w-25" src="${iconUrlDay2}" alt="">
        <p class="text-white h4">${gps.forecast.forecastday[1].day.maxtemp_c}°C</p>
        <p class="text-white m-5">${gps.forecast.forecastday[1].day.mintemp_c}°C</p>
        <p class="text-primary m-5">${gps.forecast.forecastday[1].day.condition.text}</p>`;

    let cityDay3 = `
        <img class="w-25" src="${iconUrlDay3}" alt="">
        <p class="text-white h4">${gps.forecast.forecastday[2].day.maxtemp_c}°C</p>
        <p class="text-white m-5">${gps.forecast.forecastday[2].day.mintemp_c}°C</p>
        <p class="text-primary m-5">${gps.forecast.forecastday[2].day.condition.text}</p>`;

    document.getElementById('city').innerHTML = cityDay1;
    document.getElementById('nextDay').innerHTML = cityDay2;
    document.getElementById('nextNextDay').innerHTML = cityDay3;
}
function search(){
  document.getElementById('searchButton').addEventListener('click', function(){
    let location = document.getElementById('searchInput').value;
    getApi(location);
});
document.getElementById('searchInput').addEventListener('keypress',function(e){
  if(e.key=='Enter'){
    let location = document.getElementById('searchInput').value;
    getApi(location);
  }
})
}
search();
getApi();
