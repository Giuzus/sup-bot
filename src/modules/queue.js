
const __ = require('iterate-js');
// const helpText = require('../helptext.js');


module.exports = function (bot) {

    bot.commands = {
        join: (msg) =>
        {
            joinQueue(msg);
        },
        leave: (msg) =>
        {
            leaveQueue(msg);
        },
        next: (msg) =>
        {
            queueNext(msg);
        }
    }
}

//não sei a melhor forma de estruturar, então vai ficar aqui mesmo, sinta-se livre para organizar
var queue = [];
var playing;

function joinQueue(msg) {
    console.log(msg);
}

function leaveQueue(msg) {
    console.log(msg);
}

function queueNext(msg) {
    console.log(msg);
}