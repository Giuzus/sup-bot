const SupBot = require('./src/sup-bot.js');


const bot = new SupBot();

bot.connect()
    .then(() => { 
        bot.listen();
    })
    .catch(err => {
        console.log(err);
    });