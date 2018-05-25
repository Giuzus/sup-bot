
const __ = require('iterate-js');
// const helpText = require('../helptext.js');


module.exports = function(bot) {
    bot.commands.ping = (msg) => {
            var phrases = [ 
                `:ping_pong: Pong Bitch!` 
            ];
            var random = (array) => {
                return array[Math.floor(Math.random() * array.length)];
            };
            msg.channel.send(random(phrases));
        }   
};
