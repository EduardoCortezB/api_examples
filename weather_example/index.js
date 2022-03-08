const api_K = "27175e3695f2efa622ea1dd0c1e84dcd";

const onLoad = ()=>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(log)
    }else{
        console.log("Is not suported");
    }
}
const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${ ('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}
const weatherLoad = (data) =>{

    let weatherData = {
        location: data.name,
        description: data.weather[0].description,
        humidity: data.main.humidity+'%',
        pressure: data.main.pressure,
        temperature: data.main.temp,
        date: getDate()
    }

    

    Object.keys(weatherData).forEach( key => {
        document.getElementById(key).innerText = weatherData[key];
    });
}
const log = (ps) =>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${ps.coords.latitude}&lon=${ps.coords.longitude}&appid=${api_K}`,{
        method: 'POST'
    }).then(response => response.json()).then(data =>{
        weatherLoad(data);
        console.log(data)
    })
}

