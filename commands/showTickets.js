const { Interaction, ApplicationCommandOptionType } = require('discord.js');


module.exports = {
    name: 'showtickets',
    description: 'Show all tickets in a certain queue',

    /**
     * @param {Interaction} interaction 
     */
    execute(bot, interaction) {
        const { name, options } = interaction.options.data[0];

        if (name == 'mine') {
            var myTickets = `Showing ${interaction.user}'s personal queue\n\n`;
            
            bot.lists.forEach((list, queueName) => {
                myTickets += `You have **${list.size}** tickets in the **${queueName}** queue\n`;
                if (list.size == 0) {
                    myTickets += "You have no tickets in this queue!\n";
                }

                list.forEach((ticket, key) => {
                    if (ticket.get('discord') == interaction.user.id) {
                        myTickets += `**Ticket #${key}**:\nGenre: ${ticket.get("genre")}\nDiscord: ${interaction.user}\nContact Info: ${ticket.get("irl_contact")}\n`;
                        myTickets += `----------------------------\n`;
                    }
                });

                myTickets += `============================\n`;
            });

            interaction.reply({content: myTickets, ephemeral: true}).catch(() => { interaction.channel.send({content: myTickets, ephemeral: true}); });
        } else {
            const queue = options[0].value;
            const l = bot.lists.get(queue);
            
            var txt = `Showing the ***${queue} queue***\n`;

            l.forEach((ticket, key) => {
                const user = interaction.guild.members.cache.get(ticket.get("discord"));
                var tmptxt = `**Ticket #${key}**:\nGenre: ${ticket.get("genre")}\nDiscord: ${user}\nContact Info: ${ticket.get("irl_contact")}`;
                txt += `============================\n${tmptxt}\n`;
            });

            interaction.reply({content: txt, ephemeral: true}).catch(() => { interaction.channel.send(txt); });
        }
    },
    options: [
        {name: 'mine', description: 'play a song', type: ApplicationCommandOptionType.Subcommand, options: []},
        
        {name: 'queue', description: 'play a song', type: ApplicationCommandOptionType.Subcommand, options: [
            {name: 'queue', description: "Display all tickets in a given queue", type: ApplicationCommandOptionType.String, choices: [{name: "producers", value: "producers"}, {name: "songwriters", value: "songwriters"}, {name: "vocalists", value: "vocalists"}], required: true}
        ]},
        
    ]
}