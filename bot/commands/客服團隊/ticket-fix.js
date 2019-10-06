const Discord = require("discord.js");
const { prefix , botowner , FooterCreator } = require("../../botconfig.json");
module.exports = {
  config: {
      name: "ticket-fix",
      aliases: ["h", "halp", "commands"],
      usage: `${prefix}ticket-fix`,
      category: "客服團隊",
      description: "",
      accessableby: "客服團隊"
  },
  run: async (bot, message, args) => {
    message.delete().catch();
    message.channel.lastMessage.react('🎫');
}
}