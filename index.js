let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let Client = require('node-rest-client').Client;
let client = new Client();
let jsdom = require('jsdom');
let { JSDOM } = jsdom;

let strategies = require('./strategies');
let onlinechecker = require('./onlinechecker');

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


let stations = [{
         id: 1,
         name: "Rock Antenne Heavy Metal",
         src: "https://mp3channels.webradio.de/heavy-metal?&aw_0_1st.playerid=RockAntenneWebPlayer&aw_0_1st.listenerid=80423ecc532e6d7ebfe863577b38f2fc&aw_0_1st.skey=1562653242&aw_0_1st.gpslat=51.514&aw_0_1st.gpslong=7.476&aw_0_req.gdpr=true&aw_0_1st.spotcom=%5B%5D",
         scope: "heavymetal",
         strategy: new strategies.RockAntenneStrategy("heavy-metal")
      }, {
         id: 2,
         name: "Wacken Radio",
         src: "https://wackenradio-high.rautemusik.fm/stream.mp3?ref=page",
         scope: "heavymetal",
         strategy: new strategies.WackenRadioStrategy()
      }, {
         id: 3,
         name: "Metal Hammer",
         src: "https://metal-hammer.stream.laut.fm/metal-hammer",
         scope: "heavymetal",
         strategy: new strategies.LautFMStrategy("metal-hammer")
      }, {
         id: 4,
         name: "Up The Irons",
         src: "https://uptheirons.stream.laut.fm/up_the_irons",
         scope: "heavymetal",
         strategy: new strategies.LautFMStrategy("up_the_irons")
      }, {
         id: 5,
         name: "Metal Only",
         src: "http://server1.blitz-stream.de:4400/;080794759699378stream.nsv",
         scope: "heavymetal",
         strategy: new strategies.OnlineRadioBoxStrategy("de.metalonly"),
      }, {
         id: 6,
         name: "Stahlradio",
         src: "http://54.36.135.248:5280/stream",
         scope: "heavymetal",
         strategy: new strategies.StahlRadioStrategy()
      }, {
         id: 7,
         name: "Rockerportal",
         src: "https://rockerportal.stream.laut.fm/rockerportal",
         scope: "heavymetal",
         strategy: new strategies.LautFMStrategy("rockerportal")
      }, {
         id: 8,
         name: "Motorbreath",
         src: "https://motorbreath.stream.laut.fm/motorbreath",
         scope: "heavymetal",
         strategy: new strategies.LautFMStrategy("motorbreath")
      }, {
         id: 9,
         name: "Metalstation",
         src: "https://metalstation.stream.laut.fm/metalstation",
         scope: "heavymetal",
         strategy: new strategies.LautFMStrategy("metalstation")
      }, {
         id: 10,
         name: "Metal FM",
         src: "https://metal-fm-com.stream.laut.fm/metal-fm-com",
         scope: "heavymetal",
         strategy: new strategies.LautFMStrategy("metal-fm-com")
      }, {
         id: 11,
         name: "Radio 91.2 80er Radio",
         scope: "80er",
         src: "https://rnrw-ais-edge-3106-fra-eco-cdn.cast.addradio.de/rnrw-014d/dein80er/high/stream.mp3?ar-distributor=ffa0&sid=014d&kombi=Dortmund&_art=dj0yJmlwPTc5LjIxNi4yMS4xODcmaWQ9aWNzY3hsLW42MnJrZnhrYiZ0PTE1OTc4NDc1OTEmcz03ODY2ZjI5YyM3ZTRiNTU0ODQxMjViY2ZiNGE3MTNkNTg0MmYyZjAyMw",
         strategy: new strategies.NRWLokalRadioStrategy(1001),
         titlecase: true
      }, {
         id: 12,
         name: "R.SH 80er",
         src: "http://regiocast.hoerradar.de/rsh-80er-mp3-hq",
         scope: "80er",
         strategy: new strategies.RSHStrategy("R.SH 80er")
      }, {
         id: 13,
         name: "Antenne Bayern 80er",
         src: "http://mp3channels.webradio.antenne.de/80er-kulthits",
         scope: "80er",
         strategy: new strategies.RadioDEStrategy(9123, 0)
      }, {
         id: 14,
         name: "Radio Regenbogen 80er",
         src: "http://streams.regenbogen.de/rr-80er-128-mp3",
         scope: "80er",
         strategy: new strategies.RegenbogenStrategy("80er"),
         titlecase: true
      }, {
         id: 15,
         name: "FFH 80er",
         src: "http://mp3.ffh.de/ffhchannels/hq80er.mp3",
         scope: "80er",
         strategy: new strategies.RadioDEStrategy(9710, 0)
      }, {
         id: 16,
         name: "Laut FM 80er",
         src: "https://80er.stream.laut.fm/80er",
         scope: "80er",
         strategy: new strategies.LautFMStrategy("80er")
      }, {
         id: 17,
         name: "Best of 80s",
         src: "https://bestof80s.stream.laut.fm/best_of_80s",
         scope: "80er",
         strategy: new strategies.LautFMStrategy("best_of_80s")
      }, {
         id: 18,
         name: "0-24 80er Pop Rock",
         src: "https://0-2480erpoprock.stream.laut.fm/0-24_80er_pop_rock",
         scope: "80er",
         strategy: new strategies.LautFMStrategy("0-24_80er_pop_rock")
      }, {
         id: 19,
         name: "Move On",
         src: "https://moveon.stream.laut.fm/move_on",
         scope: "80er",
         strategy: new strategies.LautFMStrategy("move_on")
      }, {
         id: 20,
         name: "Just 80s",
         src: "https://just80s.stream.laut.fm/just80s",
         scope: "80er",
         strategy: new strategies.LautFMStrategy("just80s")
      }, {
         id: 21,
         name: "RPR1 Best of 80s",
         src: "http://streams.rpr1.de/rpr-80er-128-mp3?usid=0-0-H-M-D-06",
         scope: "80er",
         strategy: new strategies.OnlineRadioBoxStrategy("de.rpr280er"),
         titlecase: true
      }, {
         id: 22,
         name: "Wunschradio FM 80er",
         src: "http://server74.radiostreamserver.de/wunschradio-80er.mp3",
         scope: "80er",
         strategy: new strategies.WunschradioFMStrategy("80er")
      }, {
         id: 23,
         name: "RPR1 Neue Deutsche Welle",
         src: "http://streams.rpr1.de/rpr-ndw-128-mp3?usid=0-0-H-M-D-06",
         scope: "NDW",
         strategy: new strategies.RadioDEStrategy(41162, 1),
         titlecase: true
      }, {
         id: 24,
         name: "80s80s NDW",
         src: "http://80s80s.hoerradar.de/80s80s-ndw-mp3-mq?sABC=5q25r1n2%230%232000r3268p2816383571rn5877123r83%23enqvbqr&amsparams=playerid:radiode;skey:1562763682",
         scope: "NDW",
         strategy: new strategies.OnlineRadioBoxStrategy("de.80s80sndw")
      }, {
         id: 25,
         name: "1A NDW",
         src: "http://1a-ndw.radionetz.de:8000/1a-ndw.mp3",
         scope: "NDW",
         strategy: new strategies.RadioDEStrategy(110228, 0)
      }, {
         id: 26,
         name: "Radio 91.2 Lokalradio",
         src: "https://radio912-ais-edge-3104-fra-eco-cdn.cast.addradio.de/radio912/live/mp3/high?ar-distributor=ffa0&_art=dj0yJmlwPTc5LjIxNi4yNi4xMzcmaWQ9aWNzY3hsLXR0emRyenVtYiZ0PTE1OTcxNDQ0NzUmcz03ODY2ZjI5YyNiZTA5ZDhiNDVmNmUyZWQyMTVhOTEwYzdmMzFjZWRmMw",
         scope: "Lokalradio",
         strategy: new strategies.NRWLokalRadioStrategy(6),
         titlecase: true
      }, {
         id: 27,
         name: "R.SH",
         src: "http://regiocast.hoerradar.de/rsh128",
         scope: "Lokalradio",
         strategy: new strategies.RSHStrategy("R.SH Live")
      }, {
         id: 28,
         name: "1Live",
         src: "https://wdr-edge-2020-fra-lg-cdn.cast.addradio.de/wdr/1live/live/mp3/128/stream.mp3?ar-distributor=f0a0&_art=dj0yJmlwPTc5LjIxNi4yNi4xMzcmaWQ9aWNzY3hsLXgyY3NzeWxsYiZ0PTE1OTcxNDQ5Njgmcz03ODY2ZjI5YyNlNTY5YmY0MWJlMGE4MzEzOGYzNzQwYjE1OTc1MzU0MA",
         scope: "Lokalradio",
         strategy: new strategies.RadioDEStrategy(1382, 0)
      }, {
         id: 29,
         name: "WDR2 - Ruhrgebiet",
         src: "https://wdr-edge-201b-dus-lg-cdn.cast.addradio.de/wdr/wdr2/ruhrgebiet/mp3/128/stream.mp3?ar-distributor=f0a0&_art=dj0yJmlwPTc5LjIxNi4yNi4xMzcmaWQ9aWNzY3hsLWw2Y3NzeWxsYiZ0PTE1OTcxNDUwNzQmcz03ODY2ZjI5YyNhNWNjZmY3OTJlZWMwZWUwNTM0MTIxNDFjZmZlYTgwYw",
         scope: "Lokalradio",
         strategy: new strategies.RadioDEStrategy(9773, 0)
      }, {
         id: 30,
         name: "SWR3",
         src: "https://swr-edge-2031-dus-lg-cdn.cast.addradio.de/swr/swr3/live/aac/96/stream.aac?ar-distributor=f0a0&_art=dj0yJmlwPTc5LjIxNi4yNi4xMzcmaWQ9aWNzY3hsLXZ5c2UzMmxsYiZ0PTE1OTcxNDUyMjAmcz03ODY2ZjI5YyM4YzBjMTcyZDViMTQ5YTNlMTI0YWQyZWUwMzNjOGJjYQ",
         scope: "Lokalradio",
         strategy: new strategies.RadioDEStrategy(2275, 0)
      }, {
         id: 31,
         name: "NDR2",
         src: "https://ndr-edge-20b2-fra-lg-cdn.cast.addradio.de/ndr/ndr2/niedersachsen/mp3/128/stream.mp3?ar-distributor=f0a0&_art=dj0yJmlwPTc5LjIxNi4yNi4xMzcmaWQ9aWNzY3hsLWhpdW9jM2xsYiZ0PTE1OTcxNDUzMDMmcz03ODY2ZjI5YyNjMmY3ZGRhMGQwYTdjZWE0NGRmYzQ4YWRiOGE0ZTlmOA",
         scope: "Lokalradio",
         strategy: new strategies.RadioDEStrategy(2262, 0)
      }, {
         id: 32,
         name: "Bayern3",
         src: "https://br-edge-2009-dus-lg-cdn.cast.addradio.de/br/br3/live/mp3/128/stream.mp3?ar-distributor=f0a0&_art=dj0yJmlwPTc5LjIxNi4yNi4xMzcmaWQ9aWNzY3hsLWRzcWR4d2tsYiZ0PTE1OTcxNDUzNjImcz03ODY2ZjI5YyM2ZTZiMjJjZjY5NGJiNWRiNzVmMDk2ODQ1ZWVkMjYyYg",
         scope: "Lokalradio",
         strategy: new strategies.RadioDEStrategy(2247, 0)
      }, {
         id: 33,
         name: "R.SH 90er",
         src: "http://regiocast.hoerradar.de/rsh-90er-mp3-hq",
         scope: "90er",
         strategy: new strategies.RSHStrategy("R.SH 90er")
      }, {
         id: 34,
         name: "Radio Regenbogen 90er",
         src: "http://streams.regenbogen.de/rr-90er-128-mp3",
         scope: "90er",
         strategy: new strategies.RegenbogenStrategy("90er"),
         titlecase: true
      }, {
         id: 35,
         name: "FFH 90er",
         src: "http://mp3.ffh.de/ffhchannels/hq90er.mp3",
         scope: "90er",
         strategy: new strategies.RadioDEStrategy(22960, 0)
      }, {
         id: 36,
         name: "Best of 90s",
         src: "https://bestof90s.stream.laut.fm/best_of_90s",
         scope: "90er",
         strategy: new strategies.LautFMStrategy("best_of_90s")
      }, {
         id: 37,
         name: "Germanradio 90er",
         src: "http://germanradio.info:13300/;",
         scope: "90er",
         strategy: new strategies.OnlineRadioBoxStrategy("de.germanradioinfo90er")
      }, {
         id: 38,
         name: "90s90s",
         src: "https://90s90s.hoerradar.de/90s90s-pop-mp3-hq?sABC=5q274229%230%23857psp88on39p1p3626785o66674n105%23ubzrcntr&context=fHA6LTE=&aw_0_1st.kuid=tsb7u9x35&aw_0_1st.ksg=[%22tow0oughf%22,%22tsrahp573%22,%22tow65wkpp%22,%22takaaes6u%22,%22ti5001c5h%22]&amsparams=playerid:homepage;skey:1562853929",
         scope: "90er",
         strategy: new strategies.NinetiesStrategy(141)
      }, {
         id: 39,
         name: "Wunschradio FM 90er",
         src: "http://server74.radiostreamserver.de/wunschradio-90er.mp3",
         scope: "90er",
         strategy: new strategies.WunschradioFMStrategy("90er")
      }, {
         id: 40,
         name: "M1.FM 90er",
         src: "http://tuner.m1.fm/90er.mp3",
         scope: "90er",
         strategy: new strategies.OnlineRadioBoxStrategy("de.m190er")
      }, {
         id: 41,
         name: "Vienna.AT 90er",
         src: "http://webradio.vienna.at/vie-90er",
         scope: "90er",
         strategy: new strategies.OnlineRadioBoxStrategy("at.viennaat90er")
      }, {
         id: 42,
         name: "Radio BOB! Metal",
         src: "http://bob.hoerradar.de/radiobob-metal-mp3-mq?sABC=5q2902po%230%23857psp88on39p1p3626785o66674n105%23enqvbqr&amsparams=playerid:radiode;skey:1562968779",
         scope: "heavymetal",
         strategy: new strategies.OnlineRadioBoxStrategy("de.bobsmetal")
      }, {
         id: 43,
         name: "Metal Up Your Ass",
         src: "https://metal-up-your-ass.stream.laut.fm/metal-up-your-ass?ref=radiode&t302=2019-07-13_00-10-38&uuid=3935ca92-bf30-4e4b-a1d2-f8c0bf0ad7ce",
         scope: "heavymetal",
         strategy: new strategies.RadioDEStrategy(104129, 0)
      }];


app.get("/api/init/:scope", async (req, res) => {
  let scope = req.params.scope;
  let result = [];

  let filteredStations = stations.filter(station => station.strategy && (scope == "all" || station.scope == scope));

  let allResults = await Promise.all(filteredStations.map(station => station.strategy.getTitle()));

  //let allCheckResults = await Promise.all(filteredStations.map(station => onlinechecker(station.src)));

  for(let i=0; i<filteredStations.length; i++) {
    let station = filteredStations[i];
    let stationData = {...station};
    stationData.strategy = undefined;
    stationData.title = allResults[i];
    //stationData.active = allCheckResults[i];
    stationData.active = true;
    result.push(stationData);
  }

  res.json(result);
});
