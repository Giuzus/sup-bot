const config = require('../config/config');
const __ = require('iterate-js');

module.exports = function (bot, config) {
    bot.config = new __.lib.Config({
        command: new __.lib.Config({
            symbol: '-'
        }),
        discord: new __.lib.Config({
            token: config.discord.token,
            log: true,
            manage: new __.lib.Config({
                channels: []
            })
        })
    });
    bot.config.update(config);
};