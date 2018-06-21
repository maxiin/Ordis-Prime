const TeleBot = require('telebot');
const configs = require('./config');
//sending the telegram custom key for controlling the bot
const bot = new TeleBot(configs().telegramKey);

//including the other file to controll the commands
var iscomponent = require('./commands/iscomponent');
var api = require('./commands/api');

//this will be called everytime the user send '/start'
bot.on(['/start'], (data) => 
    data.reply.text('Hello! I am Ordis, ship cephalon, how can i help you, operator?\nFor a list of commands or what each command can do, please use /help'));

//in every message of the type text, this will be called
bot.on('text', function(data){

    let lowerData = data.text.toLowerCase();
    console.log(lowerData);

    //handle /help command
    if(data.text === '/help'){
        bot.sendMessage(data.chat.id, 'Here\'s the list of my commands\n/iscomp - Check if a certain weapon is crafting component for another one, Usage - */iscomp \'weapon name\'*\n/time - Get Cetus and Earth current time', {parseMode: "Markdown"});
    }

    //handle /iscomponent command
    if(data.text.substring(0, 7) === "/iscomp" || data.text.substring(0, 23) === "/iscomp@ordis_prime_bot"){
        //turn the text into lowercase for easy reading
        let toFunc = data.text.toLowerCase();
        //this way to send msg is more complicated because of the parseMode that allows me to send links 
        //and to turn off the preview of it so it looks cleaner.
        bot.sendMessage(data.chat.id, iscomponent.test(toFunc), {parseMode: "Markdown", webPreview: false });
    }

    if(data.text === '/time'){
   		api.getTime(data);
    }

    if(data.text === '/sortie'){
        api.getSortie(data);
    }

    if(data.text === '/news'){
        api.getNews(function(m){
            bot.sendMessage(data.chat.id, m, {parseMode: "Markdown", webPreview: false });
        });
    }

    //commented until done testing
    // if(data.text === "/baro"){
    //     api.getBaro(data);
    // }

})

//by the docs i saw that this needs to be in the bottom? still confused about it, supossedly it starts the bot itself
bot.start();