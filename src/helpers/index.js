const greetings = ['Operator', 'Star-Child']

module.exports = {

  greet: () => greetings[(Math.floor(Math.random() * greetings.length))],

  capitalize: (string) => {
    if (string === 'and') {
      return string
    }
    return string.charAt(0).toUpperCase() + string.slice(1)
  },
}
