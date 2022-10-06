const { SlashCommandBuilder } = require('discord.js');
const { 
    createAudioPlayer,
	createAudioResource,
    joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('swagmessiah')
		.setDescription('Replies with shitpost'),
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

        
        const resource = createAudioResource('./resources/IWCBot_Shitpost_OGG.ogg', {
            metadata: {
                title: 'A CERTIFIED HOOD CLASSIC!!! LEGALIZE NUCLEAR BOMBS',
            },
        });

        const subscription = connection.subscribe(player);

        // subscription could be undefined if the connection is destroyed!
        if (subscription) {
            // Unsubscribe after 5 seconds (stop playing audio on the voice connection)
            //setTimeout(() => subscription.unsubscribe(), 5_000);

            // Destroy con after 18 seconds
            setTimeout(() => connection.destroy(), 18_000);
        }
        player.play(resource); 

        

        interaction.reply('Legalize Nuclear Bombs ☢️ Swag Messiah 🐝 Bees Make Honey 💯 Real Trap Shit');
	},
};
