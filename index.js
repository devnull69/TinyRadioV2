let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let Client = require('node-rest-client').Client;
let client = new Client();
let jsdom = require('jsdom');
let { JSDOM } = jsdom;

let strategies = require('./strategies');
let onlinechecker = require('./onlinechecker');
const { RedirectStrategy } = require('./strategies');

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

app.listen(port, async () => {
   console.log(`Server listening on port ${port} ...`);

   // Redirect necessary?
   for(let station of stations) {
      if(station.redirect) {
         console.log("REDIRECT FOR " + station.src);
         station.src = await new RedirectStrategy(station.src).getRedirectUrl();
      }
   }
});


let stations = [{
         id: 1,
         name: "Rock Antenne Heavy Metal",
         src: "https://s1-webradio.webradio.de/heavy-metal?&aw_0_1st.playerid=RockAntenneWebPlayer&aw_0_1st.skey=1605081914&aw_0_req.gdpr=false&companionAds=false&aw_0_1st.spotcom=%5B%5D",
         scope: "heavymetal",
         strategy: new strategies.RockAntenneStrategy("heavy-metal"),
         espradio: true
      }, {
         id: 2,
         name: "Wacken Radio",
         src: "https://rautemusik-de-hz-fal-stream12.radiohost.de/wackenradio?ref=rm5beta",
         scope: "heavymetal",
         strategy: new strategies.WackenRadioStrategy(),
         espradio: false
      }, {
         id: 44,
         name: "Radio BOB! Wacken",
         src: "http://bob.hoerradar.de/radiobob-wacken-mp3-mq?sABC=60sr7843%230%232o51p516qo6109rns3p7909819p6poro%23bayvarenqvbobk&=&amsparams=playerid:onlineradiobox;skey:1627289667",
         scope: "heavymetal",
         strategy: new strategies.OnlineRadioBoxStrategy("de.bobswackennonstop")
      }, {
         id: 3,
         name: "Metal Hammer",
         src: "https://metal-hammer.stream.laut.fm/metal-hammer",
         scope: "heavymetal",
         strategy: new strategies.LautFMStrategy("metal-hammer"),
         espradio: true
      }, {
         id: 4,
         name: "Up The Irons",
         src: "https://uptheirons.stream.laut.fm/up_the_irons",
         scope: "heavymetal",
         strategy: new strategies.LautFMStrategy("up_the_irons"),
         espradio: true
      }, {
         id: 5,
         name: "Metal Only",
         src: "http://nordic.streampanel.cloud/stream",
         scope: "heavymetal",
         strategy: new strategies.OnlineRadioBoxStrategy("de.metalonly"),
         espradio: true
      }, {
         id: 6,
         name: "Stahlradio",
         src: "https://simba.streampanel.cloud:5280/stream",
         scope: "heavymetal",
         strategy: new strategies.StahlRadioStrategy(),
         espradio: true
      }, {
         id: 7,
         name: "Rockerportal",
         src: "https://rockerportal.stream.laut.fm/rockerportal",
         scope: "heavymetal",
         strategy: new strategies.LautFMStrategy("rockerportal"),
         espradio: true
      }, {
         id: 8,
         name: "Motorbreath",
         src: "https://motorbreath.stream.laut.fm/motorbreath",
         scope: "heavymetal",
         strategy: new strategies.LautFMStrategy("motorbreath"),
         espradio: true
      }, {
         id: 9,
         name: "Metalstation",
         src: "https://metalstation.stream.laut.fm/metalstation",
         scope: "heavymetal",
         strategy: new strategies.LautFMStrategy("metalstation"),
         espradio: true
      }, {
         id: 10,
         name: "Metal FM",
         src: "https://metal-fm-com.stream.laut.fm/metal-fm-com",
         scope: "heavymetal",
         strategy: new strategies.LautFMStrategy("metal-fm-com"),
         espradio: true
      }, {
         id: 11,
         name: "Radio 91.2 80er Radio",
         scope: "80er",
         redirect: true,
         src: "http://addrad.io/444zfxx",
         strategy: new strategies.NRWLokalRadioStrategy(1001),
         titlecase: true,
         espradio: true
      }, {
         id: 12,
         name: "R.SH 80er",
         src: "http://regiocast.hoerradar.de/rsh-80er-mp3-hq",
         scope: "80er",
         strategy: new strategies.RSHStrategy("R.SH 80er"),
         espradio: true
      }, {
         id: 13,
         name: "Antenne Bayern 80er",
         src: "https://s10-webradio.antenne.de/80er-kulthits/stream/mp3",
         scope: "80er",
         strategy: new strategies.RadioDEStrategy(9123, 0),
         espradio: true
      }, {
         id: 14,
         name: "Radio Regenbogen 80er",
         src: "http://streams.regenbogen.de/rr-80er-128-mp3",
         scope: "80er",
         strategy: new strategies.RegenbogenStrategy("80er"),
         titlecase: true,
         espradio: true
      }, {
         id: 15,
         name: "FFH 80er",
         src: "http://mp3.ffh.de/ffhchannels/hq80er.mp3",
         scope: "80er",
         strategy: new strategies.RadioDEStrategy(9710, 0),
         espradio: true
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
         name: "M1.FM 80er",
         src: "https://tuner.m1.fm/80er.mp3",
         scope: "80er",
         strategy: new strategies.OnlineRadioBoxStrategy("de.m180er")
      }, {
         id: 22,
         name: "RPR1 Best of 80s",
         src: "http://streams.rpr1.de/rpr-80er-128-mp3?usid=0-0-H-M-D-06",
         scope: "80er",
         strategy: new strategies.OnlineRadioBoxStrategy("de.rpr280er"),
         titlecase: true
      }, {
         id: 24,
         name: "RPR1 Neue Deutsche Welle",
         src: "http://streams.rpr1.de/rpr-ndw-128-mp3?usid=0-0-H-M-D-06",
         scope: "NDW",
         strategy: new strategies.RadioDEStrategy(41162, 1),
         titlecase: true
      }, {
         id: 25,
         name: "80s80s NDW",
         src: "http://80s80s.hoerradar.de/80s80s-ndw-mp3-mq?sABC=5q25r1n2%230%232000r3268p2816383571rn5877123r83%23enqvbqr&amsparams=playerid:radiode;skey:1562763682",
         scope: "NDW",
         strategy: new strategies.OnlineRadioBoxStrategy("de.80s80sndw")
      }, {
         id: 26,
         name: "1A NDW",
         src: "http://1a-ndw.radionetz.de:8000/1a-ndw.mp3",
         scope: "NDW",
         strategy: new strategies.RadioDEStrategy(110228, 0)
      }, {
         id: 27,
         name: "Radio 91.2 Lokalradio",
         src: "http://addrad.io/4453z56",
         scope: "Lokalradio",
         redirect: true,
         strategy: new strategies.NRWLokalRadioStrategy(6),
         titlecase: true
      }, {
         id: 28,
         name: "R.SH",
         src: "http://regiocast.hoerradar.de/rsh128",
         scope: "Lokalradio",
         strategy: new strategies.RSHStrategy("R.SH Live")
      }, {
         id: 29,
         name: "1Live",
         src: "http://wdr-edge-30ba-fra-ts-cdn.cast.addradio.de/wdr/1live/live/mp3/128/stream.mp3?ar-distributor=f0a0&_art=dj0yJmlwPTkxLjM1LjExNS4xODQmaWQ9aWNzY3hsLXgyY3NzeWxsYiZ0PTE2MjcxMjU3MjEmcz03ODY2ZjI5YyNhMWFmMGU4ZjI0MTA2MWY1OTZlOTE4NjRiYmNiZDNjZQ",
         scope: "Lokalradio",
         strategy: new strategies.NewRadioDEStrategy("1live")
      }, {
         id: 30,
         name: "WDR2 - Ruhrgebiet",
         src: "http://wdr-edge-30c2-dus-ts-cdn.cast.addradio.de/wdr/wdr2/ruhrgebiet/mp3/128/stream.mp3?ar-distributor=f0a0&_art=dj0yJmlwPTkxLjM1LjExNS4xODQmaWQ9aWNzY3hsLWw2Y3NzeWxsYiZ0PTE2MjcxMjY0MjUmcz03ODY2ZjI5YyM1MDQ0N2I5NTJhYzNlZWY0MTNkNzYzNmI2MDM0MDRkMg",
         scope: "Lokalradio",
         strategy: new strategies.NewRadioDEStrategy("wdr2ruhrgebiet")
      }, {
         id: 31,
         name: "SWR3",
         src: "http://swr-edge-1035-fra-dtag-cdn.cast.addradio.de/swr/swr3/live/aac/96/stream.aac?ar-distributor=f0a0&_art=dj0yJmlwPTkxLjM1LjExNS4xODQmaWQ9aWNzY3hsLXZ5c2UzMmxsYiZ0PTE2MjcxMjY2MTAmcz03ODY2ZjI5YyMyMGVlNzQwZjU2YWU1Y2YwODBiYzZjYTM0NDM3M2ViYw",
         scope: "Lokalradio",
         strategy: new strategies.NewRadioDEStrategy("swr3")
      }, {
         id: 32,
         name: "NDR2",
         src: "http://ndr-edge-30ac-fra-ts-cdn.cast.addradio.de/ndr/ndr2/niedersachsen/mp3/128/stream.mp3?ar-distributor=f0a0&_art=dj0yJmlwPTkxLjM1LjExNS4xODQmaWQ9aWNzY3hsLWhpdW9jM2xsYiZ0PTE2MjcxMjY3MzYmcz03ODY2ZjI5YyNjY2Q1ZmNjNmI0ZDJkY2JiOWMxNWViNWVhNTNjZTgzZA",
         scope: "Lokalradio",
         strategy: new strategies.NewRadioDEStrategy("ndr2")
      }, {
         id: 33,
         name: "Bayern3",
         src: "http://br-edge-10a9-fra-dtag-cdn.cast.addradio.de/br/br3/live/aac/low?ar-distributor=f0a0&_art=dj0yJmlwPTkxLjM1LjExNS4xODQmaWQ9aWNzY3hsLXNvcWZhbW5vYiZ0PTE2MjcxMjY4OTMmcz03ODY2ZjI5YyM3NzY0ZjNlOWI5NThlYTZkNmRkMjFiZmVmMmFhNTMyNQ",
         scope: "Lokalradio",
         strategy: new strategies.NewRadioDEStrategy("bayern3")
      }, {
         id: 23,
         name: "Wunschradio FM",
         src: "https://radiostreamserver.de/wunschradio.mp3",
         scope: "Lokalradio",
         strategy: new strategies.WunschradioFMStrategy()
      }, {
         id: 34,
         name: "R.SH 90er",
         src: "http://regiocast.hoerradar.de/rsh-90er-mp3-hq",
         scope: "90er",
         strategy: new strategies.RSHStrategy("R.SH 90er")
      }, {
         id: 35,
         name: "Radio Regenbogen 90er",
         src: "http://streams.regenbogen.de/rr-90er-128-mp3",
         scope: "90er",
         strategy: new strategies.RegenbogenStrategy("90er"),
         titlecase: true
      }, {
         id: 36,
         name: "FFH 90er",
         src: "http://mp3.ffh.de/ffhchannels/hq90er.mp3",
         scope: "90er",
         strategy: new strategies.RadioDEStrategy(22960, 0)
      }, {
         id: 37,
         name: "Best of 90s",
         src: "https://bestof90s.stream.laut.fm/best_of_90s",
         scope: "90er",
         strategy: new strategies.LautFMStrategy("best_of_90s")
      }, {
         id: 38,
         name: "Germanradio 90er",
         src: "http://germanradio.info:13300/;",
         scope: "90er",
         strategy: new strategies.OnlineRadioBoxStrategy("de.germanradioinfo90er")
      }, {
         id: 39,
         name: "90s90s",
         src: "https://90s90s.hoerradar.de/90s90s-pop-mp3-hq?sABC=5q274229%230%23857psp88on39p1p3626785o66674n105%23ubzrcntr&context=fHA6LTE=&aw_0_1st.kuid=tsb7u9x35&aw_0_1st.ksg=[%22tow0oughf%22,%22tsrahp573%22,%22tow65wkpp%22,%22takaaes6u%22,%22ti5001c5h%22]&amsparams=playerid:homepage;skey:1562853929",
         scope: "90er",
         strategy: new strategies.NinetiesStrategy(141)
      }, {
         id: 41,
         name: "M1.FM 90er",
         src: "http://tuner.m1.fm/90er.mp3",
         scope: "90er",
         strategy: new strategies.OnlineRadioBoxStrategy("de.m190er")
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
         strategy: new strategies.LiveRadioStrategy("metal-up-your-ass")
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
