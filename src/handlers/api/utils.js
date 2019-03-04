const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec']
const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

module.exports = {
  dateFormater: (timestamp) => {
    if(timestamp === '' || timestamp === undefined){
      return ''
    }
    const date = new Date(Date.parse(timestamp))

    //15:25:9 UTC+0, Monday, Mar 4 2019
    return `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()} UTC+0, ${week[date.getUTCDay()]}, ${months[date.getUTCMonth()]} ${date.getUTCDate()} ${date.getUTCFullYear()}`
  },
}