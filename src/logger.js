
const fs = require('fs');
const moment = require('moment');

const logger = {
    log: (msg) => { 
        logger.write('LOG', msg);
        console.log(msg);
    },
    error: (msg) => {
        logger.write('ERROR', msg);
        console.error(msg);
    },
    write: (type, msg) => {
        fs.appendFile('sup-bot-log.log', `(${moment().format()}) [${type.toUpperCase()}]: ${msg}\r\n`, function(err) {
            if(err) throw err;
        });
    }
};

module.exports = logger;
