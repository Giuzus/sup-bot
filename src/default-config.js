const __ = require('iterate-js');

module.exports = function (bot, config) {
    bot.config = new __.lib.Config({
        command: new __.lib.Config({
            symbol: '-'
        }),
        discord: new __.lib.Config({
            token: 'NDE3MTMxNzk3MjE0OTIwNzE0.DXZSJA.cakgt6cy0jClGzQkxfwvIS8W2aU',
            log: true,
            manage: new __.lib.Config({
                channels: []
            })
        })
    });
    bot.config.update(config);
};