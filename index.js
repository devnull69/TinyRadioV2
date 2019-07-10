let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let Client = require('node-rest-client').Client;
let client = new Client();
let jsdom = require('jsdom');
let { JSDOM } = jsdom;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


let port = process.env.PORT || 8081;

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.listen(port, () => {
   console.log(`Server listening on port ${port} ...`);
});

// API
let stationData = [{
         id: 1,
         name: "Rock Antenne Heavy Metal",
         src: "https://mp3channels.webradio.de/heavy-metal?&aw_0_1st.playerid=RockAntenneWebPlayer&aw_0_1st.listenerid=80423ecc532e6d7ebfe863577b38f2fc&aw_0_1st.skey=1562653242&aw_0_1st.gpslat=51.514&aw_0_1st.gpslong=7.476&aw_0_req.gdpr=true&aw_0_1st.spotcom=%5B%5D",
         title: "Testinterpret - Testsong",
         active: true
      }, {
         id: 2,
         name: "Wacken Radio",
         src: "https://de-hz-fal-stream02.rautemusik.fm/wackenradio",
         title: "Testinterpret - Testsong",
         active: true
      }, {
         id: 3,
         name: "Metal Hammer",
         src: "https://metal-hammer.stream.laut.fm/metal-hammer",
         title: "Testinterpret - Testsong",
         active: true
      }, {
         id: 4,
         name: "Up The Irons",
         src: "https://uptheirons.stream.laut.fm/up_the_irons",
         title: "Testinterpret - Testsong",
         active: true
      }, {
         id: 5,
         name: "Radio 91.2 Lokalradio",
         src: "http://dg-ais-eco-http-fra-eco-cdn.cast.addradio.de/radio912/live/mp3/high?ar-distributor=f0b7",
         title: "Testinterpret - Testsong",
         active: true
      }, {
         id: 6,
         name: "Radio 91.2 80er Radio",
         src: "http://dg-ais-eco-http-fra-eco-cdn.cast.addradio.de/rnrw-014D/dein80er/high/stream.mp3?ar-purpose=web&ar-distributor=f0b7&sid=014d",
         title: "Testinterpret - Testsong",
         active: true
}]

app.get("/api/init", (req, res) => {
  res.json(stationData);
});
