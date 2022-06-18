//functions and variables for API 
let weather = {
    "apiKey": "9d34553ab8843b13f4d032cb109c6eb3",
    fetchWeather: function (city){
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        +"&units=metric&appid=" 
        + this.apiKey
    )
    .then((response) => {
        if(!response.ok){
            alert("No weather found.")
            throw new Error("No weather found.")
        }
        return response.json()
    })
    .then((data)=>this.displayWeather(data))
    },
displayWeather: function(data){
    //this gets the name from the data, extracting name from object
    const { name } = data
    const { icon, description } = data.weather[0]
    const { temp, humidity } = data.main
    const{ speed } = data.wind
    document.querySelector(".city").innerText = "Weather in " + name
    document.querySelector(".icon").src = 
    "https://openweathermap.org/img/wn/"+ icon +".png"
    document.querySelector(".description").innerText = description
    document.querySelector(".temp").innerText = temp + "°C"
    document.querySelector(".humidity").innerText = 
    "Humidity: " + humidity + "%"
    document.querySelector(".wind").innerText = 
    "Wind Speed" + speed + "km/h"
    document.querySelector(".weather").classList.remove("loading")
    document.body.style.backgroundImage = 
    "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },
    search: function() {
        this.fetchWeather(document.querySelector(".searchBar").value)
    },
};

document.querySelector(".search button")
.addEventListener("click", function(){
    weather.search()
})

document
.querySelector(".searchBar")
.addEventListener("keyup", function(event){
    if (event.key == "Enter") {
        weather.search()
    }
})
