const http = require('https')
const handlers = require('./api/handlers')


const api = 'https://ws.warframestat.us/pc/'

module.exports = {

  getTime: downloadAndHandleResponse('', handlers.time, 'The game time'),

  getSortie: downloadAndHandleResponse('sortie', handlers.sortie, 'Sorties'),

  getNews: downloadAndHandleResponse('news', handlers.news, 'The news'),

  getDarvo: downloadAndHandleResponse('dailyDeals', handlers.darvo, 'Darvo'),

  getBaro: downloadAndHandleResponse('voidTrader', handlers.baro, 'The void trader'),

  getAlerts: downloadAndHandleResponse('alerts', handlers.alerts, 'The alerts'),

  getInvasion: (callback) => {
    download('invasions', (response) => {
      let finalStr = ''

      if (response.toString().localeCompare('') === 0) {
        finalStr = notFound('Invasions')
      } else {
        finalStr = 'Invasions:\n'

        for (let index = 0; index < response.length; index += 1) {
          if (response[index].completion >= 0 || !response[index].eta.startsWith('-')) {
            finalStr += '-----\n'
            finalStr += `${response[index].node} ${Math.floor(response[index].completion)}%\n`
            const isInfested = response[index].attackerReward.asString === '' ? '' : `(${response[index].attackerReward.asString})`

            finalStr += `${response[index].attackingFaction}${isInfested} vs ${response[index].defendingFaction}(${response[index].defenderReward.asString})\n`
          }
        }
      }
      callback(finalStr)
    })
  },

  getAcolytes: (callback) => {
    const enemyHealth = 100

    download('persistentEnemies', (response) => {
      let finalStr = ''

      if (response.toString().localeCompare('') === 0) {
        finalStr = notFound('Stalker Acolytes')
      } else {
        response.forEach((enemy) => {
          const health = Math.floor(enemy.healthPercent * enemyHealth)

          if (enemy.isDiscovered) {
            finalStr += `${enemy.agentType} was found at ${enemy.lastDiscoveredAt} and has ${health}% health remaining.\n`
          } else {
            finalStr += `${enemy.agentType} *has ${health}% health remaining and was not found yet.\n`
          }
          finalStr += '-----\n'
        })
      }
      callback(finalStr)
    })
  },

  getNightWaveActs: (callback) => {
    download('nightwave', (response) => {
      let finalStr = ''
      let daily = []
      let weekly = []
      let elite = []

      if (response.toString().localeCompare('') === 0 || response.active === false) {
        finalStr = notFound('Nightwave')
      } else {
        finalStr += 'Nightwave Acts:\n'

        response.activeChallenges.forEach((challenge) => {
          if (!challenge.active) {
            return;
          } else if (challenge.isDaily && challenge.isDaily === true) {
            daily.push(challenge)
          } else if (challenge.isElite && challenge.isElite === true) {
            elite.push(challenge)
          } else {
            weekly.push(challenge)
          }
        })

        if (daily.length > 0) {
          finalStr += '-----\n'
          finalStr += '*Daily Acts:* +1k Rep \n'
        }
        daily.forEach((challenge) => {
          finalStr += `- *${challenge.title}*: ${challenge.desc}\n`
        })
        if (weekly.length > 0) {
          finalStr += '-----\n'
          finalStr += '*Weekly Acts:* +3k Rep \n'
        }
        weekly.forEach((challenge) => {
          finalStr += `- *${challenge.title}*: ${challenge.desc}\n`
        })
        if (elite.length > 0) {
          finalStr += '-----\n'
          finalStr += '*Elite Acts:* +5k Rep \n'
        }
        elite.forEach((challenge) => {
          finalStr += `- *${challenge.title}*: ${challenge.desc}\n`
        })
      }

      callback(finalStr)

    })
  },
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