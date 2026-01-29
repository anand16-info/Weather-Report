// api key from openweathermap
const weatherApiKey = "f7d8857c80a319a965699a85c7838bea";

// button click event
document.getElementById("searchBtn").addEventListener("click", function () {
    getWeatherData();
});

// main function to fetch data
function getWeatherData() {
    const cityValue = document
        .getElementById("cityNameInput")
        .value
        .trim();

    if (cityValue === "") {
        alert("Please enter city name");
        return;
    }

    const apiUrl =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityValue +
        "&units=metric&appid=" +
        weatherApiKey;

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            // IMPORTANT FIX HERE
            if (Number(data.cod) !== 200) {
                alert(data.message);
                return;
            }

            showWeatherData(data);
        })
        .catch(function () {
            alert("Network error");
        });
}


// show data on screen
function showWeatherData(data) {
    const temperatureValue = data.main.temp;
    const weatherCondition = data.weather[0].main;

    document.getElementById("showCity").innerText = data.name;
    document.getElementById("showTemp").innerText =
        "Temperature: " + temperatureValue + " °C";
    document.getElementById("showWeather").innerText =
        "Condition: " + weatherCondition;

    // change background based on temperature
    if (temperatureValue > 25) {
        document.body.className = "hotWeather";
    } else {
        document.body.className = "coldWeather";
    }
}
