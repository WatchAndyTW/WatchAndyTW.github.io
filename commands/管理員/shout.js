const { RichEmbed } = require("discord.js")
module.exports = {
    config: {
        name: "shout",
        description: "sends a message that was inputted to a channel",
        usage: "!say",
        category: "管理員",
        accessableby: "Staff",
        aliases: ["acc", "announcement"]
    },
    run: async (bot, message, args) => {
      const noperm = new RichEmbed()
      noperm.setDescription(`⛔沒有權限執行此命令`)
      .setColor("ff0000")
        message.delete();
    if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send(noperm)
    const embed = new RichEmbed()
    .setColor(0x00FFFF)
    .setTitle("🔊 公告系統")
    .setThumbnail(message.author.displayAvatarURL)
    .addField("公告發佈者" , "<@" + message.author.id + ">")
    .addField("公告內容" , args.join(" "))
    message.channel.send("@everyone")
    console.log(`${message.author.username}` + " " + "Used The Command " + "Vote");
    message.channel.send({embed}).then(async msg => {
  
      await msg.react('👌')
    })
    }
}