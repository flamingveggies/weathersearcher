$(document).ready(function() {

  function wucallback(data) { // Callback for AJAX
    if (data.current_observation !== undefined) { // If location found and weather retrived
      var conditionsHTML = '<h3>Currently at '+data.current_observation.display_location.full+':</h3><p>'+data.current_observation.weather+' &mdash; '+data.current_observation.temp_f+'&deg;F</p><img src="'+data.current_observation.icon_url+'">';
      var forecastHTML = '<h3>Forecast for '+data.current_observation.display_location.full+':</h3>';
      $.each(data.forecast.simpleforecast.forecastday, function (i, forecast) {
        forecastHTML += '<p>'+forecast.date.weekday+'</p><img src="'+forecast.icon_url+'" alt="'+forecast.icon+'"><p>'+forecast.high.fahrenheit+'&deg;F '+forecast.low.fahrenheit+'&deg;F</p>'
      });
      $('#results').hide();
      $('#conditions').html(conditionsHTML);
      $('#forecast').html(forecastHTML);
      $('#conditions').show();
      $('#forecast').show();
    } else if (data.response.results !== undefined) { // If multiple locations found, display list
      var resultsHTML = '<h3>Multiple Results Found:</h3>';
      $.each(data.response.results, function (i, results) {
        resultsHTML += '<p id="'+results.l+'"><a href="#">'+results.city+', '+(results.country_name != "USA" ? results.country_name : results.state)+'</a></p>';
      });
      $('#results').html(resultsHTML);
      $('#conditions').hide();
      $('#forecast').hide();
      $('#results').show();
      $('#results a').click(function (evt) { // Query weather for location results when one is selected
        evt.preventDefault();
        var searchID = $(this).parent().attr("id");
        var urlConditionsForecast10day = "http://api.wunderground.com/api/e0bb37aff4e256e4/conditions/forecast10day"+searchID+".json";
        $.getJSON(urlConditionsForecast10day, wucallback);
      });
    } else if (data.response.error !== undefined) { // If an error is returned
      $('#results').html('<p>Error: '+data.response.error.description+'</p>');
      $('#conditions').hide();
      $('#forecast').hide();
      $('#results').show();
    } else { // If all else fails
      $('#results').html('<p>Unknown error. Please try again.</p>');
      $('#conditions').hide();
      $('#forecast').hide();
      $('#results').show();
    }
  }

  $('form').submit(function (evt) { // AJAX request for location search
    evt.preventDefault();
    var searchLocation = $('#search').val();
    if (searchLocation === "") { // Don't actually request if no location is entered
      return;
    } else { // Otherwise you're good to go
      var urlConditionsForecast10day = "http://api.wunderground.com/api/e0bb37aff4e256e4/conditions/forecast10day/q/"+searchLocation+".json";
      $.getJSON(urlConditionsForecast10day, wucallback)
    }
  });

  $('#current_location').click(function (evt) { // AJAX request for current location
    evt.preventDefault();
    var urlConditionsForecast10day = "http://api.wunderground.com/api/e0bb37aff4e256e4/conditions/forecast10day/q/autoip.json";
    $.getJSON(urlConditionsForecast10day, wucallback);
  });
  
  $(document).ajaxError(function() { // Display error if weather JSON could not be retrieved
    var errorHTML = '<p>Weather data could not be found. Check your connection and try again.</p>';
    $('#results').html(errorHTML);
    $('#conditions').hide();
    $('#forecast').hide();
    $('#results').show();
  });

});