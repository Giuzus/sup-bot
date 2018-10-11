const logger = require('../logger.js');



class EventHandler {
    parseMsg(msg) {
        msg.meta = msg.content.split(' ');
        var x = msg.meta.slice();
        msg.cmd = x.shift().replace(bot.config.command.symbol, '');
        msg.details = x.join(' ');
        return msg;
    };

    isCommand(content) {
        return content.substring(0, bot.config.command.symbol.length) == bot.config.command.symbol;
    }

    init(bot) {
        let events = {
            message: msg => {
                if (msg.content && this.isCommand(msg.content)) {

                    if (bot.config.discord.log && msg.author.id != bot.client.user.id) {
                        logger.log('{0}{1}{2} : {3}'.format(
                            msg.guild ? '{0} '.format(msg.guild.name) : '',
                            msg.channel.name ? '#{0} @ '.format(msg.channel.name) : 'PM @ ',
                            msg.author.username,
                            msg.content
                        ));
                    }

                    try {
                        var data = this.parseMsg(msg),
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
