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
Before anything, you need to have a command name and add it in the [main file](./ordis.js)

#### Names that you will need to change
- **CommandName** / **commandName** - the name that you created for it
- **commandApiTag** - tag that you might need from warframe API

Template:
```javascript
bot.on('text', (data) => {

  ...
  
  // if is a warframe API based command and you don't need markdown:
  if (data.text.startsWith('/commandName')) {
    api.getCommandName(data); // this function will be created in the api file, see below.
  }
  
  // if is a warframe API based command and you need markdown:
  if (data.text.startsWith('/commandName')) {
      api.getCommandName((m) => {
        bot.sendMessage(data.chat.id, m, { parseMode: 'Markdown', webPreview: false });
      });
  }

  ...

});
```
Commands that use the warframe API are editable and can be added in the [api.js file](./commands/api.js)

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

  // if you don't need markdown
  getCommandName: (data) => {
    download('commandApiTag', (response) => { // call to the download function, to connect with the api
      let finalStr = ''; // use the finalStr variable to return the message if needed

      // use the response data as you like, it will be returned as a json.

      data.reply.text(finalStr); // this is the function that will send the text to the user
      }
    });
  }
  
  // if you need markdown
  // since we built a callback instead of sending the bot data we can't just send the message from here
  // so the text will be returned to the callback in ordis.js
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
