const Discord = require("discord.js");
const { prefix , botowner , FooterCreator } = require("../../botconfig.json");
module.exports = {
    config: {
        name: "purge",
        aliases: ["h", "halp", "commands"],
        usage: `${prefix}purge`,
        category: "管理員",
        description: "",
        accessableby: "管理員"
    },
    run: async (bot, message, args) => {
if (!message.author.id == "459282533549604864"){
        const deleteCount = parseInt(args[0], 10);

        let embed = new Discord.RichEmbed()
            .setDescription("刪除訊息")
            .setColor("#e56b00")
            .addField("訊息數量: ", `${deleteCount}`)
            .addField("刪除者", `<@${message.author.id}> ID是 ${message.author.id}`)
            .addField("刪除頻道", message.channel)
            .addField("時間", message.createdAt);

        //let channel = message.guild.channels.find(`name`, "logs");
        let channel = message.guild.channels.find(ch => ch.name === 'logs');
        if (!channel) {
            message.channel.send("Can't find a 'logs' channel.");
            return;
        }

        if (!deleteCount || deleteCount < 2 || deleteCount > 100) {
            message.channel.send("Example: -purge 10");
            message.channel.send("Please enter a number between 2 and 100");
            return;
        }

        const fetched = await message.channel.fetchMessages({ limit: deleteCount });
        channel.send(embed);
        message.channel
            .bulkDelete(fetched)
            .catch(error => message.reply("Error. Contact an administrator."));
}else{
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("你沒有權限這麼做");
        const deleteCount = parseInt(args[0], 10);

        let embed = new Discord.RichEmbed()
            .setDescription("刪除訊息")
            .setColor("#e56b00")
            .addField("訊息數量: ", `${deleteCount}`)
            .addField("刪除者", `<@${message.author.id}> ID是 ${message.author.id}`)
            .addField("刪除頻道", message.channel)
            .addField("時間", message.createdAt);

        //let channel = message.guild.channels.find(`name`, "logs");
        let channel = message.guild.channels.find(ch => ch.name === '📝目綠');
        if (!channel) {
            message.channel.send("找不到 '📝目綠' 頻道.");
            return;
        }

        if (!deleteCount || deleteCount < 2 || deleteCount > 100) {
            message.channel.send("Example: -purge 10");
            message.channel.send("Please enter a number between 2 and 100");
            return;
        }

        const fetched = await message.channel.fetchMessages({ limit: deleteCount });
        channel.send(embed);
        message.channel
            .bulkDelete(fetched)
            .catch(error => message.reply("Error. Contact an administrator."));
}
    }
}