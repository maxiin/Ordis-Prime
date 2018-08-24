// url for the warframe api and the requirements for this archive
const url = 'https://ws.warframestat.us/pc/';
const http = require('https');

function notFound(where) {
  return `There are no information about ${where} at the moment.`;
}

function download(sub, func) {
  // http connection
  http.get(url + sub, (res) => {
    let body = '';

    // receiving data
    res.on('data', (chunk) => {
      body += chunk;
    });

    // after the end of the stream
    res.on('end', () => {
      // calls function in the argument
      if (body !== '') {
        func(JSON.parse(body));
      } else {
        func(body);
      }
    });

  // log an error
  }).on('error', (e) => {
    console.log('Got an error: ', e);
  });
}

module.exports = {

  getTime: (data) => {
    let eCycle;
    let cCycle;

    download('', (response) => {
      let finalStr;

      if (response === '') {
        finalStr = notFound('The game time');
      } else {
        // test if the api says if isDay is true, to get the time more accurate
        eCycle = response.earthCycle.isDay ? 'day' : 'night';
        cCycle = response.cetusCycle.isDay ? 'day' : 'night';

        // create the string to return and send it
        finalStr = `Game time: ${response.timestamp}\n`
        + `Earth' ${eCycle} will end in ${response.earthCycle.timeLeft}\n`
        + `Cetus' ${cCycle} will end in ${response.cetusCycle.timeLeft}`;

        data.reply.text(finalStr);
      }
    });
  },

  getSortie: (data) => {
    const levels = [' Level 50-60', ' Level 65-80', ' Level 80-100'];

    download('sortie', (response) => {
      let finalStr = '';

      if (response === '') {
        finalStr = notFound('Sorties');
      } else {
        finalStr = `Time left: ${response.eta}\n`
        + `Defeat ${response.boss}'s Forces\n`;

        for (let index = 0; index < 3; index += 1) {
          finalStr += '-----\n'
          + `${response.variants[index].node} ${levels[index]}\n`
          + `${response.variants[index].missionType}\n`
          + `${response.variants[index].modifier}\n`;
        }
      }
      data.reply.text(finalStr);
    });
  },

  getNews: (callback) => {
    download('news', (response) => {
      let finalStr = '';
      if (response === '') {
        finalStr = notFound('The news');
      } else {
        const len = response.length - 1;

        // margin will secure that no more than 6 news are sent to the user.
        let margin = 0;
        if (len >= 6) {
          margin = len - 6;
        }

        for (let i = len; i > margin; i -= 1) {
          finalStr += `${response[i].eta}\n`
          + `[${response[i].message}](${response[i].link})\n`
          + '-----\n';
        }
      }
      callback(finalStr);
    });
  },

  getDarvo: (callback) => {
    download('dailyDeals', (response) => {
      let finalStr = '';

      if (response === '') {
        finalStr = notFound('Darvo');
      } else {
        finalStr = 'Darvo deals:\n';

        response.forEach((e) => {
          const remaining = e.total - e.sold;
          finalStr += `*${e.item}* for ${e.salePrice}pl, ${e.discount}% OFF\n`;
          finalStr += `Remaining time: ${e.eta}\nRemaining on stock: ${remaining}/${e.total}`;
        });
      }
      callback(finalStr);
    });
  },

  getBaro: (data) => {
    download('voidTrader', (baro) => {
      let finalStr = '';

      if (baro === '') {
        finalStr = notFound('The void trader');
      } else if (baro.active === true) {
        finalStr = `${baro.character} will be at ${baro.location} for ${baro.endString}\n-----\n`;

        for (let x = 0; x < baro.inventory.length; x += 1) {
          const inv = baro.inventory[x];
          finalStr += `${inv.item} | dc-${inv.ducats} cr-${inv.credits}\n`;
        }
      } else {
        finalStr = `${baro.character} will arrive in ${baro.startString} at ${baro.location}`;
      }
      data.reply.text(finalStr);
    });
  },

  getAlerts: (data) => {
    download('alerts', (response) => {
      let finalStr = '';
      if (response !== '') {
        finalStr = 'Alerts:\n';

        response.forEach((element) => {
          let creditOrEndoOnly = false;

          for (let x = 0; x < element.rewardTypes.length; x += 1) {
            const e = element.rewardTypes[x];
            if (e === 'credits' || e === 'endo') {
              creditOrEndoOnly = true;
            }
          }

          if (!creditOrEndoOnly) {
            const e = element;
            finalStr += '-----\n';

            if (e.mission.description) {
              finalStr += `${e.mission.description}\n`;
            }
            finalStr += `${e.mission.node} ${e.mission.minEnemyLevel} - ${e.mission.maxEnemyLevel} / ${e.mission.type} / ${e.mission.faction}\n`;
            finalStr += `Remaining: ${e.eta}\n`;
            finalStr += `${e.mission.reward.asString}\n`;
          }
        });

        // if the final string is alerts + newline all the alerts are credits or endo
        // since we don't want that, we just return the "not found string"
        if (finalStr === 'Alerts:\n') {
          finalStr = notFound('Alerts');
        }
      } else {
        finalStr = notFound('Alerts');
      }
      data.reply.text(finalStr);
    });
  },

  getInvasion: (data) => {
    download('invasions', (response) => {
      let finalStr = '';

      if (response === '') {
        finalStr = notFound('Invasions');
      } else {
        finalStr = 'Invasions:\n';

        for (let x = 0; x < response.length; x += 1) {
          if (response[x].completion >= 0 || !response[x].eta.startsWith('-')) {
            finalStr += '-----\n';
            finalStr += `${response[x].node} ${Math.floor(response[x].completion)}%\n`;
            const isInfested = response[x].attackerReward.asString === '' ? '' : `(${response[x].attackerReward.asString})`;
            finalStr += `${response[x].attackingFaction}${isInfested} vs ${response[x].defendingFaction}(${response[x].defenderReward.asString})\n`;
          }
        }
      }
      data.reply.text(finalStr);
    });
  },

  getAcolytes: (data) => {
    download('persistentEnemies', (response) => {
      let finalStr = '';
      if (response === '') {
        finalStr = notFound('Stalker Acolytes');
      } else {
        response.forEach((enemy) => {
          const health = Math.floor(enemy.healthPercent * 100);
          if (enemy.isDiscovered) {
            finalStr += `${enemy.agentType} was found at ${enemy.lastDiscoveredAt} and has ${health}% health remaining.\n`;
          } else {
            finalStr += `${enemy.agentType} *has ${health}% health remaining and was not found yet.\n`;
          }
          finalStr += '-----\n';
        });
      }
      data.reply.text(finalStr);
    });
  },
};
