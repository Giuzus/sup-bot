const fs = require('fs');

const __ = require('iterate-js');
const Discord = require('discord.js');
const config = require('./default-config.js');
const modules = __.map(fs.readdirSync('./src/modules'), mod => require(`./modules/${mod}`));

module.exports = function(bot, cfg) {
    bot.dir = __dirname;
    
    bot.client = new Discord.Client();
    
    config(bot, cfg);

    __.all(modules, mod => mod(bot));
};
