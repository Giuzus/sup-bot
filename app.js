const SupBot = require('./src/sup-bot.js');


const bot = new SupBot();

bot.connect()
    .catch(err => {
        console.log(err);
    });