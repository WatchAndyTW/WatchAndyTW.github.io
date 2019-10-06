const Discord = require("discord.js");
const { prefix , botowner , FooterCreator } = require("../../botconfig.json");
module.exports = {
    config: {
        name: "kick",
        aliases: ["h", "halp", "commands"],
        usage: `${prefix}kick`,
        category: "管理員",
        description: "",
        accessableby: "管理員"
    },
    run: async (bot, message, args) => {
let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!bUser) return message.channel.send("Can't find user!");
        let bReason = args.join(" ").slice(22);
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("你沒有權限這麼做");
        if (bUser.hasPermission("ADMINISTRATOR")) return message.channel.send("That person can't be kicked")


        let banEmbed = new Discord.RichEmbed()
            .setDescription("踢出紀錄")
            .setColor("#bc0000")
            .addField("被踢人", `${bUser} with ID ${bUser.id}`)
            .addField("執行者", `<@${message.author.id}> with ID ${message.author.id}`)
            .addField("執行頻道", message.channel)
            .addField("時間", message.createdAt)
            .addField("原因", bReason);

        //let incidentchannel = message.guild.channels.find(`name`, "logs");
        let channel = message.guild.channels.find(ch => ch.name === 'logs');
        if (!channel) {
            message.channel.send("Can't find a 'logs' channel.");
            return;
        }

        message.guild.member(bUser).kick(bReason);
        channel.send(banEmbed);
      }
}