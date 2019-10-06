const { RichEmbed } = require("discord.js")
const { prefix , FooterCreator } = require("../../botconfig.json");
const { cyan } = require("../../colours.json");
const config = require("../../botconfig.json");

module.exports = {
    config: {
        name: "help",
        aliases: ["h", "halp", "commands"],
        usage: `${prefix}help`,
        category: "一般",
        description: "",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
    let arr = [];
    let types = ["一般","管理員","客服團隊"];
    let embed = new RichEmbed()

    if (!args[0]) {
        for(let i = 0; i < types.length; i++) {
            arr.push(bot.commands.filter(c => c.config.category == types[i].toLowerCase()).map(c => `\`${c.config.name}\``).join(" • "));
            try {
                embed.addField(types[i], arr[i]);
            } catch (e) {
                embed.addBlankField();
            }
        }

        embed.setColor(cyan)
        .setAuthor(`${message.guild.me.displayName} 指令幫助`, bot.user.displayAvatarURL)
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp()
        .setDescription(`這些是${bot.user.username}的可用指令!\n符號: **${prefix}** \n指令幫助 | 指令數目: ${bot.commands.size}`)
    .setFooter(`${FooterCreator} | ${message.author.username} 輸入指令 `, bot.user.displayAvatarURL)
        message.channel.send(embed)
    } else {
        let command = bot.commands.get(args[0].toLowerCase()) ?  bot.commands.get(args[0].toLowerCase()).config : bot.commands.get(bot.aliases.get(args[0].toLowerCase())).config;

        embed.setColor(cyan)
        .setAuthor(`${message.guild.me.displayName} 指令幫助`, message.guild.iconURL)
        .setThumbnail(bot.user.displayAvatarURL)
        .setDescription(`符號: ${prefix}\n\n**指令:** ${command.name}\n**\n**用法:** ${command.usage || "没寫用法"}\n**說明:** ${command.description || "没寫說明"}\n**可以用在:** ${command.accessableby || "玩家"}`)
        .setFooter(`${FooterCreator} | ${message.author.username} 輸入指令`, bot.user.displayAvatarURL)
        message.channel.send(embed);
        }
    }
}
