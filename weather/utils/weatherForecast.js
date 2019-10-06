const request = require('request');

// This function makes an API request to the DARK SKY API.
// Calls callback function with different payloads depending
// on whether the request was successful or not.
const forecast = (longitude, lattitude, callback) => {
  const url = `https://api.darksky.net/forecast/9198a2c3e7cfd7fe851c465ee6575408/${lattitude},${longitude}?units=si`;
  request({ url, json: true }, (error, response) => {
    if (response) {
      if (!response.body.error) {
        callback(undefined, response);
      } else {
        callback(response.body.error, undefined);
      }
    } else {
      callback(error, undefined);
    }
  });
};

module.exports = forecast;
