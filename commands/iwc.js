const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('iwc')
		.setDescription('Replies with is winter coming info'),
	async execute(interaction) {
		await interaction.reply('WIP');
	},
};
