const Discord = require("discord.js")
const { prefix , botowner } = require("../../botconfig.json");
require('date.format');
const { RichEmbed } = require("discord.js")
module.exports = bot => {
      console.log(`---------------------`);
      console.log(`Logged in as ${bot.user.username} (${bot.user.tag})`)
      console.log(`ID: ${bot.user.id}`)
      console.log(`Guilds: ${bot.guilds.array().length}`)
      console.log(`Prefix: ${prefix}`)
      console.log(`---------------------`)
    var date = new Date();
    //bot.channels.get('607847120934010900').send('機器人上線在：'+ date.format('{MM}月{DD}日 {hh}:{mm}:{ss}'))

       bot.user.setActivity("服務人數: " + bot.guilds.get("610976448345407559").memberCount + "人", "PLAYING");
       
    var date = new Date();
        const onlineembed = new RichEmbed()
    .setDescription("✔️ 機器人上線在 " + date.format('{MM}月{DD}日 {hh}:{mm}:{ss}'))
 bot.guilds.get("610976448345407559").channels.get('621352605381033994').send(onlineembed)
}