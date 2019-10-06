const Discord = require("discord.js");
const { prefix , botowner , FooterCreator } = require("../../botconfig.json");
module.exports = {
    config: {
        name: "ban",
        aliases: ["h", "halp", "commands"],
        usage: `${prefix}ban`,
        category: "管理員",
        description: "",
        accessableby: "管理員"
    },
    run: async (bot, message, args) => {
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!bUser) return message.channel.send("找不到用戶！!");
        let bReason = args.join(" ").slice(22);
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("你沒有權限這麼做");
        if (bUser.hasPermission("ADMINISTRATOR")) return message.channel.send("那個人不能被禁止")


        let banEmbed = new Discord.RichEmbed()
            .setAuthor("封禁紀錄")
            .setColor("#bc0000")
            .setThumbnail(bot.user.displayAvatarURL)
            .setDescription(`
            被封鎖人 :  ${bUser} (${bUser.id})
            執行者: <@${message.author.id}> (${message.author.id})
            封禁頻道 : ${message.channel}
            時間 : ${message.createdAt}
            原因 : ${bReason}  `)
            
        //let incidentchannel = message.guild.channels.find(`name`, "logs");
        let channel = message.guild.channels.find(ch => ch.name === '📝目綠');
        if (!channel) {
            message.channel.send("找不到 '📝目綠' 頻道.");
            return;
        }

        message.guild.member(bUser).ban(bReason);
        channel.send(banEmbed);
      }
}