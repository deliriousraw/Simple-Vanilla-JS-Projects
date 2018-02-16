// Init 
const storage = new Storage();
const weatherLocation = storage.getLocationData();

const weather = new Weather(weatherLocation.city, weatherLocation.state);

const ui = new UI();


// Get Weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather);

// Change Location event
document.getElementById('w-change-btn').addEventListener('click', () => {
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    weather.changeLocation(city, state);
    storage.setLocationData(city, state);
    // Get and display weather
    getWeather();
    $('#locModal').modal('hide');
});

function getWeather() {
    weather.getWeather()
        .then(result => {
            ui.paint(result)
        })
        .catch(err => console.log(err));
}