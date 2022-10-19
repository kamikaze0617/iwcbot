const { SlashCommandBuilder } = require('discord.js');
const { 
    createAudioPlayer,
	createAudioResource,
    joinVoiceChannel } = require('@discordjs/voice');
var { Downloader } = require("../downloader");
var dl = new Downloader();


module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play audio from requested YouTube link'),
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

        
        dl.getMP3({videoId: "m6sjfw37xo8", name: "currentTrack.mp3"}, function(err,res){
            if(err)
                throw err;
            else{
                console.log("Song was downloaded");
            }
        });

        dl.YD.on("finished", function(err, data) {
            console.log(JSON.stringify(data));

            player.play(resource); 
        })

        const resource = createAudioResource('./resources/songs/currentTrack.mp3');

        const subscription = connection.subscribe(player);

        // subscription could be undefined if the connection is destroyed!
        if (subscription) {
            // Unsubscribe after 5 seconds (stop playing audio on the voice connection)
            //setTimeout(() => subscription.unsubscribe(), 5_000);

            // Destroy con after 200 seconds
            setTimeout(() => connection.destroy(), 200_000);
        }

        
        interaction.reply('Playing song');
	},
};
