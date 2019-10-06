const request = require('request');
const chalk = require('chalk');

const geocode = (address, callback) => {
  const urlSafeAddress = encodeURIComponent(address);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${urlSafeAddress}.json?&access_token=pk.eyJ1Ijoid2Vub2JvbWFpbHNwcm8iLCJhIjoiY2sxN3BtMWJ6MDh3NDNvbzE1ZTdsbW85NSJ9.d2PclNlF3jUw3-gEcww3uw&limit=1`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback(error, undefined);
    } else if (!response.body.features) {
      callback('Unable to connect to location services. Try again later.');
    } else {
      try {
        const { center, place_name } = response.body.features[0];
        callback(undefined, {
          longitude: center[0],
          lattitude: center[1],
          location: place_name
        });
      } catch (TypeError) {
        const err = `Could not find the location '${address}'. Maybe you could try and be more precise.`;
        callback(err, undefined);
      }
    }
  });
};

module.exports = geocode;
