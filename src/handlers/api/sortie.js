const LEVELS = [' Level 50-60', ' Level 65-80', ' Level 80-100']
const NUMBER_OF_MISSIONS = 3

module.exports = {
  handleSortie(response) {
    let finalStr = ''

    finalStr += `Time left: ${response.eta}\n`
    finalStr += `Defeat ${response.boss}'s Forces\n`

    for (let index = 0; index < NUMBER_OF_MISSIONS; index += 1) {
      finalStr += '-----\n' +
        `${response.variants[index].node} ${LEVELS[index]}\n` +
        `${response.variants[index].missionType}\n` +
        `${response.variants[index].modifier}\n`
    }
    return finalStr
  }
}