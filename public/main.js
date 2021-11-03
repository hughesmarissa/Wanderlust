// Foursquare API Info
const clientId = '0OJWNEQREONU535K045NA2VXJRQJYZNKXGZXUCZUQONOUDSO';
const clientSecret = 'LHJZPYFAYHAY0RQO4NVDFCHPKGPN3EGO4TCN0VH4TLGGPPM0';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = '7b64d6aa0a9543ec6027e10609288abe';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
  const city = $input.val();
  const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20180101`;

  try {
    const response = await fetch(urlToFetch);
    if(response.ok) {
      console.log(response);
    } 
    else {
      throw new Error('Request failed!');
    }
  } 
  catch (error) {
    console.log(error.message);
    const jsonResponse = await response.json();
      console.log(jsonResponse);
      const venues =  jsonResponse.response.groups[0].items.map(item => item.venue);
      console.log(venues);
      return venues;
  }
}

const getForecast = async () => {
  const urlToFetch = `${forecastUrl}${apiKey}&q=${input.val()}&days=48hour=11`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      const days = jsonResponse.forecast.forecastDay;
      return days;
    }
    else {
      throw new Error('Request failed!');
    }
  } 
  catch(error) {
    console.log(error.message);
  }
}


// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    const venue = venues[index];
    const venueIcon = venue.categories[0];
    const venueImgSrc = `${venueIcon.prefix}bg_64${venue.Icon.suffix}`;
    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
  
  
	let weatherContent = '';
  $weatherDiv.append(weatherContent);
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues()
  getForecast()
  return false;
}

$submit.click(executeSearch)