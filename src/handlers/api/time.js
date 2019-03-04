const util = require('./utils')

module.exports = {
  handleTime: (response) => {
    let finalStr = ''

    let dayNightCycle = response.earthCycle.isDay ? 'day' : 'night'

    finalStr += `Game time: ${util.dateFormater(response.timestamp)}\n\n`
    finalStr += `Earth' ${dayNightCycle} will end in ${response.earthCycle.timeLeft}\n` // Earth day will end in ...
    finalStr += `Cetus: ${response.cetusCycle.shortString}\n` // cetus: 27 minutes to night
    finalStr += `Vallis: ${response.vallisCycle.shortString}` // vallis 3 minutes to warm

    return finalStr
  }
}