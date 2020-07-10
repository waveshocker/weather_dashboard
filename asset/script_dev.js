//Declare all used variables

var prevSearch = $("#prevSearches");
var forecast =  $("#forecast");
var searchIn = $("#searchinput");
var searchBtn = $("#searchbtn");
var cityLocations = [];
var currentCity;
//var APIKey = "dc09ac6284d9ebe0179a7090a2a07dd6";

function initialize() {
    //grab previous locations from local storage
    cityLocations = JSON.parse(localStorage.getItem("weatherdb"));    
    //display buttons for previous searches
    if (cityLocations) {
        //get the last city searched so we can display it
        currentCity = cityLocations[cityLocations.length - 1];
        showPrevious();
        getCurrent(currentCity);
    }
    else {        
        if (!navigator.geolocation) {
            getCurrent("Toronto");
        }
        else {
            navigator.geolocation.getCurrentPosition(lookup, err);
        }
    }

}

function lookup(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        currentCity = response.name;
        saveLoc(response.name);
        getCurrent(currentCity);
    });

}

function err(){
    currentCity = "Toronto"
    getCurrent(currentCity);
}

function showPrevious() {
    //show the previously searched for locations based on what is in local storage
    if (cityLocations) {
        prevSearch.empty();
        var btns = $("<div>").attr("class", "list-group");
        for (var i = 0; i < cityLocations.length; i++) {
            var locBtn = $("<a>").attr("href", "#").attr("id", "loc-btn").text(cityLocations[i]);
            if (cityLocations[i] == currentCity){
                locBtn.attr("class", "list-group-item list-group-item-action active");
            }
            else {
                locBtn.attr("class", "list-group-item list-group-item-action");
            }
            btns.prepend(locBtn);
        }
        prevSearch.append(btns);
    }
}

function getCurrent(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey + "&units=imperial";
    $.ajax({
        url: queryURL,
        method: "GET",
        error: function (){
            cityLocations.splice(cityLocations.indexOf(city), 1);
            localStorage.setItem("weatherdb", JSON.stringify(cityLocations));
            initialize();
        }
    }).then(function (response) {
        //create the card
        var currCard = $("<div>").attr("class", "card bg-light");
        forecast.append(currCard);

        //add location to card header
        var currCardHead = $("<div>").attr("class", "card-header").text("Current weather for " + response.name);
        currCard.append(currCardHead);

        var cardRow = $("<div>").attr("class", "row no-gutters");
        currCard.append(cardRow);

        //get icon for weather conditions
        var iconURL = "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";

        var imgDiv = $("<div>").attr("class", "col-md-4").append($("<img>").attr("src", iconURL).attr("class", "card-img"));
        
        cardRow.append(imgDiv);

        var textDiv = $("<div>").attr("class", "col-md-8");
        var cardBody = $("<div>").attr("class", "card-body");
        textDiv.append(cardBody);
        //display city name
        cardBody.append($("<h3>").attr("class", "card-title").text(response.name));
        //display last updated
        var currdate = moment(response.dt, "X").format("dddd, MMMM Do YYYY, h:mm a");
        cardBody.append($("<p>").attr("class", "card-text").append($("<small>").attr("class", "text-muted").text("Last updated: " + currdate)));
        //display Temperature
        cardBody.append($("<p>").attr("class", "card-text").html("Temperature: " + response.main.temp + " &#8457;"));
        //display Humidity
        cardBody.append($("<p>").attr("class", "card-text").text("Humidity: " + response.main.humidity + "%"));
        //display Wind Speed
        cardBody.append($("<p>").attr("class", "card-text").text("Wind Speed: " + response.wind.speed + " MPH"));

        //get UV Index
        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=dc09ac6284d9ebe0179a7090a2a07dd6&lat=" + response.coord.lat + "&lon=" + response.coord.lat;
        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function (uvresponse) {
            var uvindex = uvresponse.value;
            var bgcolor;
            if (uvindex <= 3) {
                bgcolor = "green";
            }
            else if (uvindex >= 3 || uvindex <= 6) {
                bgcolor = "yellow";
            }
            else if (uvindex >= 6 || uvindex <= 8) {
                bgcolor = "orange";
            }
            else {
                bgcolor = "red";
            }
            var uvdisp = $("<p>").attr("class", "card-text").text("UV Index: ");
            uvdisp.append($("<span>").attr("class", "uvindex").attr("style", ("background-color:" + bgcolor)).text(uvindex));
            cardBody.append(uvdisp);

        });

        cardRow.append(textDiv);
        getForecast(response.id);
    });
}

function getForecast(city) {
    //get 5 day forecast
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + city + "&APPID=" + APIKey + "&units=imperial";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //add container div for forecast cards
        var newrow = $("<div>").attr("class", "row");
        forecast.append(newrow);

        //loop through array response to find the forecasts for 15:00
        for (var i = 0; i < response.list.length; i++) {
            if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                var newCol = $("<div>").attr("class", "col-sm");
                newrow.append(newCol);

                var newCard = $("<div>").attr("class", "card text-white bg-primary");
                newCol.append(newCard);

                var cardHead = $("<div>").attr("class", "card-header").text(moment(response.list[i].dt, "X").format("MMM Do"));
                newCard.append(cardHead);

                var cardImg = $("<img>").attr("class", "card-img-top").attr("src", "https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png");
                newCard.append(cardImg);

                var bodyDiv = $("<div>").attr("class", "card-body");
                newCard.append(bodyDiv);

                bodyDiv.append($("<p>").attr("class", "card-text").html("Temp: " + response.list[i].main.temp + " &#8457;"));
                bodyDiv.append($("<p>").attr("class", "card-text").text("Humidity: " + response.list[i].main.humidity + "%"));
            }
        }
    });
}

function clear() {
    //clear all the weather
    forecast.empty();
}

function saveLoc(location){
    //add this to the saved locations array
    if (cityLocations === null) {
        cityLocations = [location];
    }
    else if (cityLocations.indexOf(location) === -1) {
        cityLocations.push(location);
    }
    //save the new array to localstorage
    localStorage.setItem("weatherdb", JSON.stringify(cityLocations));
    showPrevious();
}

searchBtn.on("click", function () {
    //don't refresh the screen
    event.preventDefault();
    //grab the value of the input field
    var location = searchIn.val().trim();
    //if loc wasn't empty
    if (location !== "") {
        //clear the previous forecast
        clear();
        currentCity = location;
        saveLoc(location);
        //clear the search field value
        searchIn.val("");
        //get the new forecast
        getCurrent(location);
    }
});

$(document).on("click", "#loc-btn", function () {
    clear();
    currentCity = $(this).text();
    showPrevious();
    getCurrent(currentCity);
});

initialize();
