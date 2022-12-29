const { Interaction } = require('discord.js');


module.exports = {
    name: 'test',
    description: 'a test command',
    /**
     * @param {Interaction} interaction 
     */
    execute(bot, interaction) {
        interaction.reply(`Hello ${interaction.user}`);
    },
    options: []
}