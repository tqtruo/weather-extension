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
				let currentDay = new Date(data.currently.time * 1000);
				document.getElementById('date').innerText = currentDay.toString().slice(0, 10);
				document.getElementById('temperature').innerText = Math.round(data.currently.temperature);

				let pic = data.currently.icon;

				let week = data.daily.data; //array of days + data
				console.log(week);
				let offset = days.findIndex((day) => {
					return day.includes(currentDay.toString().slice(0, 3));
				});
				//console.log('offset', offset);
				for (let i = 0; i < week.length - 1; i++) {
					let dayW = new Date(week[i].time * 1000);
					dayW = dayW.toString().slice(0, 3);
					document.getElementById(`day${i}`).innerText = dayW;
					for (let j = 0; j < days.length; j++) {
						if (days[j].includes(dayW)) {
							document.getElementById(`tempHi${i}`).innerText = `${Math.round(
								week[i].temperatureHigh
							)} °F`;
							document.getElementById(`tempLow${i}`).innerText = `${Math.round(
								week[i].temperatureLow
							)} °F`;
							document.getElementById(`weatherImage${i}`).src = iconSelect(week[i].icon);
						}
					}
				}
				//Check for time of day to grab day/night icons
				if (Number(new Date(data.currently.time * 1000).toString().slice(16, 18)) < 19) {
					document.getElementById('weatherImage').src = iconSelect(pic);
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

		function iconSelect(icon) {
			switch (icon) {
				case 'partly-cloudy-day':
					return icons['partly-cloudy-day'];
				case 'cloudy':
					return icons['cloudy'];

				case 'rain':
					return icons['rain-day'];

				case 'clear-day':
					return icons['clear-day'];

				case 'fog':
					return icons['fog']; //using cloudy symbol

				case 'snow':
					return icons['snow-day'];

				default:
					return icons['clear-day'];
			}
		}
	});
}
