const Discord = require('discord.js');
const client = new Discord.Client();
const weather = require('weather-js');

client.on('ready', () => {
    console.log(`Marcel is running successfully\nUsers: ${client.users.size}\nChannels: ${client.channels.size}\nServers: ${client.guilds.size}`);
    client.user.setGame('Say my name and "help" for help');
    
    client.channels.get('397862894005387287').send({
        embed: {
            color: 3066993,
            description: `**Marcel is running successfully**\n**Users:** ${client.users.size}\n**Channels:** ${client.channels.size}\n**Servers:** ${client.guilds.size}`
        }
    });
});

client.on("guildCreate", guild => {
    client.channels.get('397862894005387287').send({
        embed: {
            color: 3066993,
            description: `**Joined Server**\n**Name:** "${guild.name}"\n**ID:** ${guild.id}\n**Members:** ${guild.memberCount}`
        }
    });
    client.channels.get('397889669989400596').edit({name: `${client.users.size}`});
    client.channels.get('397889346990112768').edit({name: `${client.guilds.size}`});
});

client.on("guildDelete", guild => {
    client.channels.get('397862894005387287').send({
        embed: {
            color: 3066993,
            description: `**Kicked from Server**\n**Name:** "${guild.name}"\n**ID:** ${guild.id}\n**Members:** ${guild.memberCount}`
        }
    });
    client.channels.get('397889669989400596').edit({name: `${client.users.size}`});
    client.channels.get('397889346990112768').edit({name: `${client.guilds.size}`});
});

client.on('message', message => {
    if (message.author.bot) return;
    var step = message.content.toLowerCase();
    var step = step.replace('marcel', ' marcel ');
    var splitMessage = step.split(" ");
    for (var searchVarA = 0; searchVarA < splitMessage.length; searchVarA++) {
        if (splitMessage[searchVarA] === 'marcel') {
            var missCount = 0;
            var runCheck = 1;
            for (var searchVarB = 0; searchVarB < splitMessage.length; searchVarB++) {
                switch (splitMessage[searchVarB]) {
                    case 'help':
                    case 'instructions':
                    case 'use':
                    case 'about':
                        if (runCheck % 2 === 0) {
                            break;
                        } else {
                            runCheck *= 2;
                        }
                        message.channel.send({
                            embed: {
                                color: 3066993,
                                description: "Hiya! Nice to meet ya, I'm Marcel. Here are some simple instructions for how to efficiently interact with me.\n\nI work much like how you'd speak to a human in a normal conversation instead of just entering commands with a prefix and expecting an output.\n\nHere are some examples of things you could say to me:\n```\nHey Marcel, how are you today?\nMarcel, what's the weather in Denver, Colorado\nMarcel, show me my avatar please\nMarcel, show me the status of the Minecraft server mineplex.com```\nAll you have to do is send a message that contains my name and what you want me to do, and I'll try my best to do that for you!\n\nHere is a list of my features so far:\n• Avatar retrieval\n• Magic 8-Ball\n• Weather (Use quotations [\"] around the location for a more precise result!)\n• Minecraft server status\n• And more soon to come!\n\n[Click here to visit my website if you need any more help!](http://marcel.vulpix.pw/#usage)"
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
                        if (runCheck % 7 === 0) {
                            break;
                        } else {
                            runCheck *= 7;
                        }
                        message.channel.send({
                            embed: {
                                color: 3066993,
                                description: "Here's your avatar!",
                                "image": {
                                    "url": message.author.avatarURL
                                }
                            }
                        });
                        break;

                    case 'uptime':
                        if (runCheck % 11 === 0) {
                            break;
                        } else {
                            runCheck *= 11;
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
                        if (runCheck % 13 === 0) {
                            break;
                        } else {
                            runCheck *= 13;
                        }
                        message.channel.send({
                            embed: {
                                color: 3066993,
                                description: "Send somebody this URL to invite me to their Discord server!\n```https://goo.gl/zjGTbq```"
                            }
                        });
                        break;

                    case 'hi':
                    case 'hello':
                    case 'hey':
                    case 'yo':
                        if (runCheck % 17 === 0) {
                            break;
                        } else {
                            runCheck *= 17;
                        }
                        var randomGreeting = ['Hi there!! *^▽^*', 'Heyo! (^-^*)/', 'Hello! ・ω・'];
                        var choice = Math.round(Math.random() * (randomGreeting.length - 1));
                        message.channel.send({
                            embed: {
                                color: 3066993,
                                description: randomGreeting[choice]
                            }
                        });
                        break;

                    case 'how':
                    case 'doing':
                        if (runCheck % 19 === 0) {
                            break;
                        } else {
                            runCheck *= 19;
                        }
                        var randomFeeling = ['I\'m doing well, thank you for asking! （‐＾▽＾‐）', 'I\'m good! How about yourself? ヽ(o＾▽＾o)ノ'];
                        var choice = Math.round(Math.random() * (randomFeeling.length - 1));
                        message.channel.send({
                            embed: {
                                color: 3066993,
                                description: randomFeeling[choice]
                            }
                        });
                        break;

                    case 'weather':
                        if (runCheck % 23 === 0) {
                            break;
                        } else {
                            runCheck *= 23;
                        }
                        var weatherMessage = splitMessage.join(" ");
                        if (weatherMessage.indexOf("\"") === weatherMessage.lastIndexOf("\"")) {
                            var searchTerm = weatherMessage;
                        } else {
                            var searchTerm = weatherMessage.slice(weatherMessage.indexOf("\"") + 1, weatherMessage.lastIndexOf("\""));
                        }
                        weather.find({
                            search: searchTerm,
                            degreeType: 'F'
                        }, function (err, result) {
                            if (err) message.channel.send(err);
                            if (result.length === 0) {
                                message.channel.send({
                                    embed: {
                                        color: 3066993,
                                        description: 'Sorry, I\'m having trouble understanding you! Please try rewording your message.'
                                    }
                                });
                                return;
                            }
                            var current = result[0].current;
                            var location = result[0].location;
                            message.channel.send({
                                embed: {
                                    color: 3066993,
                                    description: `**${current.skytext}**`,
                                    author: {
                                        name: `Weather for ${current.observationpoint}`
                                    },
                                    thumbnail: {
                                        "url": current.imageUrl
                                    },
                                    fields: [{
                                            name: "Temperature",
                                            value: `${current.temperature}°F`,
                                            "inline": true
                                            },
                                        {
                                            name: "Feels Like",
                                            value: `${current.feelslike}°F`,
                                            "inline": true
                                            }
                                        ]
                                }
                            });
                        });
                        break;

                    case '8ball':
                    case '8-ball':
                        if (runCheck % 29 === 0) {
                            break;
                        } else {
                            runCheck *= 29;
                        }
                        var eightBallResponses = ['It is certain', 'It is decidedly so', 'Without a doubt', 'Yes, definitely', 'You may rely on it', 'As I see it, yes', 'Most likely', 'Outlook good', 'Yes', 'Signs point to yes', 'Reply hazy, try again', 'Ask again later', 'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again', 'Don\'t count on it', 'My reply is no', 'My sources say no', 'Outlook not so good', 'Very doubtful'];
                        var simpleResponses = ['certainly', 'yes', 'absolutely', 'definitely', 'yep', 'thumbsup', 'yep', 'good', 'yes', 'yes', 'idk', 'later', 'thumbsdown', 'confused', 'think', 'disagree', 'nope', 'nope', 'bad', 'doubt'];

                        var choice = Math.round(Math.random() * (eightBallResponses.length - 1));
                        var request = require('request');
                        var url = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=%27+' + simpleResponses[choice];
                        request(url, function (err, response, body) {
                            if (err) {
                                message.channel.send({
                                    embed: {
                                        color: 3066993,
                                        description: "The Magic 8-Ball says... \n\n*" + eightBallResponses[choice] + "*"
                                    }
                                });
                            }
                            body = JSON.parse(body);
                            message.channel.send({
                                embed: {
                                    color: 3066993,
                                    description: "The Magic 8-Ball says... \n\n*" + eightBallResponses[choice] + "*\n\n",
                                    "image": {
                                        "url": body.data.image_original_url
                                    }
                                }
                            });
                        });
                        break;

                    case 'minecraft':
                        if (runCheck % 31 === 0) {
                            break;
                        } else {
                            runCheck *= 31;
                        }
                        var address = ["ip", "25565"];
                        for (var searchVarC = 0; searchVarC < splitMessage.length; searchVarC++) {
                            var currentString = splitMessage[searchVarC];
                            for (var searchVarD = 0; searchVarD < currentString.length - 1; searchVarD++) {
                                if (currentString.charAt(searchVarD) === '.') {
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
                        request(url, function (err, response, body) {
                            if (err) {
                                message.channel.send({
                                    embed: {
                                        color: 3066993,
                                        description: "Sorry, but my Minecraft status capabilities seem to be hindered at the moment. Please try again later!"
                                    }
                                });
                            }
                            body = JSON.parse(body);
                            if (body.online) {
                                message.channel.send({
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
                                message.channel.send({
                                    embed: {
                                        color: 3066993,
                                        description: "Sorry, but I couldn't find anything for that Minecraft server. Is it offline?"
                                    }
                                });
                            }
                        });
                        break;

                    default:
                        missCount++;
                }
                if (missCount === splitMessage.length) {
                    var randomError = ['What? Hi? Hello? Somebody said my name???!?', 'Marcel is here!!!!!!', 'W-What? Sorry I was napping （´・｀）', 'Who said my nameeeeeeeeeeeeeeeee', 'Hi! I\'m here, ready to annoy you!'];
                    var choice = Math.round(Math.random() * (randomError.length - 1));
                    message.channel.send({
                        embed: {
                            color: 3066993,
                            description: randomError[choice]
                        }
                    });
                }
            }
        }
    }
});

client.login(process.env.TOKEN);
