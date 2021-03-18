var userLocal = document.querySelector('#locat');
var fetchButton = document.getElementById('losgo');
var histButton = document.querySelector('.clickable');
var histDisp = document.querySelector('#shistory');
var curWeaDisp = document.querySelector('#todaydisp');
var fiveWeaDisp = document.querySelector('#fivedaydisp');
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
        printFiveWea(data.daily);
      });
    });
}

function histLoUp(histClicked){
    event.preventDefault();
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + histClicked + '&limit=1&appid=a168c4807a6b5b30f90dc3b3ae152860')
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
        printTodayWea(data.current, histClicked);
        printFiveWea(data.daily);
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
        var pSearch = document.createElement('h5');
        var text = document.createTextNode(cHist);
        pSearch.appendChild(text);
        histDisp.appendChild(pSearch);
    }
}

function printTodayWea(curW, locale){
    curWeaDisp.innerHTML = " ";
    var todayHead = document.createElement('h3');
    todayHead.classList.add("capitolize");
    var text = document.createTextNode(locale + ' (' + date + ')');
    todayHead.appendChild(text);
    curWeaDisp.appendChild(todayHead);
;
    var curImg = document.createElement('img');
    curImg.src = ('https://openweathermap.org/img/wn/' + curW.weather[0].icon + '.png');
    curWeaDisp.appendChild(curImg);

    var curTemp = document.createElement('p');
    var text = document.createTextNode('Temperature: ' + parseInt(curW.temp) + '°F');
    curTemp.appendChild(text);
    curWeaDisp.appendChild(curTemp);
    
    var curHum = document.createElement('p');
    var text = document.createTextNode('Humidity: ' + curW.humidity + '%');
    curHum.appendChild(text);
    curWeaDisp.appendChild(curHum);
    
    var curWs = document.createElement('p');
    var text = document.createTextNode('Wind Speed: ' + parseInt(curW.wind_speed) + 'mph');
    curWs.appendChild(text);
    curWeaDisp.appendChild(curWs);
    
    var curUv = document.createElement('p');
    var text = document.createTextNode('UV Index: ' + curW.uvi);
    if(curW.uvi > 7){
        curUv.classList.add("bg-danger");
    }
    if(curW.uvi < 3){
        curUv.classList.add("bg-success");
    }
    else {
        curUv.classList.add("bg-warning");
    }
    curUv.appendChild(text);
    curWeaDisp.appendChild(curUv);
}

function printFiveWea(fiveW){
    console.log(fiveW);
    fiveWeaDisp.innerHTML = " ";
    var forcStatic = document.createElement('h2');
    forcStatic.classList.add("col-12");
    var text = document.createTextNode('5-Day Forecast:');
    forcStatic.appendChild(text);
    fiveWeaDisp.appendChild(forcStatic);

    for(var i =1; i<7; i++){
        console.log('(' + (moment.unix(fiveW[i].dt).format("MM/DD/YYYY")) + ')');
        console.log('icon placeholder');
        console.log('Temp.: ' + fiveW[i].temp.day + '°F');
        console.log('Humidity: ' + fiveW[i].humidity + '%');

        var forcHead = document.createElement('h4');
        var text = document.createTextNode('(' + (moment.unix(fiveW[i].dt).format("MM/DD/YYYY")) + ')');
        forcHead.appendChild(text);
        fiveWeaDisp.appendChild(forcHead);

        var forcImg = document.createElement('img');
        forcImg.src = ('https://openweathermap.org/img/wn/' + fiveW[i].weather[0].icon + '.png');
        fiveWeaDisp.appendChild(forcImg);

        var forcIcon = document.createElement('p');
        forcIcon.appendChild(text);
        fiveWeaDisp.appendChild(forcIcon);

        var forcTemp = document.createElement('p');
        var text = document.createTextNode('Temp.: ' + parseInt(fiveW[i].temp.day) + '°F');
        forcTemp.appendChild(text);
        fiveWeaDisp.appendChild(forcTemp);

        var forcHum = document.createElement('p');
        var text = document.createTextNode('Humidity: ' + fiveW[i].humidity + '%');
        forcHum.appendChild(text);
        fiveWeaDisp.appendChild(forcHum);
    }
}

startup();

fetchButton.addEventListener('click', weaLoUp);

histButton.addEventListener('click', event => {
    var targHist = event.target.innerHTML;
    console.log(targHist);
    histLoUp(targHist);
      });
