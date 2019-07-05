const util = require('./utils')


const SORTIE_LEVELS = [' Level 50-60', ' Level 65-80', ' Level 80-100']
const NUMBER_OF_SORTIE_MISSIONS = 3

const NEWS_LIMIT = 6

module.exports = {
  time: (response) => {
    let dayNightCycle = response.earthCycle.isDay ? 'day' : 'night'

    return (
      `Game time: ${util.dateFormater(response.timestamp)}\n\n` +
      `Earth' ${dayNightCycle} will end in ${response.earthCycle.timeLeft}\n` +
      `Cetus: ${response.cetusCycle.shortString}\n` +
      `Vallis: ${response.vallisCycle.shortString}`
    )
  },

  sortie(response) {
    let finalStr = ''

    finalStr += `Time left: ${response.eta}\n`
    finalStr += `Defeat ${response.boss}'s Forces\n`

    for (let index = 0; index < NUMBER_OF_SORTIE_MISSIONS; index += 1) {
      finalStr += '-----\n' +
        `${response.variants[index].node} ${SORTIE_LEVELS[index]}\n` +
        `${response.variants[index].missionType}\n` +
        `${response.variants[index].modifier}\n`
    }
    return finalStr
  },

  news(response) {
    let finalStr = ''

    const len = response.length - 1

    // margin will secure that no more than 6 news are sent to the user.
    let margin = 0

    if (len >= NEWS_LIMIT) {
      margin = len - NEWS_LIMIT
    }

    for (let index = len; index > margin; index -= 1) {
      finalStr += `${response[index].eta}\n` +
        `[${response[index].message}](${response[index].link})\n` +
        '-----\n'
    }

    return finalStr
  },

  darvo(response) {
    let finalStr = ''

    finalStr = 'Darvo deals:\n'

    response.forEach((e) => {
      const remaining = e.total - e.sold

      finalStr += `*${e.item}* for ${e.salePrice}pl, ${e.discount}% OFF\n`
      finalStr += `Remaining time: ${e.eta}\nRemaining on stock: ${remaining}/${e.total}`
    })

    return finalStr
  },

  baro(response) {
    if (response.active === false) {
      return `${response.character} will arrive in ${response.startString}, ${util.dateFormater(response.activation)} at ${response.location}`
    }

    let finalStr = ''

    finalStr = `${response.character} will be at ${response.location} for ${response.endString} until ${util.dateFormater(response.expiry)}\n-----\n`

    for (let index = 0; index < response.inventory.length; index += 1) {
      const inv = response.inventory[index]

      finalStr += `${inv.item} | dc-${inv.ducats} cr-${inv.credits}\n`
    }

    return finalStr
  },

  invasions(response) {
    let finalStr = 'Invasions:\n'

    for (let index = 0; index < response.length; index += 1) {
      let mission = response[index];

      if (mission.completion >= 0 || !mission.eta.startsWith('-')) {
        finalStr += '-----\n'
        finalStr += `${mission.node} ${Math.floor(mission.completion)}%\n`
        const isInfested = mission.attackerReward.asString === '' ? '' : `(${mission.attackerReward.asString})`

        finalStr += `${mission.attackingFaction}${isInfested} vs ${mission.defendingFaction}(${mission.defenderReward.asString})\n`
      }
    }

    return finalStr
  },

  acolytes(response) {
    let finalStr = ''
    const enemyHealth = 100

    response.forEach((enemy) => {
      const health = Math.floor(enemy.healthPercent * enemyHealth)

      if (enemy.isDiscovered) {
        finalStr += `${enemy.agentType} was found at ${enemy.lastDiscoveredAt} and has ${health}% health remaining.\n`
      } else {
        finalStr += `${enemy.agentType} *has ${health}% health remaining and was not found yet.\n`
      }
      finalStr += '-----\n'
    })
    return finalStr
  },

  nightWaves(response) {
    let finalStr = ''
    let daily = []
    let weekly = []
    let elite = []

    finalStr += 'Nightwave Acts:\n'
    console.log(response)
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

    return finalStr
  }
}