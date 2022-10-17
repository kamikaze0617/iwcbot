const { SlashCommandBuilder } = require('discord.js');
const { 
    createAudioPlayer,
	createAudioResource,
    joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('randomsound')
		.setDescription('Joins channel and plays random epic sound'),
	async execute(interaction) {          
        const player = createAudioPlayer();

        if (interaction.member.voice.channel == null) {
            interaction.reply("Join a voice channel you scrungoloid");
        }

        const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.channel.guild.id,
            adapterCreator: interaction.channel.guild.voiceAdapterCreator,
        });

        var i = Math.floor((Math.random() * 10) + 2);
        const resource = createAudioResource(`./resources/sounds/randomsound/IWCBot_${i}.ogg`);


        const subscription = connection.subscribe(player);

        // subscription could be undefined if the connection is destroyed!
        if (subscription) {
            // Unsubscribe after 5 seconds (stop playing audio on the voice connection)
            //setTimeout(() => subscription.unsubscribe(), 5_000);

            // Destroy con after 18 seconds
            setTimeout(() => connection.destroy(), 5_000);
        }
        player.play(resource); 

        

        interaction.reply('epic random noise requested...');
	},
};
