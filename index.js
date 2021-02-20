const TelegramExpress = require('./config/TelegramExpress.js')

let telegramExpress = new TelegramExpress('1631369729:AAHHfaB1fziKspV3xjW3GZ-fU9WnYT_xupc', 'https://obscure-sea-02223.herokuapp.com', '')

const server = telegramExpress.server;

server.listen(process.env.PORT, () => {
    console.log('RUNNING AT ' + process.env.PORT);
})