if (!process.env.TOKEN) require('dotenv').config();

const Discord = require('discord.js');
const request = require('request');
const client = new Discord.Client();
const weather = require('weather-js');
const wajs = require('wajs');
const wolfram = new wajs(process.env.WOLFRAM);
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const queue = new Map();
const youtube = new YouTube(process.env.YOUTUBE);
const fetchSubreddit = require('better-redddit');
const { extract } = require('article-parser');

client.on('ready', () => {
    console.log(`Marcel is running successfully\nChannels: ${client.channels.cache.size}\nServers: ${client.guilds.cache.size}`);

    client.user.setActivity('Say my name and "help" for help', {
        type: "PLAYING"
    });

    client.channels.cache.get(process.env.MODCHANNEL).send({
        embed: {
            color: 3066993,
            description: `**Marcel is running successfully**\n**Channels:** ${client.channels.cache.size}\n**Servers:** ${client.guilds.cache.size}`
        }
    });

    refreshWebsiteCounters(client);
});

client.on("guildCreate", guild => {
    client.channels.cache.get(process.env.MODCHANNEL).send({
        embed: {
            color: 16312092,
            description: `**Joined Server**\n**Name:** "${guild.name}"\n**ID:** ${guild.id}\n**Members:** ${guild.memberCount}`
        }
    });

    refreshWebsiteCounters(client);
});

client.on("guildDelete", guild => {
    client.channels.cache.get(process.env.MODCHANNEL).send({
        embed: {
            color: 16312092,
            description: `**Kicked from Server**\n**Name:** "${guild.name}"\n**ID:** ${guild.id}\n**Members:** ${guild.memberCount}`
        }
    });

    refreshWebsiteCounters(client);
});

client.on('error', (error) => {
    console.log("An error has occurred with the client, see below:");
    console.log(error);

    client.channels.cache.get(process.env.MODCHANNEL).send({
        embed: {
            color: 16711680,
            description: "An error has occurred with the client, see console."
        }
    });
});

var randomStatements = ['I like cheese', 'I can\'t remember if it\'s your time for medication or mine', 'I do whatever my Rice Crispies tell me to do', 'Would you like some popcorn?', 'Even my issues have issues', 'Tomorrow has been cancelled due to lack of interest.', 'Come to the dark side, we have cookies', 'Ha ha! I don\'t get it.', 'To be, or not to be: that is the question', 'My nose is a communist', 'Wear short sleeves. Support your right to bare arms!', 'Cheese...Milk\'s leap towards immortality!', 'Change is good, but dollars are better', 'Occifer I swear to drunk I\'m not as god as you think I am!', 'The quick brown fox jumps over the lazy dog.', 'Hi how are you', 'Get out of my kitchen!!!!!!!!!!!', 'Lol', 'Mwahahaha!', 'Beware!', 'owo', 'owo?', 'uwu', 'Harry Styles', 'ey b0ss', 'Has anyone really been far even as decided to use even go want to do look more like?', 'I honestly have no idea.', 'It\'s common sense!', 'You\'ve got to be kidding me', 'Buffalo buffalo Buffalo buffalo buffalo buffalo Buffalo buffalo', 'I\'m pregnant', 'Have you ever had a dream?', 'I play Minecraft', 'Are you a bot?', 'How so.', 'How are you from?', 'How was your day?', 'Don\'t smoke coffee', 'Why sentence this you need?', 'Why would an otter need an ice cream sandwich?', 'Who\'s your favorite music artist?', 'Do you like pie?', 'Don\'t panic', 'I can tie a rat in half', 'The name\'s bond.', 'What do we want??', 'Are you my Uber?', 'Autocorrect makes me type things I didn\'t Nintendo', 'Insect jokes really bug me', 'Always give 100%, except if it\'s blood', 'Octopuses are all suckers', 'Am I under arrest??', 'STOP RESISTING', 'I am a legal U.S. citizen', 'Turn left, right?', 'Yes', 'No', 'Maybe', 'Idk', 'Why do you ask?', 'Jumbo shrimp', 'aaaaaaa', 'I\'m stupid :(', 'Wassup', 'I am a Leafeon', 'I\'ve got ham but I\'m not a hamster', 'That\'s one small step for man, one giant leap for mankind.', 'Beep boop', 'Is water wet?', 'Just Google it', 'Just Bing it', 'Run.', 'Make love, not bugs.', 'Maybe you can live on the moon in next century', 'Only listen to fortune cookie, disregard all other fortune telling units', 'The early bird gets the worm, but the second mouse gets the cheese.', 'There\'s no such thing as an ordinary cat', 'No snowflake in an avalanche ever feels responsible', 'What\'s the speed of dark?', 'When in anger, sing the alphabet', 'Life is not a struggle. It\'s a wiggle', 'Discord!', 'Never gonna give you up, never gonna let you down, never gonna run around and desert you', 'You just ate cat', 'Error 404', 'Foot: A device for finding furniture in the dark.', 'Your pet is planning to eat you', 'I cannot help you', 'Hru?', 'Are you sleeping?', 'I\'m tired', 'Do you like me?', 'You are heading in the right direction', 'Never trust a dog to watch your food', 'Forget the cake, go for the icing', 'Listen to your brain, it has lots of information!', 'Dumbledore', 'Now is the time, do not haste any longer', 'I wanna be like a caterpillar. Eat a lot. Sleep for a while. Wake up beautiful', 'You\'re pretty cool', 'That\'s offensive', 'Would you like something to drink?', 'The best kind of frenzy is a puppy frenzy!', 'Examine your texts closely!', 'Time to synthesize this dough into some cookies.', 'This doesn\'t look like a very well-constructed argument.', 'Some very important stylish effects going on here.', 'A fairly sophisticated move', 'Noble knight, prepare to slay the dragon!', 'hhhhhhhhhh', 'Ewwww', 'Nooooo', 'I am Marcel!!!', 'What is my IP?', 'Canadians', 'What year is it?', 'What time is it?', 'What is love?', 'What are these strawberries doing on my nipples I need them for the fruit salad', 'What would a chair look like if your knees bent the other way?', 'What would you do?', 'Follow me on Twitter!', 'Foxes', 'Booty', 'Pirates', 'I wanna go home', 'I like to tape my thumbs to my hands to see what it would be like to be a dinosaur', 'Sometimes when I\'m alone I use comic sans', 'I am poem', 'Why can\'t I own a Canadian?', 'Yes master?', 'I Did the Macarena with a Homeless Guy Because Big Bird Said to and He’s my Leader', 'Firefox has crashed and needs cuddles', 'My cat and I have decided to stay in tonight', 'My cat ate my gymsuit', 'My cat wants to get an abortion', 'My cat was right about you', 'Put that mayonnaise on your child', 'Sometimes I like to lay on the floor and pretend I\'m a crumb', 'There is a deer in my car', 'Biscuits are never boring', 'That awkward moment when you\'re chilling in the park and Bruno Mars walks by dragging a piano', 'What if one day you wake up and you were a chicken nugget', 'Can I vacuum my dog?', 'Can I vacuum glass?', 'I\'m vaping alcohol', 'What if Google was deleted and we couldn\'t Google what happened to Google', 'Help I accidentally set my dog on fire', 'I can see you', 'What do you call a zombie prostitute?', 'What do you call an alligator in a vest?', 'Was Flo Rida born in Florida?', 'Bacon is a little hug from God', 'Facebook is like a refrigerator', 'I love when I buy a bag of air and the company is nice enough to put some chips in it', 'My dog is racist', 'My cat is prettier than me', 'There\'s a bomb in the lasagna!', 'Honey I think the cat is done charging', 'Who threw that ham at me?', 'I like to hang glide on a dorito', 'Robots are everywhere and they eat old people\'s medicine for fuel', 'Johnny Depp is my mailman', 'That awkward moment when you get in the van and there\'s no candy', 'No time to explain!', 'Please, talk to this carrot', 'Pink!', 'Do you agree?', 'Who else has a broken heart? :broken_heart:', 'Let\'s dance with this chick!', 'It\'s a rising star, right?', 'You\'re cute', 'OK', 'Ok', 'That\'s cute', 'Agh!', 'Definitely', 'Without a doubt', 'A couple', 'One', 'Two', 'Three', 'Four', '69', '42', '24', 'Do it, I dare you', 'I can do that', 'Like a cat', 'You can\'t have my cookie', 'Duuuudeeee'];

client.on('message', async message => {
    if (message.author.bot) return;

    var input = message.content.toLowerCase();
    if (!input.includes("marcel")) return; // Cancel if no "marcel" in message

    var args = message.content.replace(/(marcel, |marcel |marcel)/, "").split(" "); // Replace 1st occurance of "marcel" word, and turn into array

    var loadingLines = ['One sec...', 'Thinking...', 'Hold on...', 'Just a sec...', 'Just a moment...', 'Just a second...', 'Let me see...'];
    var loadingLinesRandom = Math.round(Math.random() * (loadingLines.length - 1));
    var missCount = 0;
    var alreadyRan = false;

    for (let i = 0; i < args.length; i++) {
        var command = args[i].toLowerCase();

        if (command == "help" || command == "instructions" || command == "commands") {
            alreadyRan = true;

            message.channel.send({
                embed: {
                    color: 3066993,
                    description: "Hiya! Nice to meet ya, I'm Marcel. Here are some simple instructions for how to efficiently interact with me.\n\nI work much like how you'd speak to a human in a normal conversation instead of just entering commands with a prefix and expecting an output.\n\nHere are some examples of things you could say to me:\n```\nHey Marcel, how are you today?\nMarcel, let's see the weather in Denver, Colorado\nMarcel, play Surf by Hyper Potions\nMarcel, show me the status of the Minecraft server mineplex.com```\nAll you have to do is send a message that contains my name and what you want me to do, and I'll try my best to do that for you!\n\nHere is a list of my features so far:\n• Avatar retrieval (Tag somebody to see their avatar too!)\n• User Information (Again, tag somebody for their info)\n• Magic 8-Ball\n• Weather (Use quotations [\"] around the location for a more precise result!)\n• Minecraft server status\n• YouTube music playback (play/queue/skip/stop/pause/resume/np)\n• Fact-based question search\n• Trending news stories\n• Roll a dice\n• Flip a coin\n\n[Click here to visit my website if you need any more help!](https://marcel.meowso.me/#usage)"
                }
            });
        } else if (command == "creators" || command == "created") {
            alreadyRan = true;
            
            message.channel.send({
                embed: {
                    color: 3066993,
                    description: `I was created by <@172151577480527878>, with lots of technical help from the awesome <@187226077326737417>! Feel free to message them with any questions.`
                }
            });
        } else if (command == "changelog" || command == "update" || command == "updates") {
            alreadyRan = true;

            message.channel.send({
                embed: {
                    color: 3066993,
                    description: "[Click here to see how I've grown in the past!](https://marcel.meowso.me/#changelog)"
                }
            });
        } else if (command == "ping") {
            alreadyRan = true;

            message.channel.send({
                embed: {
                    color: 3066993,
                    description: `I am able to respond to you in ${Date.now() - message.createdTimestamp}ms ◕‿◕✿`
                }
            });
        } else if (command == "avatar" || command == "icon" || command == "pfp" || command == "picture") {
            alreadyRan = true;

            var id = getCurrentOrId(message.author.id, args);

            var avatarURL;
            try {
                avatarURL = client.users.cache.get(id).avatarURL();
            } catch (error) {
                message.channel.send({
                    embed: {
                        color: 16711680,
                        description: "Sorry, but there was an error collecting the avatar of that person!"
                    }
                });
                return;
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
        } else if (command == "profile" || command == "user") {
            alreadyRan = true;
            
            var id, userCreated, currentlyPlaying;
            try {
                id = getCurrentOrId(message.author.id, args);

                userCreated = client.users.cache.get(id).createdAt.toString().split(' ');

                currentlyPlaying = (client.users.cache.get(id).presence.activities[0]) ? client.users.cache.get(id).presence.activities[0].name : "N/A";
            } catch (error) {
                console.log(error);
                message.channel.send({
                    embed: {
                        color: 16711680,
                        description: "Sorry, but there was an error collecting the profile information of that person!"
                    }
                });
                return;
            }

            message.channel.send({
                embed: {
                    color: 3066993,
                    description: "Here's some information about <@" + id + ">!",
                    "thumbnail": {
                        "url": client.users.cache.get(id).avatarURL
                    },
                    fields: [{
                            name: "Status",
                            value: client.users.cache.get(id).presence.status,
                            "inline": true
                        },
                        {
                            name: "Currently Playing",
                            value: currentlyPlaying,
                            "inline": true
                        }, {
                            name: "Username",
                            value: client.users.cache.get(id).username,
                            "inline": true
                        },
                        {
                            name: "Tag",
                            value: client.users.cache.get(id).tag,
                            "inline": true
                        },
                        {
                            name: "ID",
                            value: client.users.cache.get(id).id,
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
        } else if (command == "uptime") {
            alreadyRan = true;
            
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
        } else if (command == "invite") {
            alreadyRan = true;
            
            message.channel.send({
                embed: {
                    color: 3066993,
                    description: "Send somebody this URL to invite me to their Discord server!\n```http://marcel.meowso.me/invite```"
                }
            });
        } else if (command == "weather") {
            alreadyRan = true;

            var weatherMessage = args.join(" ").replace(/,|weather|whats|what's|what|the+|like+|in+|is+/ig, "");
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
                    if (result == undefined || result.length == 0) {
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
                        weatherReactionOutput = ". Looks pretty windy out there!";
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
        } else if (command == "8ball" || command == "8-ball") {
            alreadyRan = true;
            
            var eightBallResponses = ['It is certain', 'It is decidedly so', 'Without a doubt', 'Yes, definitely', 'You may rely on it', 'As I see it, yes', 'Most likely', 'Outlook good', 'Yes', 'Signs point to yes', 'Reply hazy, try again', 'Ask again later', 'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again', 'Don\'t count on it', 'My reply is no', 'My sources say no', 'Outlook not so good', 'Very doubtful'];
            var simpleResponses = ['certainly', 'yes', 'absolutely', 'definitely', 'yep', 'thumbsup', 'yep', 'good', 'yes', 'yes', 'idk', 'later', 'thumbsdown', 'confused', 'think', 'disagree', 'nope', 'nope', 'bad', 'doubt'];
            var eightBallResponsesRandom = Math.round(Math.random() * (eightBallResponses.length - 1));
            var url = 'http://api.giphy.com/v1/gifs/random?api_key=' + process.env.GIPHY + '&tag=%27+' + simpleResponses[eightBallResponsesRandom];

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

                var image = (body.data) ? body.data.image_original_url : "";

                message.channel.send({
                    embed: {
                        color: 3066993,
                        description: "The Magic 8-Ball says... \n\n*" + eightBallResponses[eightBallResponsesRandom] + "*\n\n",
                        "image": {
                            "url": image
                        }
                    }
                });
            });
        } else if (command == "minecraft") {
            alreadyRan = true;

            var ip = args.find(arg => /.*\.(\w+)(:\d{5})?/.test(arg)); // Find arg that matches the format of an IP (anything.anything:optional)
            if (!ip) return message.channel.send({
                embed: {
                    color: 16711680,
                    description: "Please enter a valid IP."
                }
            });

            ip = ip.split(":"); // Split into address and port
            if (ip.length == 1) ip[1] = 25565;

            var url = 'https://mc-api.net/v3/server/ping/' + ip[0] + ':' + ip[1];

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
                        console.log(error);
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
                                    "url": "https://mc-api.net/v3/server/favicon/" + ip[0] + ':' + ip[1]
                                },
                                fields: [{
                                        name: "Server IP",
                                        value: ip[0] + ":" + ip[1],
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
        } else if (command == "music" || command == "play") {
            alreadyRan = true;

            if (!message.guild) {
                message.channel.send({
                    embed: {
                        color: 16711680,
                        description: "Looks to me like you're not in a Discord server with a voice channel. Please use this command in a Discord server!"
                    }
                });
                return;
            }

            var voiceChannel = message.member.voice.channel;
            var serverQueue = queue.get(message.guild.id);
            var musicLink, searchQuery;

            if (!voiceChannel) {
                message.channel.send({
                    embed: {
                        color: 16711680,
                        description: "You need to be in a voice channel to play music!"
                    }
                });
                return;
            }

            if (serverQueue && !serverQueue.playing && args.length <= 1) {
                serverQueue.playing = true;
                serverQueue.connection.dispatcher.resume();
                message.channel.send({
                    embed: {
                        color: 3066993,
                        description: ":arrow_forward: The song has been resumed"
                    }
                });
                return;
            }

            var permissions = voiceChannel.permissionsFor(message.client.user);
            if (!permissions.has('CONNECT')) {
                message.channel.send({
                    embed: {
                        color: 16711680,
                        description: "I don't have permission to **connect** to the **" + voiceChannel + "** voice channel. Please give me access so I can play!"
                    }
                });
                return;
            } else if (!permissions.has('SPEAK')) {
                message.channel.send({
                    embed: {
                        color: 16711680,
                        description: "I don't have permission to **speak** in the **" + voiceChannel + "** voice channel. Please give me access so I can play!"
                    }
                });
                return;
            }

            var musicMessage = args.join(" ");

            musicLink = args.find(arg => /((http|https)\:\/\/)?((www\.)?(youtube\.com|youtu\.?be))\/.+/.test(arg)); // Match YouTube link

            // If no youtube link matched
            if (!musicLink) {
                if (musicMessage.indexOf("\"") != musicMessage.lastIndexOf("\"")) {
                    // Get exact string in quotes
                    searchQuery = musicMessage.slice(musicMessage.indexOf("\"") + 1, musicMessage.lastIndexOf("\""));
                } else {
                    // Get the best match that we can
                    searchQuery = musicMessage.replace(/play|music/gi, "");
                }
            }

            if (!musicLink && !searchQuery) return message.channel.send({
                embed: {
                    color: 16711680,
                    description: "Please enter a song name or YouTube URL and I'll play it!"
                }
            });

            var video, videos;

            if (musicLink) {
                try {
                    video = await youtube.getVideo(musicLink);
                } catch (error) {
                    console.log(error);
                    message.channel.send({
                        embed: {
                            color: 16711680,
                            description: "Sorry, looks like I can't find anything for that YouTube URL. Please try with a different one!"
                        }
                    });
                    return;
                }
            } else if (searchQuery && args.length > 0) {
                try {
                    videos = await youtube.searchVideos(searchQuery, 1);
                    video = await youtube.getVideoByID(videos[0].id);
                } catch (error) {
                    console.log(error);
                    message.channel.send({
                        embed: {
                            color: 16711680,
                            description: "Sorry, looks like I can't find anything for that search query. Please try with a different one!"
                        }
                    });
                    return;
                }
            } else {
                message.channel.send({
                    embed: {
                        color: 16711680,
                        description: "Please enter a search term or YouTube URL of a song and I can play it for you!"
                    }
                });
                return;
            }
            musicLink = null;
            searchQuery = null;

            var dur;
            var secs = video.duration.seconds;
            if (video.duration.seconds < 9) secs = "0" + video.duration.seconds;
            var mins = video.duration.minutes;
            if (video.duration.minutes < 9) mins = "0" + video.duration.minutes;
            if (video.duration.hours > 0) {
                if (video.duration.hours < 9) video.duration.hours = "0" + video.duration.hours;
                dur = `${video.duration.hours}:${mins}:${secs}`;
            } else {
                dur = `${mins}:${secs}`;
            }

            var song = {
                id: video.id,
                title: video.title,
                description: `${video.description.substring(0,150)}...`,
                url: `https://www.youtube.com/watch?v=${video.id}`,
                thumbnail: video.thumbnails.default.url,
                duration: dur
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

                var connection;
                try {
                    connection = await voiceChannel.join();
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
        } else if (command == "skip") {
            alreadyRan = true;

            if (!message.guild) {
                message.channel.send({
                    embed: {
                        color: 16711680,
                        description: "Looks to me like you're not in a Discord server with a voice channel. Please use this command in a Discord server!"
                    }
                });
                return;
            }
            var voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.channel.send({
                    embed: {
                        color: 16711680,
                        description: "You need to be in a voice channel to skip music!"
                    }
                });
                return;
            }

            var permissions = voiceChannel.permissionsFor(message.client.user);
            if (!permissions.has('CONNECT')) {
                message.channel.send({
                    embed: {
                        color: 16711680,
                        description: "I don't have permission to **connect** to the **" + voiceChannel + "** voice channel. Please give me access so I can play!"
                    }
                });
                return;
            } else if (!permissions.has('SPEAK')) {
                message.channel.send({
                    embed: {
                        color: 16711680,
                        description: "I don't have permission to **speak** in the **" + voiceChannel + "** voice channel. Please give me access so I can play!"
                    }
                });
                return;
            }

            var serverQueue = queue.get(message.guild.id);
            if (serverQueue) {
                if (serverQueue.skips.indexOf(client.users.cache.get(message.author.id).id) === -1) {
                    serverQueue.skips.push(client.users.cache.get(message.author.id).id);
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
                    return;
                }
            } else {
                message.channel.send({
                    embed: {
                        color: 16711680,
                        description: "There's nothing currently playing, silly!"
                    }
                });
                return;
            }
        } else if (command == "stop" || command == "leave" || command == "clear") {
            alreadyRan = true;

            if (!message.guild) {
                message.channel.send({
                    embed: {
                        color: 16711680,
                        description: "Looks to me like you're not in a Discord server with a voice channel. Please use this command in a Discord server!"
                    }
                });
                return;
            }
            
            var voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.channel.send({
                    embed: {
                        color: 16711680,
                        description: "You need to be in a voice channel to stop music!"
                    }
                });
                return;
            }

            if (!message.member.hasPermission('MUTE_MEMBERS')) {
                message.channel.send({
                    embed: {
                        color: 16711680,
                        description: "You don't have adequate permissions to stop me from playing music! If you need someone to kick me because somebody queued up a thousand bass boost earrape meme compilations, please ask somebody with the ability to mute people in the voice channels to stop me!"
                    }
                });
                return;
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
        } else if (command == "nowplaying" || command == "np") {
            alreadyRan = true;

            if (!message.guild) {
                message.channel.send({
                    embed: {
                        color: 16711680,
                        description: "Looks to me like you're not in a Discord server with a voice channel. Please use this command in a Discord server!"
                    }
                });
                return;
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
        } else if (command == "queue") {
            alreadyRan = true;

            if (!message.guild) {
                message.channel.send({
                    embed: {
                        color: 16711680,
                        description: "Looks to me like you're not in a Discord server with a voice channel. Please use this command in a Discord server!"
                    }
                });
                return;
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
        } else if (command == "pause") {
            alreadyRan = true;

            if (!message.guild) {
                message.channel.send({
                    embed: {
                        color: 16711680,
                        description: "Looks to me like you're not in a Discord server with a voice channel. Please use this command in a Discord server!"
                    }
                });
                return;
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
        } else if (command == "resume") {
            alreadyRan = true;

            if (!message.guild) {
                message.channel.send({
                    embed: {
                        color: 16711680,
                        description: "Looks to me like you're not in a Discord server with a voice channel. Please use this command in a Discord server!"
                    }
                });
                return;
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
        } else if (command == "wolfram" || command == "how" || command == "how\'s" || command == "hows" || command == "what" || command == "what\'s" || command == "whats" || command == "when" || command == "when\'s" || command == "whens" || command == "where" || command == "where\'s" || command == "wheres" || command == "why" || command == "why\'s" || command == "whys" || command == "name" || command == "define" || command == "definition" || command == "who" || command == "who\'s" || command == "whos" || command == "calculate" || command == "add" || command == "subtract" || command == "multiply" || command == "divide" || command == "solve" || command == "translate") {
            if (alreadyRan) return;
            alreadyRan = true;

            var wolframQuestion = args.join(" ").replace(/wolfram/gi, "");

            message.channel.send({
                embed: {
                    color: 16312092,
                    description: loadingLines[loadingLinesRandom]
                }
            }).then(function (message) {
                wolfram.query(wolframQuestion).then(function(result) {
                    var root = result.__root;

                    if (root.error == "true") {
                        message.edit({
                            embed: {
                                color: 16711680,
                                description: "Sorry, something went wrong! 〒﹏〒  [Click here to learn more](https://marcel.meowso.me/#wolfram_error)"
                            }
                        });
                    } else if (root.numpods > 0) {
                        var msg;
                        if (root.pod[1].subpod[0].plaintext.toString().length < 2048) {
                            msg = root.pod[1].subpod[0].plaintext.toString();
                        } else {
                            msg = root.pod[1].subpod[0].plaintext.toString().slice(0, 2045) + "...";
                        }
                        message.edit({
                            embed: {
                                color: 3066993,
                                description: msg,
                                "footer": {
                                    "text": root.pod[0].subpod[0].plaintext.toString()
                                }
                            }
                        });
                    } else return sendRandom();
                });
            });
        } else if (command == "news") {
            alreadyRan = true;
            
            message.channel.send({
                embed: {
                    color: 16312092,
                    description: loadingLines[loadingLinesRandom]
                }
            }).then(function (message) {
                fetchSubreddit.top_posts("news", 5).then((redditPosts) => {
                    var title = new Array();
                    var summary = new Array();
                    var source = new Array();
                    var url = new Array();
                    var thumbnail;
                    var counter = 0;

                    for (var i = 0; i < 5; i++) {
                        extract(redditPosts[i].data.url).then((websiteData) => {
                            try {
                                title.push(websiteData.title);
                            } catch (err) {
                                sendErr(err);
                            }

                            try {
                                summary.push(websiteData.description.replace(/\n/gi, " ").slice(0,150) + "...");
                            } catch (err) {
                                console.log(err);
                            }

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
                    sendErr(err);
                })
            }).catch((err) => {
                sendErr(err);
            });

            function sendErr(err) {
                console.log(err);
                message.edit({
                    embed: {
                        color: 16711680,
                        description: "I tried to retrieve the latest news stories for you, but something went wrong along the way. Sorry!"
                    }
                });
                return;
            }
        } else if (command == "dice") {
            alreadyRan = true;
            
            var diceImagesRandom = Math.round(Math.random() * 5 + 1);

            message.channel.send({
                embed: {
                    color: 3066993,
                    description: `You rolled a **${diceImagesRandom}**`,
                    "image": {
                        "url": `https://marcel.meowso.me/images/dice/${diceImagesRandom}.png`
                    }
                }
            });
        } else if (command == "coin") {
            alreadyRan = true;
            
            var coinImagesRandom = Math.round(Math.random());

            var side = (coinImagesRandom == 0) ? "Heads" : "Tails";

            message.channel.send({
                embed: {
                    color: 3066993,
                    description: `You got **${side}**`,
                    "image": {
                        "url": `https://marcel.meowso.me/images/coin/${coinImagesRandom}.png`
                    }
                }
            });
        } else missCount++;

        if (missCount == args.length) return sendRandom();
    }

    function sendRandom() {
        message.channel.send({
            embed: {
                color: 3066993,
                description: randomStatements[Math.round(Math.random() * (randomStatements.length - 1))]
            }
        });
    }

    async function play(guild, song, voiceChannel) {
        var serverQueue = queue.get(guild.id);

        if (!song) {
            if (serverQueue) {
                serverQueue.voiceChannel.leave();
            }
            queue.delete(guild.id);
            return;
        }

        var stream = await ytdl(song.url, {
            filter: 'audioonly',
            highWaterMark: 1 << 25
        });

        stream.on('error', err => {
            message.channel.send({
                embed: {
                    color: 16711680,
                    description: "Something went wrong with the song playback, sorry about that!"
                }
            });
            console.log("ytdl-core 'stream' issue:");
            console.log(err);
        });

        var dispatcher = await serverQueue.connection.play(stream);

        dispatcher.on('start', () => {
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
        });

        dispatcher.on('finish', (reason) => {
            console.log(reason);
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
        });
        
        dispatcher.on('error', error => {
            message.channel.send({
                embed: {
                    color: 16711680,
                    description: "Something went wrong with the song playback, sorry about that!"
                }
            });
            console.log("dispatcher issue:");
            console.log(error);
        });
    }
});

function getCurrentOrId(id, args) {
    var rawId = args.find(arg => /<@!\w{18}>/.test(arg));

    if (rawId) return rawId.replace(/[^\d]/g, "");
    else return id;
}

// Refresh the channel and guild counts on the website with the latest value
function refreshWebsiteCounters(client) {
    client.channels.cache.get(process.env.COUNTER1).edit({
        name: `${client.channels.cache.size}-`,
        bitrate: 8000
    });
    client.channels.cache.get(process.env.COUNTER2).edit({
        name: `${client.guilds.cache.size}-`,
        bitrate: 8000
    });
}

client.login(process.env.TOKEN);
