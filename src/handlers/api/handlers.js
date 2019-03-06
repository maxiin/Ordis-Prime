const util = require('./utils')


const SORTIE_LEVELS = [' Level 50-60', ' Level 65-80', ' Level 80-100']
const NUMBER_OF_SORTIE_MISSIONS = 3

const NEWS_LIMIT = 6

module.exports = {
  time: (response) => {
    let finalStr = ''

    let dayNightCycle = response.earthCycle.isDay ? 'day' : 'night'

    finalStr += `Game time: ${util.dateFormater(response.timestamp)}\n\n`
    finalStr += `Earth' ${dayNightCycle} will end in ${response.earthCycle.timeLeft}\n` // Earth day will end in ...
    finalStr += `Cetus: ${response.cetusCycle.shortString}\n` // cetus: 27 minutes to night
    finalStr += `Vallis: ${response.vallisCycle.shortString}` // vallis 3 minutes to warm

    return finalStr
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
  }
}