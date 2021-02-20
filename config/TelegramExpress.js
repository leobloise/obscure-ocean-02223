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
                return this.bot.sendMessage(message.from.id, "Entre no novo grupo: https://t.me/joinchat/G3kYnKSmt5LVII7J")
                .then(res => true)
                .catch(err => {
                    console.log(`User ${message.from.id} does not initiate a chat with me`)
                    this._sendMessage(message, "Entre no novo grupo: https://t.me/joinchat/G3kYnKSmt5LVII7J")
                    return true;
                })    
            }
                
            return this._sendMessage(message, "Olá! Eu fui feito para atuar em um grupo! Logo, adicione-me lá que irei atuar como desejado")            
        })                                              
    }
    
    _sendMessage(messageTelegram, message) {

        return new Promise((resolve, reject) => {
            this.bot.sendMessage(messageTelegram.chat.id, message)
            .then(res => resolve(true))
            .catch(err => {
                console.log(err)
                return false;
            });
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
            res.sendStatus(200);
        })

        this.server.get('/', (req, res) => {
            res.send('<h1>Eu sou um bot no telegram</h1>')
        })

    }   

}


module.exports = TelegramExpress