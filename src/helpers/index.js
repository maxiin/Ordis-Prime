const greetings = ['Operator', 'Star-Child']

module.exports = {
  greet: () => greetings[(Math.floor(Math.random() * greetings.length))],
}
