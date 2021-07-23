let requester = require('request');

let requestSettings = {
    method: 'GET',
    url: 'http://addrad.io/444zfxx',
    followRedirect: false
 };

 requester(requestSettings, function(err, response, body) {
    if(err) {
       console.log("REQUEST ERROR")
       return;
    }

    console.dir(response.headers.location)
});
