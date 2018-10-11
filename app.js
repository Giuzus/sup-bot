const SupBot = require('./src/sup-bot');
const logger = require('./src/logger')

const bot = new SupBot();

bot.connect()
    .then(() => {
        console.log("Bot running.")
    })
    .catch(err => {
        logger.error(err);
    });