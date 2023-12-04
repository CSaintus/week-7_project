const apiKey = '9ba5446cfc4797650be4ba59643027bcKEY';
const weatherContainer = document.getElementById('weather-container');
const imageContainer = document.getElementById('image-container');

async function getWeather() {
  const zipCode = document.getElementById('zip-code').value;
  const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;

  try {
    const response = await fetch(weatherEndpoint);
    const data = await response.json();

    if (response.ok) {
      displayWeather(data);
      getImage(data.name);
    } else {
      weatherContainer.innerHTML = `<p>Error: ${data.message}</p>`;
      imageContainer.innerHTML = '';
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayWeather(data) {
  const highTemp = convertKelvinToFahrenheit(data.main.temp_max);
  const lowTemp = convertKelvinToFahrenheit(data.main.temp_min);
  const humidity = data.main.humidity;
  const forecast = data.weather[0].description;

  weatherContainer.innerHTML = `
    <p>High: ${highTemp}°F</p>
    <p>Low: ${lowTemp}°F</p>
    <p>Forecast: ${forecast}</p>
    <p>Humidity: ${humidity}%</p>
  `;
}

function convertKelvinToFahrenheit(kelvin) {
  return ((kelvin - 273.15) * 9/5 + 32).toFixed(2);
}

async function getImage(cityName) {
  
  const unsplashApiKey = 'sXTXUgauyoHvCBRCAy7GsnqClKqiP_j0j36WTLQgKZI';
  const imageEndpoint = `https://api.unsplash.com/photos/random?query=${cityName}&client_id=${unsplashApiKey}`;

  try {
    const response = await fetch(imageEndpoint);
    const data = await response.json();

    if (response.ok) {
      displayImage(data.urls.regular);
    } else {
      imageContainer.innerHTML = `<p>Error fetching image</p>`;
    }
  } catch (error) {
    console.error('Error fetching image:', error);
  }
}

function displayImage(imageUrl) {
  imageContainer.innerHTML = `
    <img src="${imageUrl}" alt="City Image" style="max-width: 100%;">
  `;
}
