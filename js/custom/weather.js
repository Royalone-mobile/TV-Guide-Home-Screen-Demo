function Weather() {
  $.simpleWeather({
    location: 'Schaumburg, IL',
    woeid: '',
    unit: 'f',
    success: function(weather) {
      html = weather.temp+'&deg;'+weather.units.temp;
  
      $("#temp").html(html);
    },
    error: function(error) {
      $("#temp").html('<p>'+error+'</p>');
    }
  });

}


