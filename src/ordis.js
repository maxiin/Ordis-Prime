const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')


// sending the telegram custom key for controlling the bot
const bot = new Telegraf(process.env.TELEGRAM_KEY)

// including the other file to controll the commands
const iscomponent = require('./commands/iscomponent')
const api = require('./commands/api')
const wiki = require('./commands/wiki')


const greetings = ['Operator', 'Star-Child']

function tenno() {
  return greetings[(Math.floor(Math.random() * greetings.length))]
}

bot.start((ctx) => ctx.reply(`Hello! I am Ordis, ship cephalon, how can I help you, ${tenno()}?\nFor a list of commands or what each command can do, please use /help`))

bot.command('help', (ctx) => {
  ctx.replyWithMarkdown('Here\'s the list of my commands\n/iscomp - Check if a certain weapon is a crafting component for another one. Usage - */iscomp weapon_name*\n'
    + '/time - Get the current time on Cetus and Earth\n/sortie - Get the details on the current Sortie\n/news - The lastest news from warframe\n/alerts - Shows the Alert missions\n'
    + '/baro - Shows the Void Trader items or when he will appear\n/darvo - Get Darvo\'s current deal\n/wiki - Makes a search on Warframe\'s wiki page. Usage - */wiki search*\n'
    + '/acolytes - Shows if the Acolytes are on the game.', Extra.webPreview(false))
})

// is component function using its own file
bot.command('iscomp', (ctx) => ctx.replyWithMarkdown(iscomponent.test(ctx.message.text), Extra.webPreview(false)))
// wiki command that uses another api
bot.command('wiki', (ctx) => wiki.callWiki(ctx.message.text, (msg) => ctx.replyWithMarkdown(msg, Extra.webPreview(false))))

// warframe api commands
bot.command('news', (ctx) => api.getNews((msg) => ctx.replyWithMarkdown(msg, Extra.webPreview(false)))) // with markdown + no web preview
bot.command('darvo', (ctx) => api.getDarvo((msg) => ctx.replyWithMarkdown(msg))) // with markdown
bot.command('time', (ctx) => api.getTime((msg) => ctx.reply(msg))) // simple message return
bot.command('sortie', (ctx) => api.getSortie((msg) => ctx.reply(msg)))
bot.command('baro', (ctx) => api.getBaro((msg) => ctx.reply(msg)))
bot.command('alerts', (ctx) => api.getAlerts((msg) => ctx.reply(msg)))
bot.command('invasions', (ctx) => api.getInvasion((msg) => ctx.reply(msg)))
bot.command('acolytes', (ctx) => api.getAcolytes((msg) => ctx.reply(msg)))

bot.startPolling()
