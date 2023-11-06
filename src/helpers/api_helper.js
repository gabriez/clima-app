const APIKEY = import.meta.env.VITE_API_KEY;

export const getCountries = async () => {
    const ApiUrl = import.meta.env.VITE_API_COUNTRIES;
   let response;
    try {
        response = await fetch(ApiUrl); 
    } catch (err) {
        console.error(err);
    }
    const result = await response.json();
    // return result;
    return result.map( item => ({countryName: item.translations.spa.common, code: item.cca2})).sort((a, b) => a.countryName.localeCompare(b.countryName));
}

export const getLatLon = async (city, country) => {
    let response; 
    try {
        response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${APIKEY}`)
    } catch (err) {
        console.error(err)
    }
    return await response.json();
}


export const getWeather = async (lat, lon) => {

    let response; 
    try {
        response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`)
    } catch (err) {
        console.error(err)
    }
    return await response.json();
}

