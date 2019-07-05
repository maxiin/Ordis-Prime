// url for the warframe api and the requirements for this archive
const url = 'https://ws.warframestat.us/pc/'
const http = require('https')


function notFound(where) {
  return `There are no information about ${where} at the moment.`
}

function download(sub, func) {
  // http connection
  http.get(url + sub, (res) => {
    let body = ''

    // receiving data
    res.on('data', (chunk) => {
      body += chunk
    })

    // after the end of the stream
    res.on('end', () => {
      // calls function in the argument
      if (body !== '') {
        try {
          func(JSON.parse(body));
        } catch(e) {
          console.log(e, body);
          func('');
        }
      }
      else {
        func('')
      }
    })

  // log an error
  }).on('error', (e) => {
    console.log('Got an error: ', e)
  })
}

function dateFormater(timestamp) {
  const date = new Date(Date.parse(timestamp))
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec']
  const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  return `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()} UTC+0, ${week[date.getUTCDay()]}, ${months[date.getUTCMonth()]} ${date.getUTCDate()} ${date.getUTCFullYear()}`
}

module.exports = {

  getTime: (callback) => {
    let eCycle

    download('', (response) => {
      let finalStr

      if (response.toString().localeCompare('') === 0) {
        finalStr = notFound('The game time')
      }
      else {
        // test if the api says if isDay is true, to get the time more accurate
        eCycle = response.earthCycle.isDay ? 'day' : 'night'

        // create the string to return and send it
        finalStr = `Game time: ${dateFormater(response.timestamp)}\n\n`
        + `Earth' ${eCycle} will end in ${response.earthCycle.timeLeft}\n`
        + `Cetus: ${response.cetusCycle.shortString}\n` // cetus: 27 minutes to night
        + `Vallis: ${response.vallisCycle.shortString}` // vallis 3 minutes to warm

        callback(finalStr)
      }
    })
  },

  getSortie: (callback) => {
    const levels = [' Level 50-60', ' Level 65-80', ' Level 80-100']
    const numberOfMissions = 3

    download('sortie', (response) => {
      let finalStr = ''

      if (response.toString().localeCompare('') === 0) {
        finalStr = notFound('Sorties')
      }
      else {
        finalStr = `Time left: ${response.eta}\n`
        + `Defeat ${response.boss}'s Forces\n`

        for (let index = 0; index < numberOfMissions; index += 1) {
          finalStr += '-----\n'
          + `${response.variants[index].node} ${levels[index]}\n`
          + `${response.variants[index].missionType}\n`
          + `${response.variants[index].modifier}\n`
        }
      }
      callback(finalStr)
    })
  },

  getNews: (callback) => {
    const newsLimit = 6

    download('news', (response) => {
      let finalStr = ''

      if (response.toString().localeCompare('') === 0) {
        finalStr = notFound('The news')
      }
      else {
        const len = response.length - 1

        // margin will secure that no more than 6 news are sent to the user.
        let margin = 0

        if (len >= newsLimit) {
          margin = len - newsLimit
        }

        for (let index = len; index > margin; index -= 1) {
          finalStr += `${response[index].eta}\n`
          + `[${response[index].message}](${response[index].link})\n`
          + '-----\n'
        }
      }
      callback(finalStr)
    })
  },

  getDarvo: (callback) => {
    download('dailyDeals', (response) => {
      let finalStr = ''

      if (response.toString().localeCompare('') === 0) {
        finalStr = notFound('Darvo')
      }
      else {
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
      }
      else if (response.active === true) {
        finalStr = `${response.character} will be at ${response.location} for ${response.endString} until ${dateFormater(response.expiry)}\n-----\n`

        for (let index = 0; index < response.inventory.length; index += 1) {
          const inv = response.inventory[index]

          finalStr += `${inv.item} | dc-${inv.ducats} cr-${inv.credits}\n`
        }
      }
      else {
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
      }
      else {
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
      }
      else {
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
      }
      else {
        response.forEach((enemy) => {
          const health = Math.floor(enemy.healthPercent * enemyHealth)

          if (enemy.isDiscovered) {
            finalStr += `${enemy.agentType} was found at ${enemy.lastDiscoveredAt} and has ${health}% health remaining.\n`
          }
          else {
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
      }
      else{
        finalStr += 'Nightwave Acts:\n'

        response.activeChallenges.forEach((challenge) => {
          if(!challenge.active){
            return;
          }else if(challenge.isDaily && challenge.isDaily === true){
            daily.push(challenge)
          }else if(challenge.isElite && challenge.isElite === true){
            elite.push(challenge)
          }else{
            weekly.push(challenge)
          }
        })

        if(daily.length > 0){
          finalStr += '-----\n'
          finalStr += '*Daily Acts:* +1k Rep \n'
        }
        daily.forEach((challenge) => {
          finalStr += `- *${challenge.title}*: ${challenge.desc}\n`
        })
        if(weekly.length > 0){
          finalStr += '-----\n'
          finalStr += '*Weekly Acts:* +6k Rep \n'
        }
        weekly.forEach((challenge) => {
          finalStr += `- *${challenge.title}*: ${challenge.desc}\n`
        })
        if(elite.length > 0){
          finalStr += '-----\n'
          finalStr += '*Elite Acts:* +9k Rep \n'
        }
        elite.forEach((challenge) => {
          finalStr += `- *${challenge.title}*: ${challenge.desc}\n`
        })
      }

      callback(finalStr)

    })
  },
}
