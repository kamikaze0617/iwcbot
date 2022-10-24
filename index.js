const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token, wicChannelId } = require('./config.json')
const cron = require('cron');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

// Below cron job will display an update every day at 6:00 am
let dailyIWC = new cron.CronJob('00 06 * * *', () => {
	console.log(`Daily time until winter update initiated`)

	const channel = client.channels.cache.get(wicChannelId);
	console.log(`Got channel`)

	const dayjs = require('dayjs');
        const now = dayjs();
        const ws = new Date(2022, 11, 22);
        const winterSolstice = dayjs(ws);
        var duration = winterSolstice.diff(now, 'days')

        const eow = new Date(2023, 2, 20);
        const endOfWinter = dayjs(eow);
        var daysOfWinter = endOfWinter.diff(now, 'days')

	try {
		if (duration > 0) {
		    channel.send('~ ❄️𝔽𝕖𝕝𝕝𝕒𝕫 𝔻𝕒𝕚𝕝𝕪 𝕀𝕞𝕡𝕖𝕟𝕕𝕚𝕟𝕘 𝕎𝕚𝕟𝕥𝕖𝕣 𝕌𝕡𝕕𝕒𝕥𝕖❄️ ~ \nWinter is coming: ' + duration + ' days remain.');
        } else {
            channel.send("NO. Winter **FUCKING CAME** and is here. So now **SPRING IS COMING:** " + daysOfWinter + ' days remain.');
        }
		console.log(`Sent daily time until winter info`)
	} catch (error) {
		console.error(error);
		channel.send({ content: 'There was an error while executing this command!', ephemeral: true });
	}
})

dailyIWC.start();

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token)