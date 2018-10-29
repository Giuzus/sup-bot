const logger = require('../logger.js');
const Commands = require('../mongo/commands')
class EventHandler {

    init(bot) {
        bot.commands.addcommand = this.addCustomCommand;
        bot.commands.removecommand = this.removeCustomCommand;

        const events = {
            message: msg => {
                if (msg.content && this.isCommand(msg.content, bot.config.command.symbol)) {

                    if (msg.author.id != bot.client.user.id) {
                        logger.log((msg.guild ? msg.guild.name + ' ' : '') + (msg.channel.name ? '#' + msg.channel.name + ' @' + msg.author.username : 'PM @' + msg.author.username) + ': ' + msg.content);
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
        const cmd = bot.commands[data.cmd]
        if (cmd) {
            if (typeof cmd === "function") {
                cmd(data);
            }
        }
        else {
            this.executeCustom(data, bot);
        }
    }

    executeCustom(data) {
        Commands.findOne({ guild: data.guild, command: data.cmd },
            function (err, command) {
                if (command) {
                    data.channel.send(command.response);
                }
            });
    }

    addCustomCommand(msg) {
        if (!msg.channel) {
            return;
        }
        if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
            msg.send(":octagonal_sign:, get some help.");
            return;
        }

        var cmd = msg.details.split(" ")[0];
        var message = msg.details.substring(msg.details.indexOf('"') + 1, msg.details.lastIndexOf('"'));
        Commands.findOne({ guild: msg.guild, command: cmd },
            function (err, command) {
                if (command) {
                    msg.channel.send("Command already exists.");
                }
                else {
                    if (!cmd || !message) {
                        msg.channel.send('Usage: <command-name> "<message>"')
                    }

                    var command = new Commands({
                        guild: msg.guild.name,
                        command: cmd,
                        response: message
                    });

                    command.save(function (err, command) {
                        msg.channel.send(`Successfully created '${command.command}' command.`)
                    });
                }
            });
    }

    removeCustomCommand(msg) {
        if (!msg.channel) {
            return;
        }
        if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
            msg.send(":octagonal_sign:, get some help.");
            return;
        }

        var cmd = msg.details.split(" ")[0];
        Commands.findOne({ guild: msg.guild, command: cmd },
            function (err, command) {
                if (err)
                    throw err;

                if (!command) {
                    msg.channel.send("Command does not exist.");
                }
                else {
                    command.remove(function (err, command) {
                        if (err)
                            throw err;

                        msg.channel.send(`Removed command '${command.command}'.`);
                    });
                }
            });
    }
}


module.exports = EventHandler;
