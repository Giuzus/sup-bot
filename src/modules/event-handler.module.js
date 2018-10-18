const logger = require('../logger.js');



class EventHandler {

    parseMsg(msg, symbol) {
        msg.meta = msg.content.split(' ');
        var x = msg.meta.slice();
        msg.cmd = x.shift().replace(symbol, '');
        msg.details = x.join(' ');
        return msg;
    };

    isCommand(content, symbol) {
        return content.substring(0, symbol.length) == symbol;
    }

    init(bot) {
        let events = {
            message: msg => {
                if (msg.content && this.isCommand(msg.content, bot.config.command.symbol)) {

                    if (msg.author.id != bot.client.user.id) {
                        logger.log(
                            msg.guild ? msg.guild.name + ' ' : '' +
                            msg.channel.name ? '#' + msg.channel.name + ' @' : 'PM @' +
                            msg.author.username +
                            ': ' + msg.content);
                    }

                    try {
                        var data = this.parseMsg(msg, bot.config.command.symbol),
                            cmd = bot.commands[data.cmd];
                        if (__.is.function(cmd))
                            cmd(data);
                    } catch (e) {
                        logger.error(e);
                    }
                }
            },

            ready: () => {
                if (bot.online)
                    logger.log('Reconnected.');
                else
                    logger.log('SupBot Online.');
                bot.online = true;
            },

            reconnecting: () => {
                logger.log('Reconnecting...');
            },

            disconnect: () => {
                bot.online = false;
                logger.log('Disconnected.');
            },

            error: error => {
                logger.error(error);
            }
        }

        for (var key in events) {
            var event = events[key];
            bot.client.on(key, event)
        }
    }
}


module.exports = EventHandler;
