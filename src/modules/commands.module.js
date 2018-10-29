const Commands = require('../mongo/commands')
const logger = require('../logger')
class CommandsModule {

    init(bot) {
        bot.commands.ping = msg => {
            var phrases = [
                `:ping_pong: Pong Bitch!`,
                `:penguin: Kenzo viado`
            ];
            var random = (array) => {
                return array[Math.floor(Math.random() * array.length)];
            };
            msg.channel.send(random(phrases));
        }

        bot.commands.list = msg => {
            var commandsString = '**Commands:** \n ```';
            for (var key in bot.commands) {
                commandsString += key + '\n';
            }
            commandsString += '```\n **Custom commands:** \n ```'
            Commands.find({ guild: msg.guild }, (err, commands) => {
                if (err) {
                    logger.error(err);
                    return;
                }

                for (cmd in commands) {
                    commandsString += cmd.command + '\n';
                }
                commandsString += '```'

                msg.channel.send(commandsString);
            });
        }
    }
}

module.exports = CommandsModule;