const TelegramBot = require("node-telegram-bot-api");
const express = require('express');

class TelegramExpress {

    constructor(token, url) {
        this._telegramToken = token;
        this._url = url;
        this._webhookRoute = `${this._url}/bot${this._telegramToken}`;
        this.initializeTelegram();
        this.initializeExpress();
    }

    initializeTelegram() {

        try {
        
            let bot =  new TelegramBot(this._telegramToken);
        
            bot.setWebHook(this._webhookRoute);
        
            this._bot = bot;
        
        } catch(error) {
            console.log(error);
            process.exit();
        }

    }

    initializeExpress() {

        this.server = express();

        const route = this._webhookRoute.substring(this._webhookRoute.indexOf('/bot'));
        
        this.server.post(route, (req, res) => {
            console.log(req.body)
            this._bot.processUpdate(req.body);
            res.send(200);
        })

    }   

}


module.exports = TelegramExpress