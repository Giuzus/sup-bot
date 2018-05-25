const logger = require('../logger.js');
const __ = require('iterate-js');


module.exports = function (bot) {

    bot.commands.setplay = (msg) => {
        setChannel(msg.member, msg.channel);
    }

    bot.commands.setwait = (msg) => {
        setWaitChannel(msg.member, msg.channel);
    }

    bot.commands.join = (msg) => {
        joinQueue(msg.member, msg.channel);
    }

    bot.commands.leave = (msg) => {
        leaveQueue(msg.member, msg.channel);
    }

    bot.commands.next = (msg) => {
        queueNext(msg.member, msg.channel);
    }

    bot.commands.queue = (msg) => {
        listQueue(msg.channel);
    }

    bot.client.on('voiceStateUpdate', (oldMember, newMember) => {
        if (isMemberInQueue(newMember) && oldMember.voiceChannel != null && newMember.voiceChannel == null) {
            let removed = remove(newMember);
            logger.log(`Usuario ${removed.displayName} removido da fila`);
        }
    });
}

//TODO:
//comando para listar canais configurados.

//não sei a melhor forma de estruturar, então vai ficar aqui mesmo, sinta-se livre para organizar
let queue = [];
let active;
let playChannel;
let waitChannel;

function isMemberInQueue(member) {
    return queue.find(x => x.id === member.id) != null;
}

function joinQueue(member, textChannel) {

    if (member.voiceChannel == null) {
        textChannel.send(`**Você precisa estar em um canal de voz para entrar na fila (${member.displayName})** :face_palm:`);
        return;
    }

    if (!isMemberInQueue(member)) {
        queue.push(member);
        textChannel.send(`:white_check_mark: **${member.displayName} entrou na fila.**`);
    }
    else {
        textChannel.send(`**${member.displayName} já está na fila.** :neutral_face:`);
    }
}

function leaveQueue(member, textChannel) {
    if (isMemberInQueue(member)) {
        remove(member);
        textChannel.send(`:heavy_multiplication_x: **${member.displayName} saiu da fila.**`);
    }
    else {
        textChannel.send(`**${member.displayName} não está na fila.** :thinking:`);
    }
}

function remove(member) {
    let removed = queue.find(x => x.id === member.id);
    queue = queue.filter((elem) => {
        elem.id != member.id;
    });

    return removed;
}

function queueNext(member, textChannel) {

    if (!member.hasPermission('MOVE_MEMBERS'))
        return;

    if (!waitChannel || !playChannel) {
        textChannel.send('**É necessário configurar os canais de jogo e espera.** :face_palm:')
        return;
    }

    if (active) {
        active.setVoiceChannel(waitChannel)
            .then(() => textChannel.send(`${active.displayName} :arrow_right: ${playChannel.name}`));
        active = null;
    }

    if (queue.length > 0)
        active = queue.shift();
    else
        textChannel.send('**A fila está vazia. :cry:**')

    if (active)
        active.setVoiceChannel(playChannel)
            .then(() => textChannel.send(`${active.displayName} :arrow_right: ${playChannel.name}`));
}

function setChannel(member, textChannel) {
    playChannel = member.voiceChannel;
    textChannel.send(`**Canal de jogo:** ${playChannel.name}`)
}
function setWaitChannel(member, textChannel) {
    waitChannel = member.voiceChannel;
    textChannel.send(`**Canal de espera:** ${waitChannel.name}`)
}

function listQueue(textChannel) {
    var ret = "**Fila:** ```";

    for (i = 0; i < queue.length; i++) {
        ret += `\n${queue[i].displayName}`;
    }
    ret += "```";

    textChannel.send(ret);
}