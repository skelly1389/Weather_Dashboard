var userLocal = document.querySelector('#locat');
var fetchButton = document.getElementById('losgo');
var histDisp = document.querySelector('#shistory');
var curWeaDisp = document.querySelector('#todaydisp');
var fiveWeaDisp = document.querySelector('#fivedaydisp')
var date = moment().format('l');

function weaLoUp(){
    event.preventDefault();
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + userLocal.value + '&limit=1&appid=a168c4807a6b5b30f90dc3b3ae152860')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if(data.length === 0){
          alert('enter a city name');
          location.reload();
      }
      sHistory();
      var sLat = data[0].lat;
      var sLon = data[0].lon;

      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + sLat + '&lon=' + sLon + '&exclude=alerts,hourly,minutely&units=imperial&appid=a168c4807a6b5b30f90dc3b3ae152860')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        printTodayWea(data.current, userLocal.value);
        printFiveWea(data.daily, userLocal.value);
      });
    });
}

function sHistory(){
    console.log(userLocal.value);
    var searchhist = JSON.parse(localStorage.getItem('searchhist')) || [];
    searchhist.unshift(userLocal.value);
    if (searchhist.length > 5){
        searchhist.pop()
    }
    localStorage.setItem('searchhist', JSON.stringify(searchhist));
}

function startup(){
    var searchhist = JSON.parse(localStorage.getItem('searchhist')) || [];
    for(var i = 0; i < searchhist.length; i++){
        var cHist = searchhist[i];
        var pSearch = document.createElement('h4');
        var text = document.createTextNode(cHist);
        pSearch.appendChild(text);
        histDisp.appendChild(pSearch);
    }
}

function printTodayWea(curW, locale){
    console.log(curW);
    console.log(locale + '(' + date + ')');
    console.log('Temperature: ' + curW.temp + '°F');
    console.log('Humidity: ' + curW.humidity + '%');
    console.log('Wind Speed: ' + curW.wind_speed + 'mph');
    console.log('UV Index: ' + curW.uvi);
}

function printFiveWea(fiveW, locale){
    console.log(fiveW);
}

startup();

fetchButton.addEventListener('click', weaLoUp);

