const TeleBot = require('telebot');
//sending the telegram custom key for controlling the bot
const bot = new TeleBot(process.env.TELEGRAM_KEY);

//including the other file to controll the commands
var iscomponent = require('./commands/iscomponent');
var api = require('./commands/api');
var wiki = require('./commands/wiki');

//this will be called everytime the user send '/start'
bot.on(['/start'], (data) => 
    data.reply.text('Hello! I am Ordis, ship cephalon, how can I help you, ' + tenno() + '?\nFor a list of commands or what each command can do, please use /help'));

//in every message of the type text, this will be called
bot.on('text', function(data){

    let lowerData = data.text.toLowerCase();
    console.log(lowerData);

    //handle /help command
    if(data.text.startsWith('/help')){
        bot.sendMessage(data.chat.id, 'Here\'s the list of my commands\n/iscomp - Check if a certain weapon is a crafting component for another one. Usage - */iscomp weapon_name*\n/time - Get the current time on Cetus and Earth\n/sortie - Get the details on the current Sortie\n/news - The lastest news from warframe\n/alerts - Shows the Alert missions\n/baro - Shows the Void Trader items or when he will appear\n/darvo - Get Darvo\'s current deal\n/wiki - Makes a search on Warframe\'s wiki page. Usage - */wiki search*\n/acolytes - Shows if the Acolytes are on the game.', {parseMode: "Markdown"});
    }

    //handle /iscomponent command
    if(data.text.startsWith("/iscomp")){
        //turn the text into lowercase for easy reading
        let toFunc = data.text.toLowerCase();
        //this way to send msg is more complicated because of the parseMode that allows me to send links 
        //and to turn off the preview of it so it looks cleaner.
        bot.sendMessage(data.chat.id, iscomponent.test(toFunc), {parseMode: "Markdown", webPreview: false });
    }

    if(data.text.startsWith('/time')){
   		api.getTime(data);
    }

    if(data.text.startsWith('/sortie')){
        api.getSortie(data);
    }

    if(data.text.startsWith('/news')){
        api.getNews(function(m){
            bot.sendMessage(data.chat.id, m, {parseMode: "Markdown", webPreview: false });
        });
    }

    if(data.text.startsWith("/baro")){
        api.getBaro(data);
    }

    if(data.text.startsWith("/alerts")){
        api.getAlerts(data);
    }

    if(data.text.startsWith("/darvo")){
        api.getDarvo(function(m){
            bot.sendMessage(data.chat.id, m, {parseMode: "Markdown", webPreview: false });
        });
    }

    if(data.text.startsWith("/invasions")){
        api.getInvasion(data);
    }

    if(data.text.startsWith("/wiki")){
        wiki.callWiki(data.text, function(m){
            bot.sendMessage(data.chat.id, m, {parseMode: "Markdown", webPreview: false });
        });
    }

    if(data.text.startsWith("/acolytes")){
        api.getAcolytes(data);
    }

});

function tenno(){
	return Math.random() >= 0.5?  "Operator":"Star-Child";
}

//starts the bot itself
bot.start();
