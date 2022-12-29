const {Interaction, ApplicationCommandOptionType } = require('discord.js');



module.exports = {
    name: "addticket",
    description: "Add a ticket to a queue",

    /**
     * @param {Interaction} interaction 
     */
    execute(bot, interaction) {
        const { name, options } = interaction.options.data[0];
        var genre = options.filter((obj) => { return (obj.name == 'genre'); })[0];
        var contact = options.filter((obj) => { return (obj.name == 'irl_contact'); })[0];

        if (!genre) { return interaction.reply("Please specify a genre"); }
        if (!contact) { contact = "N/A"; }

        bot.lists.get(name).set(String(bot.currentTickets), new Map([["genre", contact.value], ["discord", interaction.user.id], ["irl_contact", genre.value]]));
        bot.currentTickets++;
        interaction.reply("Ticket added to queue");
    },
    options: [
        {name: 'producers', description: 'play a song', type: ApplicationCommandOptionType.Subcommand, options: [
            {name: 'genre', description: 'The song URL/search term(s)', type: ApplicationCommandOptionType.String, required: true},
            {name: 'irl_contact', description: 'The playlist URL', type: ApplicationCommandOptionType.String, required: false}
        ]},
        
        {name: 'songwriters', description: 'play a song', type: ApplicationCommandOptionType.Subcommand, options: [
            {name: 'genre', description: 'The song URL/search term(s)', type: ApplicationCommandOptionType.String, required: true},
            {name: 'irl_contact', description: 'The playlist URL', type: ApplicationCommandOptionType.String, required: false}
        ]},
        
        {name: 'vocalists', description: 'play a song', type: ApplicationCommandOptionType.Subcommand, options: [
            {name: 'genre', description: 'The song URL/search term(s)', type: ApplicationCommandOptionType.String, required: true},
            {name: 'irl_contact', description: 'The playlist URL', type: ApplicationCommandOptionType.String, required: false}
        ]},
    ]
}