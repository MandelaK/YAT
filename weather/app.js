const request = require('request');

const url =
  'https://api.darksky.net/forecast/9198a2c3e7cfd7fe851c465ee6575408/37.8267,-122.4233';

request({ url }, (error, response) => {
  const weatherBody = JSON.parse(response.body);
  console.log(weatherBody.currently);
});
