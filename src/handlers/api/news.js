const NEWS_LIMIT = 6

module.exports = {
  handleNews() {
    let finalStr = ''

    const len = response.length - 1

    // margin will secure that no more than 6 news are sent to the user.
    let margin = 0

    if (len >= NEWS_LIMIT) {
      margin = len - NEWS_LIMIT
    }

    for (let index = len; index > margin; index -= 1) {
      finalStr += `${response[index].eta}\n` +
        `[${response[index].message}](${response[index].link})\n` +
        '-----\n'
    }

    return finalStr
  }
}