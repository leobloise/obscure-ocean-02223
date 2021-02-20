const TelegramBot = require("node-telegram-bot-api");
const express = require('express');

class Bot {
    /**
     * @param {TelegramBot} baseBot 
     */
    constructor(baseBot) {
        this.bot = baseBot;
        this.initialize();
        return this.bot;
                        }

    initialize() {
        this.bot.addListener('message', message => {

            if('from' in message) {
                this.bot.sendMessage(message.from.id, 'Hello! I\'m a prototype and your chat id is ' + message.chat.id)
                return;
            }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
            this.bot.sendMessage(message.chat.id, 'Hello! I\'m a prototype and your chat id is ' + message.chat.id)
        })                                              
    }

}

class TelegramExpress {

    constructor(token, url, customBot) {
        this._telegramToken = token;
        this._url = url;
        this._webhookRoute = `${this._url}/bot${this._telegramToken}`;
        this.initializeTelegram(customBot);
        this.initializeExpress();
    }

    initializeTelegram(customBot) {

        try {
        
            let bot =  new TelegramBot(this._telegramToken);
            
            bot = new Bot(bot);

            bot.setWebHook(this._webhookRoute);
        
            this._bot = bot;
        
        } catch(error) {
            console.log(error);
            process.exit();
        }

    }

    initializeExpress() {

        this.server = express();

        this.server.use(express.json())

        const route = this._webhookRoute.substring(this._webhookRoute.indexOf('/bot'));
        
        this.server.post(route, (req, res) => {
            this._bot.processUpdate(req.body);
            res.send(200);
        })

    }   

}


module.exports = TelegramExpress