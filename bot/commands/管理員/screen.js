const Discord = require("discord.js");
const { prefix , botowner , FooterCreator } = require("../../botconfig.json");
module.exports = {
    config: {
        name: "screen",
        aliases: ["h", "halp", "commands"],
        usage: `${prefix}screen`,
        category: "管理員",
        description: "",
        accessableby: "管理員"
    },
    run: async (bot, message, args) => {
  if (!message.member.voiceChannel) return message.channel.send('您未在一個語音頻道內');
  var channelid = message.member.voiceChannel.id
  var serverid = message.guild.id
  var url = "https://discordapp.com/channels/" +serverid + "/" + channelid
  let videoembed = new Discord.RichEmbed()
   .setTitle("群組螢幕分享")
   .setDescription("點擊 [**此處**]"+ `(${url})` +" 開啟")
  message.channel.send(videoembed)
}
}
