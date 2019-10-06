process.env.TZ = 'Asia/Taipei';
const { Client, Collection , RichEmbed } = require("discord.js");
const { token , FooterCreator } = require("./botconfig.json");
const config = require("./botconfig.json")
const bot = new Client();
const client = new Client();
const Discord = require("discord.js");
FFMPEG = require('ffmpeg');
const active = new Map();
const ytdl = require('ytdl-core');
const fs = require("fs");
const search = require('yt-search');
const ops = require('opusscript');
bot.commands = new Discord.Collection();

fs.readdir("./commands-andy/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands-andy/${f}`);
    console.log(`${f} 已載入!`);
    bot.commands.set(props.help.name, props);
  });
});

["aliases", "commands"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

//加入訊息
bot.on("guildMemberAdd", member =>{
  var role = member.guild.roles.find("id", "610985818110296115")
  member.addRole(role)
  let JoinEmbed = new Discord.RichEmbed()
   .setTitle("加入通知" , bot.user.displayAvatarURL)
   .setDescription("\nHi " + `${member}` + ", 牛排託管SteakHosting\n目前此群組有 " + member.guild.memberCount + " 人")
   .setColor("RANDOM")
   .setFooter(`${FooterCreator}` , member.user.displayAvatarURL)
  member.guild.channels.get('611467071645286420').send(JoinEmbed)
  bot.user.setActivity("服務人數: " + bot.guilds.get("610976448345407559").memberCount + "人", "PLAYING");
})

//離開訊息
bot.on("guildMemberRemove", member =>{
  let QuitEmbed = new Discord.RichEmbed()
   .setTitle("離開通知" , bot.user.displayAvatarURL)
   .setDescription("\n再見了 " + `${member.user.tag}` + ", 我們有緣再見\n目前此群組有 " + member.guild.memberCount + " 人")
   .setColor("RANDOM")
   .setFooter(`${FooterCreator}` , member.user.displayAvatarURL)
  member.guild.channels.get('611467160924979211').send(QuitEmbed)
  bot.user.setActivity("服務人數: " + bot.guilds.get("610976448345407559").memberCount + "人", "PLAYING");
})

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = "a-"
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
});

bot.on("ready", async () => {
    console.log("機器人登入成功")
    console.log(`${bot.user.username} 上線於 ${bot.guilds.size} 個Discord群!`);
})


bot.on("message", async function (message) {

    let prefix = config.prefix;

    if (message.author.bot) return;

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
    const command = args.shift().toLowerCase();


    if (command === "leave") {
        if (!message.member.voiceChannel) return message.channel.send('請加入一個語音頻道後才能點歌');
        if (!message.guild.me.voiceChannel) return message.channel.send('機器人未在此群組中播放音樂');
        if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send('機器人正在其他語音頻道中播放音樂');
        message.guild.me.voiceChannel.leave();
        message.channel.send('停止播放中....');
    }

    if (command === "pause") {
        let fetched = ops.active.get(message.guild.id);

        if (!fetched) return message.channel.send('機器人未在此群組中播放音樂');

        if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('機器人正在其他語音頻道中播放音樂');

        if (fetched.dispatcher.paused) return message.channel.send('音樂尚未開始播放');

        fetched.dispatcher.pause();

        message.channel.send(`已將歌曲 ${fetched.queue[0].songTitle} 暫停`);
    }

    if (command === "play") {
        if (!message.member.voiceChannel) return message.channel.send('請加入一個語音頻道後才能點歌');
        if (!args[0]) return message.channel.send('無法識別此網址');

        let validate = await ytdl.validateURL(args[0]);

        if (!validate) {
            let ops = {
                active: active
            }
            return searchYT(client, message, args, ops);
        }

        let info = await ytdl.getInfo(args[0]);
        let data = ops.active.get(message.guild.id) || {};

        if (!data.connection) data.connection = await message.member.voiceChannel.join();
        if (!data.queue) data.queue = [];

        data.guildID = message.guild.id;
        data.queue.push({
            songTitle: info.title,
            requester: message.author.tag,
            url: args[0],
            announceChannel: message.channel.id
        });

        if (!data.dispatcher) play(client, ops, data);
        else {
            message.channel.send(`已將歌曲: ${info.title} 加入播放列表 | 點歌者: ${message.author.tag}`);
        }

        ops.active.set(message.guild.id, data);
    }

    if (command === "queue") {
        let fetched = ops.active.get(message.guild.id);

        if (!fetched) return message.channel.send('機器人未在此群組中播放音樂');

        let queue = fetched.queue;
        let nowPlaying = queue[0];
        let resp = `__**現正播放**__\n**${nowPlaying.songTitle}** -- **點歌者:** *${nowPlaying.requester}*\n\n__**Queue**__\n`;

        for (var i = 1; i < queue.length; i++) {
            resp += `${i}. **${queue[i].songTitle}** -- **點歌者:** *${queue[i].requester}*\n`;
        }
        message.channel.send(resp);
    }

    if (command === "resume") {
        let fetched = ops.active.get(message.guild.id);

        if (!fetched) return message.channel.send('機器人未在此群組中播放音樂');
        if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('機器人正在其他語音頻道中播放音樂');
        if (!fetched.dispatcher.paused) return message.channel.send('音樂尚未暫停');

        fetched.dispatcher.resume();
        message.channel.send(`Successfully resumed ${fetched.queue[0].songTitle}`);
    }

    if (command === "fskip") {

        let fetched = ops.active.get(message.guild.id);

        if (!fetched) return message.channel.send("機器人未在此群組中播放音樂");

        if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("機器人正在其他語音頻道中播放音樂");

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("你不是此群組的管理員!");

        fetched.dispatcher.end();
    }

    if (command === "skip") {
        let fetched = ops.active.get(message.guild.id)

        if (!fetched) return message.channel.send('機器人未在此群組中播放音樂');
        if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('機器人正在其他語音頻道中播放音樂');

        let userCount = message.member.voiceChannel.members.size;
        let required = Math.ceil(userCount / 2);

        if (!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];
        if (fetched.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`您已投過票! 需要票數:${fetched.queue[0].voteSkips.length}/${required}`);

        fetched.queue[0].voteSkips.push(message.member.id);
        ops.active.set(message.guild.id, fetched);

        if (fetched.queue[0].voteSkips.length >= required) {
            message.channel.send('已跳過歌曲');
            return fetched.dispatcher.end();
        }
        message.channel.send(`已投票跳過歌曲! 最終票數:${fetched.queue[0].voteSkips.length}/${required}`);
    }
});

async function play(bot, ops, data) {

    bot.channels.get(data.queue[0].announceChannel).send(`現正播放: ${data.queue[0].songTitle} | 點歌者: ${data.queue[0].requester}`);

    data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, { filter: 'audioonly' }));
    data.dispatcher.guildID = data.guildID;

    data.dispatcher.once('end', function() {
        finish(client, ops, this);
    })


}

function finish(bot, ops, dispatcher) {
    let fetched = ops.active.get(dispatcher.guildID);

    fetched.queue.shift();

    if (fetched.queue.length > 0) {

        ops.active.set(dispatcher.guildID, fetched);

        play(client, ops, fetched);

    } else {
        ops.active.delete(dispatcher.guildID);

        let vc = bot.guilds.get(dispatcher.guildID).me.voiceChannel;
        if (vc) vc.leave();

    }
}

async function searchYT(bot, message, args, ops) {
    search(args.join(' '), function(err, res) {
        if (err) return message.channel.send('有地方出現錯誤');

        let videos = res.videos.slice(0, 10);

        let resp = '';
        for (var i in videos) {
            resp += `\n**[${parseInt(i) + 1}]:** \`${videos[i].title}\`\n`;
        }

        resp += `\n 請選擇歌曲號碼 \`1-${videos.length}\``;

        message.channel.send(resp);

        const filter = m => !isNaN(m.content) && m.content < videos.length + 1 && m.content > 0;

        const collector = message.channel.createMessageCollector(filter);

        collector.videos = videos;

        collector.once('collect', function(m) {
            playYT(client, message, [this.videos[parseInt(m.content) - 1].url], ops);
        })

    })
}

async function playYT(client, message, args, ops) {
    if (!message.member.voiceChannel) return message.channel.send('請加入一個語音頻道後才能點歌');

    // if (message.guild.me.voiceChannel) return message.channel.send('Sorry, the bot is already connected to the guild.');

    if (!args[0]) return message.channel.send('無法識別此網址');

    let validate = await ytdl.validateURL(args[0]);

    if (!validate) {
        let ops = {
            active: active
        }

        //let commandFile = require(`./search.js`);
        return searchYT(client, message, args, ops);

    }

    let info = await ytdl.getInfo(args[0]);

    let data = ops.active.get(message.guild.id) || {};

    if (!data.connection) data.connection = await message.member.voiceChannel.join();
    if (!data.queue) data.queue = [];
    data.guildID = message.guild.id;

    data.queue.push({
        songTitle: info.title,
        requester: message.author.tag,
        url: args[0],
        announceChannel: message.channel.id
    });

    if (!data.dispatcher) play(client, ops, data);
    else {

        message.channel.send(`已將歌曲: ${info.title} 加入列表 | 點歌者: ${message.author.tag}`);
    }

    ops.active.set(message.guild.id, data);
}

     

  
bot.login(token);