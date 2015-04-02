$(document).ready(function() {
  var wuurl
  var wuoptions
  function wucallback(data) { // Callback for AJAX
    if (data.current_observation != undefined) { // If location found and weather retrived
      var weatherHTML = '<h3>Currently at '+data.current_observation.display_location.full+':</h3>';
      weatherHTML += '<p>'+data.current_observation.weather+' &mdash; '+data.current_observation.temp_f+'&deg;F</p>';
      weatherHTML += '<img src="'+data.current_observation.icon_url+'">';
      $('#weather_results').html(weatherHTML);
      $('#weather_results').show();
    } else if (data.response.results != undefined) { // If multiple locations found, display list
      var resultsHTML = '<h3>Multiple Results Found:</h3>';
      $.each(data.response.results, function (i, results) {
        resultsHTML += '<p><a href="#">'+results.city+', '+(results.country_name != "USA" ? results.country_name : results.state)+'</a></p>';
      });
      $('#weather_results').html(resultsHTML);
      $('#weather_results').show();
      $('#weather_results a').click(function (evt) { // Query weather for location results when one is selected
        evt.preventDefault();
        var searchLocation = $(this).parent().text();
        var wuurl = "http://api.wunderground.com/api/e0bb37aff4e256e4/conditions/q/"+searchLocation+".json"
        $.getJSON(wuurl, wuoptions, wucallback);
      })
    } else if (data.response.error != undefined) { // If an error is returned
      $('#weather_results').html('<p>Error: '+data.response.error.description+'</p>');
      $('#weather_results').show();
    } else { // If all else fails
      $('#weather_results').html('<p>Unknown error. Please try again.</p>');
      $('#weather_results').show();
    }
  }

  $('form').submit(function (evt) { // AJAX request for location search
    evt.preventDefault();
    var searchLocation = $('#search').val();
    var wuurl = "http://api.wunderground.com/api/e0bb37aff4e256e4/conditions/q/"+searchLocation+".json"
    $.getJSON(wuurl, wuoptions, wucallback);
  });

  $('#current_location').click(function (evt) { // AJAX request for current location
    evt.preventDefault();
    var wuurl = "http://api.wunderground.com/api/e0bb37aff4e256e4/conditions/q/autoip.json";
    $.getJSON(wuurl, wuoptions, wucallback);
  });
  
});

//error states not yet implemented:
  //connection error