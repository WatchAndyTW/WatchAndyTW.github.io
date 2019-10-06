const Discord = require("discord.js");
const { prefix , botowner , FooterCreator } = require("../../botconfig.json");
module.exports = {
  config: {
      name: "done",
      aliases: ["h", "halp", "commands"],
      usage: `${prefix}done`,
      category: "客服團隊",
      description: "",
      accessableby: "管理員"
  },
  run: async (bot, message, args) => {
    if(!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send("您沒有權限執行此命令!")
  message.channel.send("申請成功，請等待創建!")
  message.delete().catch();
}
}
