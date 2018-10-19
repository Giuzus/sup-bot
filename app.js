const mongoose = require('mongoose');

const SupBot = require('./src/sup-bot');
const logger = require('./src/logger')

const bot = new SupBot();
require('http').createServer().listen(80)

mongoose.connect(process.env.mongo)

bot.connect()
    .then(() => {
        console.log("Bot running.");
    })
    .catch(err => {
        logger.error(err);
    });

