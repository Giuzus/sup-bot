"use strict";

const fs = require('fs');
const Discord = require('discord.js');


class SupBot {

    constructor() {
        this.init();
    }

    async connect() {
        return this.client.login("NDE3MTMxNzk3MjE0OTIwNzE0.DqooLA.fxgjymua4d7H5ZoQyz94CM4AT0o");
    }

    async disconnect() {
        return this.client.destroy();
    }

    init() {

        this.config = {
            command: {
                symbol: '-'
            }
        };

        this.dir = __dirname;
        this.client = new Discord.Client();

        const modules = fs.readdirSync('./src/modules').map(path => require('./modules/' + path));

        modules.forEach(mod => new mod().init(this));
    };



}

module.exports = SupBot;
