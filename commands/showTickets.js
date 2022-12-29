const { Interaction, ApplicationCommandOptionType } = require('discord.js');


module.exports = {
    name: 'showtickets',
    description: 'Show all tickets in a certain queue',

    /**
     * @param {Interaction} interaction 
     */
    execute(bot, interaction) {
        const queue = interaction.options.data[0].value;
        const l = bot.lists.get(queue);
        
        var txt = `Showing the ***${queue} queue***\n`;

        l.forEach(ticket => {
            console.log(ticket);
            const user = interaction.guild.members.cache.get(ticket.get("discord"));
            var tmptxt = `Genre: ${ticket.get("genre")}\nDiscord: ${user}\nContact Info: ${ticket.get("irl_contact")}`;
            txt += `============================\n${tmptxt}\n`;
        });

        interaction.reply(txt).catch(() => { interaction.channel.send(txt); });
    },
    options: [
        {name: 'queue', description: "Display all tickets in a given queue", type: ApplicationCommandOptionType.String, choices: [{name: "producers", value: "producers"}, {name: "songwriters", value: "songwriters"}, {name: "vocalists", value: "vocalists"}], required: true}
    ]
}