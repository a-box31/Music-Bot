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

        // Error checking
        if (!genre) { return interaction.reply("Please specify a genre"); }
        if (!contact) { contact = {value: "N/A"}; }

        // Get the correct queue and add the ticket to it
        bot.lists.get(name).set(String(bot.currentTickets.get(name)), new Map([["genre", contact.value], ["discord", interaction.user.id], ["irl_contact", genre.value]]));

        // Increment that queue's count
        bot.currentTickets.set(name, bot.currentTickets.get(name) + 1);

        
        interaction.reply({content: "Ticket added to queue", ephemeral: true});
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