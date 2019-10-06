const Discord = require("discord.js");
const { prefix , botowner , FooterCreator } = require("../../botconfig.json");
module.exports = {
    config: {
        name: "tempmute",
        aliases: ["h", "halp", "commands"],
        usage: `${prefix}tempmute`,
        category: "管理員",
        description: "",
        accessableby: "管理員"
    },
    run: async (bot, message, args) => {
let tomute = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!tomute) return message.reply("Could't find user.");
        if (tomute.hasPermission("ADMINISTRATOR")) return message.reply("He's an administrator. You can't do that!");
        if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("You don't have permission");

        let muterole = message.guild.roles.find(`name`, "muted");
        let muteEmbed = new Discord.RichEmbed()
            .setDescription("禁言紀錄")
            .setColor("#e56b00")
            .addField("被禁言人", `${tomute} with ID ${tomute.id}`)
            .addField("執行者", `<@${message.author.id}> with ID ${message.author.id}`)
            .addField("執行頻道", message.channel)
            .addField("時間", message.createdAt)

        let channel = message.guild.channels.find(ch => ch.name === '📝目綠');
        if (!channel) {
            message.channel.send("找不到 '📝目綠' 頻道.");
            return;
        }
        channel.send(muteEmbed);
        if (!muterole) {
            try {
                muterole = await message.guild.createRole({
                    name: "muted",
                    color: "#000000"
                })
                message.guild.channels.forEach(async(channel, id) => {
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SPEAK: false
                    })
                })
            } catch (e) {
                console.log(e.stack);
            }
        }

        let mutetime = args[1];
        if (!mutetime) return message.reply("You didn't specify a time!");

        await (tomute.addRole(muterole.id));
        message.reply(`<@${tomute.id}> has been muted for ${ms(mutetime)}`)

        setTimeout(function() {
            tomute.removeRole(muterole.id);
            message.channel.send(`<@${tomute.id}> has been unmuted!`)

        }, ms(mutetime));
    }
}