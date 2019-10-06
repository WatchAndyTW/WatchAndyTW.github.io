const Discord = require("discord.js");
const { prefix , botowner , FooterCreator } = require("../../botconfig.json");
module.exports = {
    config: {
        name: "say",
        aliases: ["h", "halp", "commands"],
        usage: `${prefix}say`,
        category: "管理員",
        description: "",
        accessableby: "管理員"
    },
    run: async (bot, message, args) => {
  if(message.author.id == "459282533549604864" || message.author.id == "324102546681757716"){
  let botmessage = args.join(" ");
  message.delete().catch();
  message.channel.send(botmessage);
  }else{
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(":no_entry: 你沒有權限使用此指令")
  let botmessage = args.join(" ");
  message.delete().catch();
  message.channel.send(botmessage);
  }
 }
}