//url for the warframe api and the requirements for this archive
var url = 'https://ws.warframestat.us/pc';
var http = require('https');
let ordis = require('../ordis');

module.exports = {

	getTime: function(data){

        var finalStr;
        var eCycle;
        var cCycle;

        	download((response)=>{
                //test if the api says if isDay is true, to get the time more accurate
                response.earthCycle.isDay ? eCycle = 'day' : eCycle = 'night';
                response.cetusCycle.isDay ? cCycle = 'day' : cCycle = 'night';

                //create the string to return and send it
                finalStr =`Game time: ${response.timestamp}\n`+
                            `Earth\' ${eCycle} will end in ${response.earthCycle.timeLeft}\n`+
                            `Cetus\' ${cCycle} will end in ${response.cetusCycle.timeLeft}`;

                data.reply.text(finalStr);
            });

	},

    getSortie: function(data){

        var finalStr;
        var levels = [" Level 50-60"," Level 65-80", " Level 80-100"]

        download((response) => {
            response = response.sortie;

            let finalStr = `Time left: ${response.eta}\n`+
                            `Defeat ${response.boss}'s Forces\n`;
            for(let index = 0; index < 3; index++){
                finalStr += `-----\n`+
                            `${response.variants[index].node} ${levels[index]}\n`+
                            `${response.variants[index].missionType}\n`+
                            `${response.variants[index].modifier}\n`;
            }

            data.reply.text(finalStr);
        });

    },

    getNews: function(callback){
        
        download((response) => {
            response = response.news;
            var finalStr = "";
            var len = response.length;
            var margin = 0
            if(len >=6){
                margin = 6
            }

            for(let i = len-1; i > len-margin; i--){
                finalStr += `${response[i].eta}\n`+
                            `[${response[i].message}](${response[i].link})\n`+
                            `-----\n`;
            }

            callback(finalStr);
        });

    },

    getDarvo: function(callback){
        
        download((response) => {
            response = response.dailyDeals;
            var finalStr = "Darvo deals:\n";
            
            response.forEach(e => {
                var remaining = e.total - e.sold;
                finalStr += `${e.item}: ~~${e.originalPrice}pl~~ ${e.discount}% OFF, now for ${e.salePrice}pl\n`;
                finalStr += `Remaining time: ${e.eta}, Remaining on stock: ${remaining}/${e.total}`;
            });

            callback(finalStr);
            
        });

    },

    getBaro: function(data){

        download((response) => {
            var baro = response.voidTrader;
            var finalStr = "";

            if(baro.active){
                finalStr = `${baro.character} will be at ${baro.location} for ${baro.endString}\n-----\n`
                for(let x = 0; x < baro.inventory.length; x++){
                    let inv = baro.inventory[x];
                    finalStr += `${inv.item} | dc-${inv.ducats} cr-${inv.credits}\n`
                }
            }else{
                finalStr = `${baro.character} will arrive in ${baro.startString} at ${baro.location}`
            }

            data.reply.text(finalStr);
        });

    },

    getAlerts: function(data){

        download((response) => {
            var response = response.alerts;
            var finalStr = "Alerts:\n";


            //fix continue
            response.forEach(element => {
                for(let x = 0; x < element.rewardTypes.length; x++){
                    let e = element.rewardTypes[x];
                    if(e === "credits" || e === "endo"){
                        continue;
                    }
                }
                let e = element;
                finalStr += `-----\n`;
                if(e.mission.description){
                    finalStr += `${e.mission.description}\n`;
                }
                finalStr += `${e.mission.node} / ${e.mission.type} / ${e.mission.faction}\n`;
                finalStr += `${e.mission.minEnemyLevel} - ${e.mission.maxEnemyLevel} / ${e.mission.reward.asString}\n`;
            });

            data.reply.text(finalStr);

        });

    }

}

//todo: make it search especific links.
function download(func){
    //http connection
		http.get(url, function(res){
    		var body = '';

            //receiving data
            res.on('data', function(chunk){
                body += chunk;
            });

            //after the end of the stream
            res.on('end', function(){
                //calls function in the argument
                func(JSON.parse(body));
            });

        //log an error
		}).on('error', function(e){
      		console.log("Got an error: ", e);
		});
}