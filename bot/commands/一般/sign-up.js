const Discord = require("discord.js");
const { prefix , FooterCreator } = require("../../botconfig.json");
module.exports = {
  config: {
      name: "sign-up",
      aliases: ["h", "halp", "commands"],
      usage: `${prefix}dm`,
      category: "一般",
      description: "",
      accessableby: "客服團隊"
  },
  run: async (bot, message, args) => {
  message.channel.send("您好，如需創建伺服器請提供以下資訊，方便您後臺登入用!\n用戶名稱:\n電子郵箱:\n用戶密碼:\n服務器名稱:\n服務器類型:\n若輸入完畢請輸入-done我們會幫您服務|若要取消申請請輸入-cancel")
  message.delete().catch();
}
}
