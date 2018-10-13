const greetings = ['Operator', 'Star-Child']

module.exports = {

  greet: () => greetings[(Math.floor(Math.random() * greetings.length))],

  capitalize: (string) => {
    if (string.includes('and')) {
      return string
    }
    return string.charAt(0).toUpperCase() + string.slice(1)
  },
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
        func(JSON.parse(body))
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
