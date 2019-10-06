const botconfig = require("../../botconfig.json");
const request = require('request');
const Discord = require('discord.js');
var sqrt = require( 'math-sqrt' );
var key = botconfig.hypixelApi

module.exports = {
    config: {
        name: "hypixel",
        aliases: ["h", "halp", "commands"],
        usage: "!hypixel",
        category: "一般",
        description: "see stats at bot",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {

  if(!args[0]){
    let CannotEmbed = new Discord.RichEmbed()
     .setDescription(":no_entry: 請輸入玩家名稱")
    message.channel.send(CannotEmbed)
    return true;
  }
request.get("https://api.hypixel.net/player?key=" + key + "&name=" + args[0] , function(e, res, data) {
  api = JSON.parse(data)
  if(api.player != null){
    // If there is no error
if(!e) {
  let Embed = new Discord.RichEmbed()
   .setTitle("🎮 玩家 " + args[0] + " 的資訊")
   .setURL(`https://hypixel.net/player/${args[0]}`)
  if(api.player.rank == null){
  if(api.player.newPackageRank == null){
      var rank = "NONE"
      Embed.addField("階級", "`" + rank + "`", true)
  }
  if(api.player.newPackageRank == "MVP_PLUS" && api.player.monthlyPackageRank != "SUPERSTAR"){
    var rank = "MVP+"
    Embed.addField("階級", "`" + rank + "`", true)
  }
  if(api.player.newPackageRank == "VIP" && api.player.newPackageRank == "MVP"){
      var rank = api.player.newPackageRank
      Embed.addField("階級", "`" + rank + "`", true)
  }
  if(api.player.newPackageRank == "VIP_PLUS"){
      var rank = "VIP+"
      Embed.addField("階級", "`" + rank + "`", true)
  }
  if(api.player.monthlyPackageRank == "SUPERSTAR"){
      var rank = "MVP++"
      Embed.addField("階級", "`" + rank + "`", true)
  }
}else{
  if(api.player.rank == "YOUTUBER"){
    var rank = "YOUTUBER"
    Embed.addField("階級", "`" + rank + "`", true)
  }
  if(api.player.rank == "HELPER"){
    var rank = "幫助員(HELPER)"
    Embed.addField("階級", "`" + rank + "`", true)
  }
  if(api.player.rank == "MODERATOR"){
    var rank = "秩序管理(MODERATOR)"
    Embed.addField("階級", "`" + rank + "`", true)
  }
  if(api.player.rank == "BUILDTEAM"){
    var rank = "建築團隊(BUILDTEAM)"
    Embed.addField("階級", "`" + rank + "`", true)
  }
  if(api.player.rank == "ADMIN"){
    if(api.player.uuid != "f7c77d999f154a66a87dc4a51ef30d19"){
      var rank = "管理員(ADMIN)"
      Embed.addField("階級", "`" + rank + "`", true)
    }else{
        var rank = "擁有者(OWNER)"
        Embed.addField("階級", "`" + rank + "`", true)
    }
  }
}

request.get("https://api.hypixel.net/guild?key=c59e4546-7be7-49d6-8032-224349e40a29&player=" + api.player.uuid, function(e, res, gdata) {
  ginfo = JSON.parse(gdata);
  var url = "https://hypixel.net/guilds/" + ginfo.guild.name
  Embed.addField("公會", `[${ginfo.guild.name}](${url})`, true)

  Date.prototype.toLocaleString = function() {
    function addZero(num) {
        if(num<10)
            return "0" + num;
        return num;
    }
    return this.getFullYear() + "/" + addZero(this.getMonth() + 1) + "/" + addZero(this.getDate()) + " " + addZero(this.getHours()) + ":" + addZero(this.getMinutes()) + ":" + addZero(this.getSeconds());
  };
  var date = new Date(api.player.firstLogin);
  dateTime = date.toLocaleString();

  Embed.addField("首次加入", "`" + dateTime + "`", true)

  Embed.addField("麥塊版本", "`" + api.player.mcVersionRp + "`", true)

  Embed.addField("Karma", "`" + api.player.karma + "`", true)

  Embed.addField("等級", "`" + (sqrt(api.player.networkExp + 15312.5) - 125/sqrt(2))/(25*sqrt(2)) + "`")

  Date.prototype.toLocaleString = function() {
    function addZero(num) {
        if(num<10)
            return "0" + num;
        return num;
    }
    return this.getFullYear() + "/" + addZero(this.getMonth() + 1) + "/" + addZero(this.getDate()) + " " + addZero(this.getHours()) + ":" + addZero(this.getMinutes()) + ":" + addZero(this.getSeconds());
  };
  var date = new Date(api.player.lastLogin);
  dateTime1 = date.toLocaleString();

  Embed.addField("最後登入", dateTime1, true)

  Embed.addField("最後遊戲" , api.player.mostRecentGameType || '無', true)

  Embed.setImage("https://visage.surgeplay.com/full/512/" + api.player.uuid)

  Embed.setThumbnail("https://minotar.net/helm/" + args[0] + "/500.png")

  Embed.setFooter("AHypixelBot | 中文Hypixel查詢機器人 | 製作:安迪&小啦", bot.user.avatarURL)
    
  message.channel.send(Embed)
  });
  }
}else{
  let CannotEmbed = new Discord.RichEmbed()
   .setDescription(":no_entry: 找不到玩家" + args[0])
  message.channel.send(CannotEmbed)
}
});

}
}