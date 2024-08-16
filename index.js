let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTerm = document.querySelector(".weather_min");
let w_maxTerm = document.querySelector(".weather_max");

let w_feelslike = document.querySelector(".weather_feelslike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");


// now add an event 
document.querySelector(".weather_search").addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the form from submitting and refreshing the page
    const cityInput = document.getElementById("cityid");
    const city = cityInput.value.trim();
    
    getWeatherData(city);
    cityInput.value = '';
});
document.querySelector(".search").addEventListener("click",()=>{
    const cityInput = document.getElementById("cityid");
    const city = cityInput.value.trim();
    
    getWeatherData(city);
    cityInput.value = '';
});

// Fetch weather data
const getCountryName = (code)=>{
    return new Intl.DisplayNames([code], { type: 'region' }).of(code);
}
//to create date and time
const getDateTime = (dt)=>{
    const currdate = new Date(dt*1000);
    //we will be creating options
    
    const options = {
        weekday: "long",
        year : "numeric",
        month : "long",
        day : "numeric",
        hour : "numeric",
        minute : "numeric",
    };
    const formater = new Intl.DateTimeFormat('en-US',options);
    return formater.format(currdate);
}


const getWeatherData = async (city) =>{
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6aa81ef4a5504c9b5255d06c850010b8`;
    try{
        const res = await fetch(weatherUrl);
        const data = await res.json();
        console.log(data);
        // cityName.innerText= data.name;
       
        // //for date and time
        // const timestamp = data.dt * 1000; 
        // const date = new Date(timestamp);
        // dateTime.innerHTML = date.toLocaleString();

        // //Full date and time string
        // w_forecast.innerHTML= data.weather[0].main;
        // w_temperature.innerHTML = data.main.temp;
        // w_minTerm.innerHTML = data.main.temp_max;
        // w_maxTerm.innerHTML = data.main.temp_min;
       const {weather,main,name,dt,sys,wind} = data;
    //    ${getcityname}
       cityName.innerHTML = `${name} , ${getCountryName(sys.country)}`;
       dateTime.innerHTML = getDateTime(dt);
        w_temperature.innerHTML =`${main.temp}&#176`;
        w_minTerm.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`;
        w_maxTerm.innerHTML = `Max: ${main.temp_max.toFixed()}&#176`;
        w_feelslike.innerHTML = `${main.feels_like.toFixed()}&#176`;
        w_humidity.innerHTML = `${main.humidity}%`; 
        w_wind.innerHTML= `${wind.speed}m/s`;
        w_pressure.innerHTML=`${main.pressure}`;
        w_forecast.innerHTML= weather[0].main;
        w_icon.innerHTML = `${weather[0].icon}`
    }catch(error){
        console.log(error);
    }
}

window.addEventListener("load", () => getWeatherData("Pune"));