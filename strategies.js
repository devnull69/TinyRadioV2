let Client = require('node-rest-client').Client;
let client = new Client();
let jsdom = require('jsdom');
let { JSDOM } = jsdom;
let requester = require('request');
let _ = require('lodash');

let headers = {
   headers: {"Accept": "application/json"},
   requestConfig: {
      timeout: 1500
   },
   responseConfig: {
      timeout: 1500
   }
}

let HTMLheadersStandard = {
   headers: {"Accept": "text/html"},
   requestConfig: {
      timeout: 1500
   },
   responseConfig: {
      timeout: 1500
   }
}

let HTMLheadersLongRunning = {
   headers: {"Accept": "text/html"},
   requestConfig: {
      timeout: 7000
   },
   responseConfig: {
      timeout: 7000
   }
}

function twoDigits(num) {
   return ("0" + num).slice(-2);
}

class LautFMStrategy {
   constructor(stationName) {
      this.stationName = stationName;
   }

   getTitle() {
      let result = "Aktueller Titel ist unbekannt";
      return new Promise((resolve, reject) => {
         let req = client.get(`http://api.laut.fm/station/${this.stationName}/current_song`, headers, (data, response) => {
            if(response.statusCode == 200) {
               if(data.artist && data.title)
                  result = data.artist.name + " - " + data.title;
            }
            resolve(result);
         });

         req.on("requestTimeout", (request) => {
            resolve(result);
         });

         req.on("responseTimeout", (request) => {
            resolve(result);
         });
      });
   }
}

class RockAntenneStrategy {

   constructor(stationName) {
      this.stationName = stationName;
   }

   getTitle() {
      let result = "Aktueller Titel ist unbekannt";
      return new Promise((resolve, reject) => {
         let req = client.get(`https://api.antenne.de/1.0.0/webradio/metadata/details?&apikey=10fa9dee55182f9d1cd359c787aec98a&streamingChannel=${this.stationName}`, headers, (data, response) => {
            if(response.statusCode == 200) {
               if(data && data.object && data.object.now)
                  result = data.object.now.artist + " - " + data.object.now.title;
            }
            resolve(result);
         });

         req.on("requestTimeout", (request) => {
            resolve(result);
         });

         req.on("responseTimeout", (request) => {
            resolve(result);
         });
      });
   }
}

class WackenRadioStrategy {
   constructor() {
   }

   getTitle() {
      let result = "Aktueller Titel ist unbekannt";
      return new Promise((resolve, reject) => {
         resolve(result);
      });
      // let result = "Aktueller Titel ist unbekannt";
      // return new Promise((resolve, reject) => {
      //    let req = client.get(`http://www.rautemusik.fm/wackenradio/`, HTMLheadersStandard , (data, response) => {
      //       if(response.statusCode == 200) {
      //          console.log(data);
      //          let { document } = new JSDOM(data).window;
      //          result = document.querySelector('.artist').textContent + " - " + document.querySelector('.title').textContent
      //       }
      //       resolve(result);
      //    });

      //    req.on("requestTimeout", (request) => {
      //       resolve(result);
      //    });

      //    req.on("responseTimeout", (request) => {
      //       resolve(result);
      //    });
      // });
   }
}

class NRWLokalRadioStrategy {
   constructor(stationNr) {
      this.stationNr = stationNr;
   }

   getTitle() {
      let result = "Aktueller Titel ist unbekannt";
      return new Promise((resolve, reject) => {
         let req = client.get(`https://api-prod.nrwlokalradios.com/playlist/latest?station=${this.stationNr}&count=1`, headers, (data, response) => {
            if(response.statusCode == 200) {
               if(data && data[0])
                  result = data[0].artist + " - " + data[0].title;
            }
            resolve(result);
         });

         req.on("requestTimeout", (request) => {
            resolve(result);
         });

         req.on("responseTimeout", (request) => {
            resolve(result);
         });
      });
   }
}

class RadioDEStrategy {
   constructor(stationNr, pos) {
      this.stationNr = stationNr;
      this.pos = pos;
   }

   getTitle() {
      let result = "Aktueller Titel ist unbekannt";
      return new Promise((resolve, reject) => {
         let req = client.get(`https://api.radio.de/info/v2/search/nowplaying?apikey=d0c95d28a9a899c628c35fa959e9e0ee3c1b924c&numberoftitles=2&station=${this.stationNr}`, headers, (data, response) => {
            if(response.statusCode == 200) {
               if(data && data[this.pos])
                  result = data[this.pos].streamTitle;
            }
            resolve(result);
         });

         req.on("requestTimeout", (request) => {
            resolve(result);
         });

         req.on("responseTimeout", (request) => {
            resolve(result);
         });
      });
   }
}

class RSHStrategy {
   constructor(stationName) {
      this.stationName = stationName;
   }

   getTitle() {
      let result = "Aktueller Titel ist unbekannt";
      return new Promise((resolve, reject) => {
         let req = client.get(`http://stream-service.loverad.io/v3/rsh?_=`, headers, (data, response) => {
            if(response.statusCode == 200) {
               if(data) {
                  data = _.values(data);

                  for(let entry of data) {
                     if(entry.stream == this.stationName)
                        result = entry["artist_name"] + " - " + entry["song_title"];
                  }
               }
            }
            resolve(result);
         });

         req.on("requestTimeout", (request) => {
            resolve(result);
         });

         req.on("responseTimeout", (request) => {
            resolve(result);
         });
      });
   }
}

class RegenbogenStrategy {
   constructor(stationName) {
      this.stationName = stationName;
   }

   getTitle() {
      let result = "Aktueller Titel ist unbekannt";
      return new Promise((resolve, reject) => {
         let datum = new Date();
         let date = datum.getFullYear() + "/" + twoDigits(datum.getMonth()+1) + "/" + twoDigits(datum.getDate()) + "/" + twoDigits(datum.getHours());

         let req = client.get(`http://www.regenbogen.de/sites/default/files/nocache/${this.stationName}/${date}.json`, headers, (data, response) => {
            if(response.statusCode == 200) {
               if(data && data.hour.length) {
                  if(data.hour.length > 1) {
                     let titleDate = new Date(data.hour[data.hour.length - 1].date);
                     if(titleDate > datum) {
                        result = data.hour[data.hour.length - 2].artist + " - " + data.hour[data.hour.length - 2].title;
                     } else {
                        result = data.hour[data.hour.length - 1].artist + " - " + data.hour[data.hour.length - 1].title;
                     }
                  } else {
                     result = data.hour[0].artist + " - " + data.hour[0].title;
                  }
               }
            }
            resolve(result);
         });

         req.on("requestTimeout", (request) => {
            resolve(result);
         });

         req.on("responseTimeout", (request) => {
            resolve(result);
         });
      });
   }
}

class WunschradioFMStrategy {
   constructor(stationName) {
      this.stationName = stationName;
   }

   getTitle() {
      let result = "Aktueller Titel ist unbekannt";
      return new Promise((resolve, reject) => {
         let req = client.get(`https://wunschradio.de/data/${this.stationName}.json`, headers, (data, response) => {
            if(response.statusCode == 200) {
               if(data)
                  result = data.artist + " - " + data.title;
            }
            resolve(result);
         });

         req.on("requestTimeout", (request) => {
            resolve(result);
         });

         req.on("responseTimeout", (request) => {
            resolve(result);
         });
      });
   }
}

class NinetiesStrategy {
   constructor(stationNr) {
      this.stationNr = stationNr;
   }

   getTitle() {
      let result = "Aktueller Titel ist unbekannt";
      return new Promise((resolve, reject) => {
         let req = client.get(`https://iris-90s90s.loverad.io/flow.json?station=${this.stationNr}&offset=1&count=1&ts=1562854204648`, headers, (data, response) => {
            if(response.statusCode == 200) {
               if(data && data.result && data.result.entry.length)
                  result = data.result.entry[0].song.entry[0].artist.entry[0].name + " - " + data.result.entry[0].song.entry[0].title;
            }
            resolve(result);
         });

         req.on("requestTimeout", (request) => {
            resolve(result);
         });

         req.on("responseTimeout", (request) => {
            resolve(result);
         });
      });
   }
}

class OnlineRadioBoxStrategy {
   constructor(stationName) {
      this.stationName = stationName;
   }

   getTitle() {
      let result = "Aktueller Titel ist unbekannt";
      return new Promise((resolve, reject) => {
         let requestSettings = {
            method: 'GET',
            url: `https://scraper2.onlineradiobox.com/${this.stationName}?l=0`
         };

         requester(requestSettings, function(err, response, body) {
            if(err) {
               resolve(result);
               return;
            }

            let bodyObj = JSON.parse(body);

            result = bodyObj.title;

            resolve(result);

         });
      });
   }
}

class StahlRadioStrategy {
   constructor() {
   }

   getTitle() {
      let result = "Aktueller Titel ist unbekannt";
      return new Promise((resolve, reject) => {
         let requestSettings = {
            method: 'GET',
            url: `https://www.lembeck.de/wp-admin/admin-ajax.php?action=update_stream_title&data%5B0%5D%5Bid%5D=44945&data%5B0%5D%5Bsrc%5D=https%3A%2F%2Fwww.lembeck.de%2Fstation%2Fstahlradio%2F%3Fplay%3D1`,
            headers: {
               'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36'
            }
         };

         requester(requestSettings, function(err, response, body) {
            if(err) {
               resolve(result);
               return;
            }

            let bodyObj = JSON.parse(body);

            result = bodyObj.data["44945"];

            resolve(result);

         });
      });
   }
}


module.exports = {
   LautFMStrategy: LautFMStrategy,
   RockAntenneStrategy: RockAntenneStrategy,
   WackenRadioStrategy: WackenRadioStrategy,
   NRWLokalRadioStrategy: NRWLokalRadioStrategy,
   RadioDEStrategy: RadioDEStrategy,
   RSHStrategy: RSHStrategy,
   RegenbogenStrategy: RegenbogenStrategy,
   WunschradioFMStrategy: WunschradioFMStrategy,
   NinetiesStrategy: NinetiesStrategy,
   OnlineRadioBoxStrategy: OnlineRadioBoxStrategy,
   StahlRadioStrategy: StahlRadioStrategy
}