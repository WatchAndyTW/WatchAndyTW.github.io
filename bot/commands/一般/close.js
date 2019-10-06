const discord = require("discord.js");
const { RichEmbed } = require("discord.js")
const botconfig = require("../../botconfig.json");
const { prefix , botowner , FooterCreator } = require("../../botconfig.json");
module.exports = {
    config: {
        name: "close",
        aliases: ["h", "halp", "commands"],
        usage: `${prefix}close`,
        category: "一般",
        description: "",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {

    // Id van category van tickets.

    // Als bericht in ticket kanaal is dan verwijder kanaal ander zend bericht
    if (message.channel.parentID == "611468846955626496") {


        message.channel.delete();
    } else {
        const no = new RichEmbed()
        .setDescription("⛔ 請執行此命令在服務頻道")
        message.channel.send(no);
    }

    var embedCloseTicket = new discord.RichEmbed()
        .setTitle("客戶 " + message.author.name + "您好")
        .setDescription("你的私人頻道已經關掉")
        .setFooter(`${FooterCreator}`);

    message.author.send(embedCloseTicket).then((message) => {
        message.react("🔒")
        }).then(r => {
        const filter = (reaction, user) => reaction.emoji.name === ":lock:" && 
        user.id === message.author.id;
        //create the collector
        const collectorForU = message.createReactionCollector(filter, {time: 1000/*time 
        in ms*/});
        collectorForU.on("collect", r => {
        message.channel.delete()      
        })
        })
}
}