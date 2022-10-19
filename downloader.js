const { ffmpegPath } = require("./config.json");
var YoutubeMp3Downloader = require("youtube-mp3-downloader");

var Downloader = function() {

    var self = this;
    
    
    //Configure YoutubeMp3Downloader with your settings
    self.YD = new YoutubeMp3Downloader({
        "ffmpegPath": `${ffmpegPath}`,        // FFmpeg binary location  
        "outputPath": "./resources/songs/",    // Output file location (default: the home directory)
        "youtubeVideoQuality": "highestaudio",  // Desired video quality (default: highestaudio)
        "queueParallelism": 2,                  // Download parallelism (default: 1)
        "progressTimeout": 2000                 // Interval in ms for the progress reports (default: 1000)
    });

    self.callbacks = {
        videoId: null,
        name: null,
    };

    self.YD.on("finished", function(error, data) {
        if (self.callbacks.videoId) {
            self.callbacks.videoId(error, data);
        } else {
            console.log("Error: No callback for videoId!");
        }
    
    });

    self.YD.on("error", function(error, data) {
    
        console.log(error);
    
        if (self.callbacks.videoId) {
            self.callbacks.videoId(error);
        } else {
            console.log("Error: No callback for videoId!");
        }
    
    });

};

Downloader.prototype.getMP3 = function(track, callback){
    var self = this;
    
    // Register callback
    self.callbacks.videoId = callback;
    // Trigger download
    self.YD.download(track.videoId, track.name);
};

module.exports = { Downloader };