const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('swagmessiah')
		.setDescription('Replies with shitpost'),
	async execute(interaction) {
		await interaction.reply('Legalize Nuclear Bombs ☢️ Swag Messiah 🐝 Bees Make Honey 💯 Real Trap Shit');
	},
};
