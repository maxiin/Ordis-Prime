const http = require('http')


const greetings = ['Operator', 'Star-Child']
const wikiSize = 5
const wikiGroupSize = 21

function download(captalizedUrl, func) {
  // http connection
  http.get(captalizedUrl, (res) => {
    let body = ''

    // receiving data
    res.on('data', (chunk) => {
      body += chunk
    })

    // after the end of the stream
    res.on('end', () => {
      // calls function in the argument
      try {
        const jsonObj = JSON.parse(body)

        func(jsonObj)
      }
      catch (error) {
        console.log(error + body)
      }
    })

    // log an error
  }).on('error', (error) => {
    console.log('Got an error: ', error)
  })
}

function capitalizeFirstLetter(string) {
  if (string.includes('and')) {
    return string
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function tenno() {
  return greetings.charAt(Math.floor(Math.random() * greetings.length))
}

module.exports = {
  callWiki: (data, callback) => {
    let url = 'http://warframe.wikia.com/api.php?action=opensearch&search='
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
        url += `${capitalizeFirstLetter(element)} `
      })

      url += '&amp'

      download(url, (response) => {
        if (response[1].length > 0) {
          finalStr += 'Wiki results:\n'
          response[1].forEach((element) => {
            const newElement = element.replace(/[{)}]/g, '%29') // fixing parentesis bug

            finalStr += `[${element}](http://warframe.wikia.com/${newElement})\n`
          })
        }
        else {
          finalStr = `No results found, ${tenno()}`
        }
        callback(finalStr)
      })
    }
  },
}
