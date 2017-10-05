$(document).ready(function(){
    // clcik on submit
    $("#submitForecast").click(function(){
        // call function getForecast()
        return getForecast(); 
    });
});

// Ajax request
function getForecast(){

    // input values for citys and number of days
    var city = $("#city").val();
    var days = $("#days").val();

    // check if fields are empty
    if( city != "" && days != "" ){
        if(days > 0 && days < 17 ){
            // call ajax request for forecast
            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&cnt=" + days + "&units=metric&APPID=a2f07dfceef2bd84d4266d05988e86be",
                type: 'GET',
                dataType: 'jsonp',
                success: function(data){
                    // show data
                    var table  = "";

                    // show h2 for search results
                    var search = "<h2>Weather forecast for " + data.city.name + ", " + data.city.country + " / for " + days + " days</h2><br>";

                    // loop data
                    for( var i = 0; i < data.list.length; i++){
                        table += "<tr>";    

                        table += "<td><img src='http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png'></td>";
                        table += "<td>" + data.list[i].weather[0].main + "</td>";
                        table += "<td>" + data.list[i].weather[0].description + "</td>";
                        table += "<td>" + data.list[i].temp.morn + "&deg;C</td>";
                        table += "<td>" + data.list[i].temp.night + "&deg;C</td>";
                        table += "<td>" + data.list[i].temp.min + "&deg;C</td>";
                        table += "<td>" + data.list[i].temp.max + "&deg;C</td>";
                        table += "<td>" + data.list[i].humidity + "hPa</td>";
                        table += "<td>" + data.list[i].pressure + "%</td>";
                        table += "<td>" + data.list[i].speed + "m/sec</td>";
                        table += "<td>" + data.list[i].clouds + "%</td>";

                        table += "</tr>";
                    }

                    
                    // show forecast on the page
                    $("#forecastWeather").html(table);
                    // show search for / city country
                    $("#search").html(search);

                    // empty input field
                    $("#city").val("");
                    $("#days").val("");
                    
                } // function(data)
            }) // ajaq request

        }else{
            return $("#error").html("<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times</a><strong>Error! </strong>Number of days must be minimum 1 or maximum 16 days.!</div>");
        }
    }else{
        // error message if fields is empty
        return $("#error").html("<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times</a><strong>Error! </strong>Fields can not be empty!</div>");
    }
} // getForecast