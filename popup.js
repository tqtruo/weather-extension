let key = '4828686cdec96d289c72a57aa2c3727b';

// let latDefault = 42.04059;
// let longDefault = -87.78257;

// let weatherData = `https://api.darksky.net/forecast/${key}/${latDefault},${longDefault}?exclude=minutely,daily,alerts,flags&units=auto`;

// function successCallback(location) {
// 	let latitude = location.coords.latitude.toFixed(5);
// 	let longitude = location.coords.longitude.toFixed(5);
// }

let days = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];
let icons = {
	'partly-cloudy-day': './img/cloudy-day-3.svg',
	'partly-cloudy-night': './img/cloudy-night-3.svg',
	cloudy: './img/cloudy.svg',
	'rain-day': './img/rainy-1.svg',
	'rain-night': './img/rainy-6.svg',
	'clear-day': './img/day.svg',
	'clear-night': './img/night.svg',
	sleet: './img/rainy-7.svg',
	fog: './img/cloudy.svg',
	'snow-day': './img/snowy-3.svg',
	'snow-night': './img/snowy-6.svg'
};

let latitude;
let longitude;
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition((location) => {
		latitude = location.coords.latitude.toFixed(5);
		longitude = location.coords.longitude.toFixed(5);
		console.log(latitude, longitude); //41.05, -87.648 Fullstack

		let wData = `https://api.darksky.net/forecast/${key}/${latitude},${longitude}?exclude=minutely,alerts,flags&units=auto`;
		let proxy = 'https://cors-anywhere.herokuapp.com/';
		var URL = proxy + wData;

		fetch(URL)
			.then((data) => {
				return data.json();
			})
			.then((data) => {
				//console.log(data);
				document.getElementById('date').innerHTML = Date(data.currently.time * 1000).slice(0, 10);
				document.getElementById('temperature').innerHTML = data.currently.temperature;
				//document.getElementById('weatherImage').src = './img/cloudy-day-1.svg';

				let pic = data.currently.icon;

				//Check for time of day to grab day/night icons
				if (Number(Date(data.currently.time * 1000).slice(16, 18)) < 19) {
					switch (pic) {
						case 'partly-cloudy-day':
							document.getElementById('weatherImage').src = icons['partly-cloudy-day'];
							break;
						case 'cloudy':
							document.getElementById('weatherImage').src = icons['cloudy'];
							break;
						case 'rain':
							document.getElementById('weatherImage').src = icons['rain-day'];
							break;
						case 'clear-day':
							document.getElementById('weatherImage').src = icons['clear-day'];
							break;
						case 'fog':
							document.getElementById('weatherImage').src = icons['fog']; //using cloudy symbol
							break;
						case 'snow':
							document.getElementById('weatherImage').src = icons['snow-day'];
							break;
						default:
							document.getElementById('weatherImage').src = icons['clear-day'];
					}
				} else {
					switch (pic) {
						case 'partly-cloudy-night':
							document.getElementById('weatherImage').src = icons['partly-cloudy-night'];
							break;
						case 'cloudy':
							document.getElementById('weatherImage').src = icons['cloudy'];
							break;
						case 'rain':
							document.getElementById('weatherImage').src = icons['rain-night'];
							break;
						case 'clear-night':
							document.getElementById('weatherImage').src = icons['clear-night'];
							break;
						case 'fog':
							document.getElementById('weatherImage').src = icons['fog']; //using cloudy symbol
							break;
						case 'snow':
							document.getElementById('weatherImage').src = icons['snow-night'];
							break;
						default:
							document.getElementById('weatherImage').src = icons['clear-night'];
					}
				}
			});
	});
}

// function click(e) {}
// const getWeather = () => {
// 	let proxy = 'https://cors-anywhere.herokuapp.com/';
// 	var URL = proxy + weatherData;

// 	$.getJSON(URL)
// 		.done((data) => {
// 			let temp = data.currently.temperature;
// 			// <html>
// 			// 	<h1>The Temperature: {temp}</h1>
// 			// </html>;
// 		})
// 		.fail(function() {
// 			'Could not retrieve weather data';
// 		});
// };
