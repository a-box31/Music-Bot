const { Client, GatewayIntentBits, Collection, Events } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');

const bot = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
    ],
    partials: [ 'CHANNEL' ]
});


bot.commands = new Collection();

fs.readdirSync('./commands')
.filter(file => file.endsWith('.js'))
    .forEach(file => {
        const command = require(`./commands/${file}`);
        if (command.name && command.description) {
            bot.commands.set(command.name.toLowerCase(), command);
        }
});



bot.lists = new Map();
// <Ticket, <genre, contact>>
bot.lists.set("producers", new Map())
bot.lists.set("songwriters", new Map())
bot.lists.set("vocalists", new Map())
bot.currentTickets = 0;


bot.on('ready', async () => {
    bot.user.setPresence({ activities: [{ name: 'Custom Status Here', type: "PLAYING" }], status: 'idle' });

    const commands = bot.application.commands;
    bot.commands.forEach((val, key) => {
        if (val.options) {
            commands.create({
                name: val.name,
                description: val.description,
                options: val.options,
                dm_permission: false,
            }); //.then((t) => { console.log(t); });
        }
    });

    console.log("Bot Online!");
});


//Handle Interaction
bot.on('interactionCreate', async interaction => {
    const { commandName } = interaction;
    

    // return console.log(interaction);

    // Slash Commands
    if (interaction.isChatInputCommand()) {
        bot.commands.get(commandName).execute(bot, interaction);
    }

    // Buttons
    if (interaction.isButton()) {

    }

    //Menu Selection
    // else if (interaction.isSelectMenu()) {

    // }

    //Forms
    else if (interaction.isModalSubmit()) {
        
    }
});


//New guild member
bot.on('guildMemberAdd', async (member) => {

});


bot.on('messageCreate', (message) => {
    if (message.author.bot) return;
    
    message.reply(`I'm replying to ${message.author}`);
});


bot.login(token);