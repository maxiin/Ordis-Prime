const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')


// sending the telegram custom key for controlling the bot
const bot = new Telegraf(process.env.TELEGRAM_KEY)

// including the other file to controll the commands
const util = require('./helpers/index')
const iscomponent = require('./handlers/iscomponent/index')
const api = require('./handlers/api/index')
const wiki = require('./handlers/wiki/index')


bot.telegram.getMe().then((botInfo) => {
  bot.options.username = botInfo.username
})

bot.start((ctx) => {return ctx.reply(`Hello! I am Ordis, ship cephalon, how can I help you, ${util.greet()}?\nFor a list of commands or what each command can do, please use /help`)})

bot.command('help', (ctx) => {
  const help = 'Here\'s the list of my commands, I was created by @sylverzinhu if anything bad happens... tell him please\n'
    + '/iscomp - Check if a certain weapon is a crafting component for another one. Usage - */iscomp weapon_name*\n'
    + '/time - Get the current time on Cetus and Earth\n/sortie - Get the details on the current Sortie\n'
    + '/news - The lastest news from warframe\n/alerts - Shows the Alert missions\n'
    + '/baro - Shows the Void Trader items or when he will appear\n/darvo - Get Darvo\'s current deal\n'
    + '/wiki - Makes a search on Warframe\'s wiki page. Usage - */wiki search*\n'
    + '/acolytes - Shows if the Acolytes are on the game.'

  return ctx.replyWithMarkdown(help, Extra.webPreview(false))
}).catch((err) => {console.log(err)})

// is component function using its own file
bot.command('iscomp', (ctx) => { return ctx.replyWithMarkdown(iscomponent.test(ctx.message.text), Extra.webPreview(false))}).catch((err) => {console.log(err)})
// wiki command that uses another api
bot.command('wiki', (ctx) => wiki.callWiki(ctx.message.text, (msg) => { return ctx.replyWithMarkdown(msg, Extra.webPreview(false))})).catch((err) => {console.log(err)})

// warframe api commands
bot.command('news', (ctx) => api.getNews((msg) => { return ctx.replyWithMarkdown(msg, Extra.webPreview(false))})).catch((err) => {console.log(err)}) // with markdown + no web preview
bot.command('darvo', (ctx) => api.getDarvo((msg) => { return ctx.replyWithMarkdown(msg)})).catch((err) => {console.log(err)}) // with markdown
bot.command('nightwave', (ctx) => api.getNightWaveActs((msg) => { return ctx.replyWithMarkdown(msg)})).catch((err) => {console.log(err)})
bot.command('time', (ctx) => api.getTime((msg) => { return ctx.reply(msg)})).catch((err) => {console.log(err)}) // simple message return
bot.command('sortie', (ctx) => api.getSortie((msg) => { return ctx.reply(msg)})).catch((err) => {console.log(err)})
bot.command('baro', (ctx) => api.getBaro((msg) => { return ctx.reply(msg)})).catch((err) => {console.log(err)})
bot.command('alerts', (ctx) => api.getAlerts((msg) => { return ctx.reply(msg)})).catch((err) => {console.log(err)})
bot.command('invasions', (ctx) => api.getInvasion((msg) => { return ctx.reply(msg)})).catch((err) => {console.log(err)})
bot.command('acolytes', (ctx) => api.getAcolytes((msg) => { return ctx.reply(msg)})).catch((err) => {console.log(err)})

bot.startPolling()
