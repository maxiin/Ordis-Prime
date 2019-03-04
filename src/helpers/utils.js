const greetings = ['Operator', 'Star-Child']

module.exports = {

  // sends a random string from the greetings array
  randomGreeting: () => greetings[(Math.floor(Math.random() * greetings.length))],

  capitalize: (string) => {
    if (string === undefined){
      return ''
    }
    if (string.includes('and')) {
      return string
    }
    return string.charAt(0).toUpperCase() + string.slice(1)
  },
}
