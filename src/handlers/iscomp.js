const util = require('../helpers/utils')
const weapons = require('./iscomponent/data')


const isCompSize = 8
const isCompGroupSize = 24
const strings = ['is crafting component for the', 'are crafting components for the']

// exporting the function so the main part of the bot can call it
module.exports = {

  test: (msg) => {
    const data = msg.toLowerCase()
    // this is for testing where the weapon name will start
    let startingPoint

    // if after the command has an '@' that means that its on a group
    // so the name will only start after /iscomp@ordis-prime-bot
    if (data.substring(isCompSize) === '@') {
      startingPoint = isCompGroupSize
    // else it will start after /iscomponent
    }
    else {
      startingPoint = isCompSize
    }

    let test = data.substring(startingPoint, data.length)

    test = test.replace(/[{_}]/g, ' ') // remove underline

    // Needs testing + fix first letter capitalization
    if (test in weapons) {
      let finalStr = ''

      for (let item = 0; item < weapons[test].length; item++) {
        if (item > 0) {
          finalStr += '\nAnd '
        }
        if (weapons[test][item].q > 1) {
          finalStr += `${weapons[test][item].q}x ` // 2x ...
        }
        finalStr += `[${util.capitalize(test)}](http://warframe.wikia.com/wiki/${test}) ` // [weapon](example.com/weapon) ...
        if (weapons[test][item].with !== null) {
          finalStr += `+ [${weapons[test][item].with}](http://warframe.wikia.com/wiki/${weapons[test][item].with}) ` // [weapon] with [weapon] ..
        }
        if (weapons[test][item].with !== null || weapons[test][item].q > 1) { // is/are crafting ...
          finalStr += `${strings[1]} `
        }
        else {
          finalStr += `${strings[0]} `
        }
        finalStr += `[${weapons[test][item].makes}](http://warframe.wikia.com/wiki/${weapons[test][item].makes})` // ... [weapon]
      }

      return finalStr
    }

    return `Ordis didn't find anything, ${util.randomGreeting()}. Your weapon probably isn't used for any crafting.\nThis list was updated in October 13th, 2018.`
  },
}
