
const __ = require('iterate-js');
const moment = require('moment');
const logger = require('../logger.js');

module.exports = function(bot) {
    var STATE = __.enum({
        READY: 0,
        PLAYING: 1,
        PAUSED: 2
    });

    bot.clock = new __.lib.StopWatch({
        onTick: (time) => {
            if(bot.online) {
                
                // var text = __.switch(bot.state, {
                //     [STATE.READY]: `Ready: ${bot.queue.count} in queue.`,
                //     [STATE.PLAYING]: `${currentTime}/${totalTime}`,
                //     [STATE.PAUSED]: `Paused: ${title} - ${currentTime} / ${totalTime}`
                // });

                // if(__.prop(bot.client, 'user.presence.game.name') != text) {
                //     logger.log(`Status: ${text}`);
                //     bot.client.user.setGame(text);
                // }
            }
        },
        tickRate: 10000
    });
};
