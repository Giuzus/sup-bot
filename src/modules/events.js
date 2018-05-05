const __ = require('iterate-js');
const logger = require('../logger.js');

module.exports = function(bot) {
    bot.speakers = [];

    var parseMsg = (msg) => {
        msg.meta = msg.content.split(' ');
        var x = msg.meta.slice();
        msg.cmd = x.shift().replace(bot.config.command.symbol, '');
        msg.details = x.join(' ');
        return msg;
    };

    var hasCommand = (content) => content.substring(0, bot.config.command.symbol.length) == bot.config.command.symbol;

    __.all({
        message: msg => {
            if(bot.config.discord.log && msg.author.id != bot.client.user.id && hasCommand(msg.content))
                logger.log('{0}{1}{2} : {3}'.format(
                    msg.guild ? '{0} '.format(msg.guild.name) : '', 
                    msg.channel.name ? '#{0} @ '.format(msg.channel.name) : 'PM @ ', 
                    msg.author.username, 
                    msg.content
                ));
            if(msg.content && hasCommand(msg.content)) {
                try {
                    var data = parseMsg(msg),
                        cmd = bot.commands[data.cmd];
                    if(__.is.function(cmd))
                        cmd(data);
                } catch(e) {
                    logger.error(e);
                }
            }
        },
        
        ready: () => {
            if(bot.online)
                logger.log('Reconnected.');
            else
                logger.log('SupBot Online.');
            bot.online = true;
        },

        reconnecting: () => {
            logger.log('Reconnecting...');
        },

        disconnect: () => {
            // bot.clock.stop();
            bot.online = false;
            logger.log('Disconnected.');
        },

        error: error => {
            logger.error(error);
        },


    }, (func, name) => { bot.client.on(name, func); });
};
