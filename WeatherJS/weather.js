class Weather {
    constructor(city, state) {
            this.apiKey = 'a5a1355dea17a2e6';
            this.city = city;
            this.state = state;
        }
        // Fetch Weather fro API
    async getWeather(url) {
        const response = await fetch(`http://api.wunderground.com/api/${this.apiKey}/conditions/q/${this.state}/${this.city}.json`);
        const responseData = await response.json();

        return responseData.current_observation;
    }

    changeLocation(city, state) {
        this.city = city;
        this.state = state;
    }
}