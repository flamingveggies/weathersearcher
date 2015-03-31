$(document).ready(function() {
  var wuurl
  var wuoptions
  function wucallback(data) {
    var weatherHTML = '<h3>Currently at '+data.current_observation.display_location.full+':</h3>';
    weatherHTML += '<p>'+data.current_observation.weather+' &mdash; '+data.current_observation.temp_f+'&deg;F</p>';
    weatherHTML += '<img src="'+data.current_observation.icon_url+'">';
    $('#weather_results').html(weatherHTML);
    $('#weather_results').show();
  }

  $('form').submit(function (evt) {
    evt.preventDefault();
    var searchLocation = $('#search').val();
    var wuurl = "http://api.wunderground.com/api/e0bb37aff4e256e4/conditions/q/"+searchLocation+".json"
    $.getJSON(wuurl, wuoptions, wucallback);
  });

  $('#current_location').click(function (evt) {
    evt.preventDefault();
    var wuurl = "http://api.wunderground.com/api/e0bb37aff4e256e4/conditions/q/autoip.json";
    $.getJSON(wuurl, wuoptions, wucallback);
  });

});

//error states:
  //location entry error
  //connection error