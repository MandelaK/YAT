const request = require('request');
const readline = require('readline');
const chalk = require('chalk');
const prompt = require('prompt');

const geocode = require('./utils/geocode');
const forecast = require('./utils/weatherForecast');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

const inputs = [
  {
    description: 'Enter location',
    name: 'location',
    validator: /^[a-zA-Z\s\-]+$/,
    required: true,
    warning: 'Please enter valid location'
  }
];
prompt.start();

prompt.get(inputs, (error, address) => {
  if (error) {
    console.log(error);
  } else {
    // ensure that location exists and use regex to ensure it's not an empty string
    if (!address.location || !/\S/.test(address.location)) {
      console.log(
        chalk.red.inverse('Please provide a valid location and try again.')
      );
    } else {
      geocode(address.location, (error, data) => {
        if (!error) {
          const { longitude, lattitude, location } = data;
          forecast(longitude, lattitude, (error, response) => {
            if (response) {
              const {
                temperature,
                precipProbability
              } = response.body.currently;
              const { summary } = response.body.daily.data[0];
              console.log(
                `Summary report for ${location}. ${chalk.green.inverse(
                  summary
                )} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`
              );
            } else {
              console.log(error);
            }
          });
        } else {
          if (typeof error === 'string') {
            console.log(chalk.red.inverse(error));
          } else {
            console.log(
              chalk.red.inverse('Unable to connect to location services.')
            );
          }
        }
      });
    }
  }
});

// geocode('Uganda', (error, data) => {
//   if (!error) {
//     const { longitude, lattitude, location } = data;
//     forecast(longitude, lattitude, (error, response) => {
//       if (response) {
//         const { temperature, precipProbability } = response.body.currently;
//         const { summary } = response.body.daily.data[0];
//         console.log(
//           `Summary report for ${location}. ${summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain`
//         );
//       } else console.log(error);
//     });
//   } else {
//     console.log(error);
//   }
// });

// TODO: Allow forecasts from different APIs
