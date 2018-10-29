const http = require('https')
const util = require('../../helpers/index')


const wikiSize = 5
const wikiGroupSize = 21

function download(url, func) {
  // http connection
  http.get(url, (res) => {
    let body = ''

    // receiving data
    res.on('data', (chunk) => {
      body += chunk
    })

    // after the end of the stream
    res.on('end', () => {
      // calls function in the argument
      if (body !== '') {
        func(JSON.parse(body))
      }
      else {
        func(null)
      }
    })

  // log an error
  }).on('error', (e) => {
    console.log('Got an error: ', e)
  })
}

module.exports = {
  callWiki: (data, callback) => {
    let url = 'https://warframe.fandom.com/api.php?action=opensearch&search='
    let finalStr = ''

    let startingPoint = ''

    // if after the command has an '@' that means that its on a group
    // so the name will only start after /wiki@ordis-prime-bot
    if (data.substring(wikiSize).startsWith('@')) {
      startingPoint = wikiGroupSize
    // else it will start after /iscomponent
    }
    else {
      startingPoint = wikiSize
    }

    const search = data.substring(startingPoint, data.length)
    const wordsArray = search.split(' ')

    if (wordsArray) {
      wordsArray.forEach((element) => {
        url += `${util.capitalize(element)} `
      })

      url += '&amp'

      console.log(url)

      download(url, (response) => {
        if (response === null || response[1].length <= 0) {
          finalStr = `No results found, ${util.greet()}`
        }
        else {
          finalStr += 'Wiki results:\n'
          response[1].forEach((element) => {
            const newElement = element.replace(/[{)}]/g, '%29') // fixing parentesis bug

            finalStr += `[${element}](http://warframe.wikia.com/${newElement})\n`
          })
        }

        callback(finalStr)
      })
    }
  },
}
