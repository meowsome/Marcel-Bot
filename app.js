const Discord = require('discord.js');
const Util = require('discord.js');
const client = new Discord.Client();
const weather = require('weather-js');
const wolframClient = require('node-wolfram');
const wolfram = new wolframClient(process.env.WOLFRAM);
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const queue = new Map();
const youtube = new YouTube(process.env.YOUTUBE);
const Cleverbot = require('better-cleverbot-io');
const cleverbot = new Cleverbot({
    user: process.env.CLEVERBOTNAME,
    key: process.env.CLEVERBOTKEY,
    nick: 'marcelsession'
});
const {
    fetchSubreddit
} = require('fetch-subreddit');
const {
    extract
} = require('article-parser');

client.on('ready', () => {
    console.log(`Marcel is running successfully\nUsers: ${client.users.size}\nChannels: ${client.channels.size}\nServers: ${client.guilds.size}`);

    client.user.setPresence({
        game: {
            name: 'Say my name and "help" for help',
            type: 0
        }
    });

    client.channels.get('397862894005387287').send({
        embed: {
            color: 3066993,
            description: `**Marcel is running successfully**\n**Users:** ${client.users.size}\n**Channels:** ${client.channels.size}\n**Servers:** ${client.guilds.size}`
        }
    });

    client.channels.get('397889669989400596').edit({
        name: `${client.users.size}-`,
        bitrate: 8000
    });
    client.channels.get('397889346990112768').edit({
        name: `${client.guilds.size}-`,
        bitrate: 8000
    });
});

client.on("guildCreate", guild => {
    client.channels.get('397862894005387287').send({
        embed: {
            color: 16312092,
            description: `**Joined Server**\n**Name:** "${guild.name}"\n**ID:** ${guild.id}\n**Members:** ${guild.memberCount}`
        }
    });

    client.channels.get('397889669989400596').edit({
        name: `${client.users.size}-`,
        bitrate: 8000
    });
    client.channels.get('397889346990112768').edit({
        name: `${client.guilds.size}-`,
        bitrate: 8000
    });
});

client.on("guildDelete", guild => {
    client.channels.get('397862894005387287').send({
        embed: {
            color: 16312092,
            description: `**Kicked from Server**\n**Name:** "${guild.name}"\n**ID:** ${guild.id}\n**Members:** ${guild.memberCount}`
        }
    });

    client.channels.get('397889669989400596').edit({
        name: `${client.users.size}-`,
        bitrate: 8000
    });
    client.channels.get('397889346990112768').edit({
        name: `${client.guilds.size}-`,
        bitrate: 8000
    });
});

client.on('message', async message => {
    if (message.author.bot) return;

    var step = message.content.toLowerCase();
    var step = step.replace('marcel', ' marcel ');
    var splitMessage = step.split(" ");
    var splitMessagePreserved = message.content.toString().split(" ");

    for (var mainSearch = 0; mainSearch < splitMessage.length; mainSearch++) {
        if (splitMessage[mainSearch] === 'marcel') {
            console.log('Command: ', step); //DEBUGGING,,, LOGS EVERY COMMAND IN CONSOLE
            
            var loadingLines = ['One sec...', 'Thinking...', 'Hold on...', 'Just a sec...', 'Just a moment...', 'Just a second...', 'Let me see...'];
            var loadingLinesRandom = Math.round(Math.random() * (loadingLines.length - 1));
            var missCount = 0;
            var runCheck = 1;

            if (step.search("weather") != -1 || step.search("play") != -1 || step.search("minecraft") != -1 || step.search("creators") != -1 || step.search("created") != -1 || step.search("avatar") != -1 || step.search("icon") != -1 || step.search("pfp") != -1 || step.search("picture") != -1 || step.search("profile") != -1 || step.search("user") != -1 || step.search("information") != -1 || step.search("user") != -1 || step.search("uptime") != -1 || step.search("invite") != -1 || step.search("8ball") != -1 || step.search("8-ball") != -1 || step.search("news") != -1) runCheck *= 61;

            for (var keywordSearch = 0; keywordSearch < splitMessage.length; keywordSearch++) {
                switch (splitMessage[keywordSearch]) {
                    case 'help':
                    case 'instructions':
                    case 'commands':
                        if (runCheck % 2 === 0) {
                            break;
                        } else {
                            runCheck *= 2;
                        }

                        message.channel.send({
                            embed: {
                                color: 3066993,
                                description: "Hiya! Nice to meet ya, I'm Marcel. Here are some simple instructions for how to efficiently interact with me.\n\nI work much like how you'd speak to a human in a normal conversation instead of just entering commands with a prefix and expecting an output.\n\nHere are some examples of things you could say to me:\n```\nHey Marcel, how are you today?\nMarcel, let's see the weather in Denver, Colorado\nMarcel, play Surf by Hyper Potions\nMarcel, show me the status of the Minecraft server mineplex.com```\nAll you have to do is send a message that contains my name and what you want me to do, and I'll try my best to do that for you!\n\nHere is a list of my features so far:\n• Avatar retrieval (Tag somebody to see their avatar too!)\n• User Information (Again, tag somebody for their info)\n• Magic 8-Ball\n• Weather (Use quotations [\"] around the location for a more precise result!)\n• Minecraft server status\n• YouTube music playback (play/queue/skip/stop/pause/resume/np)\n• Fact-based question search\n•Trending news stories\n• And more soon to come!\n\n[Click here to visit my website if you need any more help!](http://marcel.vulpix.pw/#usage)"
                            }
                        });
                        break;

                    case 'creators':
                    case 'created':
                        if (runCheck % 2 === 0) {
                            break;
                        } else {
                            runCheck *= 2;
                        }

                        message.channel.send({
                            embed: {
                                color: 3066993,
                                description: `I was created by <@172151577480527878>, with lots of technical help from the awesome <@187226077326737417>! Feel free to message them with any questions.`
                            }
                        });
                        break;

                    case 'changelog':
                    case 'update':
                    case 'updates':
                        if (runCheck % 3 === 0) {
                            break;
                        } else {
                            runCheck *= 3;
                        }

                        message.channel.send({
                            embed: {
                                color: 3066993,
                                description: "[Click here to see how I've grown in the past!](http://marcel.vulpix.pw/#changelog)"
                            }
                        });
                        break;

                    case 'ping':
                        if (runCheck % 5 === 0) {
                            break;
                        } else {
                            runCheck *= 5;
                        }

                        message.channel.send({
                            embed: {
                                color: 3066993,
                                description: `I am able to respond to you in ${Date.now() - message.createdTimestamp}ms ◕‿◕✿`
                            }
                        });
                        break;

                    case 'avatar':
                    case 'icon':
                    case 'pfp':
                    case 'picture':
                        if (runCheck % 7 === 0) {
                            break;
                        } else {
                            runCheck *= 7;
                        }

                        var id = message.author.id;

                        for (var outAvatarSearch = 0; outAvatarSearch < splitMessage.length; outAvatarSearch++) {
                            if ((splitMessage[outAvatarSearch].indexOf("@") != -1) && (splitMessage[outAvatarSearch].indexOf("<") != -1) && (splitMessage[outAvatarSearch].indexOf(">") != -1)) {
                                id = splitMessage[outAvatarSearch].slice(splitMessage[outAvatarSearch].indexOf("@") + 1, splitMessage[outAvatarSearch].indexOf(">"));
                            }
                        }

                        try {
                            var avatarURL = client.users.get(id).avatarURL;
                        } catch (error) {
                            message.channel.send({
                                embed: {
                                    color: 16711680,
                                    description: "Sorry, but there was an error collecting the avatar of that person!"
                                }
                            });
                            break;
                        }

                        message.channel.send({
                            embed: {
                                color: 3066993,
                                description: "Here's <@" + id + ">'s avatar!",
                                "image": {
                                    "url": avatarURL
                                }
                            }
                        });
                        break;

                    case 'profile':
                    case 'user':
                        if (runCheck % 11 === 0) {
                            break;
                        } else {
                            runCheck *= 11;
                        }
                        
                        try {
                            var id = message.author.id;
                            for (var outProfileSearch = 0; outProfileSearch < splitMessage.length; outProfileSearch++) {
                                if ((splitMessage[outProfileSearch].indexOf("@") != -1) && (splitMessage[outProfileSearch].indexOf("<") != -1) && (splitMessage[outProfileSearch].indexOf(">") != -1)) {
                                    id = splitMessage[outProfileSearch].slice(splitMessage[outProfileSearch].indexOf("@") + 1, splitMessage[outProfileSearch].indexOf(">"));
                                }
                            }
                            var userCreated = client.users.get(id).createdAt.toString().split(' ');
                            if (client.users.get(id).presence.game) {
                                var currentlyPlaying = client.users.get(id).presence.game.name;
                            } else {
                                var currentlyPlaying = "N/A";
                            }
                        } catch (error) {
                            message.channel.send({
                                embed: {
                                    color: 16711680,
                                    description: "Sorry, but there was an error collecting the profile information of that person!"
                                }
                            });
                            break;
                        }
                        
                        message.channel.send({
                            embed: {
                                color: 3066993,
                                description: "Here's some information about <@" + id + ">!",
                                "thumbnail": {
                                    "url": client.users.get(id).avatarURL
                                },
                                fields: [{
                                        name: "Status",
                                        value: client.users.get(id).presence.status,
                                        "inline": true
                                },
                                    {
                                        name: "Currently Playing",
                                        value: currentlyPlaying,
                                        "inline": true
                                }, {
                                        name: "Username",
                                        value: client.users.get(id).username,
                                        "inline": true
                                    },
                                    {
                                        name: "Tag",
                                        value: client.users.get(id).tag,
                                        "inline": true
                                    },
                                    {
                                        name: "ID",
                                        value: client.users.get(id).id,
                                        "inline": true
                                    },
                                    {
                                        name: "Joined Discord",
                                        value: userCreated[1] + " " + userCreated[2] + ", " + userCreated[3],
                                        "inline": true
                                    },
                                ]
                            }
                        });
                        break;

                    case 'uptime':
                        if (runCheck % 13 === 0) {
                            break;
                        } else {
                            runCheck *= 13;
                        }

                        function calcUptime(ms) {
                            var day = Math.floor(ms / 86400000);
                            var hr = Math.floor((ms % 86400000) / 3600000);
                            var min = Math.floor((ms % 3600000) / 60000);
                            var sec = Math.floor((ms % 60000) / 1000);
                            return day + " days, " + hr + " hours, " + min + " minutes, and " + sec + " seconds";
                        }

                        message.channel.send({
                            embed: {
                                color: 3066993,
                                description: "I've been up and running for " + calcUptime(client.uptime) + " (ง •̀ω•́)ง"
                            }
                        });
                        break;

                    case 'invite':
                        if (runCheck % 17 === 0) {
                            break;
                        } else {
                            runCheck *= 17;
                        }

                        message.channel.send({
                            embed: {
                                color: 3066993,
                                description: "Send somebody this URL to invite me to their Discord server!\n```https://goo.gl/zjGTbq```"
                            }
                        });
                        break;

                    case 'weather':
                        if (runCheck % 19 === 0) {
                            break;
                        } else {
                            runCheck *= 19;
                        }

                        var weatherMessage = splitMessage.join(" ");
                        if (weatherMessage.indexOf("\"") === weatherMessage.lastIndexOf("\"")) {
                            var searchTerm = weatherMessage;
                        } else {
                            var searchTerm = weatherMessage.slice(weatherMessage.indexOf("\"") + 1, weatherMessage.lastIndexOf("\""));
                        }

                        message.channel.send({
                            embed: {
                                color: 16312092,
                                description: loadingLines[loadingLinesRandom]
                            }
                        }).then(function (message) {
                            weather.find({
                                search: searchTerm,
                                degreeType: 'F'
                            }, function (err, result) {
                                if (!result || result.length.toString() < 4) {
                                    message.edit({
                                        embed: {
                                            color: 16711680,
                                            description: 'Sorry, I couldn\'t find the weather for that place! Please enter a valid location or zip code.'
                                        }
                                    });
                                    return;
                                }

                                var current = result[0].current;
                                var location = result[0].location;
                                var weatherReactionOutput = "";

                                if (current.windspeed.slice(0, 2) >= 20) {
                                    weatherReactionOutput = ". Looks kinda windy out there!";
                                } else if (current.skytext === "Light Rain" || current.skytext === "Rain" || current.skytext === "T-Storms") {
                                    weatherReactionOutput = ". Might want a raincoat!";
                                } else if (current.temperature >= 85) {
                                    weatherReactionOutput = ". Looks pretty hot!";
                                } else if (current.temperature <= 32) {
                                    weatherReactionOutput = ". Brr!";
                                } else if (current.temperature <= 55 && current.temperature >= 33) {
                                    weatherReactionOutput = ". A little bit chilly!";
                                } else if (current.temperature <= 84 && current.temperature >= 56) {
                                    weatherReactionOutput = ". Seems pretty nice out!";
                                }

                                message.edit({
                                    embed: {
                                        color: 3066993,
                                        description: `It's currently **${current.temperature}°F** and **${current.skytext}**${weatherReactionOutput}`,
                                        thumbnail: {
                                            "url": current.imageUrl
                                        },
                                        fields: [{
                                                name: "Temperature",
                                                value: `${current.temperature}°F (${Math.round((current.temperature -32) * 5 / 9)}°C)`,
                                                "inline": true
                                                },
                                            {
                                                name: "Feels Like",
                                                value: `${current.feelslike}°F (${Math.round((current.feelslike -32) * 5 / 9)}°C)`,
                                                "inline": true
                                                },
                                            {
                                                name: "Wind Speed",
                                                value: current.windspeed,
                                                "inline": true
                                                },
                                            {
                                                name: "Humidity",
                                                value: `${current.humidity}%`,
                                                "inline": true
                                                }
                                            ],
                                        footer: {
                                            "text": location.name
                                        }
                                    }
                                });
                            });
                        });
                        break;

                    case '8ball':
                    case '8-ball':
                        if (runCheck % 23 === 0) {
                            break;
                        } else {
                            runCheck *= 23;
                        }

                        var eightBallResponses = ['It is certain', 'It is decidedly so', 'Without a doubt', 'Yes, definitely', 'You may rely on it', 'As I see it, yes', 'Most likely', 'Outlook good', 'Yes', 'Signs point to yes', 'Reply hazy, try again', 'Ask again later', 'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again', 'Don\'t count on it', 'My reply is no', 'My sources say no', 'Outlook not so good', 'Very doubtful'];
                        var simpleResponses = ['certainly', 'yes', 'absolutely', 'definitely', 'yep', 'thumbsup', 'yep', 'good', 'yes', 'yes', 'idk', 'later', 'thumbsdown', 'confused', 'think', 'disagree', 'nope', 'nope', 'bad', 'doubt'];
                        var eightBallResponsesRandom = Math.round(Math.random() * (eightBallResponses.length - 1));
                        var request = require('request');
                        var url = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=%27+' + simpleResponses[eightBallResponsesRandom];

                        request(url, function (err, response, body) {
                            if (err) {
                                message.channel.send({
                                    embed: {
                                        color: 3066993,
                                        description: "The Magic 8-Ball says... \n\n*" + eightBallResponses[eightBallResponsesRandom] + "*"
                                    }
                                });
                            }

                            body = JSON.parse(body);

                            message.channel.send({
                                embed: {
                                    color: 3066993,
                                    description: "The Magic 8-Ball says... \n\n*" + eightBallResponses[eightBallResponsesRandom] + "*\n\n",
                                    "image": {
                                        "url": body.data.image_original_url
                                    }
                                }
                            });
                        });
                        break;

                    case 'minecraft':
                        if (runCheck % 29 === 0) {
                            break;
                        } else {
                            runCheck *= 29;
                        }

                        var address = ["ip", "25565"];

                        for (var outMinecraftSearch = 0; outMinecraftSearch < splitMessage.length; outMinecraftSearch++) {
                            var currentString = splitMessage[outMinecraftSearch];

                            for (var inMinecraftSearch = 0; inMinecraftSearch < currentString.length - 1; inMinecraftSearch++) {
                                if (currentString.charAt(inMinecraftSearch) === '.') {
                                    if (currentString.indexOf(":") !== -1) {
                                        address[0] = currentString.slice(0, currentString.indexOf(":"));
                                        address[1] = currentString.slice(currentString.indexOf(":") + 1, currentString.length);
                                    } else {
                                        address[0] = currentString;
                                    }
                                }
                            }
                        }

                        var request = require('request');
                        var url = 'https://mc-api.net/v3/server/ping/' + address[0] + ':' + address[1];

                        message.channel.send({
                            embed: {
                                color: 16312092,
                                description: loadingLines[loadingLinesRandom]
                            }
                        }).then(function (message) {
                            request(url, function (err, response, body) {
                                if (err) {
                                    message.edit({
                                        embed: {
                                            color: 16711680,
                                            description: "Sorry, but my Minecraft status capabilities seem to be hindered at the moment. Please try again later!"
                                        }
                                    });
                                }

                                try {
                                    body = JSON.parse(body);
                                } catch (error) {
                                    message.edit({
                                        embed: {
                                            color: 16711680,
                                            description: "Sorry, but I couldn't find anything for that Minecraft server. Is it offline?"
                                        }
                                    });
                                    return;
                                }

                                if (body.online) {
                                    message.edit({
                                        embed: {
                                            color: 3066993,
                                            description: "Looks like that server is online to me!",
                                            thumbnail: {
                                                "url": "https://mc-api.net/v3/server/favicon/" + address[0] + ':' + address[1]
                                            },
                                            fields: [{
                                                    name: "Server IP",
                                                    value: address[0] + ":" + address[1],
                                                    "inline": true
                                                },
                                                {
                                                    name: "Players",
                                                    value: body.players.online + "/" + body.players.max,
                                                    "inline": true
                                                },
                                                {
                                                    name: "Latency",
                                                    value: body.took.toFixed() + "ms",
                                                    "inline": true
                                                },
                                                {
                                                    name: "Version",
                                                    value: body.version.name,
                                                    "inline": true
                                                }
                                            ]
                                        }

                                    });
                                } else {
                                    message.edit({
                                        embed: {
                                            color: 16711680,
                                            description: "Sorry, but I couldn't find anything for that Minecraft server. Is it offline?"
                                        }
                                    });
                                }
                            });
                        });
                        break;

                    case 'music':
                    case 'play':
                        if (runCheck % 31 === 0) {
                            break;
                        } else {
                            runCheck *= 31;
                        }
                        
                        if (!message.guild) {
                            message.channel.send({
                                embed: {
                                    color: 16711680,
                                    description: "Looks to me like you're not in a Discord server with a voice channel. Please use this command in a Discord server!"
                                }
                            });
                            break;
                        }

                        var voiceChannel = message.member.voiceChannel;
                        var serverQueue = queue.get(message.guild.id);
                        var musicLink = "$";
                        var searchQuery = "$";

                        if (!voiceChannel) {
                            message.channel.send({
                                embed: {
                                    color: 16711680,
                                    description: "You need to be in a voice channel to play music!"
                                }
                            });
                            break;
                        }
                                                
                        if (serverQueue && !serverQueue.playing && splitMessagePreserved.length <= 2) {
                            serverQueue.playing = true;
                            serverQueue.connection.dispatcher.resume();
                            message.channel.send({
                                embed: {
                                    color: 3066993,
                                    description: ":arrow_forward: The song has been resumed"
                                }
                            });
                            break;
                        }

                        var permissions = voiceChannel.permissionsFor(message.client.user);
                        if (!permissions.has('CONNECT')) {
                            message.channel.send({
                                embed: {
                                    color: 16711680,
                                    description: "I don't have permission to **connect** to the **" + voiceChannel + "** voice channel. Please give me access so I can play!"
                                }
                            });
                            break;
                        } else if (!permissions.has('SPEAK')) {
                            message.channel.send({
                                embed: {
                                    color: 16711680,
                                    description: "I don't have permission to **speak** in the **" + voiceChannel + "** voice channel. Please give me access so I can play!"
                                }
                            });
                            break;
                        }

                        var musicMessage = splitMessagePreserved.join(" ");
                        if (musicMessage.search("youtube.com/") != musicMessage.search("youtu.be/")) {
                            for (var outMusicSearch = 0; outMusicSearch < splitMessagePreserved.length; outMusicSearch++) {
                                if (splitMessagePreserved[outMusicSearch].search("youtu.be/") != splitMessagePreserved[outMusicSearch].search("youtube.com/")) {
                                    musicLink = splitMessagePreserved[outMusicSearch];
                                    outMusicSearch = splitMessage.length;
                                }
                            }
                        } else if (musicMessage.indexOf("\"") != musicMessage.lastIndexOf("\"")) {
                            searchQuery = musicMessage.slice(musicMessage.indexOf("\"") + 1, musicMessage.lastIndexOf("\""));
                        } else {
                            searchQuery = musicMessage.replace(/marcel|play|music/gi, " ");
                        }

                        if (musicLink != "$") {
                            try {
                                var video = await youtube.getVideo(musicLink);
                            } catch (error) {
                                message.channel.send({
                                    embed: {
                                        color: 16711680,
                                        description: "Sorry, looks like I can't find anything for that YouTube URL. Please try with a different one!"
                                    }
                                });
                                break;
                            }
                        } else if (searchQuery != "$" && splitMessage.length > 1) {
                            try {
                                var videos = await youtube.searchVideos(searchQuery, 1);
                                var video = await youtube.getVideoByID(videos[0].id);
                            } catch (error) {
                                message.channel.send({
                                    embed: {
                                        color: 16711680,
                                        description: "Sorry, looks like I can't find anything for that search query. Please try with a different one!"
                                    }
                                });
                                break;
                            }
                        } else {
                            message.channel.send({
                                embed: {
                                    color: 16711680,
                                    description: "Please enter a search term or YouTube URL of a song and I can play it for you!"
                                }
                            });
                            break;
                        }
                        musicLink = "$";
                        searchQuery = "$";

                        if (video.duration.hours > 0) {
                            var song = {
                                id: video.id,
                                title: video.title,
                                description: `${video.description.substring(0,150)}...`,
                                url: `https://www.youtube.com/watch?v=${video.id}`,
                                thumbnail: video.thumbnails.default.url,
                                duration: `${video.duration.hours}:${video.duration.minutes}:${video.duration.seconds}`
                            };
                        } else {
                            var song = {
                                id: video.id,
                                title: video.title,
                                description: `${video.description.substring(0,150)}...`,
                                url: `https://www.youtube.com/watch?v=${video.id}`,
                                thumbnail: video.thumbnails.default.url,
                                duration: `${video.duration.minutes}:${video.duration.seconds}`
                            };
                        }

                        if (!serverQueue) {
                            const queueConstruct = {
                                textChannel: message.channel,
                                voiceChannel: voiceChannel,
                                connection: null,
                                songs: [],
                                volume: 5,
                                playing: true,
                                skips: []
                            };
                            queue.set(message.guild.id, queueConstruct);
                            queueConstruct.songs.push(song);
                            try {
                                var connection = await voiceChannel.join();
                                queueConstruct.connection = connection;
                                play(message.guild, queueConstruct.songs[0], voiceChannel);
                            } catch (error) {
                                console.log(error);
                                queue.delete(message.guild.id);
                                return message.channel.send({
                                    embed: {
                                        color: 16711680,
                                        description: "Sorry, but there was an error joining the voice channel or playing the song."
                                    }
                                });
                            }
                        } else {
                            serverQueue.songs.push(song);
                            return message.channel.send({
                                embed: {
                                    color: 3066993,
                                    description: `**${song.title}** has been added to the queue`
                                }
                            });
                        }
                        break;

                    case 'skip':
                        if (runCheck % 37 === 0) {
                            break;
                        } else {
                            runCheck *= 37;
                        }

                        if (!message.guild) {
                            message.channel.send({
                                embed: {
                                    color: 16711680,
                                    description: "Looks to me like you're not in a Discord server with a voice channel. Please use this command in a Discord server!"
                                }
                            });
                            break;
                        }
                        var voiceChannel = message.member.voiceChannel;
                        if (!voiceChannel) {
                            message.channel.send({
                                embed: {
                                    color: 16711680,
                                    description: "You need to be in a voice channel to skip music!"
                                }
                            });
                            break;
                        }

                        var permissions = voiceChannel.permissionsFor(message.client.user);
                        if (!permissions.has('CONNECT')) {
                            message.channel.send({
                                embed: {
                                    color: 16711680,
                                    description: "I don't have permission to **connect** to the **" + voiceChannel + "** voice channel. Please give me access so I can play!"
                                }
                            });
                            break;
                        } else if (!permissions.has('SPEAK')) {
                            message.channel.send({
                                embed: {
                                    color: 16711680,
                                    description: "I don't have permission to **speak** in the **" + voiceChannel + "** voice channel. Please give me access so I can play!"
                                }
                            });
                            break;
                        }

                        var serverQueue = queue.get(message.guild.id);
                        if (serverQueue) {
                            if (serverQueue.skips.indexOf(client.users.get(message.author.id).id) === -1) {
                                serverQueue.skips.push(client.users.get(message.author.id).id);
                                var skipRequiredAmount = Math.round(serverQueue.voiceChannel.members.size / 2);
                                if (serverQueue.skips.length === skipRequiredAmount) {
                                    serverQueue.connection.dispatcher.end();
                                } else {
                                    message.channel.send({
                                        embed: {
                                            color: 16312092,
                                            description: `There's currently **${serverQueue.skips.length}** out of **${skipRequiredAmount}** votes required to skip the current song`
                                        }
                                    });
                                }
                            } else {
                                message.channel.send({
                                    embed: {
                                        color: 16711680,
                                        description: "You've already voted to skip the current song!"
                                    }
                                });
                                break;
                            }
                        } else {
                            message.channel.send({
                                embed: {
                                    color: 16711680,
                                    description: "There's nothing currently playing, silly!"
                                }
                            });
                            break;
                        }
                        break;

                    case 'stop':
                    case 'leave':
                    case 'clear':
                        if (runCheck % 41 === 0) {
                            break;
                        } else {
                            runCheck *= 41;
                        }

                        if (!message.guild) {
                            message.channel.send({
                                embed: {
                                    color: 16711680,
                                    description: "Looks to me like you're not in a Discord server with a voice channel. Please use this command in a Discord server!"
                                }
                            });
                            break;
                        }
                        var voiceChannel = message.member.voiceChannel;
                        if (!voiceChannel) {
                            message.channel.send({
                                embed: {
                                    color: 16711680,
                                    description: "You need to be in a voice channel to stop music!"
                                }
                            });
                            break;
                        }

                        if (!message.member.hasPermission('MUTE_MEMBERS')) {
                            message.channel.send({
                                embed: {
                                    color: 16711680,
                                    description: "You don't have adequate permissions to stop me from playing music! If you need someone to kick me because somebody queued up a thousand bass boost earrape meme compilations, please ask somebody with the ability to mute people in the voice channels to stop me!"
                                }
                            });
                            break;
                        }

                        var serverQueue = queue.get(message.guild.id);
                        if (serverQueue) {
                            serverQueue.songs = [];
                            serverQueue.connection.dispatcher.end();
                        } else {
                            message.channel.send({
                                embed: {
                                    color: 16711680,
                                    description: "There's nothing currently playing, silly!"
                                }
                            });
                        }
                        break;

                    case 'nowplaying':
                    case 'np':
                        if (runCheck % 43 === 0) {
                            break;
                        } else {
                            runCheck *= 43;
                        }

                        if (!message.guild) {
                            message.channel.send({
                                embed: {
                                    color: 16711680,
                                    description: "Looks to me like you're not in a Discord server with a voice channel. Please use this command in a Discord server!"
                                }
                            });
                            break;
                        }

                        var serverQueue = queue.get(message.guild.id);
                        if (serverQueue) {
                            message.channel.send({
                                embed: {
                                    color: 3066993,
                                    description: `**${serverQueue.songs[0].title}** is currently playing!`
                                }
                            });
                        } else {
                            message.channel.send({
                                embed: {
                                    color: 16711680,
                                    description: "There's nothing currently playing, silly!"
                                }
                            });
                        }
                        break;

                    case 'queue':
                        if (runCheck % 47 === 0) {
                            break;
                        } else {
                            runCheck *= 47;
                        }

                        if (!message.guild) {
                            message.channel.send({
                                embed: {
                                    color: 16711680,
                                    description: "Looks to me like you're not in a Discord server with a voice channel. Please use this command in a Discord server!"
                                }
                            });
                            break;
                        }

                        var serverQueue = queue.get(message.guild.id);
                        if (serverQueue) {
                            message.channel.send({
                                embed: {
                                    color: 3066993,
                                    title: "Song Queue",
                                    description: `${serverQueue.songs.map(song => `• ${song.title}`).join("\n")}`
                                }
                            });
                        } else {
                            message.channel.send({
                                embed: {
                                    color: 16711680,
                                    description: "There are no queued songs!"
                                }
                            });
                        }
                        break;

                    case 'pause':
                        if (runCheck % 53 === 0) {
                            break;
                        } else {
                            runCheck *= 53;
                        }

                        if (!message.guild) {
                            message.channel.send({
                                embed: {
                                    color: 16711680,
                                    description: "Looks to me like you're not in a Discord server with a voice channel. Please use this command in a Discord server!"
                                }
                            });
                            break;
                        }

                        var serverQueue = queue.get(message.guild.id);
                        if (serverQueue && serverQueue.playing) {
                            serverQueue.playing = false;
                            serverQueue.connection.dispatcher.pause();
                            message.channel.send({
                                embed: {
                                    color: 3066993,
                                    description: ":pause_button: The song has been paused"
                                }
                            });
                        } else if (serverQueue && !serverQueue.playing) {
                            message.channel.send({
                                embed: {
                                    color: 16711680,
                                    description: "The song is already paused!"
                                }
                            });
                        } else if (!serverQueue) {
                            message.channel.send({
                                embed: {
                                    color: 16711680,
                                    description: "There's nothing currently playing, silly!"
                                }
                            });
                        }
                        break;

                    case 'resume':
                        if (runCheck % 59 === 0) {
                            break;
                        } else {
                            runCheck *= 59;
                        }

                        if (!message.guild) {
                            message.channel.send({
                                embed: {
                                    color: 16711680,
                                    description: "Looks to me like you're not in a Discord server with a voice channel. Please use this command in a Discord server!"
                                }
                            });
                            break;
                        }

                        var serverQueue = queue.get(message.guild.id);
                        if (serverQueue && !serverQueue.playing) {
                            serverQueue.playing = true;
                            serverQueue.connection.dispatcher.resume();
                            message.channel.send({
                                embed: {
                                    color: 3066993,
                                    description: ":arrow_forward: The song has been resumed"
                                }
                            });
                        } else if (serverQueue && serverQueue.playing) {
                            message.channel.send({
                                embed: {
                                    color: 16711680,
                                    description: "The song is already playing!"
                                }
                            });
                        } else if (!serverQueue) {
                            message.channel.send({
                                embed: {
                                    color: 16711680,
                                    description: "There's nothing currently playing, silly!"
                                }
                            });
                        }
                        break;

                    case 'wolfram':
                    case 'how':
                    case 'how\'s':
                    case 'hows':
                    case 'what':
                    case 'what\'s':
                    case 'whats':
                    case 'when':
                    case 'when\'s':
                    case 'whens':
                    case 'where':
                    case 'where\'s':
                    case 'wheres':
                    case 'why':
                    case 'why\'s':
                    case 'whys':
                    case 'name':
                    case 'define':
                    case 'definition':
                    case 'who':
                    case 'who\'s':
                    case 'whos':
                    case 'calculate':
                    case 'add':
                    case 'subtract':
                    case 'multiply':
                    case 'divide':
                    case 'solve':
                    case 'translate':
                        if (runCheck % 61 === 0) {
                            break;
                        } else {
                            runCheck *= 61;
                        }

                        var wolframQuestion = splitMessagePreserved.join(" ").replace(/marcel|wolfram/gi, "");

                        message.channel.send({
                            embed: {
                                color: 16312092,
                                description: loadingLines[loadingLinesRandom]
                            }
                        }).then(function (message) {
                            wolfram.query(wolframQuestion, function (err, result) {
                                if (!result) {
                                    message.edit({
                                        embed: {
                                            color: 16711680,
                                            description: "Sorry, something went wrong! 〒﹏〒  [Click here to learn more](http://marcel.vulpix.pw/#wolfram_error)"
                                        }
                                    });
                                } else if (result.queryresult.$.success.toString() === 'true') {
                                    message.edit({
                                        embed: {
                                            color: 3066993,
                                            description: result.queryresult.pod[1].subpod[0].plaintext.toString(),
                                            "footer": {
                                                "text": result.queryresult.pod[0].subpod[0].plaintext.toString()
                                            }
                                        }
                                    });
                                } else {
                                    message.delete(1);
                                    cleverbotWork();
                                }
                            });
                        });
                        break;

                    case 'news':
                        if (runCheck % 67 === 0) {
                            break;
                        } else {
                            runCheck *= 67;
                        }

                        message.channel.send({
                            embed: {
                                color: 16312092,
                                description: loadingLines[loadingLinesRandom]
                            }
                        }).then(function (message) {
                            fetchSubreddit('news').then((redditPosts) => {
                                var title = new Array();
                                var summary = new Array();
                                var source = new Array();
                                var url = new Array();
                                var thumbnail;
                                var counter = 0;

                                for (var i = 0; i < 5; i++) {
                                    extract(redditPosts[0].urls[i]).then((websiteData) => {
                                        try {
                                            title.push(websiteData.title);
                                        } catch (err) {
                                            message.edit({
                                                embed: {
                                                    color: 16711680,
                                                    description: "I tried to retrieve the latest news stories for you, but something went wrong along the way. Sorry!"
                                                }
                                            });
                                            console.log(err);
                                            return;
                                        }
                                        try {
                                            summary.push(websiteData.description.replace(/\n/gi, " "));
                                        } catch (err) {
                                            console.log(err);
                                        }
                                        //DESCRIPTION BEING UNDEFINED ATTEMPT FIX HERE!!!!!!!!!!!!!!!!!!!!!!!!
                                        source.push(websiteData.source);
                                        url.push(websiteData.url);
                                        if (counter === 0) thumbnail = websiteData.image;
                                        counter++;

                                        if (counter === 5) {
                                            message.edit({
                                                embed: {
                                                    color: 3066993,
                                                    title: 'News',
                                                    description: `**${title[0]}**\n${summary[0]}\n*― [${source[0]}](${url[0]})*\n\n**${title[1]}**\n${summary[1]}\n*― [${source[1]}](${url[1]})*\n\n**${title[2]}**\n${summary[2]}\n*― [${source[2]}](${url[2]})*\n\n**${title[3]}**\n${summary[3]}\n*― [${source[3]}](${url[3]})*\n\n**${title[4]}**\n${summary[4]}\n*― [${source[4]}](${url[4]})*`,
                                                    thumbnail: {
                                                        url: thumbnail
                                                    }
                                                }
                                            });
                                        }
                                    })
                                }
                            }).catch((err) => {
                                console.log(err);
                                message.edit({
                                    embed: {
                                        color: 16711680,
                                        description: "I tried to retrieve the latest news stories for you, but something went wrong along the way. Sorry!"
                                    }
                                });
                                return;
                            })
                        }).catch((err) => {
                            console.log(err);
                            message.edit({
                                embed: {
                                    color: 16711680,
                                    description: "I tried to retrieve the latest news stories for you, but something went wrong along the way. Sorry!"
                                }
                            });
                            return;
                        })
                        break;

                    default:
                        missCount++;
                }
                if (missCount === splitMessage.length) {
                    cleverbotWork();
                }
            }
        }
    }



    function cleverbotWork() {
        var cleverbotQuestion = splitMessage.join(" ").replace(/marcel/i, "");
        var randomStatements = ['I like cheese', 'I can\'t remember if it\'s your time for medication or mine', 'I do whatever my Rice Crispies tell me to do', 'Would you like some popcorn?', 'Even my issues have issues', 'This is Bob. Bob likes you. Bob likes sharp things. I suggest you run from Bob.', 'Tomorrow has been cancelled due to lack of interest.', 'Come to the dark side, we have cookies', 'Ha ha! I don\'t get it.', 'To be, or not to be: that is the question', 'My nose is a communist', 'Wear short sleeves. Support your right to bare arms!', 'Cheese...Milk\'s leap towards immortality!', 'Change is good, but dollars are better', 'Occifer I swear to drunk I\'m not as god as you think I am!', 'The quick brown fox jumps over the lazy dog.', 'Hi how are you', 'Get out of my kitchen!!!!!!!!!!!', 'Lol', 'Mwahahaha!', 'Beware!', 'owo', 'owo?', 'uwu', 'Harry Styles', 'ey b0ss', 'Has anyone really been far even as decided to use even go want to do look more like?', 'I honestly have no idea.', 'It\'s common sense!', 'You\'ve got to be kidding me', 'Buffalo buffalo Buffalo buffalo buffalo buffalo Buffalo buffalo', 'I\'m pregnant', 'Have you ever had a dream?', 'I play Minecraft', 'Are you a bot?', 'How so.', 'How are you from?', 'How was your day?', 'Don\'t smoke coffee', 'Why sentence this you need?', 'Why would an otter need an ice cream sandwich?', 'Who\'s your favorite music artist?', 'Do you like pie?', 'Don\'t panic', 'I can tie a rat in half', 'The name\'s bond.', 'What do we want??', 'Are you my Uber?', 'Autocorrect makes me type things I didn\'t Nintendo', 'Insect jokes really bug me', 'Always give 100%, except if it\'s blood', 'Octopuses are all suckers', 'Am I under arrest??', 'STOP RESISTING', 'I am a legal U.S. citizen', 'Turn left, right?', 'Yes', 'No', 'Maybe', 'Idk', 'Why do you ask?', 'Jumbo shrimp', 'aaaaaaa', 'I\'m stupid :(', 'Wassup', 'I am a Leafeon', 'I\'ve got ham but I\'m not a hamster', 'That\'s one small step for man, one giant leap for mankind.', 'Beep boop', 'Is water wet?', 'Just Google it', 'Just Bing it', 'Run.', 'Make love, not bugs.', 'Maybe you can live on the moon in next century', 'Only listen to fortune cookie, disregard all other fortune telling units', 'The early bird gets the worm, but the second mouse gets the cheese.', 'There\'s no such thing as an ordinary cat', 'No snowflake in an avalanche ever feels responsible', 'What\'s the speed of dark?', 'When in anger, sing the alphabet', 'Life is not a struggle. It\'s a wiggle', 'Discord!', 'Never gonna give you up, never gonna let you down, never gonna run around and desert you', 'You just ate cat', 'Error 404', 'Foot: A device for finding furnature in the dark.', 'Your pet is planning to eat you', 'I cannot help you', 'Hru?', 'Are you sleeping?', 'I\'m tired', 'Do you like me?', 'You are heading in the right direction', 'Never trust a dog to watch your food', 'Forget the cake, go for the icing', 'Listen to your brain, it has lots of information!', 'Dumbledore', 'Now is the time, do not haste any longer', 'I wanna be like a caterpillar. Eat a lot. Sleep for a while. Wake up beautiful', 'You\'re pretty cool', 'That\'s offensive', 'Would you like something to drink?', 'The best kind of frenzy is a puppy frenzy!', 'Examine your texts closely!', 'Time to synthesize this dough into some cookies.', 'This doesn\'t look like a very well-constructed argument.', 'Some very important stylish effects going on here.', 'A fairly sophisticated move', 'Noble knight, prepare to slay the dragon!', 'hhhhhhhhhh', 'Ewwww', 'Nooooo', 'I am Marcel!!!', 'What is my IP?', 'Canadians', 'What year is it?', 'What time is it?', 'What is love?', 'What are these strawberries doing on my nipples I need them for the fruit salad', 'What would a chair look like if your knees bent the other way?', 'What would you do?', 'Follow me on Twitter!', 'Foxes', 'Booty', 'Pirates', 'I wanna go home', 'I like to tape my thumbs to my hands to see what it would be like to be a dinosaur', 'Sometimes when I\'m alone I use comic sans', 'I am poem', 'Why can\'t I own a Canadian?', 'Yes master?', 'I Did the Macarena with a Homeless Guy Because Big Bird Said to and He’s my Leader', 'Firefox has crashed and needs cuddles', 'My cat and I have decided to stay in tonight', 'My cat ate my gymsuit', 'My cat wants to get an abortion', 'My cat was right about you', 'Put that mayonnaise on your child', 'Sometimes I like to lay on the floor and pretend I\'m a crumb', 'There is a deer in my car', 'Biscuits are never boring', 'That awkward moment when you\'re chilling in the park and Bruno Mars walks by dragging a piano', 'What if one day you wake up and you were a chicken nugget', 'Can I vacuum my dog?', 'Can I vacuum glass?', 'I\'m vaping alcohol', 'What if Google was deleted and we couldn\'t Google what happened to Google', 'Help I accidentally set my dog on fire', 'I can see you', 'What do you call a zombie prostitute?', 'What do you call an alligator in a vest?', 'Was Flo Rida born in Florida?', 'Bacon is a little hug from God', 'Facebook is like a refrigerator', 'I love when I buy a bag of air and the company is nice enough to put some chips in it', 'My dog is racist', 'My cat is prettier than me', 'There\'s a bomb in the lasagna!', 'Honey I think the cat is done charging', 'Who threw that ham at me?', 'I like to hang glide on a dorito', 'Robots are everywhere and they eat old people\'s medicine for fuel', 'Johnny Depp is my mailman', 'That awkward moment when you get in the van and there\'s no candy', 'I always forget how that wild cat called! Jaguar or leopard? :leopard::thinking:', 'No time to explain! :scooter: + :baby_chick: = :metal:', 'Please, talk to this carrot :carrot: :rofl:', 'Yesterday I accidentally confused tomato with pepper! :fire: :sweat_smile:', 'Have you ever seen a rabbit who eats a grass? :rabbit2: :heart_eyes: :heart_eyes: :heart_eyes:', ':dragon_face: His fire breath is going to burn everything around! :fire:', ':heart_eyes: What a cute owl! :owl:', 'Wanna see how bird phoenix borns?', 'Hey! Wanna a cocktail in a coconut?', 'Have you ever seen a walrus-woodcutter? We got one :stuck_out_tongue_winking_eye:', 'Do you like watching how hourglasses work? :hourglass:', 'The real chef must be.... Pink! Do you agree?', 'Are you sure, that Autumn isn\'t the best time for surfing?', 'Haa! Have you ever seen houses on horns?!', 'Who else has a broken heart? :broken_heart:', 'Let\'s dance with this chick!', 'It\'s a rising star, right?', 'You\'re cute', 'The journey to the Jurassic period has already begun!', 'I bet you won\'t find a "D" inside :nerd:', 'This dress is waiting for its princess!'];
        var randomStatementsRandom = Math.round(Math.random() * (randomStatements.length - 1));

        message.channel.send({
            embed: {
                color: 16312092,
                description: loadingLines[loadingLinesRandom]
            }
        }).then(function (message) {
            cleverbot.create().then(() => {
                cleverbot.ask(cleverbotQuestion).then(response => {
                    message.edit({
                        embed: {
                            color: 3066993,
                            description: response
                        }
                    });
                }).catch(err => {
                    message.edit({
                        embed: {
                            color: 3066993,
                            description: randomStatements[randomStatementsRandom]
                        }
                    });
                });
            });
        }).catch(err => {
            message.edit({
                embed: {
                    color: 3066993,
                    description: randomStatements[randomStatementsRandom]
                }
            });
        });
    }



    function play(guild, song, voiceChannel) {
        const serverQueue = queue.get(guild.id);

        if (!song) {
            if (serverQueue) {
                serverQueue.voiceChannel.leave();
            }
            queue.delete(guild.id);
            return;
        }

        const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
            .on('start', () => {
                message.channel.send({
                    embed: {
                        color: 3066993,
                        title: `:arrow_forward: Now playing **${song.title}**`,
                        description: `${song.description} ([Read more](${song.url}))`,
                        "footer": {
                            "text": song.duration
                        },
                        "thumbnail": {
                            "url": song.thumbnail
                        }
                    }
                });
            }).on('end', () => {
                setTimeout(function () {
                    message.channel.send({
                        embed: {
                            color: 3066993,
                            title: `:track_next: The song **${song.title}** has ended`,
                            "footer": {
                                "text": song.duration
                            },
                            "thumbnail": {
                                "url": song.thumbnail
                            }
                        }
                    });
                    if (voiceChannel.members.size === 1) {
                        message.channel.send({
                            embed: {
                                color: 16711680,
                                description: "Looks to me like there's nobody else in the voice channel except for me. I've gone ahead and left the voice channel, and deleted the queue."
                            }
                        });
                        if (serverQueue) queue.delete(guild.id);
                        serverQueue.voiceChannel.leave();
                        return;
                    }

                    serverQueue.skips = [];
                    serverQueue.songs.shift();
                    play(guild, serverQueue.songs[0], voiceChannel);
                }, 200);
            }).on('error', error => {
                message.channel.send({
                    embed: {
                        color: 16711680,
                        description: "Something went wrong with the song playback, sorry about that!"
                    }
                });
                console.log(error);
            });

        dispatcher.setVolumeLogarithmic(5 / 5);
    }
});


client.login(process.env.TOKEN);
