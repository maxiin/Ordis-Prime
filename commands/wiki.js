const http = require('http');

function download(captalizedUrl, func) {
  // http connection
  http.get(captalizedUrl, (res) => {
    let body = '';

    // receiving data
    res.on('data', (chunk) => {
      body += chunk;
    });

    // after the end of the stream
    res.on('end', () => {
      // calls function in the argument
      try {
        const a = JSON.parse(body);
        func(a);
      } catch (e) {
        console.log(e + body);
      }
    });

    // log an error
  }).on('error', (e) => {
    console.log('Got an error: ', e);
  });
}

function capitalizeFirstLetter(string) {
  if (string.includes('and')) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function tenno() {
  return Math.random() >= 0.5 ? 'Operator' : 'Star-Child';
}

module.exports = {
  callWiki: (data, callback) => {
    let url = 'http://warframe.wikia.com/api.php?action=opensearch&search=';
    let finalStr = '';

    let startingPoint = '';

    // if after the command has an '@' that means that its on a group
    // so the name will only start after /wiki@ordis-prime-bot
    if (data.substring(5).startsWith('@')) {
      startingPoint = 21;
    // else it will start after /iscomponent
    } else {
      startingPoint = 5;
    }

    const search = data.substring(startingPoint, data.length);
    const wordsArray = search.split(' ');

    if (wordsArray) {
      wordsArray.forEach((element) => {
        url += `${capitalizeFirstLetter(element)} `;
      });

      url += '&amp';

      download(url, (response) => {
        if (response[1].length > 0) {
          finalStr += 'Wiki results:\n';
          response[1].forEach((element) => {
            const newElement = element.replace(/[{)}]/g, '%29');// fixing parentesis bug
            finalStr += `[${element}](http://warframe.wikia.com/${newElement})\n`;
          });
        } else {
          finalStr = `No results found, ${tenno()}`;
        }
        callback(finalStr);
      });
    }
  },
};
