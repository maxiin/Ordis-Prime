# Ordis-Prime
First off, thank you for considering contributing!

This is a telegram bot, for testing you can create a bot with [@botfather](https://telegram.me/botfather) and use your API key.

To connect with telegram API we use the dependency [telebot](https://github.com/mullwar/telebot).

If you want to know more about telegram bots please see their [documentation](https://core.telegram.org/bots).

We use the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) and npm will install eslint and set its configuration.

# Requirements
- Node.js 8.11+
- Npm 5.6+
### Setup
`$ npm install`

### Running
Windows
```
$Env:TELEGRAM_KEY = "your_key"
npm start
```
Mac / Linux
```
TELEGRAM_KEY='your_key' npm start
```

# What can I help?
## New Commands
Before anything, you need to have a command name and add it in the [main file](./src/index.js)

#### Names that you will need to change
- **CommandName** / **commandName** - the name that you created for it
- **commandApiTag** - tag that you might need from warframe API
- **Extras** - any extras in the msg formatting that you would need, see [this](https://telegraf.js.org/#/?id=extra)

Template:
```javascript

// using markdown
bot.command('commandName', ctx => api.getCommandName(msg => ctx.replyWithMarkdown(msg, [Extras])));
// simple msg
bot.command('commandName', ctx => api.getCommandName(msg => ctx.reply(msg)));

```
Commands that use the warframe API are editable and can be added in the [api.js file](./src/handlers/api/index.js)

Be sure you:
- Have added the function call on the main file (**ordis.js**)
- Changed the name of the function that will be called in **api.js**
- Know what tag you need from the warframe API ([see here](https://ws.warframestat.us/pc))
> For example if you want only baro info the tag you need is "voidTrader"
- If you need to use another API, please explain how to use it in your PR to be updated here!

Template for a command:
```javascript
module.exports = {

  ...

  getCommandName: (callback) => { 
    download('commandApiTag', (response) => {
      let finalStr = '';

      // use the response as you like
      
      // the only difference here is that we use the callback instead of the data.reply
      callback(finalStr);
    });
  },
  
  ...
  
}
```
