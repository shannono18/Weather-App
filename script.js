$(document).ready(function() {
    var appID ="b60a0bb98e4d4f877ab7154b927a5bff";
    function weather_data(){
            
        cityName = $(this).attr("data-name")
        console.log(cityName)

        if (cityName == undefined) {
            var cityName = $(this).prev().val();
        } 

        console.log(cityName)

            var weather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + appID 
                +"&units=imperial";
            
            var forecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&APPID=" + appID 
                +"&units=imperial";

$.getJSON(weather,function(json){
    $("#city").html(json.name);    
    $("#description-weather").html(json.weather[0].description);
    $("#weather-image").attr("src", "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
    $("#temperature").html(json.main.temp);
    $("#wind-speed").html(json.wind.speed);
    $("#humidity").html(json.main.humidity);

    var uvIndex = "http://api.openweathermap.org/data/2.5/uvi?appid=" + appID + "&lat=" + json.coord.lat + "&lon=" + json.coord.lon;    
    $.getJSON(uvIndex,function(uv_json){
        $("#uv-index").html(uv_json.value);
        if (uv_json.value < 3.00) {
            document.getElementById("uv-index").setAttribute("style","background-color:lightgreen");
        } else if (uv_json.value > 3.00 & uv_json.value < 7.00) {
            document.getElementById("uv-index").setAttribute("style","background-color:yellow");
        } else {
            document.getElementById("uv-index").setAttribute("style","background-color:red");
        }
    });
});

$.getJSON(forecast,function(json){
    $("#weather-image1").attr("src", "http://openweathermap.org/img/w/" + json.list[0].weather[0].icon + ".png");
    $("#date1").html(json.list[0].dt_txt);
    $("#temperature1").html(json.list[0].main.temp);
    $("#humidity1").html(json.list[0].main.humidity);

    $("#weather-image2").attr("src", "http://openweathermap.org/img/w/" + json.list[8].weather[0].icon + ".png");
    $("#date2").html(json.list[8].dt_txt);
    $("#temperature2").html(json.list[8].main.temp);
    $("#humidity2").html(json.list[8].main.humidity);

    $("#weather-image3").attr("src", "http://openweathermap.org/img/w/" + json.list[16].weather[0].icon + ".png");
    $("#date3").html(json.list[16].dt_txt);
    $("#temperature3").html(json.list[16].main.temp);
    $("#humidity3").html(json.list[16].main.humidity);

    $("#weather-image4").attr("src", "http://openweathermap.org/img/w/" + json.list[24].weather[0].icon + ".png");
    $("#date4").html(json.list[24].dt_txt);
    $("#temperature4").html(json.list[24].main.temp);
    $("#humidity4").html(json.list[24].main.humidity);

    $("#weather-image5").attr("src", "http://openweathermap.org/img/w/" + json.list[32].weather[0].icon + ".png");
    $("#date5").html(json.list[32].dt_txt);
    $("#temperature5").html(json.list[32].main.temp);
    $("#humidity5").html(json.list[32].main.humidity);
});
}

$(".submit-btn").click(weather_data);

var citySearches = [];

function renderButtons() {

    $("#previous-searches").empty();    

    for (var i = 0; i < citySearches.length; i++) {

        var a = $("<button>");
        a.addClass("cities");
        a.attr("data-name", citySearches[i]);
        a.text(citySearches[i]);
        $("#previous-searches").append(a);
    }
}

$("#search-btn").on("click", function(event) {
    event.preventDefault();

    var cityInput = $("#search-city").val().trim();

    citySearches.push(cityInput);
            console.log(citySearches);

    renderButtons();
});   

$(document).on("click", ".cities", weather_data);
        renderButtons();
});

var text = $('#cityName').cityName();

localStorage.setItem('city-searches');
alert (localStorage.getItem('city-searches'));
var data = JSON.parse(localStorage.getItem("city-searches"));
