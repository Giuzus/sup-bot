const logger = require('../logger.js');
const __ = require('iterate-js');

// const helpText = require('../helptext.js');


module.exports = function (bot) {

    bot.commands = {
        setplay: (msg) => {
            setChannel(msg.member, msg.channel);
        },
        setwait: (msg) => {
            setWaitChannel(msg.member, msg.channel);
        },
        join: (msg) => {
            joinQueue(msg.member, msg.channel);
        },
        leave: (msg) => {
            leaveQueue(msg.member, msg.channel);
        },
        next: (msg) => {
            queueNext(msg.channel);
        }
    }

    bot.client.on('voiceStateUpdate', (oldMember, newMember) => {
        if (isMemberInQueue(newMember) && oldMember.voiceChannel != null && newMember.voiceChannel == null) {
            let removed = remove(newMember);
            logger.log(`Usuario ${removed.displayName} removido da fila`);
        }
    });
}

//TODO:
//Tratar erro de permissão ao mover usuario de canal.
//Remover usuarios desconectados/deslogados.
//comando para listar usuarios na fila.
//comando para listar canais configurados.

//não sei a melhor forma de estruturar, então vai ficar aqui mesmo, sinta-se livre para organizar
let queue = [];
let active;
let playChannel;
let waitChannel;

function isMemberInQueue(member)
{
    return queue.find(x => x.id === member.id) != null;
}

function joinQueue(member, textChannel) {

    if(member.voiceChannel == null)
    {
        textChannel.send(`Você precisa estar em um canal de voz para entrar na fila (${member.displayName})`);
        return;
    }

    if (!isMemberInQueue(member)) {
        queue.push(member);
        textChannel.send(`${member.displayName} entrou na fila.`);
    }
    else {
        textChannel.send(`${member.displayName} já está na fila.`);
    }
}

function leaveQueue(member, textChannel) {
    if (isMemberInQueue(member)) {
        remove(member);
        textChannel.send(`${member.displayName} saiu da fila.`);
    }
    else {
        textChannel.send(`${member.displayName} não está na fila.`);
    }
}

function remove(member) {
    let removed = queue.find(x => x.id === member.id);
    queue = queue.filter((elem) => {
        elem.id != member.id;
    });

    return removed;
}

function queueNext(textChannel) {

    if (!waitChannel || !playChannel) {
        textChannel.send('É necessário configurar os canais de jogo e espera.')
        return;
    }

    if (active) {
        active.setVoiceChannel(waitChannel)
            .then(() => textChannel.send(`${active.displayName} => ${playChannel.name}`));
        active = null;
    }

    if (queue.length > 0)
        active = queue.shift();
    else
        textChannel.send('A fila está vazia.')

    if (active)
        active.setVoiceChannel(playChannel)
            .then(() => textChannel.send(`${active.displayName} => ${playChannel.name}`));
}

function setChannel(member, textChannel) {
    playChannel = member.voiceChannel;
    textChannel.send(`Canal de jogo: ${playChannel.name}`)
}
function setWaitChannel(member, textChannel) {
    waitChannel = member.voiceChannel;
    textChannel.send(`Canal de espera: ${waitChannel.name}`)
}