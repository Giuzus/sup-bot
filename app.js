const SupBot = require('./src/sup-bot');
const logger = require('./src/logger')

const bot = new SupBot();
require('http').createServer().listen(3000)

bot.connect()
    .then(() => {
        console.log("Bot running.")
    })
    .catch(err => {
        logger.error(err);
    });

