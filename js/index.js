"use strict";

//get longtitude and latitude

if (navigator.geolocation) {
  (function () {
    var url = "https://fcc-weather-api.glitch.me/api/current?lat=";
    var lon = "&lon=";
    var latRounded = "";
    var lonRounded = "";
    var completeURL = "";
    var html = "";

    navigator.geolocation.getCurrentPosition(function (position) {
      latRounded = position.coords.latitude;
      lonRounded = position.coords.longitude;
      completeURL = url + latRounded + lon + lonRounded;

      $.get(completeURL, function (json) {
        var string = JSON.stringify(json);
        var obj = JSON.parse(string);
        var imageBackground = obj.weather[0].icon;
        var image = "<img src='" + obj.weather[0].icon + "' title='weather icon' alt='weather icon'>";
        var location = "<p>" + obj.name + ", " + obj.sys.country + "</p>";
        $("#location").html(location);
        var weather = "<p>" + obj.weather[0].main + ": " + obj.weather[0].description + "<img src='" + obj.weather[0].icon + "' title='weather icon' alt='weather icon'></p>";
        $("#weather").html(weather);
        var temp = Math.round(obj.main.temp);

        $("#temp").html(temp);
        $("#temp").html(temp + "&deg; C");

        $("#temp").on('click', function () {
          $('#temp').toggleClass('celcius');
          $('#temp').toggleClass('fahrenheit');

          if ($(this).hasClass('celcius')) {
            $('#temp').html(changeToFahrenheit());
            return;
          }

          $("#temp").html(changeToCelcius());
        });

        function changeToCelcius() {

          return temp + "&deg; C";
        };

        function changeToFahrenheit() {
          var cel = Math.round(temp / (5 / 9) + 32);
          return cel + "&deg; F";
        };

        $("#test").html(obj);
      });
    });
  })();
}