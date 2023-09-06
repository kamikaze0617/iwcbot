const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('iwc')
		.setDescription('Replies with is winter coming info'),
        
	async execute(interaction) {
        const dayjs = require('dayjs');
        const now = dayjs();
        const ws = new Date(2023, 12, 21);
        const winterSolstice = dayjs(ws);
        var duration = winterSolstice.diff(now, 'days')

        const eow = new Date(2024, 3, 19);
        const endOfWinter = dayjs(eow);
        var daysOfWinter = endOfWinter.diff(now, 'days')

        if (duration > 0) {
		    await interaction.reply('YES. Winter is coming: ' + duration + ' days remain.');
        } else {
            await interaction.reply("NO. Winter **FUCKING CAME** and is here. So now **SPRING IS COMING:** " + (daysOfWinter + 1) + ' days remain.');
        }
	},
};
