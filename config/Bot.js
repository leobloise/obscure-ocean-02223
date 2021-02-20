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

        this.bot.on(/\/link/, message => {
            this._basic(message)
        })

        this.bot.addListener('message', message => { 
            this._basic(message)
        })
                                                      
    }

    _basic(message) {

        if('from' in message) {
            return this._sendPrivateBasicMessageFromGroup(message);
        }
            
        return this._sendMessage(message, "Olá! Eu fui feito para atuar em um grupo! Logo, adicione-me lá que irei atuar como desejado")            
    
    }
    
    _sendPrivateBasicMessageFromGroup(message) {
        return this.bot.sendMessage(message.from.id,  process.env.MSG_PRIVATE || "Entre no novo grupo: https://t.me/joinchat/G3kYnKSmt5LVII7J")
        .then(res => true)
        .catch(err => {
            console.log(`User ${message.from.id} does not initiate a chat with me`)
            this._sendMessage(message, process.env.MSG_PUBLIC || "Entre no novo grupo: https://t.me/joinchat/G3kYnKSmt5LVII7J")
            return true;
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

module.exports = {Bot};