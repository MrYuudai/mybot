const Discord = require('discord.js'); 
const bot = new Discord.Client();
//подключаем файл конфигурации
let config = require('./botconfig.json'); 
//"достаём" токен и префикс
let token = config.token; 
let prefix = config.prefix;
//создаём ссылку-приглашение для бота
const events = {
    MESSAGE_REACTION_ADD: 'messageReactionAdd',
    MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};
bot.on('ready', () => { 
    console.log(`Запустился бот ${bot.user.username}`);
    bot.generateInvite(["ADMINISTRATOR"]).then(link => { 
        console.log(link);
    });
});
//команда, и то, что она должна выполнить
bot.on('message', msg => {
    if (msg.content === prefix + 'habr') {
        msg.reply('The Best!');
    }
});

bot.on('message', msg => {
    if (msg.content === prefix + 'monor') {
        msg.reply('Я тут!');
    }
});

bot.on('message', msg => {
    if (msg.content === prefix + 'Сюда') {
        msg.reply('Ок');
    }
});

bot.on('message', msg => {
    if (msg.content === prefix + '+') {
        msg.member.roles.remove('801095844044341279').catch(() => {
            console.error("не удалось удалить роль");
        });
    }
});

bot.on('message', msg => {
    if (msg.content === prefix + '+') {
        msg.member.roles.add('800330787240673312').catch(() => {
            console.error("не удалось добавить роль");
        });
    }
});

bot.login(process.env.BOT_TOKEN);