
class CommandsModule {

    init(bot) {
        bot.commands = {

            ping: msg => {
                var phrases = [
                    `:ping_pong: Pong Bitch!`
                ];
                var random = (array) => {
                    return array[Math.floor(Math.random() * array.length)];
                };
                msg.channel.send(random(phrases));
            }
        };
    }
}

module.exports = CommandsModule;