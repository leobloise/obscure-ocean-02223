const TelegramBot = require("node-telegram-bot-api");
const express = require('express');

class TelegramExpress {

    constructor(token, url) {
        this._telegramToken = token;
        this._options = {
            webHook: {
                port: 443
            }
        }
        this._url = url;
        this._webhookRoute = `${this._url}/bot${this._telegramToken}`;
        this.initializeTelegram();
        this.initializeExpress();
    }

    initializeTelegram() {

        try {
        
            let bot =  new TelegramBot(this._telegramToken, this._options);
        
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
            this._bot.processUpdate(req.body);
            res.send(200);
        })

    }   

}


module.exports = TelegramExpress