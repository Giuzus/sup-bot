
const __ = require('iterate-js');
// const helpText = require('../helptext.js');


module.exports = function(bot) {
    bot.commands = {

        // help: msg => {
        //     msg.channel.sendMessage(helpText.format(bot.config.command.symbol));
        // },

        ping: msg => {
            var phrases = [ 
                `Can't stop won't stop!`, 
                `:ping_pong: Pong Bitch!` 
            ];
            var random = (array) => {
                return array[Math.floor(Math.random() * array.length)];
            };
            msg.channel.send(random(phrases));
        },

        kenzo: msg => {

            msg.channel.send("Viado <:lul:252554070601105409>")
        }

    };
};
