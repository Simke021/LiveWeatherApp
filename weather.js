$(document).ready(function(){

    $("#submitCity").click(function(){
        
        return getWeather();
        
    });

});

// Ajax request
function getWeather(){

    // input value
    var city = $("#city").val();

    // check if input is not empty call ajax request
    if(city != ""){
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather?q='+ city +'&units=metric'+ '&APPID=a2f07dfceef2bd84d4266d05988e86be',
            type: 'GET',
            dataType: 'jsonp',
            success: function(data){
                // data
                var widget = showResults(data);

                // show widget on the page
                $("#showWeather").html(widget);

                // empty input field
                $("#city").val("");
            }
        });
    }
    // return error message
    else{
        $("#error").html("<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times</a><strong>Error! </strong>City field can not be empty!</div>");
    }
}

// show data form api
function showResults(data){
    return "<h3>Current weather for " + data.name + ", " + data.sys.country +"</h3>" +
    "<p>Weather description:<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'> " + data.weather[0].description + "</p>" +
           "<p>Weather: " + data.weather[0].main + "</p>" + 
           "<p>Temperature: " + Math.round(data.main.temp) + " &deg;C</p>" +
           "<p>Pressure: " + data.main.pressure + " hPa</p>" +
           "<p>Humidity: " + data.main.humidity + " %</p>" +
           "<p>Min. Temperature: " + data.main.temp_min + " &deg;C</p>" +
           "<p>Max. Temperature: " + data.main.temp_max + " &deg;C</p>" +
           "<p>Wind Speed: " + data.wind.speed + " m/sec</p>" +
           "<p>Cloudness: " + data.clouds.all + " %</p>";
}

