const logger = require('../logger.js');


class EventHandler {

    init(bot) {

        const events = {
            message: msg => {
                if (msg.content && this.isCommand(msg.content, bot.config.command.symbol)) {

                    if (msg.author.id != bot.client.user.id) {
                        logger.log(msg.guild ? msg.guild.name + ' ' : '' + msg.channel.name ? '#' + msg.channel.name + ' @' : 'PM @' + msg.author.username + ': ' + msg.content);
                    }

                    var data = this.parseMsg(msg, bot.config.command.symbol);

                    this.executeCommand(data, bot);

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

    executeCommand(data, bot) {
        const cmd = bot.commands[data.msg]
        if (cmd) {
            if (typeof cmd === "function") {
                console.log("Executing " + data.msg + " command.")
                cmd(data);
            }
        }
        else {
            this.executeCustom(data, bot);
        }
    }

    executeCustom(data, bot) {
        console.log("Executing custom command.")
        console.log(data.msg);
        console.log(data.details);
    }
}


module.exports = EventHandler;
