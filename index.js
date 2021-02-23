const TelegramExpress = require('./config/TelegramExpress.js')

let telegramExpress = new TelegramExpress(process.env.TELEGRAM_TOKEN, process.env.URL)

const server = telegramExpress.server;

server.listen(process.env.PORT, () => {
    console.log('RUNNING AT ' + process.env.PORT);
})