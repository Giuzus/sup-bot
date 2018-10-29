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

                for (var cmd in commands) {
                    
                    commandsString += JSON.stringify(cmd) + '\n';
                }
                commandsString += '```'

                msg.author.send(commandsString);
            });
        }
    }
}

module.exports = CommandsModule;