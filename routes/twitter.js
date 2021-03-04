const express = require('express');
const twitter = express.Router();
var Twitter = require('twitter');
 
var client = new Twitter({
    consumer_key: 'sWfwBmRZHg2u0CPThpo0JHY0j',
    consumer_secret: 'oNFEEExI4ynGfiHps60qGG0QWqi0NoyEQEjpqVax3rSbQZE3ak',
    bearer_token: 'AAAAAAAAAAAAAAAAAAAAAJMNNQEAAAAA46Ip5l4MvLUrfg7vBnlPvBT6OYw%3DPXcBbC1DFiHG22emW1W3flblYIUQeWYCDSGiWvYPIZhrPGc2U9'
  });

twitter.get('/', (req, res) => {
    const params = {screen_name: 'nodeJS'};

    client.get(`statuses/user_timeline`, params)
    .then(timeline => {
        res.send(timeline);
    })
    .catch(error => {
        res.send(error);
    })
})

twitter.get('/:name', (req, res) => {
    // const params = {screen_name: `${req.params.name}`};
    const params = {screen_name: `${req.params}`};
    // console.log(req.params.name);
    // const user = userArray.find(u => u.id == parseInt(req.params.id));

    client.get(`statuses/user_timeline`, params)
    .then(timeline => {
        res.send(timeline);
    })
    .catch(error => {
        res.send(error);
    })
})
  
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error) {
//     // console.log(tweets);
//     response.status(200).send(tweets);
//   }
// });
 

module.exports = twitter;