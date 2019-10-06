const Discord = require("discord.js");
const { prefix , FooterCreator } = require("../../botconfig.json");
module.exports = {
  config: {
      name: "serverinfo",
      aliases: ["h", "halp", "commands"],
      usage: `${prefix}serverinfo`,
      category: "一般",
      description: "",
      accessableby: "Members"
  },
  run: async (bot, message, args) => {
let sicon = message.guild.iconURL;
        let sererembed = new Discord.RichEmbed()
            .setDescription("群組資訊")
            .setColor("RANDOM")
            .setThumbnail(sicon)
            .addField("群組名稱", message.guild.name)
            .addField("建立時間", message.guild.createdAt)
            .addField("群組建立者", message.guild.owner)
            .addField("您加入時間", message.member.joinedAt)
            .addField("群組總人數", message.guild.memberCount);

        return message.channel.send(sererembed);
}
}
