const express = require('express');
const twitter = express.Router();
var Twitter = require('twitter');
const needle = require('needle');
 
var client = new Twitter({
    consumer_key: 'sWfwBmRZHg2u0CPThpo0JHY0j',
    consumer_secret: 'oNFEEExI4ynGfiHps60qGG0QWqi0NoyEQEjpqVax3rSbQZE3ak',
    Access_token_key: '49712490-HqWXlnrUSN7PDlc0akp1teAFx8LxvarXuUU1yztxL',
    Access_token_secret: '0hSP0vpMzwy6aBMSrtBvOSN7rcjbKiyRM38m45X96DIKk',
    bearer_token: 'AAAAAAAAAAAAAAAAAAAAAJMNNQEAAAAA46Ip5l4MvLUrfg7vBnlPvBT6OYw%3DPXcBbC1DFiHG22emW1W3flblYIUQeWYCDSGiWvYPIZhrPGc2U9'
  });

twitter.get('/', (req, res) => {
    const params = {screen_name: 'NodeJS'};
    console.log(params);

    client.get(`statuses/user_timeline`, params)
    .then(timeline => {
        res.send(timeline);
    })
    .catch(error => {
        res.send(error);
    })
})

//gets a users 7 most recent tweets based on user searched input for specific user
let token = 'AAAAAAAAAAAAAAAAAAAAAJMNNQEAAAAA46Ip5l4MvLUrfg7vBnlPvBT6OYw%3DPXcBbC1DFiHG22emW1W3flblYIUQeWYCDSGiWvYPIZhrPGc2U9';

twitter.get('/:username', (req, res) => {
async function getRequest() {
    const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";
    const params = {
        'query': `from:${req.params.username} -is:retweet`,
        'tweet.fields': 'author_id'
    }

    const res = await needle('get', endpointUrl, params, {
        headers: {
            "User-Agent": "v2RecentSearchJS",
            "authorization": `Bearer ${token}`
        }
    })

    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request');
    }
}
   (async () => {
    try {
        // Make request
        const response = await getRequest();
        res.send(response);

    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
    process.exit();
})();
})

const endpointURL = "https://api.twitter.com/2/users/by?usernames="

async function getRequest(req, r) {
    const params = {
        usernames: `${req.params.usernames}`, // Edit usernames to look up
        "user.fields": "created_at,description", // Edit optional query parameters here
        "expansions": "pinned_tweet_id"
    }

    const res = await needle('get', endpointURL, params, {
        headers: {
            "User-Agent": "v2UserLookupJS",
            "authorization": `Bearer ${token}`
        }
    })

    if (res.body) {
        return r.send(res.body);
    } else {
        throw new Error('Unsuccessful request')
    }
}

//search for user. 
twitter.get('/userbase/:usernames', (req, res) => {
    
    getRequest(req, res);

    })


//searches for tweets based on hashtags
twitter.get('/tweets/:hashtag', (req, res) => {

    const endpointURL = "https://api.twitter.com/2/users/by?usernames="
    async function getRequest() {
        console.log(req.params.usernames);
        const params = {
            // 'query': `#dogs -is:retweet` start here 
        }
    
        const res = await needle('get', endpointURL, params, {
            headers: {
                "User-Agent": "v2UserLookupJS",
                "authorization": `Bearer ${token}`
            }
        })
    
        if (res.body) {
            return res.body;
        } else {
            throw new Error('Unsuccessful request')
        }
    }
    
    (async () => {
    
        try {
            // Make request
            const response = await getRequest();
            console.dir(response, {
                depth: null,
                colors: true
            });

            res.send(response);
    
        } catch (e) {
            console.log(e);
            process.exit(-1);
        }
        process.exit();
    })();
    })
  
module.exports = twitter;