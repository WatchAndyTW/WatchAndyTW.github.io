const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send("您沒有權限執行此命令!")
  message.delete().catch()
  let CreateTheTicketEmbed = new Discord.RichEmbed()
   .setTitle("私人頻道 | Ticket")
   .setDescription("Hi,歡迎來到牛排託管，可以使用表情符號 🎫 來開啟私人服務頻道喔")
   .setFooter("SteakHosting | 製作:安迪", bot.user.avatarURL)
   message.channel.send(CreateTheTicketEmbed).then(() => message.channel.lastMessage.react('🎫'));
   
   bot.on('messageReactionAdd', (reaction, user) => {
  if(reaction.emoji.name === "🎫") {
    
    if(user.username == "SteakHosting") return;

    message.channel.fetchMessage(message.guild.channels.get("611482904618467361").lastMessage).then(message => {
      message.reactions.forEach(reaction => reaction.remove(user.id))
    })
        
        const categoryId = "611468846955626496";
    
        var bool = false;
    
        let arg = message.content.split(" ").slice(1)
    
        message.guild.channels.forEach((channel) => {
    
    
            if (channel.name == "ticket" + "-" + user.username.toLowerCase().split(' ').join('-')) {
    
                user.send("錯誤: 你已經申請過了")
    
                bool = true;
    
            }
    
        });
    
        if (bool == true) return;

        let createEmbed = new Discord.RichEmbed()
         .setTitle("客戶 " + user.username + " 您好")
         .setDescription("服務頻道已創建")
         .setFooter("SteakHosting | 製作:安迪", bot.user.avatarURL);
         user.send(createEmbed)
    
        message.guild.createChannel("ticket" + "-" + user.username.toLowerCase(), "text").then((createdChan) => { 
    
            createdChan.setParent(categoryId).then((settedParent) => { 
    
    

    
                settedParent.overwritePermissions(message.guild.roles.find('name', "@everyone"), { "READ_MESSAGES": false });
    
                settedParent.overwritePermissions(message.guild.roles.find('id', "610988038507593739"), {
                  "READ_MESSAGES": true, "SEND_MESSAGES": true,
                  "ATTACH_FILES": true, "CONNECT": true,
                  "CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true
               });
                settedParent.overwritePermissions(message.guild.roles.find('id', "610984566911401984"), {
                  "READ_MESSAGES": true, "SEND_MESSAGES": true,
                  "ATTACH_FILES": true, "CONNECT": true,
                  "CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true
               });
                settedParent.overwritePermissions(message.guild.roles.find('id', "610985163094229014"), {
                  "READ_MESSAGES": true, "SEND_MESSAGES": true,
                  "ATTACH_FILES": true, "CONNECT": true,
                  "CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true
               });
                settedParent.overwritePermissions(message.guild.roles.find('id', "610987646688428053"), {
                  "READ_MESSAGES": true, "SEND_MESSAGES": true,
                  "ATTACH_FILES": true, "CONNECT": true,
                  "CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true
               });
                settedParent.overwritePermissions(message.guild.roles.find('id', "610984010268803113"), {
                  "READ_MESSAGES": true, "SEND_MESSAGES": true,
                  "ATTACH_FILES": true, "CONNECT": true,
                  "CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true
               });
                settedParent.overwritePermissions(user, {
    
                    "READ_MESSAGES": true, "SEND_MESSAGES": true,
                    "ATTACH_FILES": true, "CONNECT": true,
                    "CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true

                });
    
    
                settedParent.overwritePermissions(user, {
    
                    "READ_MESSAGES": true, "SEND_MESSAGES": true,
                    "ATTACH_FILES": true, "CONNECT": true,
                    "CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true

                });
    
                var embedParent = new Discord.RichEmbed()
                    .setColor("#220088")
                    .setTitle("客戶 " + user.username + " 您好")
                    .setDescription(`您已開啟一個服務頻道,您可以在這裡問任何的問題,問完問題之後請耐心等待我們的工作人員回覆!!!`)
                    .setFooter("SteakHosting | 製作:安迪", bot.user.avatarURL);
                    settedParent.send(embedParent).then(function (message) {
                    message.react('🔒')}).catch(function() {
                      //Something
                     });
    
            }).catch(err => {
                message.channel.send("有地方有錯誤");
            });
    
        }).catch(err => {
            message.channel.send("有地方有錯誤");
        });
      }
      if(reaction.emoji.name === "🔒") {
       // bot.guilds.get("610976448345407559").channels.find("name", "ticket" + "-" + user.username.toLowerCase()).delete()
      }
})
}

module.exports.help = {
  name:"ticket"
}