$(document).ready(function() {
  var wuurl
  var wuoptions
  function wucallback(data) {
    if (data.current_observation != undefined) {
      var weatherHTML = '<h3>Currently at '+data.current_observation.display_location.full+':</h3>';
      weatherHTML += '<p>'+data.current_observation.weather+' &mdash; '+data.current_observation.temp_f+'&deg;F</p>';
      weatherHTML += '<img src="'+data.current_observation.icon_url+'">';
      $('#weather_results').html(weatherHTML);
      $('#weather_results').show();
    } else if (data.response.results != undefined) {
      var resultsHTML = '<h3>Multiple Results Found:</h3>';
      $.each(data.response.results, function (i, results) {
        resultsHTML += '<p>'+results.city+', '+(results.country_name != "USA" ? results.country_name : results.state)+'</p>';
      });
      $('#weather_results').html(resultsHTML);
      $('#weather_results').show();
    } else if (data.response.error != undefined) {
      $('#weather_results').html('<p>Error: '+data.response.error.description+'</p>');
      $('#weather_results').show();
    } else {
      $('#weather_results').html('<p>Unknown error. Please try again.</p>');
      $('#weather_results').show();
    }
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