const { Interaction, ApplicationCommandOptionType } = require('discord.js');


module.exports = {
    name: 'resolveticket',
    description: 'Resolve a ticket',

    /**
     * @param {Interaction} interaction 
     */
    execute(bot, interaction) {
        const queue = interaction.options.data.filter((obj) => { return (obj.name == 'queue'); })[0].value;
        const number = String(interaction.options.data.filter((obj) => { return (obj.name == 'number'); })[0].value);

        if (bot.lists.get(queue).has(number)) {
            const ticket = bot.lists.get(queue).get(number);
            const user = interaction.guild.members.cache.get(ticket.get('discord'));
            
            if (interaction.user.id == user.id) {
                bot.lists.get(queue).delete(number);
                interaction.reply(`Ticket **#${number}** in the **${queue}** has been resolved!`);
            }
        }
    },
    options: [
        {name: 'queue', description: "The queue the ticket is in", type: ApplicationCommandOptionType.String, choices: [{name: "producers", value: "producers"}, {name: "songwriters", value: "songwriters"}, {name: "vocalists", value: "vocalists"}], required: true},
        {name: 'number', description: "The ticket's number", type: ApplicationCommandOptionType.Integer, required: true}
    ]
}