const http = require('https')
const handlers = require('./api/handlers')


const api = 'https://ws.warframestat.us/pc/'

module.exports = {

  getTime: downloadAndHandleResponse('', handlers.time, 'The game time'),

  getSortie: downloadAndHandleResponse('sortie', handlers.sortie, 'Sorties'),

  getNews: downloadAndHandleResponse('news', handlers.news, 'The news'),

  getDarvo: downloadAndHandleResponse('dailyDeals', null, 'Darvo'),

  getDarvo: (callback) => {
    download('dailyDeals', (response) => {
      let finalStr = ''

      if (response.toString().localeCompare('') === 0) {
        finalStr = notFound('Darvo')
      } else {
        finalStr = 'Darvo deals:\n'

        response.forEach((e) => {
          const remaining = e.total - e.sold

          finalStr += `*${e.item}* for ${e.salePrice}pl, ${e.discount}% OFF\n`
          finalStr += `Remaining time: ${e.eta}\nRemaining on stock: ${remaining}/${e.total}`
        })
      }
      callback(finalStr)
    })
  },

  getBaro: (callback) => {
    download('voidTrader', (response) => {
      let finalStr = ''

      if (response === '') {
        finalStr = notFound('The void trader')
      } else if (response.active === true) {
        finalStr = `${response.character} will be at ${response.location} for ${response.endString} until ${dateFormater(response.expiry)}\n-----\n`

        for (let index = 0; index < response.inventory.length; index += 1) {
          const inv = response.inventory[index]

          finalStr += `${inv.item} | dc-${inv.ducats} cr-${inv.credits}\n`
        }
      } else {
        finalStr = `${response.character} will arrive in ${response.startString}, ${dateFormater(response.activation)} at ${response.location}`
      }
      callback(finalStr)
    })
  },

  getAlerts: (callback) => {
    download('alerts', (response) => {
      let finalStr = ''

      if (response !== '') {
        finalStr = 'Alerts:\n'

        response.forEach((element) => {
          let creditOrEndoOnly = false

          for (let index = 0; index < element.rewardTypes.length; index += 1) {
            const types = element.rewardTypes[index]

            if (types === 'credits' || types === 'endo') {
              creditOrEndoOnly = true
            }
          }

          if (!creditOrEndoOnly) {
            finalStr += '-----\n'

            if (element.mission.description) {
              finalStr += `${element.mission.description}\n`
            }
            finalStr += `${element.mission.node} ${element.mission.minEnemyLevel} - ${element.mission.maxEnemyLevel} / ${element.mission.type} / ${element.mission.faction}\n`
            finalStr += `Remaining: ${element.eta}\n`
            finalStr += `${element.mission.reward.asString}\n`
          }
        })

        // if the final string is alerts + newline all the alerts are credits or endo
        // since we don't want that, we just return the "not found string"
        if (finalStr === 'Alerts:\n') {
          finalStr = notFound('Alerts')
        }
      } else {
        finalStr = notFound('Alerts')
      }
      callback(finalStr)
    })
  },

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