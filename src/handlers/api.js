const http = require('https')
const handlers = require('./api/handlers')


const api = 'https://ws.warframestat.us/pc/'

module.exports = {

  getTime: downloadAndHandleResponse('', handlers.time, 'The game time'),

  getSortie: downloadAndHandleResponse('sortie', handlers.sortie, 'Sorties'),

  getNews: downloadAndHandleResponse('news', handlers.news, 'The news'),

  getDarvo: downloadAndHandleResponse('dailyDeals', handlers.darvo, 'Darvo'),

  getBaro: downloadAndHandleResponse('voidTrader', handlers.baro, 'The void trader'),

  getInvasion: downloadAndHandleResponse('invasions', handlers.invasions, 'Invasions'),

  getAcolytes: downloadAndHandleResponse('persistentEnemies', handlers.acolytes, 'Stalker Acolytes'),

  getNightWaveActs: downloadAndHandleResponse('nightwave', handlers.nightWaves, 'Nightwave'),
  
}

function downloadAndHandleResponse(path, handlerFunction, commandPrettyName) {
  return new Promise((resolve) => {
    resolve(
      download(path)
      .then((res) => {
        return handlerFunction(res)
      })
      .catch((e) => {
        if (e !== 'empty body') {
          console.error(e)
        }
        return notFound(commandPrettyName)
      })
    )
  })
}

function download(sub) {
  return new Promise((resolve, reject) => {
    http.get(api + sub, (res) => {
      let body = ''

      // receiving data
      res.on('data', (chunk) => {
        body += chunk
      })

      // after the end of the stream
      res.on('end', () => {
        // calls function in the argument
        if (body !== '') {
          resolve(JSON.parse(body))
        } else {
          reject('empty body');
        }
      })

      // log an error
    }).on('error', (e) => {
      reject(e);
    })
  })
}

function notFound(where) {
  return `There are no information about ${where} at the moment.`
}