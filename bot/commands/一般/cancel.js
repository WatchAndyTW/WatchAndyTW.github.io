const Discord = require("discord.js");
const { prefix , botowner , FooterCreator } = require("../../botconfig.json");
module.exports = {
    config: {
        name: "cancel",
        aliases: ["h", "halp", "commands"],
        usage: `${prefix}canel`,
        category: "一般",
        description: "",
        accessableby: "管理員"
    },
    run: async (bot, message, args) => {
  message.channel.send("申請已取消，請問還有問題嗎？若沒問題，我們會關閉此頻道!")
  message.delete().catch();
}
}
