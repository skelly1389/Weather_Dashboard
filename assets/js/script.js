var requestCoords = 'http://api.openweathermap.org/geo/1.0/direct?q=philadelphia&limit=1&appid=a168c4807a6b5b30f90dc3b3ae152860';

fetch('http://api.openweathermap.org/geo/1.0/direct?q=philadelphia&limit=1&appid=a168c4807a6b5b30f90dc3b3ae152860')
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      var sLat = data[0].lat;
      var sLon = data[0].lon;

      console.log(sLat);
      console.log(sLon);
      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + sLat + '&lon=' + sLon + '&exclude=alerts,hourly,minutely&appid=a168c4807a6b5b30f90dc3b3ae152860')
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (data) {
        console.log(data)
      });
    });



