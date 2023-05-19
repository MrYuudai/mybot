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
# Основной баланс
main_balance = 0

# Последнее действие
last_action = None

# Предпоследнее действие
prev_action = None

# История снятия и пополнения
history = []

# Команда /старт
@bot.command()
async def start(ctx):
    global main_balance
    global last_action
    global prev_action
    
    # Отправка текста в тот же канал
    await ctx.send("Основной баланс: {}$".format(main_balance))
    if last_action:
        await ctx.send("Последнее действие: {}".format(last_action))
    if prev_action:
        await ctx.send("Предпоследнее действие: {}".format(prev_action))

# Команда /история
@bot.command()
async def история(ctx):
    # Отображение истории только для автора команды
    if ctx.author == ctx.message.author:
        for i, entry in enumerate(history, start=1):
            await ctx.author.send("{}. {}".format(i, entry))

# Команда /Пополнение
@bot.command()
async def Пополнение(ctx, amount, reason):
    global main_balance
    global last_action
    global prev_action
    
    # Добавление записи в историю
    history.append("{} / Пополнение: {}$ / Причина: {}".format(ctx.author.name, amount, reason))
    
    # Обновление баланса
    main_balance += int(amount)
    
    # Обновление последнего и предпоследнего действия
    prev_action = last_action
    last_action = "{} / Пополнение: {}$ / Причина: {}".format(ctx.author.mention, amount, reason)

# Команда /Снятие
@bot.command()
async def Снятие(ctx, amount, reason):
    global main_balance
    global last_action
    global prev_action
    
    # Добавление записи в историю
    history.append("{} / Снятие: {}$ / Причина: {}".format(ctx.author.name, amount, reason))
    
    # Обновление баланса
    main_balance -= int(amount)
    
    # Обновление последнего и предпоследнего действия
    prev_action = last_action
    last_action = "{} / Снятие: {}$ / Причина: {}".format(ctx.author.mention, amount, reason)

bot.login(token);
