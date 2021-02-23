const TelegramBot = require("node-telegram-bot-api");
const express = require('express');
const {Bot} = require('./Bot.js')

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
            res.sendStatus(200);
        })

        this.server.get('/', (req, res) => {
            res.send('<h1>Eu sou um bot no telegram</h1>')
        })

    }   

}


module.exports = TelegramExpress